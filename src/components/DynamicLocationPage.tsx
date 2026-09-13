import { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Building2, 
  CheckCircle2, 
  Star, 
  ExternalLink, 
  Clock, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Award, 
  DollarSign, 
  TrendingUp, 
  ChevronDown,
  Layers,
  BookOpen
} from 'lucide-react';

interface DynamicLocationPageProps {
  locationId: string;
  onOpenConsultation: () => void;
  onNavigate: (page: string) => void;
}

export default function DynamicLocationPage({
  locationId,
  onOpenConsultation,
  onNavigate
}: DynamicLocationPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const getLocationData = (id: string) => {
    switch (id) {
      case 'uk-london':
        return {
          regionName: 'United Kingdom & London',
          flagEmoji: '🇬🇧',
          cityTitle: 'Book Publishing & Ghostwriting Services London & UK',
          heroSubtitle: 'Bespoke Hybrid Publishing for British Entrepreneurs, Executives & Authors',
          summary: 'Connect with Europe’s premier hybrid publishing house. We empower UK business leaders, keynote speakers, and novelists to publish world-class hardcover, paperback, and audiobook editions while keeping 100% of their royalties and British Library legal deposit protections.',
          currency: 'GBP (£)',
          distributionFocus: 'Waterstones, Amazon UK (KDP), Foyles, Blackwell’s, and IngramSpark UK',
          keyStat1: '100% Royalty Retention in GBP (£)',
          keyStat2: 'British Library Legal Deposit',
          keyStat3: '40,000+ UK & Global Bookstores',
          localFocusPoint: 'London / Edinburgh / Manchester / UK-Wide',
          faqs: [
            {
              q: 'How does distribution to Waterstones and UK bookstores work?',
              a: 'Your book is registered with Nielsen BookData and Ingram Content Group UK. This ensures any Waterstones, Blackwell’s, or independent UK bookstore can order your title directly into their physical inventory catalog.'
            },
            {
              q: 'What about the British Library legal deposit requirement?',
              a: 'We handle all legal deposit compliance on your behalf, depositing official copies with the British Library in London and five agency libraries (Oxford, Cambridge, National Library of Scotland, National Library of Wales, and Trinity College Dublin).'
            },
            {
              q: 'How are royalties paid out in the UK?',
              a: 'All royalties from Amazon.co.uk, Apple Books UK, and Ingram are paid out directly to your UK bank account in British Pounds (£) via direct BACS / automated clearing with zero agency cuts.'
            }
          ]
        };

      case 'germany-berlin':
        return {
          regionName: 'Germany, Austria & Switzerland (DACH)',
          flagEmoji: '🇩🇪 🇦🇹 🇨🇭',
          cityTitle: 'Buchveröffentlichung & Ghostwriting Deutschland & DACH',
          heroSubtitle: 'English & German Executive Publishing with 100% Author Royalties',
          summary: 'Specialized hybrid publishing for CEOs, management consultants, and thought leaders across Frankfurt, Berlin, Munich, Vienna, and Zurich. Publish German or English hardcover editions printed locally in German POD facilities.',
          currency: 'EUR (€) / CHF',
          distributionFocus: 'Thalia, Hugendubel, Amazon.de, Orell Füssli, and European Book Distribution',
          keyStat1: '100% Tantiemen (Royalties) in EUR',
          keyStat2: 'Deutsche Nationalbibliothek VLB',
          keyStat3: 'Lokaler Buchdruck in Deutschland',
          localFocusPoint: 'Berlin / Frankfurt / München / Zürich / Wien',
          faqs: [
            {
              q: 'Kann ich mein Buch sowohl auf Deutsch als auch auf Englisch veröffentlichen?',
              a: 'Ja. Perkins Publisher bietet zweisprachiges Lektorat und Übersetzung an. Sie können Ihr Buch simultan im deutschsprachigen Raum (D-A-CH) und international auf Englisch publizieren.'
            },
            {
              q: 'Wie funktioniert die Listung bei Thalia und im Verzeichnis Lieferbarer Bücher (VLB)?',
              a: 'Ihr Buch erhält eine offizielle 13-stellige europäische ISBN und wird über IngramSpark Europe und die führenden Barsortimente gelistet, sodass jede deutsche Buchhandlung es sofort bestellen kann.'
            },
            {
              q: 'Werden Tantiemen direkt in Euro überwiesen?',
              a: 'Ja, 100% Ihrer Bucherlöse von Amazon.de und europäischen Händlern werden ohne Abzüge direkt per SEPA-Überweisung auf Ihr deutsches, österreichisches oder Schweizer Bankkonto überwiesen.'
            }
          ]
        };

      case 'switzerland-zurich':
        return {
          regionName: 'Switzerland (Zurich & Geneva)',
          flagEmoji: '🇨🇭',
          cityTitle: 'Executive Book Publishing Zurich & Geneva | Switzerland',
          heroSubtitle: 'Prestige Publishing for Swiss Wealth Managers, Tech Founders & Consultants',
          summary: 'In Switzerland’s high-trust financial and technology hubs, an authoritative hardcover book commands unprecedented credibility. We engineer bespoke memoirs and corporate handbooks with linen covers, foil stamping, and multi-currency global reach.',
          currency: 'CHF / EUR / USD',
          distributionFocus: 'Orell Füssli, Payot, Amazon France & Germany, and Global Private Client Distribution',
          keyStat1: '100% Retained Royalties (CHF / EUR)',
          keyStat2: 'Swiss National Library Cataloging',
          keyStat3: 'Foil-Stamped Linen Hardcovers',
          localFocusPoint: 'Zurich / Geneva / Basel / Zug',
          faqs: [
            {
              q: 'How do Swiss consultants and wealth managers utilize their published books?',
              a: 'A bespoke foil-stamped hardcover is the ultimate executive calling card. Mailing a copy directly to Swiss family offices or corporate decision-makers delivers a 4x higher meeting rate than digital outreach.'
            },
            {
              q: 'Can invoices be issued with VAT compliance for Swiss and EU corporate expenses?',
              a: 'Yes, Perkins Publisher provides fully compliant commercial invoicing suitable for business tax deductions.'
            },
            {
              q: 'Can audiobooks be recorded with European or Swiss-accented voice talent?',
              a: 'Yes, we cast professional multilingual voice talent compliant with Audible and ACX specifications in English, German, and French.'
            }
          ]
        };

      case 'australia':
        return {
          regionName: 'Australia (Sydney, Melbourne & Brisbane)',
          flagEmoji: '🇦🇺',
          cityTitle: 'Book Publishing & Ghostwriting Services Australia',
          heroSubtitle: 'Publish for Dymocks, Angus & Robertson & Global POD with 100% Retained Royalties',
          summary: 'Tailored hybrid publishing for Australian founders, mining executives, coaches, and biographers. We connect you with local Australian print-on-demand facilities in Melbourne and Sydney, register Thorpe-Bowker ISBNs, and ensure compliance with the National Library of Australia (NED) legal deposit.',
          currency: 'AUD ($) / USD ($)',
          distributionFocus: 'Dymocks, Angus & Robertson, Booktopia, Amazon Australia (Amazon.com.au), and IngramSpark Australia',
          keyStat1: '100% Royalty Retention in AUD ($)',
          keyStat2: 'National Library of Australia (NED)',
          keyStat3: 'Local Sydney & Melbourne POD Printing',
          localFocusPoint: 'Sydney • Melbourne • Brisbane • Perth • Adelaide',
          faqs: [
            {
              q: 'How does distribution to Dymocks and Australian indie bookstores work?',
              a: 'Through our Ingram Content Group Australian distribution integration, your title is registered on the Australian retail network with title feeds pushing directly into Dymocks, Angus & Robertson, and Booktopia ordering systems.'
            },
            {
              q: 'What about the National Library of Australia legal deposit (NED)?',
              a: 'Australian copyright legislation requires electronic and physical copies of published works to be deposited with the National edeposit (NED) portal and state libraries. We handle this mandatory submission on your behalf.'
            },
            {
              q: 'Are books printed inside Australia to avoid international freight costs?',
              a: 'Yes! Books ordered by Australian readers or your own bulk author orders are printed locally at high-speed POD hubs in Melbourne and Sydney, ensuring 48-hour fulfillment without overseas air freight fees.'
            }
          ]
        };

      case 'new-zealand':
        return {
          regionName: 'New Zealand (Auckland & Wellington)',
          flagEmoji: '🇳🇿',
          cityTitle: 'Book Publishing & Ghostwriting New Zealand | Aotearoa',
          heroSubtitle: 'Bespoke Executive Publishing for Kiwi Entrepreneurs & Authors',
          summary: 'Empowering New Zealand innovators, agri-tech founders, consultants, and novelists to publish world-standard hardcovers and paperbacks. Fully integrated with Whitcoulls, Paper Plus, and the National Library of New Zealand legal deposit.',
          currency: 'NZD ($) / AUD ($) / USD ($)',
          distributionFocus: 'Whitcoulls, Paper Plus, Unity Books, Amazon Australia/NZ, and IngramSpark NZ',
          keyStat1: '100% Royalties Paid in NZD ($)',
          keyStat2: 'National Library of NZ Legal Deposit',
          keyStat3: 'Trans-Tasman Print & Distribution',
          localFocusPoint: 'Auckland • Wellington • Christchurch • Hamilton',
          faqs: [
            {
              q: 'How do Kiwi authors get their books into Whitcoulls and Paper Plus?',
              a: 'We register your 13-digit ISBN with Nielsen BookData NZ and connect your title to wholesale supplier catalogs so any Paper Plus or Whitcoulls store can order copies on demand.'
            },
            {
              q: 'How does legal deposit work with the National Library of New Zealand?',
              a: 'Under the National Library of New Zealand Act 2003, publishers must provide two copies to the Legal Deposit Office in Wellington. We manage this entire archiving workflow for you.'
            },
            {
              q: 'Can New Zealand authors receive direct NZD payouts?',
              a: 'Yes, royalty payouts from global Amazon marketplaces and Ingram are converted directly into New Zealand Dollars (NZD) without arbitrary middleman agency cuts.'
            }
          ]
        };

      case 'ireland':
        return {
          regionName: 'Ireland (Dublin, Cork & Galway)',
          flagEmoji: '🇮🇪',
          cityTitle: 'Book Publishing & Ghostwriting Services Ireland & Dublin',
          heroSubtitle: 'Premier European Publishing for Irish Tech Leaders & Authors',
          summary: 'Headquartered in Malta with deep European Union synergies, Perkins Publisher provides Ireland’s corporate executives, Trinity scholars, and creative novelists with elite ghostwriting, Dubray & Easons bookstore distribution, and Irish legal deposit archival.',
          currency: 'EUR (€) / GBP (£)',
          distributionFocus: 'Easons, Dubray Books, Hodges Figgis, Amazon.co.uk & Amazon Europe, and IngramSpark EU',
          keyStat1: '100% Royalty Retention in EUR (€)',
          keyStat2: 'Trinity College & National Library Deposit',
          keyStat3: 'EU VAT Compliant Invoicing',
          localFocusPoint: 'Dublin • Cork • Galway • Limerick • Ireland-Wide',
          faqs: [
            {
              q: 'How does distribution to Easons and Dubray Books work?',
              a: 'Your title is cataloged with Nielsen BookData Ireland and distributed via Ingram UK/EU, allowing Easons, Dubray, and independent Irish bookshops to stock or special-order your book immediately.'
            },
            {
              q: 'What about Irish legal deposits (Trinity College Dublin & National Library of Ireland)?',
              a: 'Under the Irish Copyright and Related Rights Act 2000, statutory copies must be provided to the National Library of Ireland and academic copyright libraries, including Trinity College Dublin. We coordinate this entire compliance filing.'
            },
            {
              q: 'Why is Perkins Publisher ideal for Irish authors?',
              a: 'As a fellow EU member state headquartered in Malta, our contracts comply 100% with EU Copyright Directive 2019/790, allowing seamless SEPA Euro royalty transfers and zero double-taxation hurdles.'
            }
          ]
        };

      case 'malta':
      default:
        return {
          regionName: 'Malta (Headquarters & Mediterranean Hub)',
          flagEmoji: '🇲🇹',
          cityTitle: 'Perkins Publisher Headquarters | Għajnsielem, Malta',
          heroSubtitle: 'Europe’s Premier Hybrid Publishing Agency in Gozo & Malta',
          summary: 'From our verified European headquarters in Għajnsielem, Malta, Perkins Publisher coordinates manuscript development, executive ghostwriting, and retail distribution across 40,000+ bookstores worldwide for European and international creators.',
          currency: 'EUR (€) / GBP (£) / USD ($)',
          distributionFocus: 'National Library of Malta Legal Deposit, European Print Hubs, Amazon Global, and IngramSpark',
          keyStat1: 'Headquartered in Għajnsielem, Malta',
          keyStat2: 'EU Copyright Directive 2019/790',
          keyStat3: 'SEPA Euro Payments & Invoicing',
          localFocusPoint: 'Għajnsielem • Gozo • Valletta • Sliema • Malta',
          faqs: [
            {
              q: 'Can Maltese authors publish both locally and worldwide?',
              a: 'Yes. Your book is registered with legal deposit at the National Library of Malta and simultaneously distributed worldwide to Amazon, Apple Books, Waterstones, and 40,000+ retailers.'
            },
            {
              q: 'How does visiting your Għajnsielem office work?',
              a: 'We welcome authors and clients for scheduled in-person strategy sessions at our Għajnsielem, Gozo location. You can also connect anytime via our European hotline or direct video consultation.'
            },
            {
              q: 'Why publish from Malta within the European Union?',
              a: 'Malta provides an English-speaking common law legal framework combined with full EU single-market integration and robust intellectual property protection under EU directives.'
            }
          ]
        };
    }
  };

  const data = getLocationData(locationId);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white py-20 px-4 border-b border-amber-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase">
            <span>{data.flagEmoji}</span>
            <span>Regional European Publishing Desk • {data.regionName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase max-w-4xl mx-auto leading-tight">
            {data.cityTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed">
            {data.heroSubtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Book Regional Strategy Session</span>
              <ArrowRight size={14} />
            </button>

            <a
              href="https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-2"
            >
              <MapPin size={14} className="text-red-400" />
              <span>HQ Coordinates: Għajnsielem, Malta</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          </div>
        </div>
      </section>

      {/* 3 Core Stats Bar */}
      <section className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Royalty Model</p>
            <p className="text-base font-black text-slate-950 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{data.keyStat1}</span>
            </p>
          </div>
          <div className="space-y-1 sm:border-x sm:border-slate-200">
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Legal Deposit & ISBN</p>
            <p className="text-base font-black text-slate-950 flex items-center justify-center gap-1.5">
              <ShieldCheck size={16} className="text-blue-600" />
              <span>{data.keyStat2}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase text-slate-400 tracking-wider">Retail Channels</p>
            <p className="text-base font-black text-slate-950 flex items-center justify-center gap-1.5">
              <Globe size={16} className="text-amber-500" />
              <span>{data.keyStat3}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Strategic Overview */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <Building2 className="text-amber-600" size={24} />
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                European Hybrid Publishing Tailored for {data.regionName}
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                Serving {data.localFocusPoint} with 100% intellectual property rights protection
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {data.summary}
          </p>

          {/* Distribution Highlights */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase text-blue-950 tracking-wider flex items-center gap-2">
              <Globe size={14} className="text-blue-700" />
              <span>Key Physical & Digital Distribution Channels</span>
            </h3>
            <p className="text-xs text-slate-600 font-semibold">
              {data.distributionFocus}
            </p>
          </div>
        </div>

        {/* Regional FAQs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Got Questions?</span>
            <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
              Frequently Asked Questions for Authors in {data.regionName}
            </h3>
          </div>

          <div className="space-y-4 pt-4">
            {data.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-colors bg-slate-50/50"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-sm font-black text-slate-900">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-amber-600' : ''}`} 
                  />
                </button>
                {activeFaq === idx && (
                  <div className="pt-4 text-xs text-slate-650 leading-relaxed font-semibold border-t border-slate-200/80 mt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bottom Box */}
        <div className="bg-gradient-to-r from-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Ready to Publish Your Authority Book in {data.regionName}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-medium">
            Schedule a confidential 30-minute manuscript review with our European publishing directors. Retain 100% of your royalties and copyright from day one.
          </p>
          <button
            onClick={onOpenConsultation}
            className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>Schedule Manuscript Evaluation</span>
          </button>
        </div>
      </section>

    </div>
  );
}
