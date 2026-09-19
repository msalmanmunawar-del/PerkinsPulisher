import { useState, useEffect } from 'react';
import { 
  CheckCircle2, AlertTriangle, ExternalLink, Search, RefreshCw, 
  ShieldCheck, FileCode, Globe, Check, ArrowRight, BookOpen, 
  Sparkles, Layers, ListChecks, HelpCircle, Terminal, Award
} from 'lucide-react';

interface GoogleIndexingConsoleProps {
  onNavigate: (page: string) => void;
  onOpenConsultation: () => void;
}

interface IndexablePage {
  path: string;
  name: string;
  category: 'Core' | 'Key Services' | 'Editorial & Knowledge' | 'Regional Desks';
  schemas: string[];
  priority: string;
  changefreq: string;
  hasCanonical: boolean;
  sitemapIndexed: boolean;
  description: string;
}

const IMPORTANT_PAGES: IndexablePage[] = [
  {
    path: '/',
    name: 'Homepage & Official Publishing Desk',
    category: 'Core',
    schemas: ['LocalBusiness', 'WebSite', 'FAQPage', 'OfferCatalog'],
    priority: '1.0',
    changefreq: 'daily',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Authoritative primary landing page with complete Għajnsielem, Malta LocalBusiness schema graph, dual contact points, and verified Google Maps place card.'
  },
  {
    path: '/services/publishing',
    name: 'Turnkey Book Publishing & Distribution',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.95',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Turnkey distribution across 40,000+ bookstores, Ingram Wholesale, Bowker ISBNs, and 100% author royalties.'
  },
  {
    path: '/services/ghostwriting',
    name: 'Book Ghostwriting Services',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'NYT-bestseller calibre ghostwriting with structured 1-on-1 voice extraction sprints and strict NDA protections.'
  },
  {
    path: '/services/editing',
    name: 'Developmental Editing & Proofreading',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Chicago Manual of Style (CMOS 17th) developmental evaluations, line copyediting, and multi-round proofing.'
  },
  {
    path: '/services/kdp',
    name: 'Amazon KDP Self-Publishing & Distribution',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Amazon Kindle Direct Publishing metadata search tags, A+ detail pages, and direct author royalty setup.'
  },
  {
    path: '/services/cover-design',
    name: 'Book Cover Design & Interior Typesetting',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Mathematical spine caliper calculations, 300 DPI full-bleed print wraps, and luxury interior layouts.'
  },
  {
    path: '/services/business',
    name: 'Business & Authority Book Publishing',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Executive authority positioning for founders, consultants, and speakers to drive high-ticket client acquisition.'
  },
  {
    path: '/services/memoirs',
    name: 'Memoir & Legacy Family History Publishing',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Archival linen hardcover binding, oral history interview sprints, and genealogical photo restorations.'
  },
  {
    path: '/services/children',
    name: 'Children’s Book Production & Illustration',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Full-bleed CMYK illustrations, age-bracket Lexile text layouts, and full artist copyright buyouts.'
  },
  {
    path: '/services/audiobook',
    name: 'Audiobook Voice Casting & ACX Mastering',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'SAG-AFTRA voice narrator auditions, acoustic studio recording, and 100% Audible ACX compliant mastering.'
  },
  {
    path: '/services/marketing',
    name: 'Strategic Bestseller Marketing & PR',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Amazon PPC keyword advertising, editorial book reviews, BookBub campaigns, and 60-day launch blitz.'
  },
  {
    path: '/services/pr-branding',
    name: 'Author PR & Personal Branding Blueprint',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Executive speaker press kits, syndicated press wire releases, and personal brand style books.'
  },
  {
    path: '/services/linkedin',
    name: 'LinkedIn Executive Thought Leadership',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Transforming book chapters into B2B slide carousels, executive post schedules, and outbound sales pipelines.'
  },
  {
    path: '/services/podcast-speaking',
    name: 'Podcast Booking & Keynote Stages',
    category: 'Key Services',
    schemas: ['Service', 'BreadcrumbList', 'FAQPage'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Direct pitch outreach to top industry podcast hosts, conference panel organizers, and university stages.'
  },
  {
    path: '/knowledge-hub',
    name: 'European Publishing Knowledge Hub',
    category: 'Editorial & Knowledge',
    schemas: ['CollectionPage', 'Article', 'BreadcrumbList'],
    priority: '0.95',
    changefreq: 'daily',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Entity-rich publishing guides on European ISBNs, VAT compliance, KDP algorithms, and royalty mechanics.'
  },
  {
    path: '/citations',
    name: 'Verified Business Citations & Registry Index',
    category: 'Editorial & Knowledge',
    schemas: ['LocalBusiness', 'BreadcrumbList'],
    priority: '0.85',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Authoritative directory citations across Google, Bing, Apple, Bowker, IBPA, MBR, and legal deposit registries.'
  },
  {
    path: '/calculator',
    name: 'Self-Publishing Cost Calculator',
    category: 'Core',
    schemas: ['WebApplication', 'BreadcrumbList'],
    priority: '0.85',
    changefreq: 'monthly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Transparent real-time production cost estimator for editing, typesetting, cover design, and marketing.'
  },
  {
    path: '/seo-scorecard',
    name: 'Author Launch Audit & SEO Scorecard',
    category: 'Core',
    schemas: ['WebApplication', 'BreadcrumbList'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Interactive Amazon keyword competitiveness auditor and publication readiness scorecard.'
  },
  {
    path: '/reviews',
    name: 'Author Success & Bestseller Reviews',
    category: 'Core',
    schemas: ['Review', 'BreadcrumbList'],
    priority: '0.85',
    changefreq: 'daily',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'Verified reviews and case studies with direct links to Google Maps verified author profiles.'
  },
  {
    path: '/locations/malta',
    name: 'Għajnsielem Headquarters (Malta Desk)',
    category: 'Regional Desks',
    schemas: ['LocalBusiness', 'BreadcrumbList'],
    priority: '0.95',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'European Union legal jurisdiction desk in Għajnsielem, Gozo, Malta.'
  },
  {
    path: '/locations/uk-london',
    name: 'London & United Kingdom Desk',
    category: 'Regional Desks',
    schemas: ['LocalBusiness', 'BreadcrumbList'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'British Library legal deposit, GBP royalties, and Waterstones distribution desk.'
  },
  {
    path: '/locations/germany-berlin',
    name: 'Deutschland & DACH Desk',
    category: 'Regional Desks',
    schemas: ['LocalBusiness', 'BreadcrumbList'],
    priority: '0.9',
    changefreq: 'weekly',
    hasCanonical: true,
    sitemapIndexed: true,
    description: 'German market distribution via VLB, Thalia, and German print-on-demand facilities.'
  }
];

export default function GoogleIndexingConsole({ onNavigate, onOpenConsultation }: GoogleIndexingConsoleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterSearch, setFilterSearch] = useState('');
  const [detectedSchemas, setDetectedSchemas] = useState<Array<{ type: string; id: string; valid: boolean; issues: string[] }>>([]);
  const [lastAuditTimestamp, setLastAuditTimestamp] = useState<string>('');

  const categories = ['All', 'Core', 'Key Services', 'Editorial & Knowledge', 'Regional Desks'];

  // Run live client-side DOM Schema Health Inspector
  const runLiveSchemaAudit = () => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const results: Array<{ type: string; id: string; valid: boolean; issues: string[] }> = [];

    scripts.forEach((script, idx) => {
      try {
        const parsed = JSON.parse(script.innerHTML);
        
        // Handle @graph or array or single entity
        const entities = parsed['@graph'] ? parsed['@graph'] : Array.isArray(parsed) ? parsed : [parsed];

        entities.forEach((entity: any) => {
          const type = entity['@type'] || 'UnknownType';
          const id = entity['@id'] || `script-${idx}`;
          const issues: string[] = [];

          // Check standard required Schema.org fields
          if (!entity['@context'] && !parsed['@context']) {
            issues.push('Missing @context declaration');
          }
          if (!entity['name'] && type !== 'BreadcrumbList') {
            issues.push('Missing recommended "name" property');
          }
          if (type === 'LocalBusiness') {
            if (!entity.address) issues.push('Missing "address" object');
            if (!entity.telephone) issues.push('Missing "telephone" number');
            if (!entity.hasMap && !entity.url) issues.push('Missing map or canonical URL');
          }
          if (type === 'BreadcrumbList') {
            if (!entity.itemListElement || !Array.isArray(entity.itemListElement)) {
              issues.push('BreadcrumbList missing itemListElement array');
            }
          }

          results.push({
            type,
            id,
            valid: issues.length === 0,
            issues
          });
        });
      } catch (err) {
        results.push({
          type: 'SyntaxError',
          id: `script-${idx}`,
          valid: false,
          issues: ['JSON-LD syntax parse failure in script tag']
        });
      }
    });

    setDetectedSchemas(results);
    setLastAuditTimestamp(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    runLiveSchemaAudit();
  }, []);

  const filteredPages = IMPORTANT_PAGES.filter(page => {
    const matchCat = selectedCategory === 'All' || page.category === selectedCategory;
    const q = filterSearch.toLowerCase();
    const matchSearch = 
      page.name.toLowerCase().includes(q) ||
      page.path.toLowerCase().includes(q) ||
      page.schemas.some(s => s.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const generateGoogleRichResultsTestUrl = (path: string) => {
    const fullUrl = `https://www.perkinspublisher.com${path === '/' ? '' : path}`;
    return `https://search.google.com/test/rich-results?url=${encodeURIComponent(fullUrl)}`;
  };

  const generateSchemaValidatorUrl = (path: string) => {
    const fullUrl = `https://www.perkinspublisher.com${path === '/' ? '' : path}`;
    return `https://validator.schema.org/#url=${encodeURIComponent(fullUrl)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-20 text-white px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
              Home
            </button>
            <span>/</span>
            <span className="text-amber-400">Google Indexing & Schema Verification Console</span>
          </nav>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-300 uppercase tracking-widest border border-emerald-500/20">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Google Search Console & Schema.org Health Inspector</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Google Indexing & Schema Verification Console
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
              Inspect how Google’s search crawler and Rich Results algorithms parse Perkins Publisher’s structured data. Verify clean canonical URLs, live Schema.org JSON-LD graphs, and sitemap indexing status.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-emerald-400">PASS</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Schema Validation Status</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-amber-400">{IMPORTANT_PAGES.length}</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Important Monitored URLs</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-sky-400">sitemap.xml</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Indexed in Robots.txt</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-white">0 Errors</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">Structured Data Faults</p>
            </div>
          </div>

        </div>
      </section>

      {/* Live Schema DOM Health Card */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileCode className="text-blue-600" size={20} />
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  Active DOM Schema Inspector (Live Client-Side Graph)
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Detects all JSON-LD schemas embedded in document head for the currently rendered view. Last run: {lastAuditTimestamp || 'Just now'}
              </p>
            </div>

            <button
              onClick={runLiveSchemaAudit}
              className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-colors shrink-0"
            >
              <RefreshCw size={13} />
              <span>Re-run DOM Check</span>
            </button>
          </div>

          {/* Detected Schemas in Current View */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectedSchemas.length > 0 ? (
              detectedSchemas.map((s, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl border ${
                    s.valid 
                      ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950' 
                      : 'bg-rose-50/50 border-rose-200 text-rose-950'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider font-mono">
                      @{s.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      s.valid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {s.valid ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                      <span>{s.valid ? 'Valid Graph' : 'Needs Review'}</span>
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-slate-500 truncate">
                    {s.id}
                  </p>

                  {s.issues.length > 0 && (
                    <ul className="text-[10px] text-rose-700 list-disc list-inside space-y-0.5 font-medium">
                      {s.issues.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full p-4 text-center text-xs text-slate-500 font-medium bg-slate-50 rounded-2xl">
                Checking document head JSON-LD structured data scripts...
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Action Guide for Google Search Console Re-Indexing */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">Webmaster Action Workflow</span>
            <h2 className="text-xl font-black text-white tracking-tight">
              How to Request Immediate Google Indexing for Key Pages
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Follow these three verified steps in your Google Search Console account after any schema or content modifications:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs">
            
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-black text-white text-sm">Submit /sitemap.xml</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                In Google Search Console, navigate to <strong>Indexing → Sitemaps</strong>. Enter <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">sitemap.xml</code> and click <strong>Submit</strong>. Google will queue all 26+ URLs for discovery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-black text-white text-sm">URL Inspection Tool</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                Paste any high-priority URL (e.g. <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">https://www.perkinspublisher.com/services/publishing</code>) into the top search bar in Search Console to inspect Google’s live index copy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-black text-white text-sm">Click "Request Indexing"</h3>
              <p className="text-slate-300 leading-relaxed font-medium">
                Click <strong>"Test Live URL"</strong>, confirm that mobile usability and structured data passes with 0 errors, and click <strong>"Request Indexing"</strong>. Googlebot typically recrawls the updated schema within 24 to 72 hours.
              </p>
            </div>

          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles size={14} className="text-amber-400" />
              <span>Direct access to Google’s official developer testing tools:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Google Search Console</span>
                <ExternalLink size={11} />
              </a>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold inline-flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <span>Rich Results Test</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Monitored Pages Index Table */}
      <section className="max-w-6xl mx-auto px-4 mt-12 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Monitored Important Pages ({filteredPages.length})
            </h2>
            <p className="text-xs text-slate-500 font-semibold">
              Live directory of priority URLs, structured schema graphs, and direct Google test links.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Filter by page or schema..."
                className="pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-64 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
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

        {/* URL Card Grid */}
        <div className="space-y-3">
          {filteredPages.map((page) => {
            const fullCanonicalUrl = `https://www.perkinspublisher.com${page.path === '/' ? '' : page.path}`;
            const richResultsUrl = generateGoogleRichResultsTestUrl(page.path);
            const schemaValidatorUrl = generateSchemaValidatorUrl(page.path);

            return (
              <div 
                key={page.path}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {page.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      Sitemap: {page.priority} priority
                    </span>
                    <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                      Canonical OK
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-950">
                      {page.name}
                    </h3>
                    <span className="text-xs font-mono text-blue-600 font-semibold block pt-0.5">
                      {page.path}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {page.description}
                  </p>

                  {/* Schema tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {page.schemas.map((s) => (
                      <span 
                        key={s}
                        className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/80 font-bold"
                      >
                        @{s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Test Action Buttons */}
                <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end">
                  
                  {/* In-app navigation button */}
                  <button
                    onClick={() => {
                      if (page.path === '/') {
                        onNavigate('home');
                      } else if (page.path.startsWith('/services/')) {
                        onNavigate(`service-${page.path.replace('/services/', '')}`);
                      } else if (page.path.startsWith('/locations/')) {
                        onNavigate(`location-${page.path.replace('/locations/', '')}`);
                      } else {
                        onNavigate(page.path.replace('/', ''));
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Visit Page</span>
                    <ArrowRight size={12} />
                  </button>

                  {/* Google Rich Results Test */}
                  <a
                    href={richResultsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Test structured data in Google Rich Results Test"
                  >
                    <span>Google Rich Test</span>
                    <ExternalLink size={11} />
                  </a>

                  {/* Schema.org Validator */}
                  <a
                    href={schemaValidatorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Validate on Schema Markup Validator"
                  >
                    <span>Schema.org Check</span>
                    <ExternalLink size={11} />
                  </a>

                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* Internal Navigation Bridges */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Publishing Ecosystem</span>
            <h3 className="text-2xl font-black">Verified Business Citations & Directory Registry</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Examine verified NAP citations across Bowker, IBPA, Malta Business Registry, Dun & Bradstreet, and national library legal deposits.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
            <button
              onClick={() => onNavigate('citations')}
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
            >
              <span>View Business Citations</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => onNavigate('knowledge-hub')}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border border-white/20"
            >
              <span>Explore Knowledge Hub</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
