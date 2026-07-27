import { useState, FormEvent } from 'react';
import { CheckCircle2, Star, Sparkles, Send, Gift, BookOpen } from 'lucide-react';

interface HeroProps {
  onSubmitInquiry: (data: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
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
      message: 'Quick Consultation request from Hero section.',
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
    }, 4000);
  };

  const trustSymbols = [
    { text: "Amazon Kindle", color: "hover:text-amber-500", icon: "📖" },
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
    <section id="home" className="relative bg-gradient-to-b from-blue-50/50 via-white to-white pt-12 pb-20 overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute right-0 top-0 -mr-40 -mt-40 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute left-0 bottom-0 -ml-40 -mb-40 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Compelling Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-2 animate-fadeIn">
              <div className="inline-flex items-center gap-2 bg-blue-900/10 border border-blue-900/20 text-blue-950 px-3.5 py-1.5 rounded-full text-xs font-bold leading-none">
                <Sparkles size={14} className="text-amber-500 fill-amber-500" />
                <span>THE GOLD STANDARD IN BOOK PUBLISHING</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-900 px-3.5 py-1.5 rounded-full text-[11px] font-black leading-none">
                <span className="text-amber-600 font-extrabold animate-pulse">📍 GĦAJNSIELEM, MALTA HQ</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-950 leading-none tracking-tight">
              Make Your Book A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-amber-600">Best Seller</span> With Our Expert Book Publishing Services
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
              We provide professional manuscript polishing, award-winning illustration artwork, custom formats, and global distribution. 
              <span className="font-extrabold text-blue-950 ml-1">From our editorial headquarters in Għajnsielem, Malta, Perkins Publisher offers full-scale self-publishing solutions where you keep 100% of your royalties and rights.</span> We guide you every step of the way.
            </p>

            {/* Checklist of Benefits */}
            <div className="space-y-3 pt-2">
              {highlights.map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm font-bold text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            {/* Live review indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
              <div className="flex -space-x-2">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Author" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Author" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Author" />
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Author" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-sm font-black text-gray-900 ml-1">4.9/5 Rat.</span>
                </div>
                <p className="text-xs text-gray-500 font-bold">Trusted by 500+ Published Authors Worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Side: Lead submission form & book stack mockup */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-900 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-wider flex items-center gap-1 shadow">
                <Gift size={11} className="text-amber-400" />
                <span>Free Guide Included</span>
              </div>

              <h3 className="text-xl font-extrabold text-blue-950 mb-1 flex items-center gap-2">
                <BookOpen size={18} className="text-amber-500" />
                <span>Submit Your Manuscript</span>
              </h3>
              <p className="text-xs text-gray-500 font-bold mb-6">
                Receive a custom publishing blueprint & book estimate directly.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200">
                    <CheckCircle2 size={36} className="text-green-500" />
                  </div>
                  <h4 className="text-lg font-extrabold text-green-700">Inquiry Received!</h4>
                  <p className="text-xs text-gray-600 font-bold leading-relaxed max-w-xs mx-auto">
                    A Perkins senior publishing coordinator is reviewing your summary. Check your status in the <strong>Publisher CRM console</strong>!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                      Author Name *
                    </label>
                    <input
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
                        Phone Number *
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

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-3 px-4 rounded-lg text-xs uppercase tracking-wider font-extrabold hover:from-amber-500 hover:to-amber-600 hover:text-blue-950 transition-all shadow-md active:translate-y-0.5 mt-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={13} />
                    <span>Get My Editorial Proposal</span>
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={onOpenScorecard}
                      className="text-[11px] font-bold text-amber-600 hover:text-amber-700 underline transition-colors"
                    >
                      Or, Take the Free Bestseller Audit Scorecard
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Brand partners scroll strip */}
        <div className="mt-20 pt-8 border-t border-gray-100">
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
