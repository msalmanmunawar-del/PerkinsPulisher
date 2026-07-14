import { useState, useEffect, FormEvent } from 'react';
import { Inquiry, LogoConfig } from './types';
import Header from './components/Header';
import { ORIGINAL_LOGO_PRESET } from './components/LogoSandbox';
import Hero from './components/Hero';
import TimesSquareSection from './components/TimesSquareSection';
import ServiceHub from './components/ServiceHub';
import CompareSection from './components/CompareSection';
import BookSlider from './components/BookSlider';
import Testimonials from './components/Testimonials';
import AuthorInsights from './components/AuthorInsights';
import LeadAuditScorecard from './components/LeadAuditScorecard';
import Footer from './components/Footer';
import { useToast } from './components/Toast';
import SEO from './components/SEO';
import DynamicServicePage from './components/DynamicServicePage';
import DynamicIndustryPage from './components/DynamicIndustryPage';
import KnowledgeHub from './components/KnowledgeHub';
import SearchConsoleHub from './components/SearchConsoleHub';

import { X, CheckCircle, Sparkles, Phone, Award, BookOpen, Loader2 } from 'lucide-react';

const MODAL_TRANSLATIONS = {
  en: {
    title: "Get Free Consultation",
    subtitle: "PERKINS BESTSELLER ROADMAP",
    targetedInquiry: "Targeted Inquiry: {id} Component",
    activeStatus: "ACTIVE",
    authorNameLabel: "Author Name *",
    authorNamePlaceholder: "e.g. Elena Petrova",
    emailLabel: "Email Address *",
    emailPlaceholder: "elena@example.com",
    phoneLabel: "Phone Contact *",
    phonePlaceholder: "+1 (212) 555-0199",
    genreLabel: "Book Genre",
    genres: {
      fiction: "Fiction Novel",
      nonfiction: "Non-Fiction Textbook",
      scifi: "Sci-Fi & Fantasy Adventure",
      selfhelp: "Self-Help & Business Manual",
      memoir: "Memoir / Family History"
    },
    wordCountLabel: "Word Count",
    describeLabel: "Briefly Describe Your Story Ideas",
    describePlaceholder: "e.g. High fantasy adventure centering an ancient forgotten compass vault structure...",
    expressLabel: "Request Immediate Call Back (Express Service)",
    expressDesc: "Flag my publication roadmap request as high priority for callback within 15 minutes.",
    submitting: "Transmitting Inquiry...",
    submitBtn: "Lock My Publishing Roadmap Consultation",
    successTitle: "Inquiry Sent Successfully!",
    successMessage: "Your estimated blueprint and manuscript draft specifications have been sent directly to Stephanie Weldon's business email. We will reach out to you shortly to arrange a personalized bestseller design session!"
  },
  es: {
    title: "Obtener consulta gratuita",
    subtitle: "PLAN DE BESTSELLER PERKINS",
    targetedInquiry: "Consulta dirigida: Componente {id}",
    activeStatus: "ACTIVO",
    authorNameLabel: "Nombre del autor *",
    authorNamePlaceholder: "ej. Elena Petrova",
    emailLabel: "Correo electrónico *",
    emailPlaceholder: "elena@ejemplo.com",
    phoneLabel: "Teléfono de contacto *",
    phonePlaceholder: "+1 (212) 555-0199",
    genreLabel: "Género del libro",
    genres: {
      fiction: "Novela de ficción",
      nonfiction: "Libro de no ficción",
      scifi: "Aventura de ciencia ficción y fantasía",
      selfhelp: "Manual de autoayuda y negocios",
      memoir: "Memorias / Historia familiar"
    },
    wordCountLabel: "Número de palabras",
    describeLabel: "Describa brevemente sus ideas para la historia",
    describePlaceholder: "ej. Una aventura de alta fantasía centrada en una antigua estructura de bóveda de brújula olvidada...",
    expressLabel: "Solicitar llamada inmediata (Servicio Express)",
    expressDesc: "Marcar mi solicitud como de alta prioridad para recibir una llamada en 15 minutos.",
    submitting: "Transmitiendo consulta...",
    submitBtn: "Reservar mi consulta del plan editorial",
    successTitle: "¡Consulta enviada con éxito!",
    successMessage: "Las especificaciones estimadas de su manuscrito y plan de bestseller se han enviado directamente al correo electrónico de Stephanie Weldon. ¡Nos pondremos en contacto con usted en breve para programar una sesión personalizada de diseño de bestseller!"
  }
};

export default function App() {
  const { success: showSuccessToast, warn: showWarningToast } = useToast();
  const [activePage, setActivePage] = useState<string>('home');
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(ORIGINAL_LOGO_PRESET);
  const [consultationModalOpen, setConsultationModalOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Modal Inquiry Form inputs
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalGenre, setModalGenre] = useState('fiction');
  const [modalWordCount, setModalWordCount] = useState<number>(45000);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [modalLang, setModalLang] = useState<'en' | 'es'>('en');
  const [modalExpressCallback, setModalExpressCallback] = useState(false);

  const t = MODAL_TRANSLATIONS[modalLang];

  // Load saved configurations
  useEffect(() => {
    const savedLogo = localStorage.getItem('perkins_publisher_logo_config');
    if (savedLogo) {
      try {
        setLogoConfig(JSON.parse(savedLogo));
      } catch (err) {
        setLogoConfig(ORIGINAL_LOGO_PRESET);
      }
    }
  }, []);

  // Sync page state with URL Hash for Technical SEO & Shareability
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        const page = hash.replace('#/', '');
        if (page) {
          if (['services', 'portfolio', 'reviews', 'insights', 'seo-scorecard'].includes(page)) {
            setActivePage('home');
            setTimeout(() => {
              const element = document.getElementById(page);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }, 150);
          } else {
            setActivePage(page);
          }
        }
      } else {
        const rawAnchor = hash.replace('#', '');
        if (['services', 'portfolio', 'reviews', 'insights', 'seo-scorecard'].includes(rawAnchor)) {
          setActivePage('home');
          setTimeout(() => {
            const element = document.getElementById(rawAnchor);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        } else if (!hash) {
          setActivePage('home');
        }
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL Hash when activePage state updates to maintain full shareability
  useEffect(() => {
    if (activePage === 'home') {
      const currentHash = window.location.hash;
      if (currentHash && !currentHash.startsWith('#/')) {
        return;
      }
      if (currentHash !== '' && currentHash !== '#') {
        window.history.replaceState(null, '', ' ');
      }
    } else {
      const targetHash = `#/${activePage}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
    }
  }, [activePage]);

  // Play a highly professional, luxurious web-synthesized chime on successful inquiry submission
  const playSuccessChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Tone 1: Golden G4 (warm sine wave, soft entrance)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(392.00, ctx.currentTime);

      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Tone 2: Celestial C5 (representing the pinnacle/success of publishing)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(523.25, ctx.currentTime + 0.08); // Slight elegant delay for arpeggio

      gain2.gain.setValueAtTime(0, ctx.currentTime + 0.08);
      gain2.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      // Start & stop parameters
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.55);

      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.85);
    } catch (e) {
      console.warn('Browser AudioContext play block:', e);
    }
  };

  // Add inquiry handler - strictly delivers to email via backend SMTP integration
  const handleAddNewInquiry = (data: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
    services?: string[];
    estimatedPrice?: number;
    message?: string;
    expressCallback?: boolean;
  }) => {
    const finalServices = data.services || (selectedServiceId ? [selectedServiceId] : ['publishing']);
    
    // Simple price estimator loop
    let calculatedEst = data.estimatedPrice;
    if (!calculatedEst) {
      calculatedEst = finalServices.length * 1500;
      if (data.wordCount > 60000) calculatedEst += 900;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      genre: data.genre,
      wordCount: data.wordCount,
      services: finalServices,
      status: 'New',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      estimatedPrice: calculatedEst,
      message: data.message,
      expressCallback: data.expressCallback,
      expressService: data.expressCallback // Adds the 'Express Service' flag requested
    };

    setIsSubmitting(true);

    fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry),
    })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message || 'SMTP transmission failed');
        }
        return resData;
      })
      .then((resData) => {
        setIsSubmitting(false);
        // Play success audio chime feedback
        playSuccessChime();
        showSuccessToast(
          resData.message || "Your inquiry has been successfully sent directly to our business email!",
          "Inquiry Delivered"
        );
        setModalSubmitted(true);
        setTimeout(() => {
          setModalSubmitted(false);
          setConsultationModalOpen(false);
          setModalName('');
          setModalEmail('');
          setModalPhone('');
          setModalMessage('');
          setModalExpressCallback(false);
        }, 4000);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error('❌ [Inquiry Delivery Failure]:', err);
        showWarningToast(
          err.message || "Email delivery failed. Please verify your connection or SMTP settings.",
          "Delivery Failed"
        );
      });
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalEmail || !modalPhone) return;

    handleAddNewInquiry({
      name: modalName,
      email: modalEmail,
      phone: modalPhone,
      genre: modalGenre,
      wordCount: modalWordCount,
      message: modalMessage,
      expressCallback: modalExpressCallback,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f19] text-gray-100">
      
      {/* Dynamic SEO Tag Injector */}
      <SEO activePage={activePage} />

      {/* Navigation Header */}
      <Header
        logoConfig={logoConfig}
        onNavigate={setActivePage}
        activePage={activePage}
        onOpenConsultation={() => {
          setSelectedServiceId(undefined);
          setConsultationModalOpen(true);
        }}
      />

      {/* Main Client Replica Site */}
      <main className="flex-grow bg-white text-gray-800">
        
        {activePage === 'home' && (
          <>
            {/* Hero Section with Quick Book estimate and checklist */}
            <Hero
              onSubmitInquiry={(data) => {
                handleAddNewInquiry({
                  name: data.name,
                  email: data.email,
                  phone: data.phone,
                  genre: data.genre,
                  wordCount: data.wordCount,
                  message: data.message
                });
              }}
              onOpenScorecard={() => {
                const element = document.getElementById('seo-scorecard');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* Times Square video trailer highlight panel */}
            <TimesSquareSection
              onOpenConsultation={() => {
                setSelectedServiceId(undefined);
                setConsultationModalOpen(true);
              }}
            />

            {/* Detailed services overview tab card stack */}
            <ServiceHub
              onOpenConsultation={(serviceId) => {
                setSelectedServiceId(serviceId);
                setConsultationModalOpen(true);
              }}
            />

            {/* Perkins vs Traditional comparative diagram block */}
            <CompareSection
              onOpenConsultation={() => {
                setSelectedServiceId(undefined);
                setConsultationModalOpen(true);
              }}
            />

            {/* Portfolio bestseller books showcase */}
            <BookSlider
              onOpenConsultation={() => {
                setSelectedServiceId(undefined);
                setConsultationModalOpen(true);
              }}
            />

            {/* Success Stories Testimonials & FAQ Accordions */}
            <Testimonials
              onOpenConsultation={() => {
                setSelectedServiceId(undefined);
                setConsultationModalOpen(true);
              }}
            />

            {/* Author Insights Section with Curated SEO Content by Zhana Xuere */}
            <AuthorInsights
              onOpenConsultation={() => {
                setSelectedServiceId(undefined);
                setConsultationModalOpen(true);
              }}
            />

            {/* Interactive Bestseller Scorecard & Amazon SEO Keyword Matcher */}
            <LeadAuditScorecard
              onOpenInquiry={(subject) => {
                setSelectedServiceId(undefined);
                setModalMessage(`Submitting my automated Bestseller Scorecard results to Stephanie Weldon.\nStatus: ${subject}\nI would love to arrange a personalized publishing session.`);
                setConsultationModalOpen(true);
              }}
            />
          </>
        )}

        {activePage.startsWith('service-') && (
          <DynamicServicePage
            serviceId={activePage.replace('service-', '')}
            onOpenConsultation={() => {
              setSelectedServiceId(activePage);
              setConsultationModalOpen(true);
            }}
            onNavigate={setActivePage}
          />
        )}

        {activePage.startsWith('industry-') && (
          <DynamicIndustryPage
            industryId={activePage.replace('industry-', '')}
            onOpenConsultation={() => {
              setSelectedServiceId(activePage);
              setConsultationModalOpen(true);
            }}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'knowledge-hub' && (
          <KnowledgeHub
            onNavigate={setActivePage}
            onOpenConsultation={() => {
              setSelectedServiceId(undefined);
              setConsultationModalOpen(true);
            }}
          />
        )}

        {activePage === 'privacy' && (
          <div className="py-20 bg-slate-50 min-h-[60vh]">
            <div className="max-w-3xl mx-auto px-6 bg-white p-10 rounded-3xl border border-gray-200/85 shadow-sm space-y-6">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest font-mono">Perkins Publisher Compliance</span>
              <h1 className="text-3xl font-black text-blue-950 font-serif border-b border-gray-100 pb-4">Privacy Policy</h1>
              <p className="text-xs text-gray-400 font-bold">Last Modified: July 11, 2026</p>
              
              <div className="space-y-4 text-xs text-gray-650 leading-relaxed font-semibold">
                <p>
                  Perkins Publisher is committed to protecting your intellectual property, manuscripts, and personal details. This Privacy Policy outlines our strict protocols regarding lead transmission, form interactions, and copyright protection.
                </p>
                
                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">1. Information Transmission & Security</h3>
                <p>
                  All inquiries, names, emails, and story summaries submitted through our Bestseller Blueprint forms are encrypted using industry-standard TLS protocols. These variables are securely routed to our senior editors (led by Stephanie Weldon) and are never sold, rented, or distributed to outside marketing services.
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">2. 100% Non-Disclosure of Manuscript Concepts</h3>
                <p>
                  We treat every manuscript concept, outline, and raw draft with absolute confidentiality. Authors retain full ownership. Under no circumstances do we utilize submitted story components, outlines, or summaries for any purpose other than providing publishing evaluations.
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">3. Cookies & Analytics</h3>
                <p>
                  Our system utilizes temporary browser states solely to manage custom user configurations (such as custom logo parameters, interactive book estimate calculations, and scorecard states). We do not perform intrusive cross-site behavioral tracking.
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">4. Author Rights & Opt-Out</h3>
                <p>
                  You can opt-out or request the absolute deletion of your lead parameters from our CRM servers at any time by contacting our Brooklyn, New York headquarters at <a href="mailto:info@perkinspublisher.com" className="text-blue-600 hover:underline">info@perkinspublisher.com</a>.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-blue-950 text-white hover:bg-amber-500 hover:text-blue-950 transition-colors px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'terms' && (
          <div className="py-20 bg-slate-50 min-h-[60vh]">
            <div className="max-w-3xl mx-auto px-6 bg-white p-10 rounded-3xl border border-gray-200/85 shadow-sm space-y-6">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest font-mono">Author Protections & Royalties</span>
              <h1 className="text-3xl font-black text-blue-950 font-serif border-b border-gray-100 pb-4">Terms of Service</h1>
              <p className="text-xs text-gray-400 font-bold">Last Modified: July 11, 2026</p>
              
              <div className="space-y-4 text-xs text-gray-650 leading-relaxed font-semibold">
                <p>
                  Welcome to Perkins Publisher. By utilizing our interactive tools, book calculators, or submitting manuscripts, you agree to comply with our general service parameters.
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">1. Retain 100% of Royalties & Rights</h3>
                <p>
                  Perkins Publisher functions under a service-for-hire, flat-rate structure. Authors keep 100% of their royalties, retail payouts, and intellectual property. We do not claim royalties or future sales cuts from any platforms (such as Amazon KDP, Apple Books, or IngramSpark).
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">2. Transparent Pricing & Custom Estimates</h3>
                <p>
                  Our self-publishing cost calculator provides real-time flat-rate cost approximations for editing, custom formatting, and cover graphics. Official legal binding proposals are issued following a direct strategy session with our senior coordinators.
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">3. Delivery & Revisions</h3>
                <p>
                  Standard timelines vary by selected publishing track: Developmental formatting and design takes 2-3 weeks; ghostwriting takes 12-16 weeks. We guarantee clear revision rounds on layout assets and formatting specs.
                </p>

                <h3 className="text-sm font-black text-blue-950 uppercase pt-2">4. Governing Jurisdiction</h3>
                <p>
                  These terms are regulated by the state laws of New York. Any discussions or disputes will be governed inside Kings County, NY (Brooklyn Headquarters).
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-blue-950 text-white hover:bg-amber-500 hover:text-blue-950 transition-colors px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'search-console' && (
          <SearchConsoleHub />
        )}

      </main>

      {/* Brand Site Footer */}
      <Footer
        logoConfig={logoConfig}
        onNavigate={setActivePage}
      />

      {/* Free Quotation Proposal Modal Structure */}
      {consultationModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-3xl text-gray-900 border border-amber-500/10 text-left">
            
            {/* Modal Ribbon Header */}
            <div className="px-6 py-4.5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500 text-blue-950 p-1 rounded font-black">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase">{t.title}</h3>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <div className="flex bg-slate-900/80 p-0.5 rounded-full border border-white/10 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setModalLang('en')}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      modalLang === 'en'
                        ? 'bg-amber-500 text-blue-950 font-black'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLang('es')}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      modalLang === 'es'
                        ? 'bg-amber-500 text-blue-950 font-black'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ES
                  </button>
                </div>

                <button
                  onClick={() => setConsultationModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal main content wrap */}
            <div className="p-6 sm:p-8">
              {modalSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200 text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-black text-blue-950">{t.successTitle}</h4>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-sm mx-auto">
                    {t.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  
                  {selectedServiceId && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-center justify-between text-xs font-bold text-amber-800">
                      <span>🎯 {t.targetedInquiry.replace('{id}', selectedServiceId.toUpperCase())}</span>
                      <span className="text-[9px] bg-amber-500 text-blue-950 py-0.5 px-2 rounded uppercase font-black">{t.activeStatus}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.authorNameLabel}</label>
                    <input
                      type="text"
                      required
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      placeholder={t.authorNamePlaceholder}
                      className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.emailLabel}</label>
                      <input
                        type="email"
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.phoneLabel}</label>
                      <input
                        type="tel"
                        required
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.genreLabel}</label>
                      <select
                        value={modalGenre}
                        onChange={(e) => setModalGenre(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="fiction">{t.genres.fiction}</option>
                        <option value="nonfiction">{t.genres.nonfiction}</option>
                        <option value="scifi">{t.genres.scifi}</option>
                        <option value="selfhelp">{t.genres.selfhelp}</option>
                        <option value="memoir">{t.genres.memoir}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex justify-between">
                        <span>{t.wordCountLabel}</span>
                        <span className="text-amber-600 font-extrabold">{modalWordCount.toLocaleString()}</span>
                      </label>
                      <div className="pt-2">
                        <input
                          type="range"
                          min={5000}
                          max={120000}
                          step={5000}
                          value={modalWordCount}
                          onChange={(e) => setModalWordCount(parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.describeLabel}</label>
                    <textarea
                      value={modalMessage}
                      onChange={(e) => setModalMessage(e.target.value)}
                      placeholder={t.describePlaceholder}
                      className="w-full h-18 bg-gray-50 border border-gray-250 rounded-lg p-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
                    ></textarea>
                  </div>

                  {/* Immediate Callback & Express Service Flag */}
                  <div 
                    className={`border rounded-xl p-3.5 transition-all flex items-start gap-3 cursor-pointer select-none ${
                      modalExpressCallback 
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-sm' 
                        : 'bg-slate-50 border-gray-200/85 hover:bg-amber-500/5 hover:border-amber-500/20'
                    }`}
                    onClick={() => setModalExpressCallback(!modalExpressCallback)}
                  >
                    <div className="flex items-center h-5">
                      <input
                        id="express-callback"
                        type="checkbox"
                        checked={modalExpressCallback}
                        onChange={(e) => setModalExpressCallback(e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div className="text-left">
                      <label 
                        htmlFor="express-callback" 
                        className="block text-xs font-black text-blue-950 uppercase cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t.expressLabel}
                      </label>
                      <p className="text-[10px] text-gray-500 font-bold leading-relaxed mt-0.5">
                        {t.expressDesc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-55 disabled:cursor-not-allowed text-blue-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-lg text-center cursor-pointer transition-all active:translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <span>{t.submitBtn}</span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}


    </div>
  );
}
