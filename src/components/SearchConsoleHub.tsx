import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { 
  Globe, 
  CheckCircle, 
  XCircle, 
  Search, 
  Loader2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Key, 
  RefreshCw, 
  Terminal, 
  BookOpen, 
  Lock
} from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google OAuth Provider with correct Search Console and Site Verification scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/siteverification');
provider.addScope('https://www.googleapis.com/auth/webmasters');

interface SiteProperty {
  siteUrl: string;
  permissionLevel: string;
}

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'request';
  message: string;
  details?: any;
}

export default function SearchConsoleHub() {
  // Authentication states
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  // App States
  const [targetUrl, setTargetUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'perkins' | 'preview' | 'custom'>('perkins');

  // API Verification States
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'verified' | 'unverified' | null>(null);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'FILE' | 'META'>('FILE');
  const [verifyingDomain, setVerifyingDomain] = useState(false);

  // Search Console Property States
  const [gscProperties, setGscProperties] = useState<SiteProperty[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [addingProperty, setAddingProperty] = useState(false);
  const [isPropertyAdded, setIsPropertyAdded] = useState<boolean | null>(null);

  // Dev logs
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  // Add Log Helper
  const addLog = (type: LogEntry['type'], message: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ timestamp, type, message, details }, ...prev]);
  };

  // Set default targets depending on active tabs
  useEffect(() => {
    const origin = window.location.origin;
    if (activeTab === 'perkins') {
      setTargetUrl('https://perkinspublisher.com/');
    } else if (activeTab === 'preview') {
      setTargetUrl(origin.endsWith('/') ? origin : `${origin}/`);
    } else {
      setTargetUrl(customUrl);
    }
  }, [activeTab, customUrl]);

  // Auth State Listener
  useEffect(() => {
    addLog('info', 'Initializing Firebase Auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        addLog('success', `User recognized: ${currentUser.email}`);
        
        // Retrieve cached credential token if possible (we may need to sign in to get the fresh OAuth Access Token)
        // Since Firebase SDK does not expose the raw provider OAuth token via onAuthStateChanged,
        // we prompt the user to connect explicitly using signInWithPopup if they haven't in this session.
      } else {
        setUser(null);
        setToken(null);
        addLog('info', 'No active authenticated session.');
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle SignIn
  const handleGoogleConnect = async () => {
    setConnecting(true);
    addLog('request', 'Initiating Google OAuth popup flow...');
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential?.accessToken) {
        throw new Error('OAuth callback completed, but failed to retrieve access token.');
      }
      
      const accessToken = credential.accessToken;
      setToken(accessToken);
      setUser(result.user);
      addLog('success', 'OAuth Handshake completed successfully!', {
        displayName: result.user.displayName,
        email: result.user.email,
        scopes: result.user.providerData
      });

      // Fetch search console sites immediately on connect
      fetchSearchConsoleProperties(accessToken);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      addLog('error', `Connection failed: ${err.message}`, err);
    } finally {
      setConnecting(false);
    }
  };

  // Fetch search console properties
  const fetchSearchConsoleProperties = async (accessToken: string) => {
    if (!accessToken) return;
    setLoadingProperties(true);
    addLog('request', 'Fetching Search Console property lists from Google APIs...');
    try {
      const response = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch search console sites.');
      }

      const siteEntriesList: SiteProperty[] = data.siteEntry || [];
      setGscProperties(siteEntriesList);
      addLog('success', `Retrieved ${siteEntriesList.length} site properties from your Search Console account.`, siteEntriesList);

      // Check if current targetUrl exists in the property lists
      checkIfPropertyExists(siteEntriesList, targetUrl);
    } catch (err: any) {
      addLog('error', `Search Console list retrieval failed: ${err.message}`);
    } finally {
      setLoadingProperties(false);
    }
  };

  const checkIfPropertyExists = (propertiesList: SiteProperty[], urlToCheck: string) => {
    const cleanUrl = urlToCheck.toLowerCase().replace(/\/$/, '');
    const found = propertiesList.some(p => {
      const pUrl = p.siteUrl.toLowerCase().replace(/\/$/, '');
      return pUrl === cleanUrl || pUrl === `sc-domain:${cleanUrl.replace('https://', '').replace('http://', '')}`;
    });
    setIsPropertyAdded(found);
    addLog('info', `Property match status for "${urlToCheck}": ${found ? 'FOUND' : 'NOT FOUND'}`);
  };

  // Re-check site when targetUrl updates
  useEffect(() => {
    if (token && gscProperties.length > 0) {
      checkIfPropertyExists(gscProperties, targetUrl);
      // Reset verification and adding status for the new URL
      setVerificationStatus(null);
      setVerificationToken(null);
    }
  }, [targetUrl]);

  // Request Site Verification Token
  const requestVerificationToken = async () => {
    if (!token) return;
    setCheckingVerification(true);
    addLog('request', `Generating dynamic verification token for "${targetUrl}" using Method: ${verificationMethod}...`);

    try {
      const response = await fetch('https://www.googleapis.com/siteVerification/v1/token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          site: {
            identifier: targetUrl,
            type: 'SITE'
          },
          verificationMethod: verificationMethod
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate site verification token.');
      }

      setVerificationToken(data.token);
      addLog('success', `Token retrieved: "${data.token}"`, data);

      // If the verification method is FILE, it is a google[code].html string
      // Our backend handles /google:id.html automatically!
      if (verificationMethod === 'FILE') {
        addLog('info', '💡 Verification method is FILE. Our Perkins backend dynamically supports this file, so Google verification queries will resolve successfully without manual uploads.');
      }
    } catch (err: any) {
      addLog('error', `Token request failed: ${err.message}`, err);
    } finally {
      setCheckingVerification(false);
    }
  };

  // Perform Google Site Verification
  const verifyDomainOwnership = async () => {
    if (!token) return;
    setVerifyingDomain(true);
    addLog('request', `Triggering Google verification verify call on "${targetUrl}"...`);

    try {
      const response = await fetch('https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=' + verificationMethod, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          site: {
            identifier: targetUrl,
            type: 'SITE'
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Verification call rejected by Google.');
      }

      setVerificationStatus('verified');
      addLog('success', `🎉 Domain successfully verified on Google! Resource ID: ${data.id}`, data);
    } catch (err: any) {
      setVerificationStatus('unverified');
      addLog('error', `Verification failed: ${err.message}. If verifying a preview domain, ensure you trigger this from the live preview iframe.`, err);
    } finally {
      setVerifyingDomain(false);
    }
  };

  // Add site property to Search Console
  const addPropertyToSearchConsole = async () => {
    if (!token) return;
    setAddingProperty(true);
    addLog('request', `Provisioning new Search Console property for: "${targetUrl}"...`);

    try {
      const encodedUrl = encodeURIComponent(targetUrl);
      const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodedUrl}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || 'Failed to add search console property.');
      }

      addLog('success', `🎉 Successfully added "${targetUrl}" to your Google Search Console account properties!`);
      setIsPropertyAdded(true);
      
      // Refresh list
      fetchSearchConsoleProperties(token);
    } catch (err: any) {
      addLog('error', `Failed to register site: ${err.message}`, err);
    } finally {
      setAddingProperty(false);
    }
  };

  // Check current URL verification status on Google
  const checkGoogleVerificationStatus = async () => {
    if (!token) return;
    setCheckingVerification(true);
    addLog('request', `Querying verification index for: "${targetUrl}"...`);
    try {
      const encodedUrl = encodeURIComponent(targetUrl);
      const response = await fetch(`https://www.googleapis.com/siteVerification/v1/webResource/${encodedUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setVerificationStatus('verified');
        addLog('success', `Resource verified! Owners list: ${data.owners?.join(', ')}`, data);
      } else {
        setVerificationStatus('unverified');
        addLog('info', `Resource is currently unverified on your account. API Message: ${data.error?.message}`);
      }
    } catch (err: any) {
      setVerificationStatus('unverified');
      addLog('error', `Status check failed: ${err.message}`);
    } finally {
      setCheckingVerification(false);
    }
  };

  const handleDisconnect = async () => {
    addLog('info', 'Signing out of Google account session...');
    try {
      await signOut(auth);
      setToken(null);
      setUser(null);
      setGscProperties([]);
      setIsPropertyAdded(null);
      setVerificationStatus(null);
      setVerificationToken(null);
      addLog('success', 'Successfully signed out.');
    } catch (err: any) {
      addLog('error', `Sign out failed: ${err.message}`);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hub Header */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-600 font-mono text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={12} className="animate-pulse" />
              <span>Google Integration Studio</span>
            </div>
            <h1 className="text-3xl font-black text-blue-950 font-serif tracking-tight">
              Google Search Console Hub
            </h1>
            <p className="text-xs text-slate-500 font-bold max-w-lg">
              Verify your manuscript publishing portal, claim domain properties, and audit dynamic indexing ranks on Google search engine instantly.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setShowLogs(!showLogs)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all ${
                showLogs 
                  ? 'bg-slate-900 border-slate-900 text-amber-500 shadow-md' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Terminal size={14} />
              <span>{showLogs ? 'Hide API Console' : 'Show API Console'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Connection Profile Block */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Google OAuth State Card */}
            <div className="bg-white rounded-3xl border border-gray-200/85 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/5 to-transparent rounded-full -mr-6 -mt-6"></div>
              
              <h2 className="text-sm font-black text-blue-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Key size={16} className="text-amber-500" />
                <span>Account Status</span>
              </h2>

              {authLoading ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-2">
                  <Loader2 className="animate-spin text-amber-500" size={24} />
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Syncing credentials...</span>
                </div>
              ) : user && token ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-150">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'Google User'} className="w-10 h-10 rounded-full border border-amber-500/25" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 bg-amber-500 text-blue-950 font-black rounded-full flex items-center justify-center text-sm uppercase">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-xs font-black text-blue-950 truncate uppercase leading-none">{user.displayName || 'Authorized User'}</p>
                      <p className="text-[10px] text-slate-400 font-bold truncate mt-1">{user.email}</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5 text-[11px] text-emerald-800 font-semibold leading-relaxed">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-950 uppercase text-[10px]">Active OAuth Token Connected</p>
                      <p className="text-emerald-700/85 text-[10px] font-bold mt-0.5">Google Webmasters & Site Verification scopes fully authorized.</p>
                    </div>
                  </div>

                  <button
                    onClick={handleDisconnect}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer text-center"
                  >
                    Disconnect Account
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Connect your Google Account to automatically scan site property listings, request token file matches, and register properties.
                  </p>
                  
                  {/* Google Custom GSI Button */}
                  <button 
                    onClick={handleGoogleConnect}
                    disabled={connecting}
                    className="w-full bg-white hover:bg-slate-50 disabled:opacity-50 border border-gray-300 text-slate-700 font-bold py-3 px-4 rounded-xl shadow-sm cursor-pointer transition-all flex items-center justify-center gap-3 text-xs"
                  >
                    {connecting ? (
                      <>
                        <Loader2 className="animate-spin text-amber-500" size={16} />
                        <span className="font-black uppercase tracking-wider text-[10px]">Connecting popup...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.53-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-8.83z" />
                          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.31 24 12 24z" />
                          <path fill="#FBBC05" d="M5.32 14.24A7.16 7.16 0 0 1 5 12c0-.79.13-1.57.32-2.34V6.51H1.21A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.21 5.39l4.11-3.15z" />
                          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.39l4.11 3.15c.94-2.85 3.57-4.79 6.68-4.79z" />
                        </svg>
                        <span className="font-black uppercase tracking-wider text-[10px]">Sign in with Google</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Verification Mechanism Tips */}
            <div className="bg-blue-950 text-white rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-amber-500">How verification works</h3>
              
              <div className="space-y-3.5 text-[11px] font-semibold text-slate-300 leading-relaxed">
                <div className="flex gap-2">
                  <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center text-amber-500 shrink-0 font-bold">1</div>
                  <p>Our backend includes a built-in wildcard endpoint that intercepts all requested HTML verification tokens from Google.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center text-amber-500 shrink-0 font-bold">2</div>
                  <p>When you trigger the verify check, Google requests your domain’s dynamic file which responds instantly with verification keys.</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center text-amber-500 shrink-0 font-bold">3</div>
                  <p>No code upload is needed! Verification completes seamlessly in under 5 seconds.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Main Workspace Integration flow */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Domain Selection & Target Status Card */}
            <div className="bg-white rounded-3xl border border-gray-200/85 p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-black text-blue-950 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Globe size={18} className="text-amber-500" />
                <span>Domain Ownership & Search Index</span>
              </h2>

              <div className="space-y-6">
                
                {/* Dynamic Property tab choices */}
                <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-black">
                  <button
                    onClick={() => setActiveTab('perkins')}
                    className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wider ${
                      activeTab === 'perkins'
                        ? 'bg-white text-blue-950 shadow-md border-slate-300'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Globe size={13} />
                    <span>Perkins Domain</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wider ${
                      activeTab === 'preview'
                        ? 'bg-white text-blue-950 shadow-md'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Layers size={13} />
                    <span>Live Preview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('custom')}
                    className={`flex-1 py-3 px-4 rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 uppercase tracking-wider ${
                      activeTab === 'custom'
                        ? 'bg-white text-blue-950 shadow-md'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Search size={13} />
                    <span>Custom URL</span>
                  </button>
                </div>

                {/* Custom URL Input if active */}
                {activeTab === 'custom' && (
                  <div className="animate-fadeIn bg-slate-50 border border-slate-150 p-4 rounded-2xl">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Enter Domain or Full Property URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="https://example.com/"
                        className="flex-1 bg-white border border-gray-200/85 rounded-xl px-3.5 py-3 text-xs font-bold text-gray-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}

                {/* Selected target showcase */}
                <div className="bg-slate-50 border border-slate-150 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Active Target Property URL</span>
                    <p className="text-sm font-extrabold text-blue-950 mt-0.5 truncate font-mono">{targetUrl || '(Please enter a URL)'}</p>
                  </div>
                  
                  {user && token && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={checkGoogleVerificationStatus}
                        disabled={checkingVerification || !targetUrl}
                        className="bg-blue-950 hover:bg-indigo-950 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-wider py-3 px-4 rounded-xl cursor-pointer transition-all shrink-0 flex items-center gap-1.5"
                      >
                        {checkingVerification ? <Loader2 className="animate-spin" size={12} /> : <RefreshCw size={12} />}
                        <span>Check Status</span>
                      </button>
                    </div>
                  )}
                </div>

                {!user || !token ? (
                  <div className="py-10 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="p-3 bg-slate-100 text-slate-400 rounded-full">
                      <Lock size={22} />
                    </div>
                    <p className="text-xs text-slate-500 font-bold max-w-xs">
                      Sign in with your Google Account on the left to check site verification status and claim your web property.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    
                    {/* Step 1: Verification Status Card */}
                    <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <h4 className="text-xs font-black text-slate-900 uppercase">1. Google Verification Status</h4>
                        {verificationStatus === 'verified' ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] py-1 px-2.5 rounded-full uppercase font-black flex items-center gap-1">
                            <CheckCircle size={10} /> Verified
                          </span>
                        ) : verificationStatus === 'unverified' ? (
                          <span className="bg-amber-100 text-amber-800 text-[9px] py-1 px-2.5 rounded-full uppercase font-black flex items-center gap-1">
                            <XCircle size={10} /> Unverified
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[9px] py-1 px-2.5 rounded-full uppercase font-black">
                            Not Checked Yet
                          </span>
                        )}
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="flex flex-wrap gap-4 items-center justify-between">
                          <p className="text-slate-500 font-bold max-w-sm">
                            Generate a temporary token HTML file and check if ownership resolves successfully.
                          </p>
                          <div className="flex items-center gap-2">
                            <select
                              value={verificationMethod}
                              onChange={(e) => setVerificationMethod(e.target.value as any)}
                              className="bg-slate-50 border border-slate-200 text-[10px] font-black uppercase py-2.5 px-3 rounded-lg focus:outline-none"
                            >
                              <option value="FILE">HTML File (Recommended)</option>
                              <option value="META">Meta Tag</option>
                            </select>
                          </div>
                        </div>

                        {!verificationToken ? (
                          <button
                            onClick={requestVerificationToken}
                            disabled={checkingVerification || !targetUrl}
                            className="w-full bg-slate-900 hover:bg-slate-950 disabled:opacity-50 text-amber-500 text-[10px] font-black uppercase tracking-wider py-3 rounded-xl cursor-pointer text-center"
                          >
                            Generate Verification Token
                          </button>
                        ) : (
                          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4.5 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[9px] font-black uppercase text-slate-400">Google Verification Token</span>
                                <p className="text-xs font-mono font-bold text-slate-800 mt-0.5 select-all">{verificationToken}</p>
                              </div>
                            </div>
                            
                            {verificationMethod === 'FILE' ? (
                              <p className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg font-semibold leading-relaxed">
                                💡 Our dynamic route handler intercepts this format and serves it dynamically. The file is already virtually hosted on your preview/deployment port!
                              </p>
                            ) : (
                              <p className="text-[10px] text-blue-700 bg-blue-50 border border-blue-100 p-2.5 rounded-lg font-semibold leading-relaxed">
                                Copy the token value and ensure it is present in the site's metadata tags.
                              </p>
                            )}

                            <div className="pt-2 flex gap-2">
                              <button
                                onClick={verifyDomainOwnership}
                                disabled={verifyingDomain}
                                className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-blue-950 text-[10px] font-black uppercase tracking-wider py-3 rounded-xl cursor-pointer text-center"
                              >
                                {verifyingDomain ? 'Validating Ownership...' : 'Trigger Verify Handshake'}
                              </button>
                              <button
                                onClick={() => setVerificationToken(null)}
                                className="px-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs flex items-center justify-center cursor-pointer"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 2: Search Console Property Verification */}
                    <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <h4 className="text-xs font-black text-slate-900 uppercase">2. Search Console Status</h4>
                        {isPropertyAdded === true ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] py-1 px-2.5 rounded-full uppercase font-black">
                            Active Property Found
                          </span>
                        ) : isPropertyAdded === false ? (
                          <span className="bg-rose-100 text-rose-800 text-[9px] py-1 px-2.5 rounded-full uppercase font-black">
                            Missing Property
                          </span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[9px] py-1 px-2.5 rounded-full uppercase font-black">
                            Unknown Status
                          </span>
                        )}
                      </div>

                      <div className="space-y-4 text-xs">
                        <p className="text-slate-500 font-bold leading-relaxed">
                          Once verified, you must register the site inside Google Search Console so search crawlers can index pages and track search clicks.
                        </p>

                        {isPropertyAdded === true && (
                          <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-xl text-emerald-850 font-semibold text-[11px] leading-relaxed flex gap-2">
                            <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-emerald-950 uppercase text-[10px]">Property Verified and Linked!</p>
                              <p className="mt-0.5 text-[10px] text-emerald-700">This URL is registered in your Google Search Console profile properties list.</p>
                            </div>
                          </div>
                        )}

                        {isPropertyAdded === false && (
                          <div className="space-y-3">
                            <div className="bg-amber-50 border border-amber-150 p-4 rounded-xl text-amber-850 font-semibold text-[11px] leading-relaxed flex gap-2">
                              <XCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold text-amber-950 uppercase text-[10px]">Site Missing in Properties List</p>
                                <p className="mt-0.5 text-[10px] text-amber-700">The domain target is not yet present in your Search Console property lists. Register it below.</p>
                              </div>
                            </div>
                            <button
                              onClick={addPropertyToSearchConsole}
                              disabled={addingProperty}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-wider py-3 rounded-xl cursor-pointer text-center flex items-center justify-center gap-1.5"
                            >
                              {addingProperty ? <Loader2 className="animate-spin" size={12} /> : null}
                              <span>Add Site to Search Console</span>
                            </button>
                          </div>
                        )}

                        {isPropertyAdded === null && (
                          <button
                            onClick={() => fetchSearchConsoleProperties(token)}
                            disabled={loadingProperties}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-wider py-3 rounded-xl cursor-pointer text-center"
                          >
                            Scan Search Console Properties
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

        {/* Console Collapsible Section */}
        {showLogs && (
          <div className="mt-8 bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 shadow-2xl animate-scaleUp text-gray-200 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-amber-500" />
                <span className="font-extrabold text-xs uppercase tracking-wider text-slate-300">HTTP API Response Logs</span>
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                Clear Console
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-2.5 pr-2">
              {logs.length === 0 ? (
                <div className="py-10 text-center text-slate-600">
                  <p>&gt; Connection logs empty. Actions will be logged here in real time.</p>
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="space-y-1 border-b border-slate-900 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600 text-[10px]">{log.timestamp}</span>
                        <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black ${
                          log.type === 'error' ? 'bg-red-950 text-red-400' :
                          log.type === 'success' ? 'bg-emerald-950 text-emerald-400' :
                          log.type === 'request' ? 'bg-blue-950 text-blue-400' :
                          'bg-slate-850 text-slate-400'
                        }`}>
                          {log.type}
                        </span>
                        <span className="font-extrabold text-slate-100">{log.message}</span>
                      </div>
                    </div>
                    {log.details && (
                      <pre className="p-2.5 bg-[#030712] rounded-xl text-[10px] text-slate-400 overflow-x-auto border border-slate-900/50">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
