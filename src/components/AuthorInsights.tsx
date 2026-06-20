import { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, ArrowRight, User, Calendar, Tag, ChevronDown, CheckCircle, Sparkles, Filter, Bookmark, GraduationCap } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Publishing' | 'Editing' | 'Formatting' | 'Book Marketing' | 'Royalties';
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
  authorTitle: string;
  image: string;
  keywords: string[];
}

const INSIGHTS_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Master Blueprint to Retaining 100% of Your Book Royalties in Self-Publishing',
    slug: 'retaining-100-percent-book-royalties',
    category: 'Royalties',
    excerpt: 'Traditional publishing houses demand up to 85% of your sales margin. Discover exactly how local indie self-publishing options empower you to control distribution, price tags, and keep 100% of your royalties.',
    readTime: '6 min read',
    date: 'June 18, 2026',
    author: 'Stephanie Weldon',
    authorTitle: 'Senior Publishing Consultant & Editorial Director',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    keywords: ['book royalties', 'self-publishing royalties', 'book distribution setup', 'amazon publishing royalties', 'indie publishing profits'],
    content: [
      'In the competitive landscape of modern literature, understanding the economics of book publishing is as crucial as writing a compelling first chapter. For decades, major traditional houses held a virtual monopoly on distribution networks, enabling them to impose high margin splits that left authors with a meager 10% to 15% of retail revenue.',
      'With the exponential rise of global retail channels and professional Print-on-Demand (POD) logistics, authors no longer need to surrender their intellectual property or live on micro-royalties. When you choose a modern, professional self-publishing approach, you retain absolute ownership of your retail prices, global sales, and digital assets.',
      'Key Strategies for Capturing Full Royalties:',
      '1. Leverage Direct Global Distribution channels like Amazon KDP, IngramSpark, and Barnes & Noble Press under your own proprietary ISBNs. Having exclusive control of your ISBN means no third-party middleware can lock down your catalog.',
      '2. Bypass Royalty-Splitting Agencies. Always collaborate with bespoke publishing services (like Perkins Publisher) where you pay a single flat setup fee upfront for premium editorial, structural typesetting, and 3D cover illustration, and in return, you get 100% of the ongoing sales pipeline directly connected to your own personal bank account.',
      '3. Maintain Active Pricing Control. Calibrate your retail pricing dynamically based on cover layouts, production size, and shipping specifications to maximize your royalty margins without overpricing your hardback or paperback formats.',
    ],
  },
  {
    id: 'art-2',
    title: 'Developmental Editing vs. Copy Editing: What Your Manuscript Actually Needs to Succeed',
    slug: 'developmental-editing-vs-copy-editing',
    category: 'Editing',
    excerpt: 'Before launching your book, it must be refined. Understand the massive structural difference between developmental line-shaping and detailed technical copy-editing to save thousands on manuscript workflows.',
    readTime: '8 min read',
    date: 'June 14, 2026',
    author: 'Stephanie Weldon',
    authorTitle: 'Senior Publishing Consultant & Editorial Director',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    keywords: ['developmental editing', 'copy editing services', 'manuscript evaluation', 'book proofreading', 'professional editor cost', 'best seller formatting'],
    content: [
      'Few things stall an aspiring author’s momentum faster than pitching an unpolished manuscript. However, rushing to hire a technical proofreader before your story has been developmentally structurally evaluated is one of the most common budget-burning errors in self-publishing.',
      'To build a stellar book that garners 5-star reviews on Amazon and Goodreads, you must treat editing as a multi-stage refinement pipeline, not a single rapid read-through.',
      'Stage 1: Developmental Editing (The Architectural Phase)',
      'Developmental editing looks at the comprehensive forest, not individual trees. A developmental editor reviews your manuscript’s narrative pacing, character arcs, plot holes, structural consistency, and tone. If you are writing non-fiction, they ensure your educational frameworks flow logically and offer massive real-world value to the target reader.',
      'Stage 2: Copy Editing (The Polishing Phase)',
      'Only once your chapters are locked in should copy editing begin. This phase centers heavily on mechanics—sentence flow, grammatical precision, consistent formatting, vocabulary enhancements, and style matching (such as Chicago Manual of Style or AP requirements). We eliminate clunky phrases and tighten the syntax.',
      'Stage 3: Fine Proofreading (The Quality Gate)',
      'Proofreading is the absolute final line of defense. It catches accidental typos, misplaced commas, structural formatting drift, or double-spacing issues that slipped through previous passes. Ensure that you have a fresh pair of expert eyes for this phase so no embarrassing slip-ups make it into print.',
    ],
  },
  {
    id: 'art-3',
    title: 'The Psychology of Bestselling Book Cover Design: Colors, Metadata, and Typography Layouts',
    slug: 'bestselling-book-cover-design-psychology',
    category: 'Formatting',
    excerpt: 'Your book cover makes your first digital impressions in less than 0.5 seconds. Learn how 3D cover layout configurations, custom typography, and psychological color schemes trigger instant sales.',
    readTime: '5 min read',
    date: 'May 29, 2026',
    author: 'Stephanie Weldon',
    authorTitle: 'Senior Publishing Consultant & Editorial Director',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    keywords: ['book cover design', '3d cover illustration', 'bestseller book covers', 'custom graphic design for books', 'typography layout formatting'],
    content: [
      'It is one of the oldest cliches in human history: "Don’t judge a book by its cover." Yet, in the fast-scrolling retail environment of digital bookstores and social media feeds, readers do exactly that. Your book cover is essentially your primary product package, and it acts as an immediate psychological billboard.',
      'A professionally crafted cover tells the potential buyer three critical things instantly: what genre the book belongs to, the tone or emotional resonance of the material, and whether the book is a high-end product worth their hardware investment or digital download fees.',
      'Critical Elements of High-Conversion Cover Design:',
      '- Dynamic Visual Hierarchy: The eye must naturally flow from the core focal illustration or typographic center, directly to the title, and then down to the author name and back-cover endorsement snippets. Never overcrowd the space.',
      '- Genre-Appropriate Color Psychology: Deep navies, cold grays, and high contrast metallics command respect in business and memoirs. Vivid reds and high-contrast yellows trigger emotional tension and high pacing in thrillers. Warm cream accents and soft serif typographies anchor traditional biographical non-fiction.',
      '- Thumbnail Scaling Optima: More than 80% of readers discover and purchase books on a smartphone screen. If your title is illegible or your primary vector graphic dissolves into mud when scaled down to a 100px thumbnail, your conversion metrics will suffer.',
    ],
  },
  {
    id: 'art-4',
    title: 'Decoding the Global Book Distribution System: Amazon KDP, IngramSpark, and Over 40,000 Retailers',
    slug: 'decoding-global-book-distribution',
    category: 'Publishing',
    excerpt: 'Where exactly does your book go once published? Demystifying the digital distribution pathways that route your paperback, hardback, and e-book formats directly onto global retail networks.',
    readTime: '7 min read',
    date: 'April 20, 2026',
    author: 'Stephanie Weldon',
    authorTitle: 'Senior Publishing Consultant & Editorial Director',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    keywords: ['global book distribution', 'ingramspark setup', 'amazon kdp paperback', 'digital bookstore setup', 'barnes and noble publishing'],
    content: [
      'To a first-time writer, the logistics of distributing physical paperbacks or hardback books globally seems like an administrative mountain. How does a book printed on-demand make its way onto the virtual catalogs of Target, Walmart, local indie bookstores, and universities?',
      'The answer lies within global catalog aggregation systems. Understanding these mechanisms is the final key to achieving full commercial coverage for your literary release.',
      'The Two Pillars of Self-Publishing Distribution:',
      'Pillar A: Amazon Premium Access. Amazon controls a massive share of the consumer e-book and paperback market. Uploading directly to their KDP platform ensures prime delivery setup, instant algorithm indexing, and access to Kindle Unlimited millions.',
      'Pillar B: Wide Global Distribution via Aggregators. To reach thousands of external channels (like Barnes & Noble, Apple Books, Kobo, and local libraries), you leverage wholesale distribution giants like IngramSpark. Ingram operates the largest book wholesale database in the world. When your book is formatted correctly and registered in the Ingram catalog:,',
      '1. Physical retailers can instantly search and order your paperback to stock their actual bookstore shelves.',
      '2. Academic libraries can acquire digital e-pub formats to offer to their student body.',
      '3. Independent bookshop associations can list your product with pre-negotiated industry trade discounts.',
    ],
  },
  {
    id: 'art-5',
    title: 'The Guerrilla Book Marketing Blueprint: How to Generate Your First 100 High-Impact Reviews',
    slug: 'book-marketing-first-100-reviews',
    category: 'Book Marketing',
    excerpt: 'Publishing your manuscript is only 20% of the battle. The other 80% is marketing. Here is the step-by-step launch formula to securing real reviews and driving continuous author visibility.',
    readTime: '9 min read',
    date: 'March 11, 2026',
    author: 'Stephanie Weldon',
    authorTitle: 'Senior Publishing Consultant & Editorial Director',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    keywords: ['book marketing strategies', 'amazon book reviews', 'author audience growth', 'book launch campaign', 'promote self published book'],
    content: [
      'You have spent months drafting and fine-tuning your book, formatted the perfect interior typesetting, and finalized a striking cover design. It is finally published. But days pass, and the sales counter remains flat. This is the tragic "Publish & Pray" trap.',
      'To launch successfully on Amazon and international retail networks, you need algorithmic momentum. Bookstores prioritize showing popular books over obscure ones, and the single largest metric driving this algorithm is fresh, organic, verified consumer reviews.',
      'Actionable Tasks to Secure Your First 100 Reviews:',
      '1. Build an Advance Review Copy (ARC) Team. Six to eight weeks before your actual launch day, compile a list of 50 to 100 beta readers, loyal fans, or colleagues in your industry field. Provide them with a complimentary pre-release digital PDF or e-pub version of your book with a gentle invitation to post a honest review on launch day.',
      '2. Target Genre-Specific Micro-Influencers. Search social media channels (such as BookTok on TikTok or Bookstagram on Instagram) for creative layout accounts that actively review your book’s exact genre. Offer them a high-quality physical copy with custom personalized messaging.',
      '3. Craft a High-Converting "Back-Matter" Call-To-Action. The very end page of your book is prime digital real estate. Do not let reader momentum dissipate upon reaching Chapter 10. Place a direct, humble link on the final page inviting them block-letters to leave their open honest experience on their purchasing site.',
    ]
  }
];

interface AuthorInsightsProps {
  onOpenConsultation: () => void;
}

export default function AuthorInsights({ onOpenConsultation }: AuthorInsightsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const categories = ['All', 'Publishing', 'Editing', 'Formatting', 'Book Marketing', 'Royalties'];

  // Search and filter algorithms
  const filteredArticles = useMemo(() => {
    return INSIGHTS_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const term = searchQuery.toLowerCase();
      const matchesSearch = 
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.keywords.some(k => k.toLowerCase().includes(term)) ||
        article.category.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="insights" className="py-24 bg-[#0a0d17] text-white relative overflow-hidden border-t border-gray-800">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/10 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/20 text-xs font-black tracking-widest text-amber-400 uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Author Insights & Editorial Strategy</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
            The Author <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">Insights Lounge</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
            Gain a major competitive edge in global self-publishing. Fresh, action-ready manuals, industry guides, and copywriter layouts systematically curated for modern novelists & business authors.
          </p>
        </div>

        {/* Curator Highlight Hero Card (Stephanie Weldon) */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-amber-500/10 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none rounded-tr-2xl" />
          
          <div className="relative shrink-0">
            {/* Elegant placeholder/avatar design for Stephanie Weldon */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-amber-500/30 overflow-hidden shadow-lg relative bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=85" 
                alt="Stephanie Weldon" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 py-0.5 bg-amber-500 text-slate-900 text-[10px] uppercase font-black text-center tracking-wider">
                Senior Editor
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-3.5 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Resident Publisher Curator</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">Stephanie Weldon</h3>
              <p className="text-xs text-amber-400/80 font-semibold font-mono">Senior Editorial Strategist & Bestseller Lead Planner</p>
            </div>
            
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-2.5xl">
              "My mission is to de-mystify the self-publishing distribution framework for creators. From initial developmental draft assessments to worldwide print routing on Barnes & Noble, Amazon, or Kobo catalogs, we provide the blueprints to launch with authority while keeping 100% of your royalty income."
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
              <span className="px-2 py-1 rounded bg-slate-800/80 text-[11px] font-bold text-gray-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-amber-500" /> 15+ Yrs Industry Advisor
              </span>
              <span className="px-2 py-1 rounded bg-slate-800/80 text-[11px] font-bold text-gray-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-amber-500" /> Developmental Line Specialist
              </span>
              <span className="px-2 py-1 rounded bg-slate-800/80 text-[11px] font-bold text-gray-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-amber-500" /> Bestselling Author Consultant
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto text-center md:text-right">
            <button
              onClick={onOpenConsultation}
              className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult Stephanie Weldon</span>
            </button>
          </div>
        </div>

        {/* Interactive Search & Search Filters Console */}
        <div className="bg-slate-900/50 border border-gray-800 rounded-2xl p-4 md:p-6 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Live Search bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g., royalties, editing, marketing...)"
                className="w-full bg-[#131926] border border-gray-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>

            {/* Total count display */}
            <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Showing <b>{filteredArticles.length}</b> guides to help optimize SEO & indexation</span>
            </div>
          </div>

          {/* Tag Filter row */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-[#131926] text-gray-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main List Area (Cols 1 to 8) */}
          <div className="lg:col-span-8 space-y-6">
            {filteredArticles.length === 0 ? (
              <div id="no-results-insights" className="text-center py-16 bg-[#111622] rounded-2xl border border-gray-800 space-y-4">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-300">No publishing insights found</h3>
                <p className="text-gray-500 text-xs max-w-md mx-auto">
                  Try clearing your text filters or choosing a different tag category above to view our standard self-publishing manuals.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="text-xs font-black text-amber-500 hover:underline"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              filteredArticles.map((article) => {
                const isExpanded = expandedArticle === article.id;
                return (
                  <article
                    key={article.id}
                    id={`insight-card-${article.id}`}
                    className="bg-[#111622]/90 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-gray-700 transition-all duration-300 flex flex-col md:flex-row"
                  >
                    {/* Floating Thumbnail Photo */}
                    <div className="md:w-1/3 relative h-48 md:h-auto shrink-0 overflow-hidden bg-slate-920">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-amber-500/20">
                        {article.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-7 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        {/* Meta Data lines */}
                        <div className="flex flex-wrap gap-4 text-[11px] font-bold text-gray-400 font-mono items-center">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            {article.readTime}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            {article.date}
                          </span>
                        </div>

                        {/* Article Headings */}
                        <h3 className="text-lg md:text-xl font-bold leading-snug text-white hover:text-amber-400 transition-colors">
                          {article.title}
                        </h3>

                        {/* Article Excerpts */}
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Sub-Layout Content - Rendered if Expanded dynamically */}
                        {isExpanded && (
                          <div className="pt-4 mt-4 border-t border-gray-800 space-y-4 animate-fadeIn">
                            {article.content.map((paragraph, index) => (
                              <p key={index} className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                            
                            {/* Targeted SEO Keywords tag lists */}
                            <div className="pt-4 border-t border-gray-800/50 space-y-2">
                              <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold tracking-wider">Search Engine Optimized Index Fields</span>
                              <div className="flex flex-wrap gap-1.5">
                                {article.keywords.map((kw, i) => (
                                  <span key={i} className="text-[9px] font-semibold font-mono bg-slate-850 text-gray-400 border border-gray-800 px-2 py-0.5 rounded-md">
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                                                     {/* Expanded Call to Action inside article */}
                            <div className="mt-6 bg-[#161c2d] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between gap-4 flex-wrap">
                              <div className="space-y-1">
                                <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider">Interested in this topic?</h4>
                                <p className="text-[11px] text-gray-300">Request a complete complimentary feasibility review of your manuscript.</p>
                              </div>
                              <button
                                onClick={onOpenConsultation}
                                className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-[11px] uppercase tracking-wider px-4 py-2 rounded-lg transition-transform hover:scale-103"
                              >
                                Ask Stephanie Weldon About This
                              </button>
                            </div>      </div>
                          </div>
                        )}
                      </div>

                      {/* Expand / Collapse Button controls */}
                      <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">
                          By <span className="font-bold text-gray-200">{article.author}</span>
                        </span>
                        
                        <button
                          onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                          className="text-xs font-black text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Collapse Manual' : 'Read Full Index Manual'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Sidebar Area (Cols 9 to 12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sticky Professional Publisher FAQ Block */}
            <div className="bg-[#111622] border border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider font-mono border-b border-gray-800 pb-3 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Publishing FAQs</span>
              </h4>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <h5 className="font-black text-amber-400">Q: Can I keep 100% of my royalties?</h5>
                  <p className="text-gray-300 leading-relaxed">Yes. Perkins Publisher operates on a premium flat service fee layout. Unlike other companies, we take zero margin commissions on your books.</p>
                </div>
                
                <div className="space-y-1 pt-3 border-t border-gray-800/40">
                  <h5 className="font-black text-amber-400">Q: Who owns the intellectual property and copyright?</h5>
                  <p className="text-gray-300 leading-relaxed">The author maintains 100% legal copyright ownership. Everything we format and register is transferred directly under your name.</p>
                </div>

                <div className="space-y-1 pt-3 border-t border-gray-800/40">
                  <h5 className="font-black text-amber-400">Q: How do we reach physical brick-and-mortar retailers?</h5>
                  <p className="text-gray-300 leading-relaxed">We sync your finalized typography files, paper specs, and ISBN metadata into global wholesale databases (like IngramSpark) so stores can order stock locally.</p>
                </div>
              </div>
            </div>

            {/* Guaranteed Lead Injection Panel */}
            <div className="bg-gradient-to-br from-[#101423] to-[#151c33] border-2 border-amber-500/20 rounded-2xl p-5 md:p-6 text-center space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-5 h-5 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="font-extrabold text-white text-base">Ready to Get Published?</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Submit your draft specs or talk detailing your raw manuscript concepts. We will map out a global distribution and editing strategy today.
                </p>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                Launch Consultation Queue
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
