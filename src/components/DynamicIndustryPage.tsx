import { useState } from 'react';
import { 
  Users, Award, Shield, Sparkles, CheckCircle, ArrowRight, DollarSign, 
  TrendingUp, Star, HelpCircle, Briefcase, ChevronRight, HelpCircle as HelpIcon,
  CheckSquare
} from 'lucide-react';

interface DynamicIndustryPageProps {
  industryId: string;
  onOpenConsultation: () => void;
  onNavigate: (page: string) => void;
}

export default function DynamicIndustryPage({
  industryId,
  onOpenConsultation,
  onNavigate
}: DynamicIndustryPageProps) {
  
  // Custom configurations for different industries
  const getIndustryData = (id: string) => {
    switch (id) {
      case 'coaches':
        return {
          title: 'Publishing Solutions for Elite Coaches',
          subtitle: 'Turn Your Coaching Frameworks Into a High-Ticket Client Magnet',
          concept: 'How elite coaches utilize a physical book to command $10k+ coaching packages, bypass endless social media posting, and sign pre-sold prospects.',
          challenge: 'Endless content creation, heavy client churn, and price resistance from prospects who view you as just another coach.',
          solution: 'A book acts as your supreme filtering mechanism. Prospects read your methodology, qualify themselves, and book consultation calls fully bought into your philosophy.',
          roiLabel: 'High-Ticket Client Signing Value',
          stat1: '140+ Coaches Published',
          stat2: '4.8x Lead Increase',
          stat3: '$15k average package',
          checks: [
            'Bestseller placement in highly searched Amazon business/coaching subcategories',
            'Lead capture pages & QR codes embedded directly in chapters to harvest email leads',
            'Perfect formatting of your proprietary coaching frameworks, visual models, and worksheets',
            'Full support launching audiobook versions for busy professionals who listen on-the-go'
          ],
          quote: 'Perkins Publisher helped me structure my signature program into a beautiful physical book. Since publishing, I no longer chase leads on LinkedIn. They read my book and schedule application calls already pre-sold on working with me.',
          authorName: 'Elite Leadership Coach'
        };
      case 'consultants':
        return {
          title: 'Publishing Programs for Enterprise Consultants',
          subtitle: 'The Ultimate Strategy to Sign High-Ticket Corporate Retainers',
          concept: 'Position your consulting agency at the absolute pinnacle of corporate strategy. Use a physical book to bypass gatekeepers and place your insights directly on the desks of Fortune 500 decision makers.',
          challenge: 'Cold calling, answering complex RFPs, and competing on price with large consulting conglomerates.',
          solution: 'Mailing a premium hardcover copy of your book directly to target CEOs and managers instantly elevates you past standard sales pitches, establishing you as the definitive authority.',
          roiLabel: 'Corporate Retainer Contract Value',
          stat1: '95+ Consultants Published',
          stat2: '32% RFP Win Rate Increase',
          stat3: '$50k+ Contract Average',
          checks: [
            'Case study styling showing measurable corporate ROI metrics within the narrative text',
            'Luxe hardcover physical formats with custom spine foils to dominate physical desks',
            'Bestseller category positioning targeting corporate operations, management, and VC subgenres',
            'LinkedIn branding programs to leverage your book across corporate decision maker feeds'
          ],
          quote: 'Sending my book instead of a slide deck completely changed our outreach. We booked meetings with 4 key Fortune 500 directors within 3 weeks of mailing copies.',
          authorName: 'Enterprise Strategy Consultant'
        };
      case 'doctors':
        return {
          title: 'Publishing & Authority for Medical Doctors & Dentists',
          subtitle: 'Establish Patient Credibility and Dominate Your Specialty Niche',
          concept: 'Translate complex medical procedures or wellness principles into accessible, trust-building wellness books that position your private practice as the gold standard.',
          challenge: 'Patient skepticism, heavy competition from localized clinics, and generic local advertising.',
          solution: 'Providing a copy of your published book to patients in your waiting room or local medical groups establishes supreme clinical trust, attracting patients who bypass health insurance barriers.',
          roiLabel: 'Private Practice Client Lifetime Value',
          stat1: '60+ Clinicians Published',
          stat2: '74% Private Patient Gain',
          stat3: 'Authority Patient Referrals',
          checks: [
            'Clear, layman-friendly formatting of medical science, diagnostic steps, and care metrics',
            'Rigorous professional proofreading ensuring complete technical accuracy',
            'Patient referrals strategy embedding book cards inside localized clinics',
            'Strategic SEO distribution getting your book reviewed by medical boards and authors'
          ],
          quote: 'Having a book in our wellness clinic lobby has done more for patient acquisition than ten years of local Google Ads ever did. It establishes instant clinical confidence.',
          authorName: 'Chief Medical Director'
        };
      case 'lawyers':
        return {
          title: 'Publishing for Elite Attorneys & Legal Consultants',
          subtitle: 'The Definitve Legal Authority Strategy to Command Premium Retainers',
          concept: 'For attorneys, reputation is your ultimate currency. A premium, physical book is the single most powerful credential to outshine rival firms and secure high-stakes cases.',
          challenge: 'Heavy localized advertising, competing on hourly rates, and standard directory listings.',
          solution: 'Publishing the definitive book on your specific practice area (e.g., Intellectual Property, Corporate trial law, Estate preservation) establishes you as the textbook authority.',
          roiLabel: 'High-Stakes Legal Settlement Retainers',
          stat1: '45+ Legal Partners Published',
          stat2: '3.4x Referrals Gain',
          stat3: 'Verified Practice Authority',
          checks: [
            'Academic-grade indexing and legal citation formatting throughout interior pages',
            'Premium casebound hardcovers built to stand tall on corporate bookshelves',
            'PR distribution across national legal portals, journals, and local associations',
            'Strict adherence to legal board citation and credential styling parameters'
          ],
          quote: 'My book on Corporate IP Law became our primary client lead generator. Corporate directors seek us out because they read our published chapters.',
          authorName: 'Senior Managing Partner'
        };
      case 'entrepreneurs':
      case 'ceos':
        return {
          title: 'Publishing for CEOs, Executives, & Founders',
          subtitle: 'Solidify Your Legacy & Amplify Your Corporate Venture',
          concept: 'A book written by a CEO is not just an autobiography. It is a massive enterprise marketing engine, employee alignment handbook, and venture capital recruitment asset.',
          challenge: 'Recruiting top-tier executive talent, building brand alignment, and raising investment funding.',
          solution: 'Your book tells the story of your company\'s mission, values, and methodology, acting as a powerful beacon for investors, employees, and massive enterprise accounts.',
          roiLabel: 'Venture Capital & Enterprise Account Value',
          stat1: '110+ Founders Published',
          stat2: '45M+ Combined Sales Reach',
          stat3: 'Legacy Brand Foundations',
          checks: [
            'NYT-grade ghostwriting partnerships capturing your strategic operational leadership vision',
            'Comprehensive personal branding layouts linking your book to speaking engagements',
            'Coordinated launch events in major financial capitals (New York, San Francisco, Chicago)',
            'LinkedIn executive posting engines capitalizing on core chapters to drive enterprise engagement'
          ],
          quote: 'Publishing my founder story allowed us to secure our Series B funding ahead of schedule. Investors read my philosophy and felt instant alignment with our goals.',
          authorName: 'Tech Founder & CEO'
        };
      default:
        return {
          title: 'Authority Publishing Programs',
          subtitle: 'Position Yourself as the Definitive Professional Standard',
          concept: 'No matter your specific industry, publishing a premium physical book is the gold standard of personal branding, lead generation, and professional trust.',
          challenge: 'Price shopping, high lead acquisition costs, and being viewed as a commodity service provider.',
          solution: 'A book shifts you from a service seller to a published teacher. Teachers command premium compensation and receive unsolicited inquiries.',
          roiLabel: 'Annual Premium Billing Advantage',
          stat1: '500+ Professionals Published',
          stat2: 'Average 3x Fee command',
          stat3: '100% Rights & Control',
          checks: [
            'Global print-on-demand distribution across 40,000+ bookstores and platforms',
            'Tailored Amazon category configuration for instant category bestseller ranks',
            'Expert ghostwriting or developmental editing to ensure premium professional prose',
            'QR code lead capture page configurations to build your backend B2B email lists'
          ],
          quote: 'Writing a book remains the single most impactful career decision I have ever made. It opened doors to stages, TV networks, and elite clients.',
          authorName: 'Published Professional'
        };
    }
  };

  const data = getIndustryData(industryId);

  // Interactive ROI math variables
  const [ticketPrice, setTicketPrice] = useState(5000);
  const [prospectsCount, setProspectsCount] = useState(12);

  // Math: 1 in 10 prospects converts usually. With a book, trust increases, boosting conversion to 3 in 10.
  const standardConversions = Math.ceil(prospectsCount * 0.10);
  const authorityConversions = Math.ceil(prospectsCount * 0.25);
  const extraClients = authorityConversions - standardConversions;
  const extraRevenue = extraClients * ticketPrice;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      
      {/* Premium Professional Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 py-20 lg:py-24 text-white px-4 border-b border-amber-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#1e293b,transparent_50%)] opacity-30"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-400 uppercase tracking-widest border border-amber-500/20">
              <Sparkles size={12} />
              AUTHORITY INCUBATOR PROGRAMS
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              {data.title}
            </h1>
            <p className="text-lg text-amber-400 font-bold tracking-tight">
              {data.subtitle}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
              {data.concept}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Schedule My Blueprint Call</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate('knowledge-hub')}
                className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl border border-white/10 transition-all cursor-pointer"
              >
                Browse Author Guides
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl space-y-5 shadow-2xl">
            <h3 className="text-md font-black uppercase text-amber-400 border-b border-white/10 pb-3 flex items-center gap-2">
              <TrendingUp size={18} />
              Industry Acceleration Metrics
            </h3>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Published</p>
                <p className="text-sm font-black text-white mt-1">{data.stat1.split(' ')[0]}</p>
                <p className="text-[8px] text-slate-400 font-semibold mt-0.5">{data.stat1.split(' ').slice(1).join(' ')}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Growth</p>
                <p className="text-sm font-black text-white mt-1">{data.stat2.split(' ')[0]}</p>
                <p className="text-[8px] text-slate-400 font-semibold mt-0.5">{data.stat2.split(' ').slice(1).join(' ')}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Metric</p>
                <p className="text-sm font-black text-white mt-1">100%</p>
                <p className="text-[8px] text-slate-400 font-semibold mt-0.5">{data.stat3}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Tailored Sector deliverables</p>
              <ul className="space-y-2">
                {data.checks.slice(0, 3).map((feat, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-bold">
                    <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={14} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Profession Core Challenge & Solution Block */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-5">
            <span className="text-xs font-black uppercase text-red-600 bg-red-100 px-3 py-1 rounded-full tracking-widest">THE PROFESSIONAL TRAP</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Why Standard Advertising Fails</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              {data.challenge}
            </p>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-xs text-red-800 font-semibold leading-relaxed">
              Price-sensitive prospects view your agency, clinic, or coaching program as a commodity, forcing you to cut pricing margins to win deals.
            </div>
          </div>

          <div className="space-y-5">
            <span className="text-xs font-black uppercase text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full tracking-widest">THE BESTSELLER SOLUTION</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Shift From Selling to Teaching</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              {data.solution}
            </p>
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-xs text-emerald-800 font-semibold leading-relaxed">
              When you author a book, you write the textbook on your industry. Clients stop comparing hourly rates and start scheduling consultations pre-sold.
            </div>
          </div>

        </div>
      </section>

      {/* Interactive ROI Authority Calculator */}
      <section className="py-16 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-black uppercase text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full tracking-widest">AUTHORITY ARITHMETIC</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">The Authority ROI Estimator</h2>
            <p className="text-sm text-slate-500 font-semibold max-w-xl mx-auto">
              Calculate the direct financial advantage of converting cold prospects into pre-sold buyers using your published book.
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 space-y-6">
              <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Your Business Metrics</h3>
              
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Your Package/Service Price ($)</label>
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>${ticketPrice.toLocaleString()} USD</span>
                </div>
                <input 
                  type="range" 
                  min={1000} 
                  max={25000} 
                  step={500} 
                  value={ticketPrice} 
                  onChange={(e) => setTicketPrice(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Monthly Leads / Proposals sent</label>
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>{prospectsCount} prospects analyzed</span>
                </div>
                <input 
                  type="range" 
                  min={5} 
                  max={50} 
                  step={1} 
                  value={prospectsCount} 
                  onChange={(e) => setProspectsCount(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="md:col-span-6 bg-slate-800/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">{data.roiLabel} Comparison</h4>
              
              <div className="space-y-3 divide-y divide-slate-800">
                <div className="flex justify-between text-xs font-semibold py-2">
                  <span className="text-slate-400">Standard Close Rate (10% standard trust)</span>
                  <span className="font-extrabold text-white">{standardConversions} client signed</span>
                </div>
                <div className="flex justify-between text-xs font-semibold py-2">
                  <span className="text-slate-400">Book-First Close Rate (25% authority trust)</span>
                  <span className="text-emerald-400 font-extrabold">{authorityConversions} clients signed</span>
                </div>
                <div className="flex justify-between text-xs font-semibold py-2">
                  <span className="text-slate-400">Net Additional Client Signings</span>
                  <span className="text-emerald-400 font-extrabold">+{extraClients} high-ticket deals</span>
                </div>
                <div className="flex justify-between text-sm font-black py-3 text-amber-400 border-t border-slate-800">
                  <span>Estimated Net Monthly Revenue Lift</span>
                  <span className="text-xl">${extraRevenue.toLocaleString()} USD / mo</span>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[10px] text-amber-300 font-bold leading-normal">
                📈 <strong>The Authority Arbitrage:</strong> By pre-heating your leads with your physical book prior to your sales calls, you significantly eliminate objections, justifying premium billing rates.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Checklist Grid Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest">PROGRAM CORE CHECKLIST</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Custom Deliverables For Your Practice</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {data.checks.map((item, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-amber-500 text-blue-950 p-1.5 rounded-lg shrink-0">
                  <CheckSquare size={16} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900 uppercase">Milestone Component 0{index + 1}</h4>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Quote Box */}
          <div className="bg-gradient-to-br from-slate-950 to-indigo-950 text-white p-8 rounded-3xl border border-amber-500/10 shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-6xl font-black text-white/5 font-serif select-none">"</div>
            <p className="text-xs text-slate-300 italic leading-relaxed font-semibold max-w-2xl relative z-10">
              "{data.quote}"
            </p>
            <div className="flex items-center gap-2 border-t border-white/5 pt-4">
              <div className="bg-amber-500 text-blue-950 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">
                {data.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-[11px] font-black text-white uppercase">{data.authorName}</p>
                <p className="text-[9px] text-amber-400 font-bold uppercase">Published Author & Authority</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Footer Panel */}
      <section className="py-16 bg-gradient-to-br from-blue-950 to-indigo-950 text-white px-4 text-center border-t border-amber-500/15">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-amber-400">Construct Your Authority Blueprint</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-bold max-w-lg mx-auto">
            Schedule a complimentary strategic session with our executive directors. We will analyze your frameworks, establish key title options, and map out your backend customer journey.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl cursor-pointer shadow-xl inline-flex items-center gap-2"
            >
              <span>Schedule My Blueprint Call</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
