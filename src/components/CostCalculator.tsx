import { useState, useEffect, FormEvent } from 'react';
import { SERVICES } from '../data';
import { 
  Calculator, CheckCircle2, Sliders, ShoppingBag, ArrowRight, Sparkles, Phone, FileText, Download, Play, RefreshCw 
} from 'lucide-react';

interface CostCalculatorProps {
  onSubmitInquiry: (inquiry: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
    services: string[];
    estimatedPrice: number;
  }) => void;
}

export default function CostCalculator({ onSubmitInquiry }: CostCalculatorProps) {
  const [genre, setGenre] = useState<string>('fiction');
  const [wordCount, setWordCount] = useState<number>(45000);
  const [selectedServices, setSelectedServices] = useState<string[]>(['publishing']);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  
  // Lead info
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [calculationSubmitted, setCalculationSubmitted] = useState<boolean>(false);
  const [proposalNo, setProposalNo] = useState<string>('');

  // Base pricing calculators
  const calculateEstimate = () => {
    let price = 0;
    
    selectedServices.forEach(srvId => {
      const matchSrv = SERVICES.find(s => s.id === srvId);
      if (matchSrv) {
        let baseCost = matchSrv.startingPrice;
        
        // Scale editorial/ghostwriting/illustrations with wordcount
        if (srvId === 'ghostwriting') {
          // $0.08 per word scaling
          baseCost = wordCount * 0.08;
        } else if (srvId === 'editing') {
          // $0.015 per word scaling
          baseCost = wordCount * 0.015;
        } else if (srvId === 'publishing' || srvId === 'cover-design') {
          // Simple flat base
          baseCost = matchSrv.startingPrice;
        } else if (srvId === 'illustration') {
          // Scaled slightly based on content pages
          baseCost = Math.max(matchSrv.startingPrice, (wordCount / 1000) * 18);
        }
        
        price += baseCost;
      }
    });

    // Apply bundle discount if selecting 3 or more services
    if (selectedServices.length >= 3) {
      price = price * 0.85; // 15% discount
    }

    return Math.round(price);
  };

  const currentPrice = calculateEstimate();

  useEffect(() => {
    setDiscountApplied(selectedServices.length >= 3);
  }, [selectedServices]);

  const handleServiceToggle = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    // Issue mock proposal number
    const num = `PPQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setProposalNo(num);

    onSubmitInquiry({
      name,
      email,
      phone,
      genre,
      wordCount,
      services: selectedServices,
      estimatedPrice: currentPrice
    });

    setCalculationSubmitted(true);
  };

  const resetCalculator = () => {
    setCalculationSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setSelectedServices(['publishing']);
    setWordCount(45000);
  };

  return (
    <section id="calculator" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full inline-block">
            LIVE INVESTMENT ESTIMATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Book Production Cost Calculator
          </h2>
          <p className="text-sm text-gray-500 font-bold">
            Choose your genre, estimate your word count, bundle specific services, and get an instantaneous, highly accurate production quote blueprint. Transparent pricing, always.
          </p>
        </div>

        {calculationSubmitted ? (
          // Dynamic Invoice/Proposal Success Summary View
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-500/15 animate-scaleUp">
            
            <div className="border-b-4 border-dashed border-gray-100 pb-8 relative">
              <div className="absolute top-0 right-0 text-right space-y-1">
                <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase px-2 py-0.5 rounded">PROPOSAL LOCKED</span>
                <p className="text-xs font-bold text-gray-400">Document No: {proposalNo}</p>
                <p className="text-[10px] font-bold text-gray-400">Date: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-blue-950 leading-none">PERKINS PUBLISHING CO.</h3>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black block">Official Pricing Blueprint Proposal</span>
              </div>
            </div>

            <div className="py-8 space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="font-extrabold text-gray-400 uppercase tracking-wider mb-2">AUTHOR BILLING PARTNER</h4>
                  <div className="font-black text-blue-950 space-y-1">
                    <p>{name}</p>
                    <p className="text-gray-600 font-semibold">{email}</p>
                    <p className="text-gray-600 font-semibold">{phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-400 uppercase tracking-wider mb-2">MANUSCRIPT SPECIFICATIONS</h4>
                  <div className="font-black text-blue-950 space-y-1">
                    <p className="capitalize">Genre: {genre} Book Project</p>
                    <p>Estimated Word Count: {wordCount.toLocaleString()} words</p>
                    <p className="text-amber-600 font-extrabold">{selectedServices.length} Selected Service Modules</p>
                  </div>
                </div>
              </div>

              {/* Service list row items breakdown */}
              <div className="border-y border-gray-200 py-6 space-y-4">
                <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">ESTIMATED COMPONENT ANALYSIS</h4>
                <div className="divide-y divide-gray-100">
                  {selectedServices.map(sid => {
                    const matchSrv = SERVICES.find(s => s.id === sid);
                    if (!matchSrv) return null;
                    return (
                      <div key={sid} className="flex justify-between py-2 text-xs font-bold text-gray-750">
                        <span>{matchSrv.title}</span>
                        <span>
                          {sid === 'ghostwriting' ? `~$${(wordCount * 0.08).toLocaleString()}` :
                           sid === 'editing' ? `~$${(wordCount * 0.015).toLocaleString()}` :
                           `$${matchSrv.startingPrice.toLocaleString()}`}
                        </span>
                      </div>
                    );
                  })}
                  {discountApplied && (
                    <div className="flex justify-between py-2.5 text-xs font-black text-green-600 border-t border-gray-200">
                      <span>15% Bundle Discount applied</span>
                      <span>-15%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-950/5 p-6 rounded-2xl border border-blue-900/10 flex justify-between items-center bg-gray-50/50">
                <div>
                  <span className="text-[10px] font-black text-blue-950 uppercase block tracking-wider">TOTAL ESTIMATED PROTOCOL VALUE</span>
                  <p className="text-[11px] text-gray-500 font-semibold max-w-sm">No ongoing cuts or royalties—all figures represent direct flat rates.</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-blue-950 block">${currentPrice.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-gray-400 block tracking-widest uppercase">Subject to manuscript audit</span>
                </div>
              </div>

            </div>

            {/* Action Buttons to reset */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  alert("Opening device printer wizard to download proposal " + proposalNo);
                }}
                className="flex-1 bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Download size={13} />
                <span>Save Proposal (PDF)</span>
              </button>
              <button
                onClick={resetCalculator}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer border border-gray-250 transition-colors"
              >
                <RefreshCw size={12} />
                <span>Run New Calculation</span>
              </button>
            </div>

          </div>
        ) : (
          // Main Interactive Selection Form Column Structure
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Box: Controls input */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-150 shadow-md space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-black text-blue-950 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                  <Sliders className="text-amber-500" size={18} />
                  <span>1. Configure Manuscript Properties</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Choose Genre Template
                    </label>
                    <select
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    >
                      <option value="fiction">Fiction (Fantasy, Thriller, Novel)</option>
                      <option value="nonfiction">Non-Fiction (Self-Help, Manual, Tech)</option>
                      <option value="scifi">Sci-Fi / Space Opera / High Fantasy</option>
                      <option value="selfhelp">Business / Entrepreneurship</option>
                      <option value="memoir">Memoir / Family History biography</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex justify-between">
                      <span>Word Count Blueprint</span>
                      <span className="text-amber-600 font-extrabold">({wordCount.toLocaleString()} words)</span>
                    </label>
                    <div className="space-y-1">
                      <input
                        type="range"
                        min={5000}
                        max={120000}
                        step={5000}
                        value={wordCount}
                        onChange={(e) => setWordCount(parseInt(e.target.value))}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                      <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                        <span>Short (5k)</span>
                        <span>Novel (50k)</span>
                        <span>Novel (120k)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service selection checkboxes */}
              <div className="space-y-3">
                <h3 className="text-lg font-black text-blue-950 flex items-center gap-1.5 border-b border-gray-100 pb-3">
                  <ShoppingBag className="text-amber-500" size={18} />
                  <span>2. Assemble Service Modules</span>
                </h3>
                <p className="text-[11px] text-gray-400 font-bold mb-4 -mt-2">
                  Select key components to build your tailored publishing roadmap. <strong>Choose 3 or more modules for an instant 15% discount!</strong>
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {SERVICES.map(srv => {
                    const isChecked = selectedServices.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        onClick={() => handleServiceToggle(srv.id)}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-start select-none ${
                          isChecked
                            ? 'bg-blue-50/50 border-blue-900 shadow-md'
                            : 'bg-white hover:bg-gray-100 border-gray-150'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <label className="text-xs font-black text-blue-950 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="accent-blue-900 border-gray-300 rounded"
                            />
                            <span>{srv.title.split(' ')[0]} {srv.title.split(' ')[1] || ''}</span>
                          </label>
                          <p className="text-[9px] text-gray-400 font-bold line-clamp-2 leading-relaxed">
                            {srv.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-black text-blue-950 bg-gray-200/50 px-1.5 py-0.5 rounded leading-none shrink-0 border border-gray-300/10">
                          {srv.id === 'ghostwriting' ? '$0.08w' :
                           srv.id === 'editing' ? '$0.01w' :
                           `$${srv.startingPrice}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Box: Dynamic Price calculator breakdown & lock proposal form */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Cost Highlight summary card */}
              <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-[#0e223c] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-slate-850">
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 hover:translate-x-1 transition-transform">
                  <Calculator size={300} className="stroke-white" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div>
                    <span className="text-[9px] uppercase font-black bg-amber-500 text-black px-2 py-0.5 rounded tracking-widest leading-none">
                      ESTIMATED INVESTMENT STRATEGY
                    </span>
                    <h3 className="text-4xl font-black mt-3 flex items-baseline gap-1">
                      <span>${currentPrice.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-bold uppercase block tracking-wider">USD</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-1">Flat service pricing. Keep 100% rights.</p>
                  </div>

                  {discountApplied && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex justify-between items-center text-xs font-bold text-amber-400">
                      <span>🔥 15% Bundle Discount Activated!</span>
                      <span>Save Big</span>
                    </div>
                  )}

                  {/* Summary of choices */}
                  <div className="border-t border-white/10 pt-4 space-y-3.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-400 pb-1 border-b border-transparent">Target Manuscript:</span>
                      <span className="font-black text-white capitalize">{wordCount.toLocaleString()} words ({genre})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-400">Assembled Modules:</span>
                      <span className="font-black text-white">{selectedServices.length} Selected</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Card input info to issue proposal */}
              <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-md">
                <h4 className="text-xs font-black text-blue-950 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">
                  3. LOCK PROTOCOL PROPOSAL
                </h4>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandra Mitchell"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="sandra@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                        Phone Contact
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (212) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs font-extrabold tracking-wider uppercase py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Pricing Proposal Contract</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
