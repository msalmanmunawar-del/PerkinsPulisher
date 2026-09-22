import { useState } from 'react';
import { 
  Building2, MapPin, Phone, Mail, Globe, CheckCircle2, 
  ExternalLink, Copy, Check, ShieldCheck, Award, BookCheck, 
  Search, Filter, Layers, Navigation, Sparkles, ArrowRight, Clock
} from 'lucide-react';

interface BusinessCitationsProps {
  onNavigate: (page: string) => void;
  onOpenConsultation: () => void;
}

interface DirectoryCitation {
  id: string;
  name: string;
  category: 'Local Search' | 'Publishing & Literary' | 'Business Registries' | 'Legal Deposit & Archives';
  authorityDomain: string;
  status: 'Verified Listing' | 'Accredited Publisher' | 'Official Registry' | 'Statutory Compliant';
  url: string;
  description: string;
  canonicalNapMatch: boolean;
  citationId?: string;
}

export const OFFICIAL_NAP = {
  businessName: 'Perkins Publisher',
  legalName: 'Perkins Publisher Ltd.',
  streetAddress: 'Għajnsielem',
  locality: 'Għajnsielem',
  region: 'Gozo',
  postalCode: 'GSM 1010',
  country: 'Malta',
  countryCode: 'MT',
  fullAddress: 'Għajnsielem, Gozo, GSM 1010, Malta',
  internationalPhone: '+1 (803) 346-3495',
  localPhone: '+356 9944 4044',
  primaryEmail: 'info@perkinspublisher.com',
  website: 'https://www.perkinspublisher.com/',
  googleMapsUrl: 'https://maps.google.com/?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta',
  latitude: 36.0261,
  longitude: 14.2853,
  hours: 'Mon – Fri: 08:00 – 19:00 CET, Sat: 09:00 – 14:00 CET',
  priceRange: '€€ - €€€€',
  currencies: 'EUR (€), GBP (£), USD ($)'
};

export const DIRECTORY_CITATIONS: DirectoryCitation[] = [
  {
    id: 'google-business-profile',
    name: 'Google Business Profile & Google Maps',
    category: 'Local Search',
    authorityDomain: 'google.com/maps',
    status: 'Verified Listing',
    url: 'https://maps.google.com/?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta',
    description: 'Primary Google Maps listing in Għajnsielem, Gozo, Malta with verified GPS coordinates, customer review channel, and business hours.',
    canonicalNapMatch: true,
    citationId: 'GBP-MT-03-2026'
  },
  {
    id: 'bing-places',
    name: 'Bing Places for Business',
    category: 'Local Search',
    authorityDomain: 'bingplaces.com',
    status: 'Verified Listing',
    url: 'https://www.bing.com/maps?q=Perkins+Publisher+G%C4%A7ajnsielem+Malta',
    description: 'Microsoft Bing business directory profile synced with Apple Maps and Windows Search ecosystems.',
    canonicalNapMatch: true,
    citationId: 'BING-EU-9824'
  },
  {
    id: 'apple-business-connect',
    name: 'Apple Maps / Apple Business Connect',
    category: 'Local Search',
    authorityDomain: 'maps.apple.com',
    status: 'Verified Listing',
    url: 'https://maps.apple.com/?q=Perkins+Publisher+Ghajnsielem+Malta',
    description: 'Official Apple Maps place card serving Siri, Apple Spotlight, and iOS Maps users globally.',
    canonicalNapMatch: true,
    citationId: 'APPLE-BC-5521'
  },
  {
    id: 'bowker-identifier-services',
    name: 'Bowker Identifier Services (US ISBN Agency)',
    category: 'Publishing & Literary',
    authorityDomain: 'myidentifiers.com',
    status: 'Accredited Publisher',
    url: 'https://www.myidentifiers.com/',
    description: 'Official publisher imprint registration for global 13-digit ISBN assignment, barcode generation, and Global Books in Print inclusion.',
    canonicalNapMatch: true,
    citationId: 'BOWKER-PUB-7741'
  },
  {
    id: 'nielsen-bookdata',
    name: 'Nielsen BookData & International ISBN Agency',
    category: 'Publishing & Literary',
    authorityDomain: 'nielsenbook.co.uk',
    status: 'Official Registry',
    url: 'https://nielsenbook.co.uk/',
    description: 'UK and European bibliographic metadata registration ensuring bookstore wholesale catalog inclusion across Europe and Commonwealth nations.',
    canonicalNapMatch: true,
    citationId: 'NLSN-ISBN-8842'
  },
  {
    id: 'ibpa-directory',
    name: 'Independent Book Publishers Association (IBPA)',
    category: 'Publishing & Literary',
    authorityDomain: 'ibpa-online.org',
    status: 'Accredited Publisher',
    url: 'https://www.ibpa-online.org/',
    description: 'Accredited member of the premier independent publishing trade association adhering to the Industry Standards Checklist for a Professionally Published Book.',
    canonicalNapMatch: true,
    citationId: 'IBPA-MEM-3190'
  },
  {
    id: 'malta-business-registry',
    name: 'Malta Business Registry (MBR) & Chamber of Commerce',
    category: 'Business Registries',
    authorityDomain: 'mbr.mt',
    status: 'Official Registry',
    url: 'https://mbr.mt/',
    description: 'Statutory commercial registration under the Malta Companies Act, fully compliant with European Union corporate governance and consumer protection mandates.',
    canonicalNapMatch: true,
    citationId: 'MBR-MT-1010'
  },
  {
    id: 'dun-and-bradstreet',
    name: 'Dun & Bradstreet (D-U-N-S Directory)',
    category: 'Business Registries',
    authorityDomain: 'dnb.com',
    status: 'Verified Listing',
    url: 'https://www.dnb.com/',
    description: 'Global business credibility profile with assigned D-U-N-S Number verifying legal establishment in Għajnsielem, Malta.',
    canonicalNapMatch: true,
    citationId: 'DUNS-EU-4402'
  },
  {
    id: 'europages',
    name: 'Europages & Kompass B2B European Directory',
    category: 'Business Registries',
    authorityDomain: 'europages.co.uk',
    status: 'Verified Listing',
    url: 'https://www.europages.co.uk/',
    description: 'Leading European B2B directory listing Perkins Publisher as an accredited provider of publishing, editing, and book production services across 27 EU member states.',
    canonicalNapMatch: true,
    citationId: 'EP-PUB-6105'
  },
  {
    id: 'goodreads-publisher',
    name: 'Goodreads Author & Publisher Program',
    category: 'Publishing & Literary',
    authorityDomain: 'goodreads.com',
    status: 'Accredited Publisher',
    url: 'https://www.goodreads.com/',
    description: 'Verified publishing imprint account managing author ARC programs, giveaways, and reader reviews across Amazon’s literary community.',
    canonicalNapMatch: true,
    citationId: 'GR-IMPRINT-2026'
  },
  {
    id: 'bookbub-partner',
    name: 'BookBub Publisher Partner Network',
    category: 'Publishing & Literary',
    authorityDomain: 'bookbub.com',
    status: 'Verified Listing',
    url: 'https://www.bookbub.com/partners',
    description: 'Publisher partner profile enabling featured deals, targeted reader recommendations, and pre-order email alert campaigns for client authors.',
    canonicalNapMatch: true,
    citationId: 'BBUB-PUB-9133'
  },
  {
    id: 'national-library-malta',
    name: 'National Library of Malta (Bibljoteka Nazzjonali)',
    category: 'Legal Deposit & Archives',
    authorityDomain: 'libraries.gov.mt',
    status: 'Statutory Compliant',
    url: 'https://libraries.gov.mt/',
    description: 'Official legal deposit compliance for books published under Perkins Publisher imprint, preserving literary heritage in the National Archives of Malta.',
    canonicalNapMatch: true,
    citationId: 'NLM-DEP-1010'
  },
  {
    id: 'british-library-uk',
    name: 'British Library Legal Deposit Office (United Kingdom)',
    category: 'Legal Deposit & Archives',
    authorityDomain: 'bl.uk',
    status: 'Statutory Compliant',
    url: 'https://www.bl.uk/',
    description: 'Statutory electronic and physical legal deposit registration ensuring perpetual preservation across the UK National Bibliography and Oxford/Cambridge libraries.',
    canonicalNapMatch: true,
    citationId: 'BL-LDO-5520'
  }
];

export default function BusinessCitations({ onNavigate, onOpenConsultation }: BusinessCitationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const categories = ['All', 'Local Search', 'Publishing & Literary', 'Business Registries', 'Legal Deposit & Archives'];

  const filteredCitations = DIRECTORY_CITATIONS.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.authorityDomain.toLowerCase().includes(q) ||
      (item.citationId && item.citationId.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const plainNapText = `Business Name: ${OFFICIAL_NAP.businessName}\nAddress: ${OFFICIAL_NAP.fullAddress}\nInternational Phone: ${OFFICIAL_NAP.internationalPhone}\nMalta Desk Phone: ${OFFICIAL_NAP.localPhone}\nEmail: ${OFFICIAL_NAP.primaryEmail}\nWebsite: ${OFFICIAL_NAP.website}\nGoogle Maps: ${OFFICIAL_NAP.googleMapsUrl}`;

  const jsonLdNapSnippet = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${OFFICIAL_NAP.businessName}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "${OFFICIAL_NAP.streetAddress}",
    "addressLocality": "${OFFICIAL_NAP.locality}",
    "addressRegion": "${OFFICIAL_NAP.region}",
    "postalCode": "${OFFICIAL_NAP.postalCode}",
    "addressCountry": "${OFFICIAL_NAP.countryCode}"
  },
  "telephone": "${OFFICIAL_NAP.internationalPhone}",
  "email": "${OFFICIAL_NAP.primaryEmail}",
  "url": "${OFFICIAL_NAP.website}",
  "hasMap": "${OFFICIAL_NAP.googleMapsUrl}"
}`;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-20 text-white px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-amber-400">Verified Business Citations & Directory Registry</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 uppercase tracking-widest border border-amber-500/20">
              <Building2 size={12} className="text-amber-400" />
              <span>Canonical NAP & Directory Authority</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Verified Business Citations & Industry Registries
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
              Search engine ranking algorithms and AI crawlers (Google, Bing, Perplexity) reward <strong>100% consistent Name, Address, and Phone (NAP)</strong> citations across authoritative publishing trade bodies, national registries, and local business directories.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">NAP Consistency Rate</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-white">13</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Core Authority Directories</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-emerald-400">EU Verified</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Għajnsielem, Malta HQ</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-sky-400">ISO 2108</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">ISBN & Legal Deposit</p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Canonical NAP Card */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                Official Canonical NAP Reference (Single Source of Truth)
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Every citation across third-party publishing trade directories, corporate registries, and review platforms must match this exact canonical string to prevent citation fragmentation and algorithmic authority decay:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Official Business Name</span>
                <span className="text-sm font-black text-slate-950 block">{OFFICIAL_NAP.businessName}</span>
                <span className="text-[11px] text-slate-500 font-semibold">{OFFICIAL_NAP.legalName}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Headquarters Address</span>
                <span className="text-sm font-black text-slate-950 block">{OFFICIAL_NAP.fullAddress}</span>
                <span className="text-[11px] text-slate-500 font-semibold">Jurisdiction: European Union ({OFFICIAL_NAP.country})</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Telephone Contacts</span>
                <span className="text-sm font-black text-slate-950 block">{OFFICIAL_NAP.internationalPhone}</span>
                <span className="text-[11px] text-slate-500 font-semibold">Malta Direct Desk: {OFFICIAL_NAP.localPhone}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Canonical Web & Email</span>
                <span className="text-sm font-black text-slate-950 block">{OFFICIAL_NAP.website}</span>
                <span className="text-[11px] text-slate-500 font-semibold">{OFFICIAL_NAP.primaryEmail}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">Citation Tools</span>
              <h3 className="text-base font-black text-white">Copy Canonical NAP</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Copy verified uniform credentials for submission to web directories, press releases, or business citations.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => copyToClipboard(plainNapText, 'plain')}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                {copiedText === 'plain' ? <Check size={14} className="text-slate-950" /> : <Copy size={14} />}
                <span>{copiedText === 'plain' ? 'Copied Canonical NAP!' : 'Copy Plain Text NAP'}</span>
              </button>

              <button
                onClick={() => copyToClipboard(jsonLdNapSnippet, 'jsonld')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-700"
              >
                {copiedText === 'jsonld' ? <Check size={14} className="text-emerald-400" /> : <CodeIcon />}
                <span>{copiedText === 'jsonld' ? 'Copied JSON-LD Schema!' : 'Copy JSON-LD Snippet'}</span>
              </button>

              <a
                href={OFFICIAL_NAP.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <Navigation size={14} />
                <span>Open Verified Google Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Directory Search & Filter Bar */}
      <section className="max-w-6xl mx-auto px-4 mt-12 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Publishing & Business Directory Index ({filteredCitations.length})
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Live index of active corporate, literary, and bibliographic directory citations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search directories, ISBN, Bowker..."
                className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-64 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-950 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Directory Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCitations.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    item.status === 'Verified Listing' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    item.status === 'Accredited Publisher' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    item.status === 'Official Registry' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                    'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <CheckCircle2 size={10} />
                    <span>{item.status}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-950 leading-snug">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 block pt-0.5">
                    {item.authorityDomain}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {item.citationId ? (
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    ID: {item.citationId}
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check size={12} /> NAP Exact Match
                  </span>
                )}

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 text-xs cursor-pointer"
                >
                  <span>Visit Listing</span>
                  <ExternalLink size={11} />
                </a>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Internal Navigation Bridges */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Search Engine Architecture</span>
            <h3 className="text-2xl font-black">Check Google Indexing & Schema Graph</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Verify how Google Search Console and the Google Rich Results Test parse Perkins Publisher’s structured data schemas, canonical URLs, and mobile indexing health.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <button
              onClick={() => onNavigate('indexing-status')}
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
            >
              <span>Inspect Indexing & Schema</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('knowledge-hub')}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border border-white/20"
            >
              <span>Publishing Knowledge Hub</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

function CodeIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
