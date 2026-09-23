import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  MessageCircle,
  MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  onSubmitInquiry: (data: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
    services?: string[];
    message?: string;
  }) => void;
  isSubmitting?: boolean;
  onNavigate?: (page: string) => void;
}

export default function ContactPage({
  onSubmitInquiry,
  isSubmitting = false,
  onNavigate
}: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter your message.');
      return;
    }

    onSubmitInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '',
      genre: 'General Inquiry',
      wordCount: 0,
      services: ['contact-page-inquiry'],
      message: message.trim()
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono">
            <li>
              <button 
                onClick={() => onNavigate && onNavigate('home')} 
                className="hover:text-blue-950 transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li className="text-slate-300">/</li>
            <li className="text-amber-600 font-black">Contact</li>
          </ol>
        </nav>

        {/* Header Hero Section */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/5 border border-blue-950/10 text-blue-950 text-[11px] font-black uppercase tracking-wider mb-4">
            <Building2 size={13} className="text-amber-500" />
            <span>Perkins Publisher</span>
          </div>
          
          <h1 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-950 font-serif tracking-tight leading-tight">
            Contact Perkins Publisher
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Have a book project in mind? Tell us about your goals and our team will be happy to discuss how we can help. For immediate intake, authors worldwide can connect directly on WhatsApp or call our international desk at{' '}
            <a href="tel:18033463495" className="font-bold text-blue-950 hover:text-amber-600 underline font-mono">
              +1 (803) 346-3495
            </a>.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-blue-950 font-serif">Send an Inquiry</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Direct submission to our publishing team.
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Author Desk</span>
              </span>
            </div>

            {submitted ? (
              <div className="py-12 px-4 text-center space-y-4 bg-amber-500/5 rounded-2xl border border-amber-500/20">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-black text-blue-950 font-serif">Inquiry Delivered</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Perkins Publisher. Your message has been routed directly to our editorial team. We will review your project details and respond promptly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Instant WhatsApp banner inside form */}
                <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-slate-50 to-amber-50/50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <MessageCircle size={16} className="fill-white" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                        <span>Need immediate answers?</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      </span>
                      <p className="text-[11px] text-slate-600 font-medium truncate">
                        Senior editorial team is online on WhatsApp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="https://wa.me/18033463495?text=Hello%20Perkins%20Publisher%2C%20I%20would%20like%20to%20inquire%20about%20publishing%20my%20book."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <MessageCircle size={14} className="fill-white" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold" role="alert">
                    {errorMsg}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor="contact-full-name" className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="contact-full-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. eleanor@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone Number (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="contact-phone" className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Optional</span>
                  </div>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 (803) 346-3495 or +356 9944 4044"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-mono"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Message <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your book, current manuscript status, target genre, or publishing goals..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-y"
                  ></textarea>
                </div>

                {/* Privacy & Confidentiality Guarantee */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-150 text-[11px] text-slate-500 leading-relaxed font-medium">
                  <ShieldCheck size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Your manuscript and project details are held in strict commercial confidence under Non-Disclosure agreement standards. We never sell or share author information.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-blue-950 font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Business Information, Offices & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Priority: Instant WhatsApp Author Intake */}
            <div className="bg-gradient-to-br from-[#075E54] via-[#0d7367] to-[#128C7E] text-white rounded-3xl p-6 sm:p-7 border border-emerald-600/40 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100 flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Fastest Direct Intake</span>
                </span>
                <span className="text-[10px] font-black bg-[#25D366] text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Prioritized
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-tight flex items-center gap-2.5">
                <MessageCircle size={26} className="fill-[#25D366] text-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </h2>

              <p className="text-xs text-emerald-100 font-medium mt-2 leading-relaxed">
                Connect directly with our editorial coordinators for instant manuscript intake, questions, or to claim our subsidized <strong className="text-white font-bold">€499 package</strong>.
              </p>

              <div className="mt-4 pt-4 border-t border-white/15 space-y-2.5">
                <div className="space-y-2">
                  <a
                    href="https://wa.me/18033463495?text=Hello%20Perkins%20Publisher%2C%20I%20am%20inquiring%20about%20publishing%20my%20book."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    title="Direct WhatsApp with Perkins Publisher (+1 803 346-3495)"
                  >
                    <MessageCircle size={18} className="fill-white" />
                    <span>Open WhatsApp Chat (+1 803 346-3495)</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-200 font-medium px-1">
                  <span>Global Line • Replies in &lt; 5 mins</span>
                  <a
                    href="https://wa.me/35699444044?text=Hello%20Perkins%20Publisher%20Malta%2C%20I%20would%20like%20to%20inquire%20about%20European%20publishing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline text-[10.5px] font-semibold"
                  >
                    Malta Desk WhatsApp &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Office & Telephone Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
              <h2 className="text-lg font-black text-blue-950 font-serif flex items-center gap-2 pb-3 border-b border-slate-100">
                <Globe size={18} className="text-amber-500" />
                <span>Publishing Desks & Direct Lines</span>
              </h2>

              <div className="space-y-4">
                
                {/* Primary International Calling Line (Featured) */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950 via-[#0d223a] to-slate-900 text-white border border-blue-900 shadow-md relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Globe size={13} className="text-amber-400" />
                      <span>International Direct Line</span>
                    </span>
                    <span className="text-[9px] font-black bg-amber-400 text-blue-950 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Primary • All Inquiries
                    </span>
                  </div>
                  <a 
                    href="tel:18033463495" 
                    className="text-xl sm:text-2xl font-black text-white hover:text-amber-300 transition-colors font-mono flex items-center gap-2 mt-1"
                    title="Call Perkins Publisher International Direct Line"
                  >
                    <Phone size={18} className="text-amber-400 shrink-0 animate-pulse" />
                    <span>+1 (803) 346-3495</span>
                  </a>
                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed font-medium">
                    Recommended calling line for all international authors, US & Americas, UK, and European clients. Direct consultation & publishing intake.
                  </p>
                </div>

                {/* Malta / EU Local Desk */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Malta / EU Local Desk
                    </span>
                    <span className="text-[9px] font-black bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                      Malta Desk
                    </span>
                  </div>
                  <a 
                    href="tel:+35699444044" 
                    className="text-base sm:text-lg font-black text-blue-950 hover:text-amber-600 transition-colors font-mono flex items-center gap-2 mt-1"
                  >
                    <Phone size={15} className="text-emerald-600 shrink-0" />
                    <span>+356 9944 4044</span>
                  </a>
                  <p className="text-[10.5px] text-slate-500 mt-1">
                    Għajnsielem, Gozo registered office line (Malta Local Time / CET).
                  </p>
                </div>

                {/* Business Email */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400/50 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                    Business Email
                  </span>
                  <a 
                    href="mailto:info@perkinspublisher.com" 
                    className="text-sm sm:text-base font-black text-blue-950 hover:text-amber-600 transition-colors flex items-center gap-2 mt-1 break-all"
                  >
                    <Mail size={15} className="text-amber-500 shrink-0" />
                    <span>info@perkinspublisher.com</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Business Hours Card (Malta Local Time) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Clock size={18} className="text-amber-500 shrink-0" />
                <div>
                  <h3 className="text-base font-black text-blue-950 font-serif">Business Hours</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Malta Local Time (CET)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900">Monday – Friday</span>
                  <span className="font-mono text-slate-800">08:00 – 19:00</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900">Saturday</span>
                  <span className="font-mono text-slate-800">09:00 – 14:00</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-slate-500">
                  <span>Sunday</span>
                  <span className="text-[11px] font-bold text-emerald-700">Open for Online Inquiries</span>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-red-500 shrink-0" />
                  <div>
                    <h3 className="text-base font-black text-blue-950 font-serif">Malta / EU Office</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Għajnsielem, Gozo, Malta
                    </p>
                  </div>
                </div>
                <span className="text-xl" aria-label="Malta flag">🇲🇹</span>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950 text-white space-y-2.5">
                <div className="flex items-center gap-2">
                  <Building2 size={15} className="text-amber-400" />
                  <span className="font-black text-xs uppercase tracking-wider">Perkins Publisher</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">
                  Għajnsielem, Gozo, Malta
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Registered European publishing company operating under EU intellectual property laws, providing turnkey professional publishing, translation, and worldwide distribution.
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer group"
                title="Open Perkins Publisher in Google Maps"
              >
                <MapPin size={14} className="text-red-500 group-hover:scale-110 transition-transform" />
                <span>View on Google Maps</span>
                <ExternalLink size={12} className="text-slate-400" />
              </a>
            </div>

            {/* Quick Guarantees Badge Stack */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-blue-950 space-y-2">
              <div className="flex items-center gap-2 font-black text-amber-900 uppercase text-[10px] tracking-wider">
                <Sparkles size={13} className="text-amber-600" />
                <span>Author Protection Pledges</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-700 font-semibold">
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-600 font-black">✓</span> 100% Retained Royalties & World Publishing Rights
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-600 font-black">✓</span> Direct Payouts in EUR (€), GBP (£), and USD ($)
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-amber-600 font-black">✓</span> Confidential Blind Non-Disclosure Agreements
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
