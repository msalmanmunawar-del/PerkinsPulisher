import { useState, useEffect, FormEvent } from 'react';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Clock, ArrowRight, 
  Flame, Award, Globe, BookOpen, Layers, Check, Send, Loader2
} from 'lucide-react';

interface PromotionalOfferProps {
  onOpenConsultation: (customMessage?: string, estimatedPrice?: number) => void;
  onSubmitInquiry: (data: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
    services?: string[];
    estimatedPrice?: number;
    message?: string;
  }) => void;
}

export default function PromotionalOffer({ onOpenConsultation, onSubmitInquiry }: PromotionalOfferProps) {
  // Scarcity countdown timer (simulating urgent cycle deadline)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [bookTitle, setBookTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    onSubmitInquiry({
      name,
      email,
      phone,
      genre,
      wordCount: 45000,
      services: ['promo-publishing-499'],
      estimatedPrice: 499,
      message: `[€499 PROMOTIONAL OFFER CLAIM] Book Title: "${bookTitle || 'Untitled'}". Genre: ${genre}. Client wants the complete €499 publishing package (Cover, Editing, 3 Formats: eBook, Paperback, Hardcover + 100+ Platforms).`,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setEmail('');
        setPhone('');
        setBookTitle('');
      }, 5000);
    }, 1200);
  };

  const deliverables = [
    {
      title: "Custom Book Cover Design",
      desc: "Bespoke front, spine & back cover art custom designed for your genre, formatted for all print & digital specifications."
    },
    {
      title: "Professional Line Editing & Proofreading",
      desc: "Full manuscript polish by senior literary editors to ensure spotless grammar, natural phrasing, pacing, and tone."
    },
    {
      title: "Formatting in All 3 Formats",
      desc: "Complete interior layout & typesetting for: 1) Universal eBook (EPUB/Kindle), 2) Paperback, and 3) Premium Hardcover."
    },
    {
      title: "Publishing on 100+ Major Platforms",
      desc: "Worldwide distribution on Amazon KDP, Barnes & Noble, Apple Books, IngramSpark, Google Play, Kobo, Waterstones, and 40,000+ retailers."
    },
    {
      title: "100% Royalties & Copyright Ownership",
      desc: "You retain all intellectual property and keep 100% of all book sales earnings. Zero publisher commission cut."
    },
    {
      title: "Official ISBN & Commercial Barcode",
      desc: "Official international ISBN registration and compliant barcodes generated for all editions with zero extra fee."
    }
  ];

  const platforms = [
    "Amazon Kindle", "Barnes & Noble", "Apple Books", "IngramSpark", 
    "Kobo", "Google Play", "Waterstones", "Gardners", "Bertrams", "40,000+ Libraries"
  ];

  return (
    <section id="special-offer" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#060d1d] via-[#09152e] to-[#060d1d] text-white overflow-hidden border-y border-amber-500/20">
      
      {/* Background glow effects */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 right-10 w-[400px] h-[300px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Urgency Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black text-amber-300 tracking-wider uppercase shadow-lg shadow-amber-500/5">
            <Flame size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
            <span>EXCLUSIVE AUTHOR PROMOTION • 74% DISCOUNT APPLIED</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Complete All-Inclusive Publishing Package <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
              Now Only €499
            </span>{' '}
            <span className="text-xl sm:text-2xl text-gray-400 line-through font-normal align-middle ml-2">
              €1,899
            </span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need to turn your manuscript into a bestselling book. Cover design, professional editing, typesetting in all three formats (eBook, Paperback, Hardcover), and global publishing across 100+ platforms.
          </p>

          {/* Scarcity & Countdown Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Grant Availability: <strong className="text-amber-300">Only 4 of 15 Slots Remaining</strong></span>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
              <Clock size={13} className="text-amber-400" />
              <span>Offer Closes In:</span>
              <span className="bg-amber-500 text-blue-950 px-1.5 py-0.5 rounded font-black">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Offer Package Details & High-Conversion Booking Form */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: What's Included (Complete Stuff) */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">COMPLETE PACKAGE BREAKDOWN</span>
                  <h3 className="text-2xl font-black text-white mt-1">What You Get for €499</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Total Value: <span className="line-through">€1,899</span></div>
                  <div className="text-2xl font-black text-amber-400">€499 <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full ml-1">SAVE 74%</span></div>
                </div>
              </div>

              {/* 3 Formats Highlight Pill */}
              <div className="bg-gradient-to-r from-blue-900/40 via-amber-900/20 to-blue-900/40 border border-amber-500/30 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-blue-950 flex items-center justify-center font-black">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-white tracking-wide">All 3 Formats Fully Produced</h4>
                    <p className="text-[11px] text-gray-300 font-medium">Digital eBook + Print Paperback + Premium Hardcover Case-Wrap</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                  Included Free
                </span>
              </div>

              {/* Deliverables List */}
              <div className="grid sm:grid-cols-2 gap-4">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-amber-500/30 transition-all rounded-xl p-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <h5 className="text-xs font-black text-white">{item.title}</h5>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed pl-7">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms Bar */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400 font-bold">
                <span className="flex items-center gap-1.5 text-white">
                  <Globe size={14} className="text-amber-400" />
                  <span>Guaranteed Live Distribution Across 100+ Major Platforms:</span>
                </span>
                <span className="text-amber-400 font-black">100% Royalties Yours</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p, i) => (
                  <span key={i} className="text-[10px] bg-white/5 border border-white/10 hover:border-amber-500/30 px-2.5 py-1 rounded-md text-gray-300 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: High-Conversion Instant Claim Form */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111e38] to-[#0c162b] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            
            {/* Top Badge */}
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-yellow-400 text-blue-950 font-black text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg">
              LIMITED GRANT: €499
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">LOCK IN YOUR PROMOTION</span>
                <h3 className="text-2xl font-black text-white mt-1">Claim the €499 Offer</h3>
                <p className="text-xs text-gray-300 font-medium mt-1 leading-relaxed">
                  Fill in your author details below to reserve one of the 4 remaining €499 package slots. Our senior publishing team will contact you within 2 hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-12 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 animate-scaleUp">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-lg font-black text-white">Promotional Slot Reserved!</h4>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
                    Your €499 All-Inclusive Publishing Package has been logged. Senior Editor Stephanie Weldon and the team will reach out directly to your email and phone today.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                      Author Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Arthur Conan Doyle"
                      className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 font-bold focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="author@example.com"
                        className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 font-bold focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 or +356 or +1"
                        className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 font-bold focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Book Genre
                      </label>
                      <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full bg-slate-900 border border-white/15 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold focus:outline-none transition-all"
                      >
                        <option value="fiction">Fiction & Novel</option>
                        <option value="nonfiction">Non-Fiction / Business</option>
                        <option value="scifi">Sci-Fi & Fantasy</option>
                        <option value="selfhelp">Self-Help & Motivation</option>
                        <option value="memoir">Memoir & Biography</option>
                        <option value="children">Children's Book</option>
                        <option value="poetry">Poetry & Anthologies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Book Title (Working)
                      </label>
                      <input
                        type="text"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="e.g., The Silent Horizon"
                        className="w-full bg-white/5 border border-white/15 focus:border-amber-400 focus:bg-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 font-bold focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 text-[11px] text-amber-200 font-medium space-y-1">
                    <div className="flex justify-between items-center font-black text-xs text-amber-300">
                      <span>Promotional Flat Rate:</span>
                      <span className="text-base font-black">€499.00</span>
                    </div>
                    <p className="text-[10px] text-gray-300">
                      Includes custom cover, line editing, 3 versions (eBook, paperback, hardcover), 100+ platforms & 100% royalties.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-blue-950 font-black text-xs uppercase tracking-wider py-4 rounded-xl shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Securing Your €499 Slot...</span>
                      </>
                    ) : (
                      <>
                        <span>Claim €499 Complete Package Now</span>
                        <ArrowRight size={16} strokeWidth={3} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Trust Badges footer */}
            <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-amber-400" />
                100% Royalty Ownership
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award size={12} className="text-amber-400" />
                EU & UK Registered ISBN
              </span>
              <span>•</span>
              <span>Zero Royalty Cut</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
