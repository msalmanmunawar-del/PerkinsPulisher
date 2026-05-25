import { Check, X, Award, Shield, DollarSign, Crown } from 'lucide-react';

interface CompareSectionProps {
  onOpenConsultation: () => void;
}

export default function CompareSection({ onOpenConsultation }: CompareSectionProps) {
  const comparisonData = [
    {
      feature: "Royalty Distribution Percentage",
      perkins: "Author retains 100% of all royalties",
      traditional: "Author receives only 7% to 15% royalty cuts",
      selfPub: "70% (Amazon cuts) but no guided support",
      isHighlight: true,
    },
    {
      feature: "Intellectual Rights Ownership",
      perkins: "100% Author Ownership guaranteed by contract",
      traditional: "Publisher retains copy rights indefinitely",
      selfPub: "100% Author Ownership",
      isHighlight: false,
    },
    {
      feature: "Average Production Speed",
      perkins: "8 to 12 Weeks (Full distribution)",
      traditional: "18 to 24 Months of waiting lists",
      selfPub: "Instant (But unpolished, unedited)",
      isHighlight: false,
    },
    {
      feature: "Production & Design Quality",
      perkins: "Award-Winning expert typesetting & cover wrapper",
      traditional: "Excellent (but absolute loss of creative voice)",
      selfPub: "Generic templates (unless paying expensive individuals)",
      isHighlight: false,
    },
    {
      feature: "Dedicated Press & Promotion Campaign",
      perkins: "Coordinated PPC campaigns, press releases, SEO",
      traditional: "Only provided for elite celebrity authors",
      selfPub: "None (Fully managed by self-author)",
      isHighlight: true,
    },
    {
      feature: "Distribution Infrastructure scope",
      perkins: "40,000+ Retailers (Paperback, eBook, Audio, Hardcover)",
      traditional: "Wide (but hard to get shelf placements)",
      selfPub: "Limited to individual upload dashboard setup",
      isHighlight: false,
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black text-blue-900 uppercase tracking-widest bg-blue-100 px-3 py-1.5 rounded-full inline-block">
            PUBLISHING LANDSCAPE COMPARATIVE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Why Visionary Authors Choose Perkins Publisher
          </h2>
          <p className="text-sm text-gray-500 font-bold">
            Understand how our hybrid premium publishing network breaks traditional barrier gates while delivering pristine, high-end editorial and marketing assets.
          </p>
        </div>

        {/* Large Tablet/Desktop Grid table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-lg">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-blue-950 text-white text-xs uppercase tracking-wider">
                <th className="p-5 font-black">Publishing Dimension</th>
                <th className="p-5 bg-amber-500 text-blue-950 font-black text-center flex-row gap-2">
                  <span className="inline-flex items-center gap-1">
                    <Crown size={12} className="fill-blue-950" />
                    <span>PERKINS PUBLISHER</span>
                  </span>
                </th>
                <th className="p-5 font-bold text-gray-400">Traditional Publishers</th>
                <th className="p-5 font-bold text-gray-400">Standard Self-Publishing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-xs">
              {comparisonData.map((row, index) => (
                <tr 
                  key={index} 
                  className={`transition-colors hover:bg-gray-50/50 ${row.isHighlight ? 'bg-amber-50/40' : ''}`}
                >
                  <td className="p-5 font-extrabold text-blue-950">{row.feature}</td>
                  
                  {/* Our brand columns */}
                  <td className="p-5 bg-amber-50/25 border-x border-amber-500/20 text-center font-black text-blue-950">
                    <div className="flex items-center justify-center gap-2">
                      <Check size={16} className="text-green-600 font-black shrink-0" />
                      <span>{row.perkins}</span>
                    </div>
                  </td>

                  {/* Trad design columns */}
                  <td className="p-5 text-gray-500 font-semibold italic">
                    <div className="flex items-center gap-2">
                      <X size={15} className="text-red-500 shrink-0" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>

                  {/* Standard Self systems */}
                  <td className="p-5 text-gray-500 font-semibold italic">
                    <div className="flex items-center gap-2">
                      <X size={15} className="text-amber-600 shrink-0" />
                      <span>{row.selfPub}</span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Callout features */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          
          <div className="bg-blue-950 text-white rounded-2xl p-6 flex gap-4 items-start shadow">
            <div className="bg-white/10 p-3 rounded-xl text-amber-400">
              <Award size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-wider">Zero Hidden Agent Commissions</h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                We contract with authors for transparent flat fees. You keep every cent from Amazon, Audible, and Barnes & Noble direct checks.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-500/15 flex gap-4 items-start shadow-sm">
            <div className="bg-amber-500/20 p-3 rounded-xl text-amber-700">
              <Shield size={24} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-wider text-blue-950">Copyright Safety Handover</h4>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                As soon as the manuscript completes editing, we register official copyrights with the Library of Congress under your direct name.
              </p>
            </div>
          </div>

        </div>

        {/* Natural High-Conversion CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0d2a4a] via-[#103460] to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-blue-900/30">
          <div className="absolute right-0 top-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-widest inline-block animate-pulse">
                EXCLUSIVE OFFER FOR NEW AUTHORS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Don't Hand Over 85% of Your Hard-Earned Royalties
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold leading-relaxed">
                Take the comparison directly over to our senior consultants. Receive a complimentary legal contract audit & a 100% royalty-protected roadmap tailored to your book's specific genre.
              </p>
            </div>
            <button
              onClick={onOpenConsultation}
              className="shrink-0 w-full lg:w-auto bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs uppercase tracking-wider font-extrabold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Secure 100% Royalties RoadMap</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
