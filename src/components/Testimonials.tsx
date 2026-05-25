import { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data';
import { Star, ShieldCheck, CheckCircle2, Award, ChevronDown, ChevronUp, Quote, Phone } from 'lucide-react';

interface TestimonialsProps {
  onOpenConsultation: () => void;
}

export default function Testimonials({ onOpenConsultation }: TestimonialsProps) {
  const [activeFaq, setActiveFaq] = useState<string | null>('faq1');

  return (
    <section id="reviews" className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1.5 rounded-full inline-block">
            STORY OF SUCCESS & REPUTATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Verified Author Success Reviews
          </h2>
          <p className="text-sm text-gray-500 font-bold">
            Read authentic reviews describing how Perkins Publisher helped amateur and veteran authors realize their dreams of holding physical books and scaling distribution channels.
          </p>
        </div>

        {/* Rating Trust Badge Blocks Row */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-center space-y-2">
            <div className="flex justify-center text-emerald-500 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-emerald-500 text-emerald-500" />)}
            </div>
            <h4 className="text-lg font-black text-blue-950">Trustpilot Excellent</h4>
            <p className="text-xs text-gray-500 font-bold">4.9 out of 5 based on 320+ verified reviews</p>
          </div>

          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-center space-y-2">
            <div className="text-blue-905 flex justify-center text-blue-900 font-black text-2xl tracking-tighter">
              A+ Rating
            </div>
            <h4 className="text-lg font-black text-blue-950">Better Business Bureau</h4>
            <p className="text-xs text-gray-500 font-bold font-serif">100% accredited resolution rate since 2018</p>
          </div>

          <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 text-center space-y-2">
            <div className="flex justify-center text-amber-500">
              <Award size={26} />
            </div>
            <h4 className="text-lg font-black text-blue-950">100% Royalties Guarantee</h4>
            <p className="text-xs text-gray-500 font-bold">We never take cuts from author retail channels</p>
          </div>
        </div>

        {/* Testimonials cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {TESTIMONIALS.map((test) => (
            <div 
              key={test.id} 
              className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-150/80 shadow-sm relative flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="absolute right-6 top-6 text-blue-900/10 pointer-events-none group-hover:scale-110 transition-transform">
                <Quote size={60} />
              </div>

              <div className="space-y-4">
                {/* Stars and status */}
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[9px] bg-green-100 text-green-800 font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck size={11} />
                    <span>VERIFIED AUTHOR PURCHASE</span>
                  </span>
                </div>

                <p className="text-gray-700 text-xs font-semibold leading-relaxed">
                  &quot; {test.comment} &quot;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-gray-200/85 pt-6 mt-6">
                <img 
                  className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm" 
                  src={test.avatar} 
                  alt={test.name} 
                />
                <div>
                  <h4 className="text-xs font-black text-blue-950">{test.name}</h4>
                  <p className="text-[10px] text-gray-400 font-extrabold uppercase">{test.role}</p>
                  <p className="text-[9px] text-amber-600 font-extrabold italic">Author of "{test.bookTitle}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion FAQs section */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-gray-150 space-y-8">
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
              <a
                href="tel:18033463495"
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-black uppercase py-4 px-8 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
              >
                <Phone size={14} className="text-amber-500" />
                <span>+1 (803) 346-3495</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
