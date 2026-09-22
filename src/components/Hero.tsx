import { useState, FormEvent } from 'react';
import { CheckCircle2, Sparkles, Gift, BookOpen, ExternalLink, ShieldCheck, MapPin, Send, Flame, ArrowRight, Clock, Star, Zap } from 'lucide-react';

interface HeroProps {
  onSubmitInquiry: (data: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
    services?: string[];
    estimatedPrice?: number;
    expressCallback?: boolean;
    message?: string;
  }) => void;
  onOpenScorecard: () => void;
}

export default function Hero({ onSubmitInquiry, onOpenScorecard }: HeroProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [wordCount, setWordCount] = useState<number>(45000);
  const [applyPromoOffer, setApplyPromoOffer] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    
    onSubmitInquiry({
      name,
      email,
      phone,
      genre,
      wordCount,
      services: applyPromoOffer ? ['promo-publishing-499'] : ['publishing'],
      estimatedPrice: applyPromoOffer ? 499 : undefined,
      expressCallback: true,
      message: applyPromoOffer 
        ? `[€499 COMPLETE PUBLISHING PACKAGE CLAIM FROM HERO]: Author claimed the 74% OFF Complete Publishing Package (€499 flat rate for custom cover, line editing, 3 versions: eBook/paperback/hardcover, and 100+ platform distribution).`
        : 'Quick Consultation request from Hero section.',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
    }, 5000);
  };

  const trustSymbols = [
    { text: "Amazon KDP", color: "hover:text-amber-500", icon: "📖" },
    { text: "Barnes & Noble", color: "hover:text-blue-500", icon: "📌" },
    { text: "Apple Books", color: "hover:text-pink-500", icon: "🍎" },
    { text: "Ingram Content", color: "hover:text-cyan-500", icon: "📦" },
    { text: "Kobo Books", color: "hover:text-purple-500", icon: "📱" },
    { text: "Google Play", color: "hover:text-emerald-500", icon: "⭐" },
  ];

  const highlights = [
    "Seamless Guided Self-Publishing Packages & Traditional Pipelines",
    "Keep 100% Royalties & Full Intellectual Ownership",
    "Global Distribution on 40,000+ Electronic & Retail Stores",
    "Expert Editorial Team from Top Bestselling Publishers",
    "Stunning Custom 3D Cover Layouts & Interior Formatting",
  ];

  return (
    <section id="home" className="relative bg-gradient-to-b from-blue-50/50 via-white to-white pt-8 pb-20 overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute right-0 top-0 -mr-40 -mt-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 -ml-40 -mb-40 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Compelling Copy & Attention-Grabbing Offer Spotlight */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 animate-fadeIn">
              <div className="inline-flex items-center gap-2 bg-blue-900/10 border border-blue-900/20 text-blue-950 px-3 py-1 rounded-full text-xs font-bold leading-none">
                <Sparkles size={13} className="text-amber-500 fill-amber-500" />
                <span>THE GOLD STANDARD IN BOOK PUBLISHING</span>
              </div>
              <a 
                href="https://maps.google.com/?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-950 px-3 py-1 rounded-full text-[11px] font-black leading-none transition-colors cursor-pointer"
                title="View Perkins Publisher on Google Maps"
              >
                <MapPin size={12} className="text-red-500 shrink-0" />
                <span>Għajnsielem, Gozo, GSM 1010, Malta</span>
                <span className="text-amber-600">•</span>
                <span className="text-blue-900 underline font-black flex items-center gap-0.5">
                  View on Maps
                  <ExternalLink size={10} />
                </span>
              </a>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-950 leading-none tracking-tight">
              Make Your Book A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-amber-600">Best Seller</span> With Our Expert Book Publishing Services
            </h1>

            {/* UNMISSABLE ATTENTION-GRABBING €499 HERO OFFER SPOTLIGHT BANNER */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-500 bg-gradient-to-br from-amber-500/15 via-amber-400/20 to-orange-500/15 p-5 sm:p-6 shadow-2xl shadow-amber-500/20 ring-4 ring-amber-500/20 animate-fadeIn">
              {/* Subtle pulsing background glow */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/30 rounded-full blur-2xl pointer-events-none animate-pulse" />
              
              {/* Top Banner Tags */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md animate-pulse">
                  <Flame size={14} className="fill-white" />
                  <span>FLASH OFFER • 74% DISCOUNT</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-amber-950 bg-white/90 border border-amber-300 px-3 py-1 rounded-full shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span>Only 4 of 15 Subsidized Slots Left</span>
                </div>
              </div>

              {/* Price & Primary Value Proposition */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/40 pb-4 mb-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-blue-950 tracking-tight">€499</span>
                    <span className="text-xl text-gray-400 font-bold line-through">€1,899</span>
                    <span className="bg-amber-500 text-blue-950 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                      SAVE €1,400
                    </span>
                  </div>
                  <p className="text-sm font-black text-blue-950 mt-1 flex items-center gap-1.5">
                    <Zap size={14} className="text-amber-600 fill-amber-600" />
                    <span>Complete 3-Format Publishing Package — Zero Hidden Fees</span>
                  </p>
                </div>

                {/* Direct Action Button that points straight to the Hero Form */}
                <button
                  type="button"
                  onClick={() => {
                    setApplyPromoOffer(true);
                    const nameInput = document.getElementById('hero-author-name');
                    if (nameInput) {
                      nameInput.focus();
                      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 hover:from-amber-500 hover:to-amber-600 text-white hover:text-blue-950 px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap active:scale-95 border border-amber-400/40"
                >
                  <span>Claim €499 Deal Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Comprehensive Deliverables Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-extrabold text-blue-950">
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-2 rounded-lg border border-amber-200/80 shadow-2xs">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Custom 3D Cover Design</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-2 rounded-lg border border-amber-200/80 shadow-2xs">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Professional Line Editing</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-2 rounded-lg border border-amber-200/80 shadow-2xs">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>eBook + Paper + Hardcover</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-2 rounded-lg border border-amber-200/80 shadow-2xs">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>100+ Global Retail Stores</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-2 rounded-lg border border-amber-200/80 shadow-2xs">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>100% Royalties Retained</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-2 rounded-lg border border-amber-200/80 shadow-2xs">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Official EU ISBN & Barcode</span>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
              We provide professional manuscript polishing, award-winning illustration artwork, custom formats, and global distribution. 
              <span className="font-extrabold text-blue-950 ml-1">From our Malta / EU office in Għajnsielem, Malta, Perkins Publisher offers full-scale self-publishing solutions where you keep 100% of your royalties and rights.</span> We guide you every step of the way.
            </p>

            {/* Checklist of Benefits */}
            <div className="space-y-2.5 pt-1">
              {highlights.map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={17} />
                  <span className="text-sm font-bold text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            {/* Authentic Credentials & Direct Google Maps Verification */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
              <div className="flex -space-x-2">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Author" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Author" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Author" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Author" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5 text-blue-950 font-bold text-sm">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>100% Author Royalties & Rights Retained</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-700 text-xs font-semibold">
                    <ShieldCheck size={14} className="text-blue-700" />
                    <span>EU ISBN & Legal Deposit</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-semibold">
                  <span>Registered in Malta (EU)</span>
                  <span>•</span>
                  <a 
                    href="https://maps.google.com/?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1 underline transition-colors cursor-pointer"
                    title="View Perkins Publisher on Google Maps"
                  >
                    <span>View Location on Google Maps</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Lead submission form transformed into the €499 Claim Engine */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-500/80 ring-4 ring-amber-500/10 relative overflow-hidden">
              
              {/* Header Banner on the Form Card */}
              <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 text-white px-5 py-3 flex items-center justify-between border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <Flame size={15} className="text-amber-400 fill-amber-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    €499 Package Reservation
                  </span>
                </div>
                <span className="text-[10px] font-black bg-amber-500 text-blue-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  74% OFF
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-extrabold text-blue-950 mb-1 flex items-center gap-2">
                  <BookOpen size={18} className="text-amber-500" />
                  <span>Claim Your €499 Package</span>
                </h3>
                <p className="text-xs text-gray-500 font-bold mb-5">
                  Receive your instant publishing proposal & lock in the subsidized €499 rate.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-scaleUp">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200">
                      <CheckCircle2 size={36} className="text-green-500" />
                    </div>
                    <h4 className="text-lg font-extrabold text-green-700">Inquiry & Promotion Claimed!</h4>
                    <p className="text-xs text-gray-600 font-bold leading-relaxed max-w-xs mx-auto">
                      Your €499 publishing package reservation has been logged. Our senior publishing team will review your manuscript summary and contact you within 15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                        Author Name *
                      </label>
                      <input
                        id="hero-author-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sandra Vance"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sandra@example.com"
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 0199"
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                          Book Genre
                        </label>
                        <select
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="fiction">Fiction / Novel</option>
                          <option value="nonfiction">Non-Fiction</option>
                          <option value="scifi">Sci-Fi / Fantasy</option>
                          <option value="selfhelp">Self-Help / Business</option>
                          <option value="memoir">Memoir / Biography</option>
                          <option value="children">Children's Book</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                          Word Count ({wordCount.toLocaleString()})
                        </label>
                        <div className="pt-2">
                          <input
                            type="range"
                            min={5000}
                            max={120000}
                            step={5000}
                            value={wordCount}
                            onChange={(e) => setWordCount(parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special €499 Package Promotion Checkbox Card */}
                    <div 
                      onClick={() => setApplyPromoOffer(!applyPromoOffer)}
                      className={`border-2 rounded-xl p-3.5 transition-all cursor-pointer select-none flex items-start gap-3 ${
                        applyPromoOffer
                          ? 'bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border-amber-500 shadow-sm'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100/70'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={applyPromoOffer}
                        onChange={(e) => setApplyPromoOffer(e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 accent-amber-500 cursor-pointer shrink-0"
                      />
                      <div className="text-left">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-blue-950 uppercase">
                            Lock In €499 Complete Package
                          </span>
                          <span className="text-[9px] bg-amber-500 text-blue-950 px-1.5 py-0.2 rounded font-black uppercase">
                            74% OFF
                          </span>
                        </div>
                        <p className="text-[10.5px] text-gray-600 font-bold leading-tight mt-0.5">
                          Includes custom cover, line editing, 3 versions (eBook, paperback, hardcover) + 100+ platform distribution.
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-black transition-all shadow-xl active:translate-y-0.5 mt-2 cursor-pointer flex items-center justify-center gap-2 ${
                        applyPromoOffer
                          ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-blue-950 border border-amber-300 shadow-amber-500/25'
                          : 'bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-amber-500 hover:to-amber-600 hover:text-blue-950 text-white'
                      }`}
                    >
                      <Flame size={15} className="fill-current text-blue-950" />
                      <span>{applyPromoOffer ? 'Claim €499 Package & Get Proposal' : 'Get My Editorial Proposal'}</span>
                      <ArrowRight size={14} />
                    </button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={onOpenScorecard}
                        className="text-[11px] font-bold text-amber-600 hover:text-amber-700 underline transition-colors"
                      >
                        Or, Check Manuscript Publishing Readiness
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Brand partners scroll strip */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <p className="text-center text-xs text-gray-400 font-extrabold tracking-widest uppercase mb-6">
            Global Books Distributed & Indexed On Major Retailing Channels
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {trustSymbols.map((sym, index) => (
              <div
                key={index}
                className={`bg-white hover:bg-gray-50 border border-gray-100 p-3.5 rounded-xl shadow-sm text-center font-bold text-xs text-blue-950 transition-all duration-300 flex items-center justify-center gap-1.5 ${sym.color} hover:shadow-md cursor-pointer`}
              >
                <span className="text-base">{sym.icon}</span>
                <span>{sym.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
