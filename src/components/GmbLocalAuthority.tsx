import { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Navigation, 
  Globe, 
  Sparkles,
  Award,
  Building2,
  Copy,
  Check,
  FileCheck,
  BookCheck,
  Compass
} from 'lucide-react';

interface GmbLocalAuthorityProps {
  onOpenConsultation: () => void;
}

export default function GmbLocalAuthority({ onOpenConsultation }: GmbLocalAuthorityProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedFullNap, setCopiedFullNap] = useState(false);

  const googleMapsUrl = 'https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta';

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText('Perkins Publisher, Għajnsielem, Gozo, GSM 1010, Malta');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const copyFullNapToClipboard = () => {
    const fullNap = `Business Name: Perkins Publisher\nAddress: Għajnsielem, Gozo, GSM 1010, Malta\nInternational Calling Line: +1 (803) 346-3495\nLocal Malta Desk: +356 9944 4044\nEmail: info@perkinspublisher.com\nWebsite: https://www.perkinspublisher.com/\nGoogle Maps: https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta`;
    navigator.clipboard.writeText(fullNap);
    setCopiedFullNap(true);
    setTimeout(() => setCopiedFullNap(false), 2500);
  };

  return (
    <section id="gmb-verified-profile" className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 border-t border-b border-slate-200 text-slate-800 relative overflow-hidden">
      
      {/* Background Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-300 text-xs font-black tracking-wider uppercase">
            <Building2 size={13} className="text-amber-400" />
            <span>European Publishing Headquarters & Local Authority Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            European Headquarters & Local Authority
          </h2>
          <p className="text-sm text-slate-600 font-semibold leading-relaxed">
            Verified local presence in <strong className="text-slate-900">Għajnsielem, Gozo, GSM 1010, Malta</strong> serving authors, entrepreneurs, and executives across the European Union, the UK, and international markets.
          </p>
        </div>

        {/* Google Recommendation Transparency Banner */}
        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Compass size={18} />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-black uppercase text-blue-950 tracking-wide">
                Google Search & Business Profile Transparency Standard
              </p>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Rather than relying on unverified star widgets, we provide <strong>direct Google Maps links</strong> so visitors can inspect authentic author reviews, office photos, and GPS directions directly on Google's platform, with <strong>verifiable European business credentials</strong>.
              </p>
            </div>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
          >
            <span>Inspect on Google Maps</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Main GMB & Local SEO Dashboard Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid lg:grid-cols-12">
          
          {/* Left Column: Local Profile Card (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 flex flex-col justify-between">
            
            {/* Business Identity Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Official Emblem Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-950 text-amber-400 border border-blue-900 shadow-sm flex items-center justify-center p-2.5 shrink-0">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                      Perkins Publisher
                    </h3>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <MapPin size={13} className="text-amber-600" />
                      <span>Book Publisher • Għajnsielem, Gozo, GSM 1010, Malta</span>
                    </p>
                  </div>
                </div>

                {/* Verified Location Pill */}
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-black">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>Registered in Malta (EU)</span>
                </div>
              </div>

              {/* Author Protection & Publishing Credentials */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>100% Author Royalties & Rights</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>EU ISBN & Legal Deposit</span>
                </span>
                <span className="text-xs text-slate-500 font-semibold">• 500+ Books Published</span>
              </div>
            </div>

            {/* Exact Business & Office Information Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Official Business Information & Registration
                </h4>
                <button
                  onClick={copyFullNapToClipboard}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                  title="Copy official contact and registry information"
                >
                  {copiedFullNap ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedFullNap ? '✓ Contact Info Copied!' : 'Copy Contact Details'}</span>
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                
                {/* Physical Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-150">
                  <MapPin className="text-red-500 shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <p className="text-slate-900 font-black">Official Physical Address</p>
                    <p className="text-slate-600 leading-snug">
                      Perkins Publisher<br />
                      Għajnsielem, Gozo, GSM 1010<br />
                      <span className="text-blue-900 font-bold">Malta (European Union)</span>
                    </p>
                    <button 
                      onClick={copyAddressToClipboard}
                      className="text-[11px] text-blue-600 hover:text-blue-800 font-black cursor-pointer pt-1 inline-flex items-center gap-1"
                    >
                      {copiedAddress ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                      <span>{copiedAddress ? 'Copied to clipboard!' : 'Copy Exact Address'}</span>
                    </button>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-150">
                  <Clock className="text-amber-500 shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <p className="text-slate-900 font-black">Business Hours (CET)</p>
                    <p className="text-slate-600 leading-snug">
                      Mon – Fri: 08:00 – 19:00<br />
                      Saturday: 09:00 – 14:00<br />
                      <span className="text-emerald-700 font-bold">Open for Consultations</span>
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-150">
                  <Globe className="text-blue-600 shrink-0 mt-0.5" size={18} />
                  <div className="space-y-2 w-full">
                    <p className="text-slate-900 font-black">Official Contact Lines</p>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-150">
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] font-black uppercase tracking-wider text-blue-700">International Calling Line</span>
                        <span className="text-[9px] bg-blue-50 text-blue-800 font-extrabold px-1.5 py-0.5 rounded border border-blue-200">Global Desk</span>
                      </div>
                      <a href="tel:18033463495" className="text-slate-900 hover:text-blue-700 font-black block text-sm font-mono tracking-tight mt-0.5">
                        +1 (803) 346-3495
                      </a>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-150">
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-500">Local Editorial Desk</span>
                        <span className="text-[9px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-200">Malta / EU</span>
                      </div>
                      <a href="tel:+35699444044" className="text-slate-800 hover:text-blue-700 font-bold block text-sm font-mono tracking-tight mt-0.5">
                        +356 9944 4044
                      </a>
                    </div>
                    <p className="text-[10px] text-slate-400">Direct global author support & European editorial inquiries</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-150">
                  <Mail className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <p className="text-slate-900 font-black">Editorial Direct Email</p>
                    <a href="mailto:info@perkinspublisher.com" className="text-blue-700 hover:underline font-bold block">
                      info@perkinspublisher.com
                    </a>
                    <p className="text-[10px] text-slate-400">Inquiries answered within 2 hrs</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Interactive Local Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-600">
                Explore Perkins Publisher on Google Maps:
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  title="Open Google Maps to view verified reviews and photos"
                >
                  <Globe size={14} className="text-amber-400" />
                  <span>View Verified Reviews & Photos on Google Maps</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>

                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-950 border border-slate-300 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                  title="Get driving and transit directions on Google Maps"
                >
                  <Navigation size={14} className="text-blue-700" />
                  <span>Get Directions</span>
                  <ExternalLink size={12} className="opacity-70" />
                </a>

                <button
                  onClick={onOpenConsultation}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-blue-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ml-auto"
                >
                  <Sparkles size={14} />
                  <span>Book Strategy Call</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Styled Map & Local GEO Entity Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            
            {/* Top Geo Coordinates Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                <span className="flex items-center gap-1.5 font-bold">
                  <Globe size={14} />
                  <span>36.0261° N, 14.2853° E</span>
                </span>
                <span className="text-slate-400 text-[10px] font-bold">Għajnsielem • Gozo • Malta</span>
              </div>

              <h4 className="text-xl font-black text-white tracking-tight">
                European Hybrid Publishing Hub
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Positioned strategically within the European Union, Perkins Publisher bridges European thought leaders with global print-on-demand facilities in Germany, the UK, France, and Poland.
              </p>
            </div>

            {/* Visual Simulated Map Card */}
            <div className="my-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 p-4 relative overflow-hidden group shadow-inner">
              {/* Map background styling */}
              <div className="h-36 rounded-xl bg-slate-950/90 border border-slate-700 relative overflow-hidden flex items-center justify-center">
                
                {/* Geographic Contour Lines Mockup */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual Location Pin with Ripple */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-12 h-12 rounded-full bg-amber-500/20 animate-ping" />
                  <span className="absolute w-7 h-7 rounded-full bg-red-500/40" />
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg relative z-10 border-2 border-white">
                    <MapPin size={18} className="fill-white text-red-600" />
                  </div>
                </div>

                {/* Floating Coordinates Tag */}
                <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-slate-300">
                  📍 Għajnsielem, Gozo, GSM 1010, Malta
                </div>

                {/* Direct Google Maps link overlay */}
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2.5 right-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                  title="Open live Google Maps listing"
                >
                  <span>Open Official Maps Listing</span>
                  <ExternalLink size={10} />
                </a>
              </div>

              {/* Service Areas */}
              <div className="mt-3 space-y-1.5">
                <p className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                  Primary European & Global Service Areas:
                </p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-300">
                  <span className="bg-white/10 px-2 py-0.5 rounded">Malta & Gozo</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">United Kingdom</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">Germany</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">France</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">Italy</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">Spain</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">Switzerland</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">Nordics</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded">United States</span>
                </div>
              </div>
            </div>

            {/* Bottom Direct Google Maps Invitation */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Award size={13} className="text-amber-400" />
                <span>100% Author Royalties & EU IP Law</span>
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read Verified Google Reviews ↗</span>
              </a>
            </div>

          </div>

        </div>

        {/* Verifiable Business Credentials & Legal Guarantees (Replacing Arbitrary Star Scores) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  Verifiable Business Credentials & Author Protections
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                Legally backed guarantees and formal registrations compliant with Google Business Profile & EU Consumer Protection standards
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shrink-0">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Verified European Entity</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs text-slate-700">
            
            {/* Credential 1: Copyright */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <FileCheck size={18} />
              </div>
              <h4 className="font-black text-slate-950 text-sm">100% Copyright Retention</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Contractually binding guarantee under the <strong>EU Copyright Directive 2019/790</strong>. Authors retain 100% of worldwide print, digital, translation, and adaptation rights.
              </p>
            </div>

            {/* Credential 2: ISBN & Legal Deposit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <BookCheck size={18} />
              </div>
              <h4 className="font-black text-slate-950 text-sm">Official ISBN & Legal Deposit</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Every title is assigned an official 13-digit International Standard Book Number (ISO 2108) with statutory legal deposit in National Libraries across Europe.
              </p>
            </div>

            {/* Credential 3: Registered EU Entity */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Building2 size={18} />
              </div>
              <h4 className="font-black text-slate-950 text-sm">Registered in Malta (EU)</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Formally registered publishing house entity headquartered in <strong>Għajnsielem, Gozo, GSM 1010, Malta</strong>, adhering strictly to EU consumer rights and GDPR regulations.
              </p>
            </div>

            {/* Credential 4: Global Distribution */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
                <Globe size={18} />
              </div>
              <h4 className="font-black text-slate-950 text-sm">40,000+ Retailer Ingestion</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Certified catalog distribution through Ingram Content Group, Amazon KDP Europe & US, Barnes & Noble, Waterstones, and major global university repositories.
              </p>
            </div>

          </div>
        </div>

        {/* Publishing Standards & Distinctions */}
        <div id="publishing-standards" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-150 pb-4">
            <Sparkles className="text-amber-500 shrink-0" size={20} />
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                Publishing Standards & Distinctions
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Core principles defining our European hybrid publishing model, copyright retention, and global retail distribution
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs text-slate-700 leading-relaxed font-medium">
            
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-150">
              <h4 className="font-black text-slate-900 uppercase text-[11px] text-blue-950 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Entity Identification</span>
              </h4>
              <p>
                <strong>Perkins Publisher</strong> is a European hybrid book publishing house headquartered in <strong>Għajnsielem, Gozo, GSM 1010, Malta</strong>. It provides professional ghostwriting, developmental editing, book typesetting, and global distribution for authors and corporate executives.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-150">
              <h4 className="font-black text-slate-900 uppercase text-[11px] text-blue-950 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>100% Royalty & EU Copyright</span>
              </h4>
              <p>
                Unlike traditional publishers who retain 85% to 92% of author sales, Perkins Publisher charges a transparent flat fee. Authors retain <strong>100% of all ongoing book royalties</strong> (EUR €, GBP £, USD $) and 100% of copyrights under the <strong>EU Copyright Directive 2019/790</strong>.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-150">
              <h4 className="font-black text-slate-900 uppercase text-[11px] text-blue-950 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Global Retail Footprint</span>
              </h4>
              <p>
                All books are cataloged with official 13-digit European ISBNs and distributed across <strong>40,000+ bookstores</strong>, including Amazon KDP Europe, IngramSpark EU, Waterstones, Thalia, Fnac, Barnes & Noble, and academic research libraries.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
