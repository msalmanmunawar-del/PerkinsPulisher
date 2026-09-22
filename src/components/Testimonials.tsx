import { useState } from 'react';
import { FAQS } from '../data';
import { Award, ShieldCheck, Globe, ChevronDown, ChevronUp, Phone, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';

interface TestimonialsProps {
  onOpenConsultation: () => void;
}

export default function Testimonials({ onOpenConsultation }: TestimonialsProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>('faq1');

  const googleMapsUrl = 'https://maps.google.com/?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta';

  return (
    <section id="faq" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-black text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1.5 rounded-full inline-block">
            PUBLISHING GUARANTEES & FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Industry Standards & Author Guarantees
          </h2>
          <p className="text-sm text-gray-500 font-bold">
            Learn how Perkins Publisher empowers authors to maintain 100% ownership of their rights, royalties, and distribution channels.
          </p>
        </div>

        {/* Direct Google Maps Reviews & Verification Callout */}
        <div className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin size={18} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-blue-950 uppercase tracking-wider">
                  Verified Reviews & Photos on Google Maps
                </p>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Official Profile
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                We believe in genuine, unfiltered author feedback. Visit our official Google Business Profile to view real customer reviews, office photos, and directions in Għajnsielem, Gozo, Malta.
              </p>
            </div>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider shrink-0 transition-colors shadow-sm cursor-pointer"
            title="View Perkins Publisher verified reviews on Google Maps"
          >
            <span>View on Google Maps</span>
            <ExternalLink size={12} className="opacity-80" />
          </a>
        </div>

        {/* Author Guarantees Row */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-center space-y-2">
            <div className="flex justify-center text-amber-500">
              <Award size={26} />
            </div>
            <h4 className="text-lg font-black text-blue-950">100% Royalties Guarantee</h4>
            <p className="text-xs text-gray-500 font-bold">We never take cuts from author retail channels</p>
          </div>

          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-center space-y-2">
            <div className="flex justify-center text-blue-900">
              <ShieldCheck size={26} />
            </div>
            <h4 className="text-lg font-black text-blue-950">100% Author Rights</h4>
            <p className="text-xs text-gray-500 font-bold">Retain total ownership of copyrights & manuscripts</p>
          </div>

          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-center space-y-2">
            <div className="flex justify-center text-blue-600">
              <Globe size={26} />
            </div>
            <h4 className="text-lg font-black text-blue-950">Global Retail Access</h4>
            <p className="text-xs text-gray-500 font-bold">Direct distribution to Amazon KDP, IngramSpark & B&N</p>
          </div>
        </div>

        {/* Accordion FAQs section */}
        <div className="max-w-4xl mx-auto pt-8 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-blue-950 tracking-tight">Frequently Answered Questions</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Demystifying book creation rights and retail processes</p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-gray-50 rounded-2xl border border-gray-150 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center font-bold text-xs sm:text-sm text-blue-950 hover:bg-gray-100/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-gray-650 font-semibold leading-relaxed border-t border-gray-200/30 animate-fadeIn bg-white/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Need more guidance CTA Section block */}
        <div className="mt-20 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-900 text-center max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 space-y-6">
            <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-3 py-1.5 rounded-full border border-amber-500/20 tracking-widest inline-block uppercase animate-bounce">
              HAVE QUESTIONS ABOUT YOUR BOOK SPECIFICS?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white leading-tight">
              Get an Hour of Custom Strategy with a Bestselling Coordinator
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Don't guess on categories, royalties, or ISBN regulations! Join a free private review call where we map out your printing layout, global library entries, and exact pricing structure.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs font-black uppercase py-4 px-8 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center animate-pulse"
              >
                Schedule Free Strategy Session
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:18033463495"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-black uppercase py-4 px-6 rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
                  title="International Calling Line (Global Author Support)"
                >
                  <Globe size={14} className="text-amber-400" />
                  <span>Int'l: +1 (803) 346-3495</span>
                </a>
                <a
                  href="tel:+35699444044"
                  className="text-xs font-semibold text-slate-300 hover:text-white transition-colors py-2 px-3 flex items-center gap-1.5"
                  title="Malta & EU Local Direct Desk"
                >
                  <span className="text-amber-400 font-bold text-[10px]">Malta:</span>
                  <span>+356 9944 4044</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
