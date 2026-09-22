import { useState } from 'react';
import { 
  BookOpen, Sparkles, PenTool, CheckCircle, ArrowRight, DollarSign, 
  HelpCircle, ChevronDown, Award, Shield, Users, Mic, Layers, Star, 
  Clock, CheckSquare, Settings, FileText, Send, HelpCircle as HelpIcon, Play, Pause, ListTodo,
  Palette, Globe, Layout, Check, ShieldCheck, Bookmark, BookCheck, ExternalLink,
  Building2, Hash, ArrowUpRight, Share2, Compass, AlertCircle
} from 'lucide-react';

interface DynamicServicePageProps {
  serviceId: string;
  onOpenConsultation: (serviceId: string) => void;
  onNavigate: (page: string) => void;
}

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  stat1: string;
  stat2: string;
  stat3: string;
  features: string[];
  process: Array<{ step: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
  authorSpotlight: string;
  editorialDeepDive: {
    headline: string;
    badge: string;
    paragraphs: string[];
  };
  techSpecs: Array<{ label: string; value: string }>;
  companionServices: Array<{ id: string; name: string; tag: string }>;
  relatedGuides: Array<{ id: string; title: string; excerpt: string; readTime: string }>;
}

export default function DynamicServicePage({
  serviceId,
  onOpenConsultation,
  onNavigate
}: DynamicServicePageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Custom configuration for each of the 13 key service lines
  const getServiceData = (id: string): ServiceData => {
    switch (id) {
      case 'ghostwriting':
        return {
          title: 'Premium Book Ghostwriting Services',
          subtitle: 'Collaborate with New York Times Bestselling Authors',
          description: 'Turn your life achievements, corporate frameworks, or visionary narrative into a commercially competitive book. We pair you with an elite ghostwriter in your specific genre who captures your authentic voice through structured interview sprints, drafts chapter outlines, and delivers a turn-key manuscript with 100% intellectual property ownership.',
          tagline: 'CAPTURING YOUR BRAINPOWER, INKED TO PERFECTION.',
          stat1: '140+ Books Ghostwritten',
          stat2: '18 NYT Bestsellers',
          stat3: '100% Confidential (NDA)',
          features: [
            'Collaborative development of a detailed chapter-by-chapter outline and narrative blueprint',
            'Weekly 1-on-1 voice extraction interviews to record your authentic tone, stories, and frameworks',
            'Elite developmental writing by veteran authors with major New York and London publishing credits',
            'Comprehensive developmental editing, style sheets, and unlimited structural revision rounds',
            'Ironclad non-disclosure agreement (NDA): you retain 100% of the authorship credit, copyrights, and royalties'
          ],
          process: [
            { step: '01', title: 'Deep Extraction Session', desc: 'A 3-hour collaborative interview to unpack your thesis, target reader persona, tone of voice, and master narrative arc.' },
            { step: '02', title: 'Chapter Outline Map', desc: 'A comprehensive, chapter-by-chapter developmental roadmap highlighting core themes, pacing, anecdotes, and research targets.' },
            { step: '03', title: 'Drafting & Weekly Reviews', desc: 'Your dedicated writer develops the book in structured blocks of 10,000 words, reviewed and refined by you weekly.' },
            { step: '04', title: 'Final Editorial Polish', desc: 'Our senior developmental editors review the completed manuscript to refine style, pace, rhythm, and commercial publishing readiness.' }
          ],
          faqs: [
            { q: 'Will my name be on the cover?', a: 'Yes, 100%. You are the sole author of the book. Our role is strictly confidential under binding legal non-disclosure agreements. No ghostwriter name or agency watermark will ever appear unless you explicitly desire a co-author credit.' },
            { q: 'How long does the complete ghostwriting process take?', a: 'A standard non-fiction or business book (50,000 to 65,000 words) typically requires 12 to 16 weeks of structured collaborative sprints. Accelerated timelines of 8 to 10 weeks are available for time-sensitive corporate launches.' },
            { q: 'Who owns the copyright, film rights, and royalties?', a: 'You retain 100% of all intellectual property, worldwide translation rights, adaptation rights, and 100% of book royalties. Perkins Publisher operates on a flat service fee with zero royalty deduction.' },
            { q: 'How do you capture my personal speaking and writing voice?', a: 'Through our proprietary Voice Replication Protocol. We record your spoken interviews, analyze your prior speeches, articles, and emails, and compile a custom Voice Syntax Matrix before writing a single chapter.' },
            { q: 'Can I request revisions if a chapter does not feel right?', a: 'Yes. Every chapter delivery includes collaborative revision loops. Your dedicated ghostwriter continues refining the prose until you are 100% delighted with every paragraph.' }
          ],
          authorSpotlight: 'Coached by Stephanie Weldon, our ghostwriting program matches you with writers who have written for major publishers including Penguin Random House, HarperCollins, and Simon & Schuster.',
          editorialDeepDive: {
            headline: 'The Perkins Ghostwriting Methodology & Voice Replication Architecture',
            badge: 'Editorial Excellence Protocol',
            paragraphs: [
              'Writing an impactful book is one of the most effective ways to establish definitive authority, yet high-performing CEOs, physicians, founders, and thought leaders rarely have the 400+ uninterrupted hours required to craft a 60,000-word manuscript. Perkins Publisher solves this through our structured Collaborative Sprint Model, capturing your lifetime of expertise with minimal demand on your busy schedule.',
              'Unlike impersonal gig platforms where anonymous freelancers churn out generic filler text, every Perkins ghostwriter is a published author with verified major press credits. We operate under strict Work-for-Hire legal agreements governed by European Union and United States copyright law, ensuring that every word, outline, character, and framework created belongs exclusively to you from the moment it is recorded.',
              'Our process begins with intensive narrative architecture: defining the core thesis, sequencing chapters for maximum retention, and building emotional resonance. Through weekly recorded voice extraction sessions, we translate your natural cadence, idioms, and strategic philosophy into polished literary prose that sounds authentically and undeniably like you.',
              'Once drafting concludes, your manuscript transitions seamlessly to our senior developmental editing desk, where Chicago Manual of Style (CMOS 17th Edition) guidelines are applied to guarantee flawless pacing, logical transitions, and institutional publishing readiness.'
            ]
          },
          techSpecs: [
            { label: 'Deliverable Formats', value: 'Complete 50,000–80,000 Word Manuscript in DOCX, Clean Print PDF & EPUB' },
            { label: 'Standard Turnaround', value: '12 to 16 Weeks (Accelerated 8-Week Sprint Available)' },
            { label: 'Copyright & Royalties', value: '100% Author-Owned (Work-For-Hire / Zero Royalties Retained)' },
            { label: 'Confidentiality', value: 'Comprehensive Blind NDA (Mutual Non-Disclosure Agreement)' },
            { label: 'Quality Standard', value: 'Chicago Manual of Style (CMOS 17th) & New York Times Bestseller Calibre' }
          ],
          companionServices: [
            { id: 'editing', name: 'Developmental Editing & Proofreading', tag: 'Next Step: Refine & Polish' },
            { id: 'cover-design', name: 'Custom Cover Design & Typesetting', tag: 'Next Step: Visual Packaging' },
            { id: 'publishing', name: 'Turnkey Book Publishing & Distribution', tag: 'Final Step: Global Shelves' }
          ],
          relatedGuides: [
            { id: 'ghostwriting-contracts', title: 'Bestseller Ghostwriting: Legal Checklists & NDA Protections', excerpt: 'Understand how elite biographers and ghostwriters collaborate under secure non-disclosure agreements, preserving your sole authorship.', readTime: '9 min read' },
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Navigate global distribution, international ISBN rules, and multi-currency royalties in EUR, GBP, and USD.', readTime: '14 min read' }
          ]
        };

      case 'editing':
        return {
          title: 'Elite Developmental Editing & Proofreading',
          subtitle: 'Refine Your Manuscript for Global Literary Success',
          description: 'Every modern classic undergoes rigorous, multi-pass editorial surgery. Our senior editors—former directors at major New York and London publishing houses—dissect your manuscript to enhance narrative pacing, argument structure, character depth, sentence rhythm, and microscopic typographic precision.',
          tagline: 'CRAFTING FLAWLESS TEXT, PARAGRAPH BY PARAGRAPH.',
          stat1: '520+ Manuscripts Refined',
          stat2: 'Former NYT Editors',
          stat3: 'Two-Round Proofing',
          features: [
            'Comprehensive developmental evaluation checking narrative arc, chapter balance, and core thesis clarity',
            'Line-by-line stylistic copyediting to refine sentence flow, tone vocabulary, active voice, and readability',
            'Rigorous final proofreading round targeting punctuation, typographic alignment, hyphenation, and typesetting anomalies',
            'Exhaustive 10+ page Editorial Assessment Letter summarizing structural strengths and chapter-by-chapter recommendations',
            'Direct 1-on-1 collaborative consultation calls with your senior editor to review margin annotations'
          ],
          process: [
            { step: '01', title: 'Editorial Assessment', desc: 'An initial read-through of your manuscript to evaluate tone, narrative scope, pacing, and developmental gaps.' },
            { step: '02', title: 'Developmental Edit Pass', desc: 'Deep restructuring, margin annotations, flow enhancements, and detailed chapter-by-chapter structural letters.' },
            { step: '03', title: 'Line Editing & Polish', desc: 'Fine-tuning of prose, word choices, syntactical clarity, paragraph transitions, and pacing metrics.' },
            { step: '04', title: 'Final Proofing', desc: 'A meticulous final read-through to trap lingering grammatical, spelling, formatting, and typographic errors.' }
          ],
          faqs: [
            { q: 'What is the difference between line editing and developmental editing?', a: 'Developmental editing examines the macroscopic architecture—pacing, logical flow, thematic coherence, and structure. Line editing focuses on the craft of the sentence—clarity, vocabulary, active voice, and rhythmic reading. Proofreading is the final sweep catching microscopic typos and punctuation errors.' },
            { q: 'Can you edit manuscripts in any genre?', a: 'Yes. We maintain specialized editorial teams for Business & Leadership, Memoirs, Literary Fiction, Science Fiction & Fantasy, Mystery/Thrillers, Academic Non-Fiction, and Self-Help.' },
            { q: 'What style guide do your editors follow?', a: 'We strictly adhere to The Chicago Manual of Style (CMOS 17th Edition), which is the universal gold standard for commercial book publishing in the United States, United Kingdom, and Europe.' },
            { q: 'How long does a full editorial pass take?', a: 'Typically 3 to 5 weeks depending on manuscript word count and developmental complexity. Express 2-week turns are available upon request.' },
            { q: 'Do I get to review all changes before they are finalized?', a: 'Yes. All edits are delivered in Microsoft Word with Track Changes enabled, giving you total authority to accept or reject each suggestion.' }
          ],
          authorSpotlight: 'Led by chief editorial supervisor Zhana Xuere, our editorial team has combined experience of over 40 years preparing manuscripts for bestselling status.',
          editorialDeepDive: {
            headline: 'The Chicago Manual of Style (CMOS 17th Edition) Protocol',
            badge: 'Institutional Editorial Rigor',
            paragraphs: [
              'A manuscript submitted directly from an author’s desktop rarely meets the rigorous visual and syntactical standards of commercial bookstores. Readers subconsciously detect clumsy line transitions, inconsistent capitalization, dialogue punctuation flaws, and pacing dips. Perkins Publisher enforces a two-round editorial system identical to the Big 5 publishing conglomerates.',
              'Our editors do not merely correct typos; we dissect the psychological relationship between your prose and the reader. During the developmental stage, we scrutinize character motivation in fiction and the evidentiary scaffolding of non-fiction arguments, identifying narrative lag before your book reaches print.',
              'During the line-editing phase, we optimize syntactic rhythm and sentence variety, eliminating passive voice constructions and tightening bloated paragraphs by 15% to 25% without sacrificing your unique voice. Finally, our proofreaders audit your text against CMOS 17th and Merriam-Webster’s Collegiate Dictionary standards, guaranteeing institutional credibility.'
            ]
          },
          techSpecs: [
            { label: 'Style Authority', value: 'The Chicago Manual of Style (CMOS 17th Edition) & Merriam-Webster' },
            { label: 'Turnaround Time', value: '3 to 5 Weeks (Express 14-Day Delivery Available)' },
            { label: 'Deliverables', value: 'Tracked Changes DOCX, Clean Clean-Copy DOCX & Comprehensive Editorial Letter' },
            { label: 'Revisions', value: 'Full Author Query Resolution & Post-Author Revision Audit' },
            { label: 'Editorial Team', value: 'Former Big 5 Senior Editors with 15+ Years Industry Tenure' }
          ],
          companionServices: [
            { id: 'cover-design', name: 'Custom Book Cover Design & Interior Typesetting', tag: 'Next Step: Typography & Wrap' },
            { id: 'publishing', name: 'Turnkey Book Publishing & Global Distribution', tag: 'Next Step: Global Distribution' },
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Launch Step: Reader Acquisition' }
          ],
          relatedGuides: [
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Learn the exact steps to format your interior pages, purchase official ISBNs, and configure metadata.', readTime: '12 min read' },
            { id: 'costs-breakdown', title: 'The Comprehensive Self-Publishing Cost & Pricing Sheet', excerpt: 'Review transparent breakdowns of editorial budgets, cover designs, typesetting, and printing costs.', readTime: '11 min read' }
          ]
        };

      case 'book-design':
      case 'cover-design':
        return {
          title: 'Custom Book Cover Design & Interior Typesetting',
          subtitle: 'Award-Winning Graphic Design for Hardcovers, Paperbacks & Digital Editions',
          description: 'Your cover is an author’s single most influential marketing asset. Our award-winning art directors craft striking jacket wrappers, mathematically precise spine calculations, custom typography, and interior book formatting that captivate readers both on physical retail tables and in Amazon search thumbnails.',
          tagline: 'DESIGNS THAT ARREST ATTENTION. INTERIORS CRAFTED FOR READABILITY.',
          stat1: '480+ Bestseller Covers Crafted',
          stat2: '3 Custom Visual Directions',
          stat3: '100% Print-Wrap Precision',
          features: [
            '3 distinct conceptual cover design directions created after deep genre and comp-title market research',
            'Full print-ready jacket wraps (Front, Spine, and Back cover with barcode and synopsis typography)',
            'Mathematical spine thickness calculations matched to your exact page count and paper stock (50lb vs 70lb)',
            'Interior typesetting and page layout with custom drop caps, section breaks, and running headers',
            'Photorealistic 3D vector book mockups for social media promotions, Kickstarter, and Amazon A+ detail pages'
          ],
          process: [
            { step: '01', title: 'Creative Brief & Analysis', desc: 'Analyzing your book’s tone, themes, target demographic, and bestselling comp titles in your category.' },
            { step: '02', title: '3 Visual Concept Directions', desc: 'Developing three divergent artistic directions (illustrative, typographic, and cinematic) for your review.' },
            { step: '03', title: 'Full Wrap & Spine Math', desc: 'Engineering mathematically exact spine widths, bleeds, and crop marks for Amazon KDP and IngramSpark.' },
            { step: '04', title: 'Interior Typesetting', desc: 'Formatting interior page layouts, margin gutters, chapter titles, and export to print-ready PDF and EPUB.' }
          ],
          faqs: [
            { q: 'Do I get the source files and commercial copyright?', a: 'Yes. You receive 100% full commercial copyright ownership and all final high-resolution files (layered PSD, print-ready PDF, and digital formats).' },
            { q: 'How do you determine spine thickness?', a: 'Spine thickness is calculated using exact paper caliper formulas based on your final page count and chosen paper stock (e.g., 50# cream vs 50# white).' },
            { q: 'Can you work with my existing illustration or photography?', a: 'Yes. Our senior designers can incorporate, retouch, color-grade, and elevate your personal assets to meet commercial standards.' },
            { q: 'What trim sizes do you support?', a: 'We support all industry standard trim sizes: 5.5" x 8.5" (trade fiction), 6" x 9" (non-fiction/bestseller), 7" x 10" (executive), 8.5" x 11" (illustrated/workbooks), and custom European metric dimensions.' },
            { q: 'Will the cover look clear as a tiny Amazon thumbnail?', a: 'Yes. Every design direction is tested at 120-pixel thumbnail scale to ensure title typography and visual focal points remain razor-sharp on mobile screens.' }
          ],
          authorSpotlight: 'Coordinated by senior art director Stephanie Weldon, our cover designs have earned accolades from independent publishing associations and top industry awards.',
          editorialDeepDive: {
            headline: 'Mathematical Spine Caliper & CMYK Visual Psychology Standards',
            badge: 'Visual Engineering Matrix',
            paragraphs: [
              'In modern retail, a book cover has exactly 1.2 seconds to capture a browsing reader’s attention on Amazon or Waterstones tables. Cheap freelance templates fail because they ignore the visual hierarchy required for thumbnail legibility and paper caliper physics.',
              'At Perkins Publisher, our art department begins with competitive genre auditing: analyzing the top 100 bestsellers in your subcategory to extract color psychology cues, font weight trends, and compositional spacing. We then craft three completely divergent design concepts—ranging from bold minimalist typography to cinematic photomanipulation.',
              'Physical printing requires zero margin for error. A spine that is off by even 0.5 millimeters causes title drift and unsightly fold lines. We calibrate spine width to exact paper manufacturer specs (e.g., 444 PPI for 50# cream, 500 PPI for 50# white), adding 0.125" full-bleed buffers and CMYK color profiles to ensure the physical book in your hands matches your digital proof flawlessly.'
            ]
          },
          techSpecs: [
            { label: 'Color Space & Resolution', value: 'CMYK (FOGRA39 / GRACoL) at 300+ DPI with Vector Typography' },
            { label: 'Spine Calibration', value: 'Calculated to 0.001" based on page count, paper PPI, and binding type' },
            { label: 'Interior Formats', value: 'Print-Ready PDF/X-1a with Crop Marks & Reflowable EPUB 3.0' },
            { label: 'Included Deliverables', value: 'Hardcover Dust Jacket, Paperback Full Wrap, E-Book JPEG, 3D Mockups' },
            { label: 'Copyright', value: '100% Commercial Rights Buyout (Zero Licensing Restrictions)' }
          ],
          companionServices: [
            { id: 'publishing', name: 'Turnkey Book Publishing & Global Distribution', tag: 'Next Step: Distribute Title' },
            { id: 'kdp', name: 'Amazon KDP Self-Publishing & Distribution', tag: 'Next Step: Upload to Amazon' },
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Next Step: Drive Book Sales' }
          ],
          relatedGuides: [
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Master gutter margin calculations, full bleed setups, and CMYK color modes for physical printing.', readTime: '12 min read' },
            { id: 'costs-breakdown', title: 'The Comprehensive Self-Publishing Cost & Pricing Sheet', excerpt: 'Understand realistic pricing for custom cover artwork, interior typesetting, and proof copies.', readTime: '11 min read' }
          ]
        };

      case 'publishing':
        return {
          title: 'Turnkey Book Publishing & Global Distribution',
          subtitle: 'From Raw Manuscript to Global Physical & Digital Bookstore Shelves',
          description: 'Take full command of your publishing journey. We handle every technical, administrative, and legal requirement to publish your paperback, collector hardcover, and digital eBook across 40,000+ bookstores, libraries, and online portals worldwide—while you retain 100% of your royalties and rights.',
          tagline: 'TOTAL INDEPENDENCE. WORLDWIDE REACH. 100% ROYALTIES.',
          stat1: '1,400+ Titles Distributed',
          stat2: '40,000+ Bookstores & Libraries',
          stat3: '100% Royalties to Author',
          features: [
            'Global wholesale catalog distribution via IngramSpark, Amazon KDP, Barnes & Noble, and Apple Books',
            'Official 13-digit Bowker & European ISBN assignments registered under your custom publishing imprint',
            'Full legal deposit compliance with the British Library (UK) and National Library of Malta (EU)',
            'Complete print-on-demand (POD) setup in the US, UK, Germany, Australia, and 195+ countries',
            '100% direct royalty setup: retailer payouts flow straight into your bank account with zero cuts'
          ],
          process: [
            { step: '01', title: 'Imprint & ISBN Setup', desc: 'Registering your custom publishing imprint, purchasing official 13-digit ISBN blocks, and generating retail barcodes.' },
            { step: '02', title: 'Distribution Onboarding', desc: 'Integrating your title into the Ingram Global Catalog, Amazon KDP, and international digital distributors.' },
            { step: '03', title: 'Metadata Optimization', desc: 'Assigning targeted BISAC codes and high-converting keyword metadata for maximum search discoverability.' },
            { step: '04', title: 'Global Launch Push', desc: 'Authorizing global availability, coordinating initial physical proof copies, and activating live retail orders.' }
          ],
          faqs: [
            { q: 'How do bookstores and libraries order my book?', a: 'Your title is made available through the Ingram Wholesale Catalog, allowing brick-and-mortar bookstores and libraries worldwide to order directly at standard trade discounts.' },
            { q: 'Do you take any percentage of my book royalties?', a: 'Zero. Perkins Publisher operates on a transparent service-for-hire model. You keep 100% of all royalties, retail revenues, and intellectual property.' },
            { q: 'Can I order author copies at cost?', a: 'Yes! You can order print copies directly from the printing plant at raw wholesale print costs (typically $3 to $6 per book) with no markups.' },
            { q: 'What is legal deposit and do you handle it?', a: 'Legal deposit is a statutory requirement to submit copies of published books to national libraries. We manage all legal filings with the British Library (UK) and National Library of Malta (EU).' },
            { q: 'How are retail royalties paid to me?', a: 'Amazon KDP, IngramSpark, and Apple Books pay you directly each month via direct bank deposit (SEPA, BACS, or ACH). Perkins Publisher never touches your sales revenue.' }
          ],
          authorSpotlight: 'Our publishing team ensures your book adheres to the exact same production specifications as the Big 5 traditional publishing imprints.',
          editorialDeepDive: {
            headline: 'The Global Ingram Wholesaler & Bowker ISBN Aggregation System',
            badge: 'Global Distribution Infrastructure',
            paragraphs: [
              'Most authors believe self-publishing is restricted to Amazon. In reality, modern publishing technology enables independent authors to access the exact same international distribution pipelines utilized by Penguin Random House and HarperCollins. Through Perkins Publisher, your book is integrated into the Ingram Wholesale Network, opening inventory access to 40,000+ bookstores, universities, and public libraries across North America, Europe, the UK, and Australasia.',
              'We assign official 13-digit ISBN blocks from Bowker (US) and European agencies under your custom publishing imprint. Unlike "free" ASINs from Amazon that brand Amazon as the publisher of record, our imprints preserve your complete executive independence and make your book eligible for review in Publishers Weekly, Kirkus, and Library Journal.',
              'Our European headquarters in Għajnsielem, Malta ensures seamless compliance with European Union copyright directives and British Library legal deposit mandates, positioning your book for simultaneous physical launch in London, New York, Berlin, Sydney, and international markets.'
            ]
          },
          techSpecs: [
            { label: 'Distribution Reach', value: '40,000+ Bookstores, Libraries & Online Retailers (Ingram + KDP)' },
            { label: 'ISBN Registration', value: 'Official 13-Digit Bowker & European ISBNs under Custom Imprint' },
            { label: 'Royalty Payouts', value: '100% Direct Payouts to Author (EUR €, GBP £, USD $) via Bank Direct Deposit' },
            { label: 'Legal Deposit', value: 'British Library (London) & National Library of Malta Statutory Filings' },
            { label: 'Author Wholesale Pricing', value: 'Order Author Copies at Raw Print Cost (~$3.40 to $5.80 / copy)' }
          ],
          companionServices: [
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Launch Step: Acquire Readers' },
            { id: 'audiobook', name: 'Audiobook Voice Casting & ACX Mastering', tag: 'Expansion: Audio Edition' },
            { id: 'pr-branding', name: 'Author PR & Personal Branding Blueprint', tag: 'Authority: Media Placements' }
          ],
          relatedGuides: [
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Comprehensive guide covering EU ISBNs, VAT compliance, and multi-currency royalties in EUR, GBP, and USD.', readTime: '14 min read' },
            { id: 'register-eu-isbn', title: 'How to Register an EU ISBN & British Library Legal Deposit', excerpt: 'Step-by-step instructions for acquiring valid 13-digit European ISBNs and assigning custom imprints.', readTime: '8 min read' }
          ]
        };

      case 'distribution':
      case 'book-distribution':
        return {
          title: 'Global Book Distribution Services',
          subtitle: 'Physical & Digital Distribution Across 40,000+ Retailers Worldwide',
          description: 'Place your print paperback, hardcover, and digital editions directly into physical bookstores, public libraries, university catalogs, and online retail networks worldwide. Through our integrations with Ingram Content Group, Amazon KDP, Baker & Taylor, and international bibliographic databases (Nielsen, Thorpe-Bowker, VLB), we ensure any bookseller in the world can order your title with standard commercial trade discounts while you retain 100% of your net royalties.',
          tagline: 'PHYSICAL BOOKSTORE REACH. GLOBAL WHOLESALE CATALOGS. 100% RETAINED ROYALTIES.',
          stat1: '40,000+ Retailers & Libraries',
          stat2: '195+ Countries Reached',
          stat3: '100% Net Royalty Retention',
          features: [
            'Worldwide wholesale catalog placement through Ingram Content Group, Baker & Taylor, and Gardners UK',
            'Full retail catalog feeds to Waterstones, Barnes & Noble, Dymocks, Thalia, Foyles, and independent bookshops',
            'Standard trade discount configuration (35% to 55%) tailored for physical bookstore stock orders',
            'Returns management policy setup allowing physical bookstores to order your title risk-free',
            'OverDrive, Hoopla, and Bibliotheca integration placing your eBook and audiobook into public libraries worldwide'
          ],
          process: [
            { step: '01', title: 'Catalog Metadata Registration', desc: 'Registering official 13-digit ISBNs, BIC/THEMA subject classification codes, and comprehensive metadata across global bibliographic feeds (Nielsen, Bowker, VLB).' },
            { step: '02', title: 'Wholesale Discount Strategy', desc: 'Structuring your retail list price and wholesale discount margin (35%–55%) to maximize author profit margins while incentivizing physical bookstore orders.' },
            { step: '03', title: 'Global POD Facility Integration', desc: 'Syncing print-ready PDF files with automated print-on-demand facilities in North America, the UK, Europe, and Australia for 48-hour order fulfillment.' },
            { step: '04', title: 'Retail & Library Activation', desc: 'Pushing your title live on global retailer dashboards, library ordering systems, and author royalty payout accounts.' }
          ],
          faqs: [
            { q: 'How does physical bookstore distribution work for independent authors?', a: 'Physical bookstores order through wholesale aggregators like Ingram Content Group and Baker & Taylor. We register your title in these master catalogs with standard commercial discount structures and returnable status, allowing any bookstore manager worldwide to order your book into their store.' },
            { q: 'Can my book be stocked in physical stores like Waterstones or Barnes & Noble?', a: 'Yes. Your title is fully orderable through their internal point-of-sale systems. When readers walk into a Waterstones, Barnes & Noble, or local indie bookstore, the staff can look up your ISBN and order copies directly for in-store pickup.' },
            { q: 'What is the difference between Amazon distribution and IngramSpark distribution?', a: 'Amazon KDP primarily fulfills orders placed on Amazon marketplaces. Ingram Content Group is the world\'s largest wholesale book distributor, connecting your book to 40,000+ independent bookstores, major retail chains, universities, and public libraries globally.' },
            { q: 'How do libraries order and lend my book?', a: 'We distribute your digital editions to OverDrive, Libby, and Hoopla, and your print editions through Baker & Taylor and Ingram Library Services, enabling municipal and university libraries to license and catalog your book.' },
            { q: 'How are royalties collected and distributed?', a: 'All royalties from retail and wholesale channels are paid directly to your designated bank account (in EUR, GBP, or USD). Perkins Publisher never takes a percentage of your wholesale or retail royalties.' }
          ],
          authorSpotlight: 'Our global distribution network places titles in premier bookstores, airport retailers, and academic libraries across the UK, Europe, North America, Australia, and Asia.',
          editorialDeepDive: {
            headline: 'The Global Book Distribution Architecture: Wholesale Feeds & Retail Mechanics',
            badge: 'Global Retail Infrastructure',
            paragraphs: [
              'Many self-publishing authors make the mistake of relying solely on Amazon. While Amazon is essential for retail consumer search, true author credibility and international market penetration require full wholesale distribution to independent bookshops, chain retailers, libraries, and schools.',
              'Physical bookstores do not buy books from retail websites; they order through centralized wholesale data feeds like Ingram Content Group, Gardners, and Baker & Taylor. To be viable for physical retail shelving, a title must have an official 13-digit ISBN, precise THEMA/BISAC categorization, a standard commercial trade discount (typically 40% to 55%), and an explicit returns policy.',
              'Perkins Publisher configures your title across both print-on-demand (POD) networks and global wholesale catalogs. This hybrid distribution architecture guarantees that whether a customer orders on Amazon.de in Berlin, requests your hardcover at Waterstones in Piccadilly London, or borrows your eBook through the Libby app at a Sydney public library, the fulfillment is handled automatically with zero inventory overhead or warehouse fees.'
            ]
          },
          techSpecs: [
            { label: 'Wholesale Catalog Reach', value: 'Ingram Content Group, Baker & Taylor, Gardners, Nielsen BookData, VLB' },
            { label: 'Retail Chains Orderable', value: 'Waterstones, Barnes & Noble, Dymocks, Thalia, Indigo, Foyles, Easons' },
            { label: 'Digital & Library Networks', value: 'OverDrive, Libby, Hoopla, Apple Books, Kobo, Google Play, Amazon' },
            { label: 'Print Fulfillment', value: 'Automated 48-Hour Global POD in US, UK, EU, and Australia' },
            { label: 'Royalty Model', value: '100% Net Wholesale Royalties Paid Directly to Author' }
          ],
          companionServices: [
            { id: 'publishing', name: 'Turnkey Book Publishing & Global Distribution', tag: 'Prerequisite: Full Publishing' },
            { id: 'cover-design', name: 'Custom Book Cover Design & Interior Typesetting', tag: 'Step: Print-Ready Formats' },
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Next Step: Store Outreach' }
          ],
          relatedGuides: [
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Navigate global distribution, international ISBN rules, and multi-currency royalties in EUR, GBP, and USD.', readTime: '14 min read' },
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Learn the exact steps to format your interior pages and configure print-on-demand networks.', readTime: '12 min read' }
          ]
        };

      case 'kdp':
        return {
          title: 'Amazon KDP Self-Publishing & Distribution',
          subtitle: 'Bypass Traditional Gatekeepers and Dominate Amazon KDP',
          description: 'Take full control of your publishing destiny. We manage the entire Amazon Kindle Direct Publishing (KDP) process from book registration to layout formatting, categories configuration, A+ content development, metadata search optimization, and direct global distribution.',
          tagline: 'YOUR BOOK ON THE WORLD\'S BIGGEST BOOKSTORE, STRESS-FREE.',
          stat1: '1,200+ KDP Setup Successes',
          stat2: '100% Royalty Retention',
          stat3: '40,000+ Distribution Reach',
          features: [
            'Direct account setup on Amazon KDP, IngramSpark, Apple Books, and Barnes & Noble',
            'Professional interior layout formatting for paperback, hardcover, and digital e-book formats',
            'Exhaustive Amazon keyword research, target category mapping, and search tag optimization',
            'Beautiful custom Amazon A+ Detail Content pages to increase mobile sales conversions',
            'ISBN purchase registration and formal United States Copyright Office catalog filings'
          ],
          process: [
            { step: '01', title: 'Manuscript Prep & Audit', desc: 'Analyzing your final manuscript to establish correct trim sizes, gutter margins, and chapter heading structures.' },
            { step: '02', title: 'Typesetting & Formatting', desc: 'Creating elegant interior typography layouts in PDF print-ready formats and globally responsive EPUB files.' },
            { step: '03', title: 'Metadata Optimization', desc: 'Researching low-competition, high-search-volume keywords and specialized category codes to secure high ranks.' },
            { step: '04', title: 'Platform Launch', desc: 'Direct upload administration, configuring royalty percentages, establishing distribution, and pushing live.' }
          ],
          faqs: [
            { q: 'Who gets paid the royalties?', a: 'Amazon pays royalties directly to your bank account. Perkins Publisher takes 0% of your royalties. You receive 100% of the platform payouts.' },
            { q: 'Can I print physical hardcover copies of my book?', a: 'Yes! Amazon KDP and IngramSpark support premium print-on-demand hardcovers with dust jackets or case-laminate binding.' },
            { q: 'What is global distribution?', a: 'It makes your book available to over 40,000 libraries, indie bookstores, and international retailers through Ingram’s global catalog.' },
            { q: 'What is Amazon A+ Content?', a: 'Amazon A+ Content is rich visual marketing added to your book page featuring 3D mockups, editorial quotes, chapter previews, and comparison charts that boost conversion rates by 25% to 40%.' },
            { q: 'How do you choose categories and keywords?', a: 'We use proprietary Amazon algorithmic tools to identify low-competition, high-velocity subcategories where your book can achieve a #1 Bestseller badge with modest sales.' }
          ],
          authorSpotlight: 'Our Kindle SEO strategists specialize in mapping algorithms so your book ranks for organic buyer search queries from day one.',
          editorialDeepDive: {
            headline: 'Amazon A9 & COSMO Algorithm Optimization Architecture',
            badge: 'Algorithmic Optimization Matrix',
            paragraphs: [
              'Amazon is not just a bookstore; it is the world’s third-largest search engine, processing hundreds of millions of product searches daily. Ranking on Amazon requires understanding its search algorithms (A9 and the newer COSMO contextual neural matching), which rank books based on keyword relevance, click-through rate, and sales velocity.',
              'Most authors waste their 7 KDP keyword slots by entering generic words like "business" or "leadership," pitting themselves against 300,000 competing titles. Perkins Publisher engineers high-intent long-tail keyword strings—phrases that real buyers type with credit card in hand (e.g., "executive leadership coaching for corporate directors").',
              'We also perform deep category arbitrage, mapping your title into 3 to 10 hyper-targeted subcategories where competing daily sales thresholds are low enough to secure the coveted orange "#1 Bestseller" or "#1 New Release" ribbon, triggering Amazon’s organic recommendation engine to promote your book to lookalike buyers.'
            ]
          },
          techSpecs: [
            { label: 'Amazon Royalties', value: '70% on E-Books ($2.99–$9.99) / 60% on Print minus printing cost' },
            { label: 'File Standards', value: 'Validated EPUB 3.0, KPF Kindle Package & CMYK 300 DPI Print PDF' },
            { label: 'A+ Detail Modules', value: 'Up to 5 Custom Visual Content Modules with 3D Mockups and Reviews' },
            { label: 'Search Keyword Slots', value: '7 Algorithmic Long-Tail Keyword Phrases (250+ characters optimized)' },
            { label: 'Category Placements', value: 'Direct Placement in 3 to 10 Verified Low-Competition Sub-Categories' }
          ],
          companionServices: [
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Launch Step: Amazon PPC Ads' },
            { id: 'cover-design', name: 'Custom Book Cover Design & Interior Typesetting', tag: 'Asset Step: 3D Mockups' },
            { id: 'audiobook', name: 'Audiobook Voice Casting & ACX Mastering', tag: 'Expansion: Audible Distribution' }
          ],
          relatedGuides: [
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Learn the exact steps to format interior pages, configure search tags, and push live on KDP.', readTime: '12 min read' },
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Outrank rival publications on Amazon. Master keyword matchmaking and category rank spikes.', readTime: '15 min read' }
          ]
        };

      case 'business':
        return {
          title: 'Business & Authority Book Publishing',
          subtitle: 'The Ultimate Marketing Tool for CEOs, Coaches, & Founders',
          description: 'A premium physical book is the single most powerful business card in the world. We specialize in helping entrepreneurs, founders, consultants, and speakers plan, write, and launch authority-building business books that command high-ticket client signatures, premium speaking fees, and massive industry prestige.',
          tagline: 'DO NOT JUST BUILD A BUSINESS. PUBLISH YOUR INDUSTRY STANDARD.',
          stat1: '180+ Authority Books Published',
          stat2: 'High-Conversion Lead Pipeline',
          stat3: 'Instant Industry Prestige',
          features: [
            'Direct guidance on structuring your book as a premium lead generation asset',
            'Niche positioning frameworks targeting high-intent corporate executives and buyers',
            'Stately interior typography, custom business models, charts, and structural diagrams',
            'Coordinated launch strategies focused on securing #1 Amazon Bestseller categories',
            'Strategic consulting on leveraging your book to book premium podcasts and speaking gigs'
          ],
          process: [
            { step: '01', title: 'Authority Alignment', desc: 'Mapping your backend business offers (consulting, SaaS, coaching) directly to the chapters of your book.' },
            { step: '02', title: 'Concept Formulation', desc: 'Developing a highly clickable, highly indexable title, subtitle, and hook targeted at solving core corporate challenges.' },
            { step: '03', title: 'Structure & Production', desc: 'Drafting, editing, and formatting your insights with clean, executive visual styling, layouts, and professional diagrams.' },
            { step: '04', title: 'Bestseller Authority Launch', desc: 'Securing the category rankings, press releases, and client-facing landing page formats to optimize conversions.' }
          ],
          faqs: [
            { q: 'How does a book generate clients for my business?', a: 'By establishing you as the definitive expert. We design your book to include high-value opt-in gifts, case study references, and direct pathways for readers to schedule consultation calls with your team.' },
            { q: 'Do I need to be a great writer to publish a business book?', a: 'Not at all. Our team handles the heavy lifting through collaborative interviews, structured ghostwriting, and intensive developmental formatting.' },
            { q: 'Can I write off the publishing costs as a business expense?', a: 'Yes, most founders and businesses classify book production as a primary marketing and client acquisition expense.' },
            { q: 'How do I distribute books to prospective clients?', a: 'We set up author wholesale ordering so you can order physical paperbacks or hardcovers at cost (~$3.50 each) and mail them directly to prospective corporate buyers.' },
            { q: 'Can I turn my book into a corporate training program?', a: 'Yes. We frequently format business books alongside executive workbooks, slide decks, and workshop curriculum guides.' }
          ],
          authorSpotlight: 'We have published books for founders, venture capitalists, corporate trial attorneys, and medical directors worldwide, facilitating millions in backend deals.',
          editorialDeepDive: {
            headline: 'The Executive Authority Pipeline & Backend Lead Monetization Framework',
            badge: 'B2B Authority Architecture',
            paragraphs: [
              'For business leaders, a book is not primarily a royalty stream—it is the highest-converting client acquisition asset in existence. While a business card is discarded and a cold email is ignored, a beautifully bound hardcover book sits permanently on the desk of decision-makers.',
              'At Perkins Publisher, our Business Publishing Desk designs your book from the ground up to monetize your backend offerings (consulting retainers, enterprise software licenses, executive coaching, or speaking fees). We weave strategic opt-in mechanisms, downloadable frameworks, and proprietary diagnostic models into the text, converting passive readers into qualified high-ticket leads.',
              'From executive title formulation to custom diagrams and luxury foil-stamped covers, we ensure your volume reflects the prestige of your company, allowing you to bypass gatekeepers and command five-figure keynote honorariums.'
            ]
          },
          techSpecs: [
            { label: 'Strategic Focus', value: 'High-Ticket Client Acquisition, Speaking Engagements & Corporate Authority' },
            { label: 'Interior Customization', value: 'Custom Business Process Diagrams, Infographics, Matrix Charts & Callout Boxes' },
            { label: 'Lead Capture Integration', value: 'QR Code & URL Lead Funnel Architecture (Worksheets, Templates, Audits)' },
            { label: 'Print Specifications', value: 'Luxury Case Laminate Hardcover with Embossed Foil / Premium 60# Cream Paper' },
            { label: 'Tax Deductibility', value: '100% Eligible as B2B Business Marketing / Advertising Expense' }
          ],
          companionServices: [
            { id: 'linkedin', name: 'LinkedIn Executive Thought Leadership', tag: 'Synergy: B2B Lead Funnels' },
            { id: 'podcast-speaking', name: 'Podcast Booking & Keynote Stages', tag: 'Synergy: Keynote Booking' },
            { id: 'pr-branding', name: 'Author PR & Personal Branding Blueprint', tag: 'Synergy: National Press' }
          ],
          relatedGuides: [
            { id: 'costs-breakdown', title: 'The Comprehensive Self-Publishing Cost & Pricing Sheet', excerpt: 'Review transparent breakdowns of editorial budgets, cover designs, and wholesale margins.', readTime: '11 min read' },
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Master search engine positioning to place your book in front of corporate decision-makers.', readTime: '15 min read' }
          ]
        };

      case 'memoirs':
        return {
          title: 'Memoir & Legacy Family History Publishing',
          subtitle: 'Preserve Your Life Story for Generations in Gold-Foil Hardcover',
          description: 'Your life experiences, trials, and wisdom are priceless family heirlooms. We pair you with compassionate, veteran biographers who listen to your memories, interview loved ones, digitize historical photographs, and craft an archival-grade physical volume that honors your legacy forever.',
          tagline: 'YOUR MEMORIES ARE TIMELESS. PRESERVE THEM WITH DIGNITY.',
          stat1: '95+ Family Legacies Inked',
          stat2: 'Archival Linen Hardcovers',
          stat3: 'Private or Public Editions',
          features: [
            'Empathetic oral history recording sessions conducted in person or via high-definition audio calls',
            'Archival photo scanning, digital restoration, and color-correction for family album inserts',
            'Collector-grade linen hardcover binding with gold or silver foil stamping and satin ribbon markers',
            'Flexible privacy options: publish privately exclusively for family, or distribute globally on Amazon',
            'Full genealogical timeline charts and family tree illustrations custom-designed by our cartographers'
          ],
          process: [
            { step: '01', title: 'Life Review Sessions', desc: 'Guided conversational interviews exploring your childhood, career milestones, romances, and personal philosophy.' },
            { step: '02', title: 'Archival Collection', desc: 'Gathering family photographs, letters, journals, and medals for high-resolution digital restoration.' },
            { step: '03', title: 'Biographical Drafting', desc: 'Our master memoirists weave your memories into a captivating narrative with rich historical context.' },
            { step: '04', title: 'Heirloom Printing', desc: 'Binding your completed book in archival acid-free paper and gold-stamped cloth linen.' }
          ],
          faqs: [
            { q: 'Can I keep my memoir private just for my family?', a: 'Yes, absolutely. You can choose a private edition where we print archival copies exclusively for your family and friends with zero public distribution.' },
            { q: 'What if I am not a great speaker or my memory is foggy?', a: 'Our biographers are skilled oral historians. We use thematic memory prompts, historical milestone timelines, and genealogical records to gently unlock vivid memories.' },
            { q: 'Can you restore old, damaged photographs?', a: 'Yes. Our digital retouching artists clean scratches, correct fading, and restore contrast on antique photographs from any era.' },
            { q: 'How many copies can I print?', a: 'You can print as few as 10 heirloom copies for your immediate family, or thousands for global distribution. We store your print files permanently so you can reorder at any time.' },
            { q: 'Who owns the copyright to my story?', a: 'You retain 100% of the copyright and intellectual property. Your family has sole ownership forever.' }
          ],
          authorSpotlight: 'Our memoir team has preserved the stories of WWII veterans, corporate pioneers, immigrant families, and cultural leaders across Europe and North America.',
          editorialDeepDive: {
            headline: 'The Archival Heirloom & Oral History Reconstruction Pipeline',
            badge: 'Preservation Standards',
            paragraphs: [
              'Memoirs are delicate literary works requiring emotional sensitivity, historical perspective, and archival longevity. Too many family stories are lost to time because loved ones never found the hours to sit down and type their memories. Perkins Publisher bridges this gap with an oral history methodology refined over decades.',
              'We assign an empathetic senior biographer who conducts guided conversation sessions, asking the probing, thoughtful questions that elicit forgotten sensory details—the scent of your childhood home, the nervous excitement of your first venture, and the hard-won philosophy that guided your decisions.',
              'Physical preservation is paramount. Cheap paperback paper turns yellow and brittle within two decades. Our memoirs are printed on acid-free archival 70# paper, bound in smyth-sewn linen cases with hot-stamped gold foil and satin ribbon page markers, engineered to endure for centuries.'
            ]
          },
          techSpecs: [
            { label: 'Binding Options', value: 'Foil-Stamped Cloth Linen Hardcover, Custom Dust Jacket, or Deluxe Leather' },
            { label: 'Paper Stock', value: 'Acid-Free 70# Archival Neutral White (200+ Year Durability)' },
            { label: 'Photo Integration', value: 'High-Gloss Full-Color Photo Signatures with Digital Restoration' },
            { label: 'Distribution Control', value: '100% Private (Family Only) or Global Retail (Amazon / Bookstores)' },
            { label: 'File Archive', value: 'Perpetual Cloud Archive for Instant Lifetime Family Re-Orders' }
          ],
          companionServices: [
            { id: 'cover-design', name: 'Custom Book Cover Design & Typesetting', tag: 'Styling: Gold Foil & Linen' },
            { id: 'audiobook', name: 'Audiobook Voice Casting & Recording', tag: 'Voice: Author Audio Legacy' },
            { id: 'publishing', name: 'Turnkey Book Publishing & Distribution', tag: 'Optional: Public Distribution' }
          ],
          relatedGuides: [
            { id: 'ghostwriting-contracts', title: 'Bestseller Ghostwriting: Legal Checklists & NDA Protections', excerpt: 'Learn how confidential biographical interviews are conducted and protected under law.', readTime: '9 min read' },
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Understand legal deposit, copyright preservation, and heirloom book manufacturing standards.', readTime: '14 min read' }
          ]
        };

      case 'children':
        return {
          title: 'Children’s Book Production & Illustration',
          subtitle: 'Bring Your Magical Stories to Life with World-Class Illustrations',
          description: 'Creating a beloved children’s book requires visual enchantment, rhythmic language, and precise print calibration. We match your manuscript with world-class children’s illustrators, coordinate character model sheets, format full-bleed CMYK print files, and buyout all artist copyrights for you.',
          tagline: 'VIVID CHARACTERS. CAPTIVATING ART. 100% ARTIST COPYRIGHT BUYOUT.',
          stat1: '160+ Children’s Books Illustrated',
          stat2: '100% Copyright Buyout',
          stat3: 'Full-Bleed CMYK Precision',
          features: [
            'Dedicated pairing with an elite children\'s book illustrator matching your visual style (watercolor, vector, 3D, classic)',
            'Complete character concept model sheets establishing expressions, poses, and color palettes before final rendering',
            'Full-bleed CMYK high-resolution artwork calibrated to prevent color banding and text clipping in print',
            '100% artist copyright buyout: you own all illustration rights for merchandise, animation, and sequels',
            'Formatting for Amazon Kindle Kids, Apple Books, and physical durable case-laminate hardcovers'
          ],
          process: [
            { step: '01', title: 'Storyboard & Layout Mapping', desc: 'Dividing your text into page-by-page visual descriptions and choosing standard trim sizes (8.5" x 8.5" or 8.5" x 11").' },
            { step: '02', title: 'Character Design Concepts', desc: 'Developing custom sketches for main characters, refining facial expressions, poses, and clothing.' },
            { step: '03', title: 'Full Illustration & Color', desc: 'Executing beautiful, high-resolution layered color files matching your preferred aesthetic style.' },
            { step: '04', title: 'Text Layout & Print Prep', desc: 'Superimposing bold, readable text, setting up correct CMYK printers profile, and compiling ready-to-upload files.' }
          ],
          faqs: [
            { q: 'Who owns the copyrights to the illustrations?', a: 'You do. Unlike typical illustration agencies that retain derivative rights, Perkins Publisher contracts full copyright buyouts so you own 100% of all visual assets.' },
            { q: 'What age groups do you illustrate for?', a: 'We specialize in early reader picture books (ages 0-5), illustrated storybooks (ages 6-8), and middle-grade chapter books (ages 9-12).' },
            { q: 'What artistic styles do you offer?', a: 'We offer soft watercolor, clean modern vector designs, whimsical hand-drawn pencil styles, 3D character render designs, and classic vintage storybook art.' },
            { q: 'Can you help with rhyming meter and word count?', a: 'Yes! Our children’s editors specialize in rhythm, anapestic meter, and age-appropriate vocabulary to ensure read-aloud perfection.' },
            { q: 'What trim size is best for picture books?', a: '8.5" x 8.5" square and 8.5" x 11" landscape/portrait are the undisputed commercial standards for children’s hardcovers.' }
          ],
          authorSpotlight: 'Our kids\' books department coordinates directly with children\'s literary experts to ensure your book satisfies developmental language and visual guidelines.',
          editorialDeepDive: {
            headline: 'Age-Bracket Lexile Pacing & Full-Bleed CMYK Vector Standards',
            badge: 'Children’s Publishing Standards',
            paragraphs: [
              'Children’s books are deceptive: while they feature fewer words than adult fiction, the interplay between text and illustration must be mathematically precise. Pacing, page turns, and visual curiosity hooks dictate whether a parent reads your book once or a hundred times at bedtime.',
              'Our art directors start by dividing your manuscript into a 24-page or 32-page storyboard dummy, ensuring that page turns create suspense or visual payoff. We then develop character concept model sheets—testing the protagonist from front, side, and 3/4 angles—before rendering full-color spreads.',
              'Printing children’s books demands specialized color engineering. RGB monitors display electric greens and neon pinks that standard four-color CMYK printing presses cannot reproduce. We hand-calibrate every illustration using GRACoL CMYK profiles, ensuring that the physical inks on the page match the radiant vision of your digital proofs.'
            ]
          },
          techSpecs: [
            { label: 'Standard Trims', value: '8.5" × 8.5" Square, 8.5" × 11" Portrait / Landscape, 8" × 10"' },
            { label: 'Print Specifications', value: 'Case Laminate Durable Hardcover with Gloss Wipe-Clean Finish / 70# White' },
            { label: 'Art Resolution', value: '300–600 DPI High-Res Layered PSD, Vector EPS, and Print PDF' },
            { label: 'Copyright Status', value: '100% Complete Copyright Buyout (Merchandise & Sequel Ready)' },
            { label: 'Digital Optimization', value: 'Amazon Kindle Kids (Fixed-Layout MOBI) & Apple Books EPUB' }
          ],
          companionServices: [
            { id: 'cover-design', name: 'Custom Book Cover Design & Typesetting', tag: 'Styling: Foil Lettering' },
            { id: 'publishing', name: 'Turnkey Book Publishing & Distribution', tag: 'Next Step: Distribute Title' },
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Launch Step: Parent Outreach' }
          ],
          relatedGuides: [
            { id: 'costs-breakdown', title: 'The Comprehensive Self-Publishing Cost & Pricing Sheet', excerpt: 'Explore transparent cost benchmarks for custom illustration spreads and full-color printing.', readTime: '11 min read' },
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Learn how to set up full-bleed margins and gutters for illustrated print editions.', readTime: '12 min read' }
          ]
        };

      case 'audiobook':
        return {
          title: 'Audiobook Voice Casting, Recording, & Mastering',
          subtitle: 'Enrich Your Readership with Elite SAG-AFTRA Narrators',
          description: 'Audiobooks are the fastest-growing segment of the publishing industry. Capture millions of Audible, Apple Books, and Spotify listeners with a pristine voice performance. We handle casting audition panels, manage SAG-AFTRA studio recordings, and master audio tracks to strictly satisfy ACX technical decibel guidelines.',
          tagline: 'THE PERFECT VOICE, CAPTIVATING LISTENERS WORLDWIDE.',
          stat1: '240+ Audiobooks Mastered',
          stat2: 'SAG-AFTRA Voice Talent',
          stat3: '100% ACX Compliance',
          features: [
            'Sourcing custom voice audition reels from leading, high-rated professional audiobook narrators',
            'Direct management of SAG-AFTRA union contracts, talent fees, and rights documentation',
            'State-of-the-art studio recording with high-fidelity Neumann microphones and treated acoustic booths',
            'Microscopic audio post-production: breath editing, sibilance removal, noise floor silencing, and RMS normalization',
            'Guaranteed approval and listing on Audible, Apple Books, Spotify Audiobooks, and Audiobooks.com'
          ],
          process: [
            { step: '01', title: 'Narrator Casting Calls', desc: 'Creating script sample packets and auditioning top narrators matching your preferred tone, accent, pacing, and gender.' },
            { step: '02', title: 'Studio Recording', desc: 'Supervising the reading sessions, maintaining character pronunciation guides, and logging pristine chapter tracks.' },
            { step: '03', title: 'Post-Production Mastering', desc: 'Precision editing to delete clicks, heavy breaths, and pops, adjusting RMS amplitude to -18dB to -23dB.' },
            { step: '04', title: 'Audible Distribution', desc: 'Registering metadata, uploading master 192kbps MP3 chapters, and securing ACX quality certifications.' }
          ],
          faqs: [
            { q: 'How long does it take to produce an audiobook?', a: 'Typically 4 to 6 weeks. The industry standard rule of thumb is that 10,000 words equals approximately 1 hour of finished audio.' },
            { q: 'Can I narrate my own audiobook?', a: 'Yes! If you are an author or speaker who wants to voice your own book, we provide home recording hardware checklists, conduct live Zoom recording coaching, and execute the final mastering.' },
            { q: 'What is ACX and what are its audio requirements?', a: 'ACX is Amazon’s Audiobook Creation Exchange. ACX requires RMS volume between -18dB and -23dB, a noise floor below -60dB, and peak levels below -3dB. Our audio engineers guarantee 100% ACX compliance.' },
            { q: 'Where will my audiobook be distributed?', a: 'Your audiobook is distributed to Audible, Amazon, Apple Books, Spotify, Audiobooks.com, Barnes & Noble, and OverDrive (for library access).' },
            { q: 'Who owns the audiobook recording rights?', a: 'You own 100% of the audio masters and retail royalties under our flat-rate production agreements.' }
          ],
          authorSpotlight: 'We have produced audiobooks in every major category—mystery thrillers, memoirs, business guides, and fantasy, achieving pristine audio certifications.',
          editorialDeepDive: {
            headline: 'SAG-AFTRA Casting & Audible ACX Microscopic Decibel Mastering',
            badge: 'Audio Engineering Rigor',
            paragraphs: [
              'Listeners today experience audiobooks through high-fidelity noise-canceling headphones. A poorly mastered audiobook—with mouth clicks, room reverb, or uneven volume—results in harsh 1-star reviews and rejection by Audible QA engineers.',
              'Perkins Publisher operates an end-to-end audio production pipeline. We manage casting auditions with vetted SAG-AFTRA union narrators whose timbre and character accents complement your prose. We provide a customized Pronunciation Lexicon for complex character names, foreign terms, and technical jargon.',
              'Our post-production engineers clean every track through iZotope RX spectral de-noising tools, normalizing RMS power between -18dB and -23dB with a silent -60dB noise floor. We deliver a ready-to-distribute audio package certified for immediate listing on Audible, Apple Books, and Spotify.'
            ]
          },
          techSpecs: [
            { label: 'Audio Quality Specs', value: 'Constant Bit Rate 192 kbps MP3 at 44.1 kHz, 16-bit stereo/mono' },
            { label: 'Decibel Calibration', value: 'RMS Volume between -18dB and -23dB / Peak Limit -3dB / Noise Floor < -60dB' },
            { label: 'Distribution Channels', value: 'Audible, Amazon, Apple Books, Spotify Audiobooks, Audiobooks.com' },
            { label: 'Talent Network', value: 'SAG-AFTRA Union & Audie Award-Winning Voice Actors' },
            { label: 'Rights Ownership', value: '100% Master Audio Rights Retained by Author' }
          ],
          companionServices: [
            { id: 'publishing', name: 'Turnkey Book Publishing & Distribution', tag: 'Core: Print & Digital Editions' },
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Launch: Audio Promo Codes' },
            { id: 'podcast-speaking', name: 'Podcast Booking & Keynote Stages', tag: 'Microphone: Speaker Stages' }
          ],
          relatedGuides: [
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Learn how multi-format publishing (Print + E-Book + Audio) triples author royalty streams.', readTime: '14 min read' },
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Leverage cross-format visibility on Amazon to cross-sell audiobooks from print pages.', readTime: '15 min read' }
          ]
        };

      case 'marketing':
        return {
          title: 'Strategic Bestseller Marketing & Metadata Optimization',
          subtitle: 'Do Not Write a Silent Masterpiece. Dominate Bestseller Trackers.',
          description: 'The difference between a forgotten book and an enduring bestseller is a strategic marketing engine. We launch hyper-targeted promotional campaigns, audit search algorithms, manage Amazon PPC search advertising, execute press releases, and optimize your book to secure #1 Bestseller categories.',
          tagline: 'BUILDING AUDIENCES, IGNITING ORGANIC MANUSCRIPT SALES.',
          stat1: '320+ Bestseller Launches',
          stat2: '85M+ Total Ad Impressions',
          stat3: 'Category Rank Guarantees',
          features: [
            'Comprehensive keyword metadata mapping to index for organic buyer search queries',
            'Guaranteed features on highly rated editorial book blogs, reviewer databases, and newsletters',
            'Expertly run, high-converting ad campaigns across Amazon KDP Ads, BookBub, and Meta',
            'Coordinated "Launch Week Blitz" programs aimed at maximizing sales velocity and rankings',
            'Comprehensive design of eye-catching marketing collateral, social graphics, and custom media kits'
          ],
          process: [
            { step: '01', title: 'Launch Roadmap Design', desc: 'A 60-day structured plan mapping out presale campaigns, reviewer outreach, launch events, and ads.' },
            { step: '02', title: 'Search Tag Optimization', desc: 'Replacing generic keywords with high-volume buyer phrases to outrank competitors on Amazon search.' },
            { step: '03', title: 'PPC Campaign Setup', desc: 'Creating structured keyword ad campaigns on Amazon and social platforms targeting similar authors.' },
            { step: '04', title: 'Bestseller Category Boost', desc: 'Coordinating high-volume sales days to spike platform algorithms and lock in verified Bestseller badges.' }
          ],
          faqs: [
            { q: 'Do you guarantee my book will become a bestseller?', a: 'We guarantee that our launch campaign will secure a #1 Hot New Release or #1 Bestseller ranking in targeted sub-categories on Amazon KDP.' },
            { q: 'What is the best time to start marketing my book?', a: 'Ideally 60 to 90 days before your official launch date, which allows for building pre-orders and reviewer groups.' },
            { q: 'How much should I spend on book ads?', a: 'We recommend starting with modest daily budgets of $5 to $15, optimizing keyword click-through rates before scaling up.' },
            { q: 'How do you get early reader reviews?', a: 'We distribute advance reader copies (ARCs) to our vetted network of verified genre reviewers on Goodreads, BookSprout, and Amazon before launch day.' },
            { q: 'What is the difference between Amazon Ads and BookBub?', a: 'Amazon PPC ads target buyers actively searching for books on Amazon. BookBub features your book in curated email newsletters sent directly to millions of avid category readers.' }
          ],
          authorSpotlight: 'Our book promotional campaigns have reached millions of readers worldwide, securing national and international media placements.',
          editorialDeepDive: {
            headline: 'The 60-Day Algorithmic Bestseller Launch & Paid Media Matrix',
            badge: 'Launch Acceleration Engine',
            paragraphs: [
              'Over 2,000 new books are published every day. Authors who rely on "word of mouth" almost always see sales flatline within 48 hours. Modern book marketing requires treating launch week like a scientific product rollout, engineering sales velocity to trigger algorithmic recommendations.',
              'Perkins Publisher coordinates a 60-Day Launch Runway divided into four distinct phases: Pre-Launch ARC Review Harvesting, Launch Week Algorithmic Blitz, Paid Search Engine Domination (Amazon PPC), and Long-Tail B2B Media Syndication. By stacking 30 to 50 verified editorial reviews prior to launch, we convert browsing traffic at 3x the industry average.',
              'During Launch Week, we coordinate targeted promotional bursts across BookBub, newsletters, and sponsored Amazon product ads, driving concentrated sales volume that propels your title to the #1 spot in targeted subcategories and triggers Amazon’s "Customers Who Bought This Also Bought" recommendation carousels.'
            ]
          },
          techSpecs: [
            { label: 'Campaign Runway', value: '60-Day Structured Roadmap (30 Days Pre-Launch + 30 Days Launch Blitz)' },
            { label: 'Review Acquisition', value: 'ARC Distribution to 50+ Vetted Genre Reviewers on Amazon & Goodreads' },
            { label: 'Paid Ad Management', value: 'Amazon Sponsored Products, Sponsored Brands, and Meta Ad Optimization' },
            { label: 'Guaranteed Milestone', value: 'Targeted #1 Amazon Category Bestseller or Hot New Release Badge' },
            { label: 'Collateral Included', value: 'Social Banners, 3D Book Mockups, Promotional Videos, and Press Release' }
          ],
          companionServices: [
            { id: 'pr-branding', name: 'Author PR & Personal Branding Blueprint', tag: 'Next Step: Media Coverage' },
            { id: 'linkedin', name: 'LinkedIn Executive Thought Leadership', tag: 'Next Step: B2B Lead Funnels' },
            { id: 'podcast-speaking', name: 'Podcast Booking & Keynote Stages', tag: 'Next Step: Podcast Tours' }
          ],
          relatedGuides: [
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Outrank rival publications on Amazon. Master keyword matchmaking and category rank spikes.', readTime: '15 min read' },
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Learn how to configure search tags and Amazon A+ Content for maximum sales conversions.', readTime: '12 min read' }
          ]
        };

      case 'pr-branding':
        return {
          title: 'Author PR & Personal Branding Blueprint',
          subtitle: 'Position Yourself as the Supreme Authority in Your Niche',
          description: 'A great book is only half the battle; building a prominent personal brand around your book establishes lifelong career authority. We design premium speaker pages, coordinate national digital PR press releases, construct authoritative brand messaging, and format clickable press kits.',
          tagline: 'YOUR BOOK IS YOUR CALLING CARD. YOUR BRAND IS YOUR POWER.',
          stat1: '140+ Media Kits Built',
          stat2: 'National PR Placements',
          stat3: 'Instant Executive Authority',
          features: [
            'Bespoke personal brand style sheets (color theory, elegant typography, logo guidelines)',
            'Comprehensive PR press release drafting and distribution to major outlets (AP, Business Insider)',
            'Beautiful executive Speaker Pages and Digital Media Kits ready for show producers',
            'Tailored brand positioning statements aligning your book themes with your consulting offers',
            'Strategic consultations on packaging your expertise for corporate keynotes'
          ],
          process: [
            { step: '01', title: 'Brand Blueprint Session', desc: 'Identifying your core expert identity, target executive audience, and long-term business monetization models.' },
            { step: '02', title: 'Media Kit Creation', desc: 'Designing high-end media kits featuring your author bio, headshot assets, custom speaking topics, and interview questions.' },
            { step: '03', title: 'PR Campaign Launch', desc: 'Drafting high-intent press releases and pitching them to national news portals and trade publications.' },
            { step: '04', title: 'Authority Amplification', desc: 'Optimizing your speaking assets to command premium keynote fees and secure corporate consultation retainers.' }
          ],
          faqs: [
            { q: 'Why do I need a separate author brand?', a: 'Because readers connect with people, not just books. An author brand converts casual readers into corporate consulting clients, subscribers, and high-ticket buyers.' },
            { q: 'What is included in a Media Kit?', a: 'Your author bio, executive headshots, book summaries, sample interview questions, speaking topics, reviews, and direct contact details.' },
            { q: 'Do you guarantee media features?', a: 'We guarantee placement on major digital news hubs through our wire syndication partnerships, and pitch directly to target trade editors.' },
            { q: 'How does PR help my business?', a: 'National press coverage provides verified authority logos ("As Seen On AP, MarketWatch, Bloomberg") that you can display on your website, boosting sales conversion rates.' },
            { q: 'Can you help me get booked on TV or radio?', a: 'Yes. Our media kit and hook angles are specifically formatted to appeal to morning talk shows, local news producers, and syndicated radio hosts.' }
          ],
          authorSpotlight: 'Our personal branding team has shaped the public profiles of Fortune 500 executives, Silicon Valley founders, and elite academic researchers.',
          editorialDeepDive: {
            headline: 'Syndicated Press Wire & Executive Speaker Press Kit Blueprint',
            badge: 'Media Authority Engine',
            paragraphs: [
              'A published book transforms an executive from a "practitioner" into a recognized "industry authority." However, media journalists, TV producers, and keynote organizers require concise, professional press materials before extending interviews or speaking invitations.',
              'Perkins Publisher develops an institutional Digital Press Kit that eliminates friction for media talent coordinators. We curate your high-resolution headshots, craft an authoritative 100-word and 250-word biography, formulate 10 provocative interview questions, and articulate your signature keynote themes.',
              'We then draft and syndicate a national digital press release across major news networks including Associated Press (AP News), MarketWatch, Digital Journal, and hundreds of regional media affiliates, creating permanent high-authority backlinks and verified "As Seen On" media credentials for your brand.'
            ]
          },
          techSpecs: [
            { label: 'Press Wire Distribution', value: 'Associated Press (AP), MarketWatch, Digital Journal, Google News & 200+ Outlets' },
            { label: 'Media Kit Format', value: 'Interactive PDF Media Kit + High-Resolution Print Version & Web Page Copy' },
            { label: 'Assets Included', value: 'Author One-Sheet, Keynote Topic Cards, Sample Q&A, and Book Excerpt Packets' },
            { label: 'Permanent Media Logos', value: 'Licensed "As Seen On" Media Badges for Your Author Website & Books' },
            { label: 'Turnaround Time', value: '3 to 4 Weeks for Complete Brand Blueprint & Press Release Distribution' }
          ],
          companionServices: [
            { id: 'podcast-speaking', name: 'Podcast Booking & Keynote Stages', tag: 'Next Step: Pitch Shows' },
            { id: 'linkedin', name: 'LinkedIn Executive Thought Leadership', tag: 'Next Step: B2B Reach' },
            { id: 'marketing', name: 'Strategic Bestseller Marketing & PR', tag: 'Next Step: Book Sales' }
          ],
          relatedGuides: [
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Learn how European founders build international credibility and media presence.', readTime: '14 min read' },
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Synergize national PR features with Amazon search marketing for compounding sales.', readTime: '15 min read' }
          ]
        };

      case 'linkedin':
        return {
          title: 'Executive LinkedIn Thought Leadership & Branding',
          subtitle: 'Turn Your Publishing Success into B2B Authority & Leads',
          description: 'LinkedIn is the premier B2B ecosystem for founders, coaches, and authors. We help you convert your book’s chapters, core lessons, and insights into high-converting LinkedIn post calendars, visual slide decks, and elite thought leadership pieces that drive direct executive engagement.',
          tagline: 'LEVERAGE YOUR WRITTEN AUTHORITY TO DOMINATE B2B DECISION MAKERS.',
          stat1: '110+ Profiles Optimized',
          stat2: 'Average 340% View Growth',
          stat3: 'Direct B2B Lead Pipelines',
          features: [
            'Complete Bestseller Author makeover of your LinkedIn Profile layout and banner designs',
            'Conversion of your book chapters into structured thought-leadership B2B carousel decks',
            'Weekly tailored LinkedIn posting calendars written in high-converting copywriting styles',
            'Direct optimization of your featured sections, bios, newsletter structures, and services tabs',
            'Strategic training on LinkedIn outbound executive engagement frameworks'
          ],
          process: [
            { step: '01', title: 'Profile Makeover Audit', desc: 'Redesigning your header banner, headline text, bio copy, and featured listings to center your published authority.' },
            { step: '02', title: 'Book-to-Post Mapping', desc: 'Slicing your book chapters into high-value B2B concepts, actionable lessons, and client case study story posts.' },
            { step: '03', title: 'Content Engine Deployment', desc: 'Drafting 3 months of customized, premium LinkedIn posts pairing raw text with elegant visual slider graphics.' },
            { step: '04', title: 'Engagement Blueprint', desc: 'Teaching your team how to build relationships in the comments with corporate buyers, managers, and media hosts.' }
          ],
          faqs: [
            { q: 'How does LinkedIn branding support my book?', a: 'It places your authority directly in front of business owners, executive buyers, and podcast hosts who pay for high-ticket consulting and keynote lectures.' },
            { q: 'Do you log into my personal LinkedIn account?', a: 'We do not require direct login access. We provide structured, copy-paste-ready text files, graphic layouts, and scheduled instructions.' },
            { q: 'What is a carousel post?', a: 'A document post on LinkedIn that allows users to swipe through a series of highly visual, content-rich executive slides.' },
            { q: 'How often should a published author post on LinkedIn?', a: 'We recommend 3 to 4 high-value posts per week, balancing tactical frameworks, personal origin stories, and client case studies.' },
            { q: 'Can my book help me secure enterprise consulting deals?', a: 'Yes! A published book serves as the ultimate B2B icebreaker. Sending a signed copy to a C-suite executive achieves a 60%+ response rate.' }
          ],
          authorSpotlight: 'We coordinate with enterprise managers to build thought-leadership engines that generate organic outbound leads and speaking invites.',
          editorialDeepDive: {
            headline: 'B2B Carousel Architecture & Executive Authority Positioning',
            badge: 'B2B Lead Architecture',
            paragraphs: [
              'Having written 50,000 words of intellectual property, you possess a massive content reserve that 99% of LinkedIn creators lack. However, dumping raw paragraphs onto social media fails because executive decision-makers consume information in bite-sized, visual frameworks.',
              'Perkins Publisher transforms your book into a high-octane content repurposing engine. We decompose each chapter into 5 distinct LinkedIn post archetypes: The Actionable Checklist, The Contrarian Truth, The Case Study Breakdown, The Personal Story, and The Visual Swipe Carousel.',
              'Our graphic design studio styles your PDF slide carousels with executive typography and custom brand colors. By pairing these assets with strategic call-to-action hooks, we route profile visitors directly to your book order page or consultation booking calendar.'
            ]
          },
          techSpecs: [
            { label: 'Content Pipeline', value: '3 Months (36 Custom-Drafted Posts) Extracted Directly from Your Book' },
            { label: 'Carousel Assets', value: '12 Custom-Branded PDF Slide Decks (1080x1350px High-Retention Format)' },
            { label: 'Profile Redesign', value: 'Custom Author Banner, Headline Optimization, Bio Overhaul & Featured Section' },
            { label: 'Engagement Strategy', value: 'Executive Commenting SOP & Direct Message Outbound Conversation Scripts' },
            { label: 'Turnaround Time', value: '2 Weeks for Full Profile Setup & First Month of Scheduled Content' }
          ],
          companionServices: [
            { id: 'business', name: 'Business & Authority Book Publishing', tag: 'Core: Write Business Book' },
            { id: 'podcast-speaking', name: 'Podcast Booking & Keynote Stages', tag: 'Next Step: Podcast Tour' },
            { id: 'pr-branding', name: 'Author PR & Personal Branding Blueprint', tag: 'Next Step: Media Kits' }
          ],
          relatedGuides: [
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Synergize organic social reach with paid Amazon search ads for compounding book momentum.', readTime: '15 min read' },
            { id: 'costs-breakdown', title: 'The Comprehensive Self-Publishing Cost & Pricing Sheet', excerpt: 'Calculate how a single consulting client acquired via your book covers all publishing expenses.', readTime: '11 min read' }
          ]
        };

      case 'podcast-speaking':
        return {
          title: 'Elite Podcast Booking & Public Speaking Opportunities',
          subtitle: 'Step onto the Stage and Onto the Mic as a Published Expert',
          description: 'The fastest way to scale book sales and build premium trust is to discuss your thesis on highly rated podcasts and industry stages. We draft custom, high-converting host pitch scripts, research prime B2B shows in your niche, handle host outreach, and secure prime speaking opportunities.',
          tagline: 'YOUR IDEAS NEED A STAGE. WE SECURE THE SPOTLIGHT.',
          stat1: '380+ Podcast Placements',
          stat2: '45+ Keynote Stage Bookings',
          stat3: 'Turn-Key Booking Agent',
          features: [
            'Comprehensive database research of highly-ranked podcasts in your book’s targeted niche',
            'Development of hyper-targeted, high-conversion email pitches addressed directly to hosts',
            'Complete management of podcast outreach, schedule coordination, and pre-show preparation',
            'Drafting custom keynote presentation slides and highly compelling speaker video trailers',
            'Direct pitch campaigns aimed at national trade shows, professional conferences, and corporate panels'
          ],
          process: [
            { step: '01', title: 'Topic Formulation', desc: 'Formulating 3 highly click-worthy, educational podcast talk titles based on your book\'s strongest chapters.' },
            { step: '02', title: 'Show Profiling & Targeting', desc: 'Researching active B2B podcasts and local stages that attract your ideal backend high-ticket clients.' },
            { step: '03', title: 'Direct Booking Outreach', desc: 'Our dedicated booking agents pitch your credentials and customized media kit directly to target hosts and panel organizers.' },
            { step: '04', title: 'Interview & Lead Conversion', desc: 'Coordinating recording times, preparing pre-interview notes, and setting up backend call pathways for listeners.' }
          ],
          faqs: [
            { q: 'Do I need to pay hosts to get on their podcasts?', a: 'No. Authentic, high-rated podcasts do not charge guests. We pitch you as an authoritative guest who brings massive value to their audience.' },
            { q: 'What kinds of stages can you book me on?', a: 'We target professional conferences, corporate panels, university guest lectures, local business organizations, and industry trade summits.' },
            { q: 'How many bookings does your campaign typically secure?', a: 'Our standard booking campaigns aim to secure 6 to 12 highly aligned podcast bookings within a 90-day period.' },
            { q: 'What equipment do I need to record podcast interviews?', a: 'A USB microphone (such as a Shure MV7 or Audio-Technica ATR2100x), a pair of closed-back headphones, and a stable broadband connection.' },
            { q: 'How do podcast appearances generate book sales?', a: 'Hosts consistently plug your book link in show notes and ask you where listeners can purchase your book at the end of each episode, creating long-term evergreen sales.' }
          ],
          authorSpotlight: 'Our team acts as your elite booking agency, letting you focus entirely on delivering a powerful, inspirational speech on the mic.',
          editorialDeepDive: {
            headline: 'Direct Host Pitch Pipelines & Keynote Monetization Architecture',
            badge: 'Keynote & Podcast Engine',
            paragraphs: [
              'Top podcast hosts receive 50+ generic email pitches per week. Pitches that praise the host superficially or push a commercial product are immediately marked as spam. Securing appearances on top 1% shows requires approaching hosts with provocative, listener-centric story angles.',
              'Perkins Publisher develops 3 signature "Micro-Keynotes" extracted directly from your book’s most controversial or counter-intuitive chapters. We identify active shows on Apple Podcasts and Spotify that reach your target buyers, pitching your expertise as a solution to questions their listeners are asking right now.',
              'We manage the entire logistical calendar: coordinating recording schedules, transmitting technical specs, providing pre-interview briefing dossiers, and advising you on verbal call-to-action scripts that route listeners from the audio player to your book purchase page.'
            ]
          },
          techSpecs: [
            { label: 'Booking Goal', value: '6 to 12 Confirmed Podcast Interviews within 90-Day Placement Runway' },
            { label: 'Show Auditing', value: 'Top 5% Podcasts on Apple Podcasts & Spotify (Vetted for Active Listener Base)' },
            { label: 'Outreach Protocol', value: 'Handcrafted Personalized Host Pitches (Zero Bulk Spam Templates)' },
            { label: 'Materials Provided', value: 'Host One-Sheet, 10 Curated Interview Questions & Soundbite Audio Teasers' },
            { label: 'Speaking Alignment', value: 'Targeted Keynote Stage Pitch Packets for Corporate Conferences & Summits' }
          ],
          companionServices: [
            { id: 'pr-branding', name: 'Author PR & Personal Branding Blueprint', tag: 'Prerequisite: Speaker Kit' },
            { id: 'business', name: 'Business & Authority Book Publishing', tag: 'Core: Business Book' },
            { id: 'linkedin', name: 'LinkedIn Executive Thought Leadership', tag: 'Synergy: Repurpose Quotes' }
          ],
          relatedGuides: [
            { id: 'marketing-ads', title: 'Amazon PPC Advertising & Metadata SEO Blueprint', excerpt: 'Coordinate podcast release dates with Amazon ad surges for compounding bestseller momentum.', readTime: '15 min read' },
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Discover European podcast networks and speaking summits in London, Berlin, and Zurich.', readTime: '14 min read' }
          ]
        };

      default:
        return {
          title: 'Premium Book Publishing Solutions',
          subtitle: 'Global Bestseller Book Production & Distribution',
          description: 'Turn your manuscript into a global publishing success with Perkins Publisher. From ghostwriting and developmental editing to cover design, ISBN assignment, and global distribution across 40,000+ bookstores.',
          tagline: '100% INDEPENDENCE. 100% ROYALTIES.',
          stat1: '1,400+ Books Published',
          stat2: '40,000+ Bookstores',
          stat3: '100% Royalties to Author',
          features: [
            'Turnkey publishing packages tailored to fiction, non-fiction, business, and memoirs',
            'Full print-on-demand setup across Amazon KDP and IngramSpark global networks',
            'Official 13-digit ISBN blocks and European legal deposit compliance',
            'Comprehensive developmental editing and award-winning cover design',
            '100% author ownership of all rights, royalties, and final master files'
          ],
          process: [
            { step: '01', title: 'Manuscript Audit', desc: 'Reviewing your text, goals, and target demographic to structure an optimal production timeline.' },
            { step: '02', title: 'Editorial & Design', desc: 'Crafting stunning cover layouts, typesetting interior pages, and polishing prose.' },
            { step: '03', title: 'Distribution Setup', desc: 'Assigning ISBNs, registering copyright, and integrating into global wholesale catalogs.' },
            { step: '04', title: 'Bestseller Launch', desc: 'Pushing live worldwide, ordering author proof copies, and activating marketing campaigns.' }
          ],
          faqs: [
            { q: 'How do I get started with Perkins Publisher?', a: 'Schedule a free consultation call with our executive team. We will review your manuscript status, trim requirements, and distribution goals.' },
            { q: 'Who retains the royalties?', a: 'You keep 100% of all royalties and rights. We take zero commission on book sales.' },
            { q: 'Where are you located?', a: 'Our European headquarters is registered in Għajnsielem, Gozo, Malta, serving authors worldwide with international calling desks in the US and UK.' }
          ],
          authorSpotlight: 'Our executive publishing team adheres to the highest standards of independent and hybrid publishing excellence.',
          editorialDeepDive: {
            headline: 'The Perkins Publishing Standard of Excellence',
            badge: 'Global Publishing Architecture',
            paragraphs: [
              'Perkins Publisher was established on a radical principle: authors should receive the elite craftsmanship and international reach of traditional publishing houses without forfeiting their intellectual property or royalties.',
              'We oversee every technical phase of your publishing journey—from ISBN assignment and Chicago Manual of Style editorial reviews to mathematical spine caliper calculations and Ingram wholesale onboarding.',
              'With verified European headquarters in Għajnsielem, Malta, we ensure complete compliance with European Union copyright standards, British Library legal deposit, and Amazon KDP distribution.'
            ]
          },
          techSpecs: [
            { label: 'Distribution Reach', value: 'Global Wholesale via IngramSpark & Amazon KDP (40,000+ Bookstores)' },
            { label: 'Royalty Payouts', value: '100% Direct to Author via Direct Deposit (EUR €, GBP £, USD $)' },
            { label: 'Intellectual Property', value: '100% Author-Owned (Zero Licensing or Rights Restrictions)' },
            { label: 'ISBN Registration', value: 'Official 13-Digit Bowker & European ISBNs Registered Under Custom Imprint' },
            { label: 'Legal Compliance', value: 'European Union Copyright Directives & British Library Statutory Deposit' }
          ],
          companionServices: [
            { id: 'publishing', name: 'Turnkey Book Publishing & Distribution', tag: 'Core Service' },
            { id: 'cover-design', name: 'Custom Book Cover Design & Typesetting', tag: 'Design Service' },
            { id: 'editing', name: 'Elite Developmental Editing', tag: 'Editorial Service' }
          ],
          relatedGuides: [
            { id: 'european-publishing-guide', title: 'The European & UK Author Publishing Blueprint', excerpt: 'Comprehensive guide covering EU ISBNs, VAT compliance, and multi-currency royalties.', readTime: '14 min read' },
            { id: 'kdp-mastery', title: 'The Ultimate Guide to Amazon KDP Publishing & Distribution', excerpt: 'Learn the exact steps to format interior pages and configure metadata.', readTime: '12 min read' }
          ]
        };
    }
  };

  const data = getServiceData(serviceId);

  // Interactive states for specific widgets on specific pages
  const [kdpWordCount, setKdpWordCount] = useState(50000);
  const [kdpCoverType, setKdpCoverType] = useState('paperback');
  const [kdpListPrice, setKdpListPrice] = useState(14.99);
  const [kdpSales, setKdpSales] = useState(1000);

  // Interactive stats for Editing Word Calculator
  const [editWordCount, setEditWordCount] = useState(60000);
  const [editLevel, setEditLevel] = useState('double');

  // Interactive states for Children Illustration tool
  const [illustrationStyle, setIllustrationStyle] = useState('watercolor');

  // Interactive states for Audiobook casting
  const [playingAudition, setPlayingAudition] = useState<string | null>(null);

  // Interactive states for Cover Design & Spine Spec Grader
  const [coverTrimSize, setCoverTrimSize] = useState('6x9');
  const [coverPaperStock, setCoverPaperStock] = useState('cream50');
  const [coverPageCount, setCoverPageCount] = useState(280);

  // Interactive states for Global Distribution Network
  const [distFilter, setDistFilter] = useState<'all' | 'retail' | 'libraries'>('all');

  // Compute Cover Wrap & Spine Math
  const computeCoverSpecs = () => {
    const ppi = coverPaperStock === 'cream50' ? 444 : coverPaperStock === 'white50' ? 500 : 380;
    const spineWidthInches = coverPageCount / ppi;
    const spineWidthMm = spineWidthInches * 25.4;
    
    const trimDimensions: Record<string, { width: number; height: number; name: string }> = {
      '5.5x8.5': { width: 5.5, height: 8.5, name: '5.5" × 8.5" (Trade Fiction)' },
      '6x9': { width: 6.0, height: 9.0, name: '6.0" × 9.0" (Standard Bestseller)' },
      '7x10': { width: 7.0, height: 10.0, name: '7.0" × 10.0" (Executive Manual)' },
      '8.5x11': { width: 8.5, height: 11.0, name: '8.5" × 11.0" (Workbook / Illustrated)' }
    };
    
    const trim = trimDimensions[coverTrimSize] || trimDimensions['6x9'];
    const totalWrapWidth = 0.125 + trim.width + spineWidthInches + trim.width + 0.125;
    const totalWrapHeight = 0.125 + trim.height + 0.125;

    return {
      spineInches: spineWidthInches.toFixed(3),
      spineMm: spineWidthMm.toFixed(1),
      trimName: trim.name,
      wrapWidth: totalWrapWidth.toFixed(3),
      wrapHeight: totalWrapHeight.toFixed(3),
      safeMargin: '0.25"'
    };
  };

  const coverSpecs = computeCoverSpecs();

  // Compute KDP Royalties
  const computeKdpRoyalties = () => {
    const isHardcover = kdpCoverType === 'hardcover';
    const pageEstimate = Math.ceil(kdpWordCount / 250);
    const printingCost = isHardcover 
      ? 5.65 + (pageEstimate * 0.012)
      : 0.85 + (pageEstimate * 0.012);
    
    const totalRevenue = kdpListPrice * kdpSales;
    const amazonCut = totalRevenue * 0.40;
    const totalPrintingCost = printingCost * kdpSales;
    const netRoyaltyPerBook = (kdpListPrice * 0.60) - printingCost;
    const totalProfit = netRoyaltyPerBook * kdpSales;

    return {
      pages: pageEstimate,
      unitPrinting: printingCost.toFixed(2),
      amazonCut: amazonCut.toFixed(2),
      printingTotal: totalPrintingCost.toFixed(2),
      netPerBook: Math.max(0, netRoyaltyPerBook).toFixed(2),
      profit: Math.max(0, totalProfit).toFixed(2)
    };
  };

  const kdpResults = computeKdpRoyalties();

  // Compute Editing Pricing & Speed
  const computeEditingMetrics = () => {
    let multiplier = 0.015;
    let label = 'Copyediting & Micro Grammar';
    let speedWeeks = 2;
    if (editLevel === 'developmental') {
      multiplier = 0.035;
      label = 'Deep Narrative Restructuring & Pacing Letters';
      speedWeeks = 4;
    } else if (editLevel === 'double') {
      multiplier = 0.045;
      label = 'Elite Double-Pass (Developmental + Proofreading)';
      speedWeeks = 5;
    }

    const estCost = editWordCount * multiplier;
    return {
      cost: estCost.toFixed(0),
      label,
      speedWeeks,
      pages: Math.ceil(editWordCount / 250)
    };
  };

  const editMetrics = computeEditingMetrics();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-24">
      
      {/* Top Breadcrumb Navigation Bar */}
      <section className="bg-slate-950 text-slate-400 py-3.5 px-4 border-b border-slate-900 text-xs font-bold">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 uppercase tracking-wider text-[11px]">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-600">/</span>
            <button 
              onClick={() => {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Services
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-black">{data.title}</span>
          </nav>

          <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-400" />
              <span>EU Verified Imprint</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="text-amber-400 font-semibold">100% Author Royalties</span>
          </div>
        </div>
      </section>

      {/* Hero Service Presentation Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-20 text-white px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 uppercase tracking-widest border border-amber-500/20">
              <Sparkles size={12} className="text-amber-400" />
              <span>{data.tagline}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {data.title}
            </h1>
            <p className="text-amber-400 font-bold text-base sm:text-lg">
              {data.subtitle}
            </p>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
              {data.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-amber-400">{data.stat1.split(' ')[0]}</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">{data.stat1.split(' ').slice(1).join(' ')}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-white">{data.stat2.split(' ')[0]}</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">{data.stat2.split(' ').slice(1).join(' ')}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-4 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
              <p className="text-2xl font-black text-emerald-400">{data.stat3.split(' ')[0]}</p>
              <p className="text-[11px] text-slate-300 font-bold uppercase tracking-wider">{data.stat3.split(' ').slice(1).join(' ')}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenConsultation(serviceId)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl cursor-pointer shadow-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Request Consultation for {data.title.split(' ')[0]}</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => {
                document.getElementById('service-deep-dive')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl cursor-pointer transition-colors border border-white/20"
            >
              <span>Explore Editorial Methodology</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Deliverables Matrix */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <h2 className="text-xs font-black uppercase text-amber-600 tracking-widest mb-4">
            WHAT IS INCLUDED IN THIS PROGRAM
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                <p className="text-xs font-bold text-slate-700 leading-snug">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tool Section (Contextual to Current Service) */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="space-y-6">
          
          {/* Custom Interactive Widget for KDP Service */}
          {serviceId === 'kdp' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">Live Simulation</span>
                <h3 className="text-xl font-black text-white">Amazon KDP Royalty & Net Profit Simulator</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Calculate your exact take-home profit on Amazon KDP. See how keeping 100% of your royalties dramatically outperforms traditional publisher deals.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Manuscript Word Count: <span className="text-amber-400 font-mono text-sm font-black">{kdpWordCount.toLocaleString()} words</span> (~{kdpResults.pages} pages)
                    </label>
                    <input 
                      type="range" 
                      min="20000" 
                      max="150000" 
                      step="5000"
                      value={kdpWordCount}
                      onChange={(e) => setKdpWordCount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Retail List Price ($ USD): <span className="text-amber-400 font-mono text-sm font-black">${kdpListPrice.toFixed(2)}</span>
                    </label>
                    <input 
                      type="range" 
                      min="9.99" 
                      max="39.99" 
                      step="1.00"
                      value={kdpListPrice}
                      onChange={(e) => setKdpListPrice(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Binding Type</label>
                      <select 
                        value={kdpCoverType}
                        onChange={(e) => setKdpCoverType(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="paperback">Standard Paperback (6" x 9")</option>
                        <option value="hardcover">Case-Laminate Hardcover</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Target Sales Volume</label>
                      <input 
                        type="number"
                        min="100"
                        max="50000"
                        step="100"
                        value={kdpSales}
                        onChange={(e) => setKdpSales(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Unit Print Cost</p>
                      <p className="text-lg font-black text-slate-200 font-mono">${kdpResults.unitPrinting}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-emerald-400">Your Net Royalty / Copy</p>
                      <p className="text-xl font-black text-emerald-400 font-mono">${kdpResults.netPerBook}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/20 border border-amber-500/30 text-center space-y-1">
                    <p className="text-xs uppercase tracking-widest text-amber-300 font-black">Projected Author Royalty Payout</p>
                    <p className="text-3xl font-black text-amber-400 font-mono">${Number(kdpResults.profit).toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">100% paid directly to your bank account with zero agency cuts.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Interactive Widget for Editing Service */}
          {serviceId === 'editing' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">Editorial Scoping Tool</span>
                <h3 className="text-xl font-black text-white">Manuscript Word Count & Tier Scoper</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Select your editorial depth to estimate production turnaround time and deliverables.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Manuscript Word Count: <span className="text-amber-400 font-mono text-sm font-black">{editWordCount.toLocaleString()} words</span> (~{editMetrics.pages} standard pages)
                    </label>
                    <input 
                      type="range" 
                      min="10000" 
                      max="160000" 
                      step="5000"
                      value={editWordCount}
                      onChange={(e) => setEditWordCount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-300 font-bold">Select Editorial Rigor Tier</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setEditLevel('proof')}
                        className={`p-2.5 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
                          editLevel === 'proof' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        Proofreading
                      </button>
                      <button
                        onClick={() => setEditLevel('developmental')}
                        className={`p-2.5 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
                          editLevel === 'developmental' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        Developmental
                      </button>
                      <button
                        onClick={() => setEditLevel('double')}
                        className={`p-2.5 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer ${
                          editLevel === 'double' ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        Double-Pass (Recommended)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400">Editorial Scope</span>
                    <p className="text-sm font-black text-white">{editMetrics.label}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Estimated Delivery</p>
                      <p className="text-lg font-black text-amber-400">{editMetrics.speedWeeks} Weeks</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Editorial Passes</p>
                      <p className="text-lg font-black text-emerald-400">{editLevel === 'double' ? '2 Comprehensive Passes' : '1 Specialized Pass'}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 text-center font-semibold">
                    Includes 10+ page Editorial Assessment Letter & Track Changes Word Documents.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Custom Interactive Widget for Cover Design */}
          {serviceId === 'cover-design' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">Print Physics Calibration</span>
                <h3 className="text-xl font-black text-white">Mathematical Spine Caliper & Print Wrap Calculator</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Calculate mathematically exact spine width and full wrap dimensions for Amazon KDP and IngramSpark print standards.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Final Page Count: <span className="text-amber-400 font-mono font-black">{coverPageCount} pages</span>
                    </label>
                    <input 
                      type="range" 
                      min="80" 
                      max="600" 
                      step="10"
                      value={coverPageCount}
                      onChange={(e) => setCoverPageCount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Paper Stock</label>
                      <select 
                        value={coverPaperStock}
                        onChange={(e) => setCoverPaperStock(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="cream50">50# Cream (444 PPI - Fiction)</option>
                        <option value="white50">50# White (500 PPI - Non-Fiction)</option>
                        <option value="heavy70">70# White (380 PPI - Illustrated)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Trim Size</label>
                      <select 
                        value={coverTrimSize}
                        onChange={(e) => setCoverTrimSize(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="6x9">6.0" × 9.0" (Standard Bestseller)</option>
                        <option value="5.5x8.5">5.5" × 8.5" (Trade Fiction)</option>
                        <option value="7x10">7.0" × 10.0" (Executive Manual)</option>
                        <option value="8.5x11">8.5" × 11.0" (Workbook / Illustrated)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Calculated Spine Width</p>
                      <p className="text-lg font-black text-amber-400 font-mono">{coverSpecs.spineInches}" ({coverSpecs.spineMm}mm)</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Full Bleed Canvas</p>
                      <p className="text-lg font-black text-slate-200 font-mono">{coverSpecs.wrapWidth}" × {coverSpecs.wrapHeight}"</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium text-center">
                    Engineered with 0.125" bleed margins and safety zones matching KDP & IngramSpark printers specifications.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Custom Interactive Widget for Publishing & Global Distribution */}
          {serviceId === 'publishing' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 font-mono">Wholesale Distribution</span>
                <h3 className="text-xl font-black text-white">Ingram Wholesale Network & Global Bookstore Reach</h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Your book is integrated into the international wholesale catalogs used by 40,000+ bookstores, libraries, and university repositories worldwide.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-amber-400">40,000+</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bookstores & Libraries (Ingram)</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-amber-400">100%</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Direct Royalties Retained by Author</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-2xl font-black text-amber-400">195+</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Countries with Local POD Fulfillment</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Unique, In-Depth Editorial Deep-Dive Section */}
      <section id="service-deep-dive" className="max-w-6xl mx-auto px-4 mt-16 scroll-mt-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 space-y-8">
          
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 uppercase tracking-widest border border-blue-200">
              <Shield className="text-blue-600" size={13} />
              <span>{data.editorialDeepDive.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {data.editorialDeepDive.headline}
            </h2>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Comprehensive Technical & Methodological Blueprint
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {data.editorialDeepDive.paragraphs.map((para, index) => (
                <p key={index} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Technical Specifications Table */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-950">Technical Specifications</h3>
              </div>
              
              <div className="space-y-3 text-xs">
                {data.techSpecs.map((spec, i) => (
                  <div key={i} className="border-b border-slate-200/80 pb-2.5 last:border-b-0 space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">{spec.label}</span>
                    <span className="font-bold text-slate-900 block leading-snug">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle size={12} />
                  <span>Fully Audited by Perkins Editorial Board</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison Matrix: Perkins vs Traditional vs Cheap Freelancers */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="space-y-1 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest">WHY AUTHORS CHOOSE US</span>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Perkins Publisher vs. Traditional vs. Cheap Freelancer Directories
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 bg-slate-50 rounded-tl-xl">Feature / Deliverable</th>
                  <th className="py-3.5 px-4 bg-amber-500/10 text-amber-900 font-black">Perkins Publisher</th>
                  <th className="py-3.5 px-4 bg-slate-50">Traditional Big 5 Imprints</th>
                  <th className="py-3.5 px-4 bg-slate-50 rounded-tr-xl">Gig Platforms (Fiverr/Upwork)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Author Royalty Payouts</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-amber-500/5">100% Direct to Author</td>
                  <td className="py-3.5 px-4 text-rose-700">8% to 15% (after advance)</td>
                  <td className="py-3.5 px-4">DIY Setup Required</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Publishing Timeline</td>
                  <td className="py-3.5 px-4 font-black text-slate-950 bg-amber-500/5">3 to 5 Months (Turnkey)</td>
                  <td className="py-3.5 px-4 text-slate-500">18 to 24 Months</td>
                  <td className="py-3.5 px-4 text-slate-500">Unpredictable</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Intellectual Property Ownership</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-amber-500/5">100% Author Retained</td>
                  <td className="py-3.5 px-4 text-rose-700">Surrendered to Publisher</td>
                  <td className="py-3.5 px-4">Depends on Freelancer</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Global Wholesale Distribution</td>
                  <td className="py-3.5 px-4 font-black text-slate-950 bg-amber-500/5">Ingram (40,000+ Stores) + KDP</td>
                  <td className="py-3.5 px-4 text-slate-700">Complete Bookstore Reach</td>
                  <td className="py-3.5 px-4 text-rose-700">Amazon KDP Only</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Editorial & Production Rigor</td>
                  <td className="py-3.5 px-4 font-black text-slate-950 bg-amber-500/5">Former Big 5 Senior Editors</td>
                  <td className="py-3.5 px-4 text-slate-700">High Institutional Rigor</td>
                  <td className="py-3.5 px-4 text-rose-700">Variable / Unvetted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Structured Process Timeline */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest">ROADMAP TO LAUNCH</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Your Structured 4-Step Production Timeline
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {data.process.map((step, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 relative">
                <span className="text-2xl font-black text-amber-500/30 font-mono block">{step.step}</span>
                <h4 className="text-xs font-black text-slate-950 uppercase">{step.title}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest">TRANSPARENT ANSWERS</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Answered Queries</h3>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left p-5 flex justify-between items-center text-xs font-black text-slate-900 uppercase hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`text-slate-400 shrink-0 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} size={16} />
                </button>
                
                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Author Spotlight */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl text-center space-y-2">
            <p className="text-[10px] text-amber-900 font-black uppercase tracking-wider">⭐ Senior Editorial Supervisor Spotlight</p>
            <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
              "{data.authorSpotlight}"
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Stephanie Weldon, Perkins Publisher Executive Director</p>
          </div>
        </div>
      </section>

      {/* Connected Publishing Ecosystem & Internal Links Section */}
      <section className="max-w-6xl mx-auto px-4 mt-16 space-y-8">
        
        {/* Next Stage Companion Services */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest">NEXT STAGE ROADMAP</span>
            <h3 className="text-xl font-black text-slate-950 tracking-tight">
              Complementary Publishing Services in Your Journey
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Explore interconnected services to take your book from draft to global bestseller status.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {data.companionServices.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  onNavigate(`service-${service.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-left transition-all hover:shadow-md cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block">
                    {service.tag}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.name}
                  </h4>
                </div>
                <span className="text-xs text-blue-600 font-bold inline-flex items-center gap-1 pt-2">
                  <span>Explore Service</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Relevant Knowledge Hub Guides */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-600 tracking-widest">AUTHOR KNOWLEDGE BASE</span>
              <h3 className="text-xl font-black text-slate-950 tracking-tight">
                Recommended Publishing & Strategy Guides
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                In-depth articles from our European publishing research desk.
              </p>
            </div>

            <button
              onClick={() => {
                onNavigate('knowledge-hub');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-amber-600 hover:text-amber-700 font-black inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View All Guides in Knowledge Hub</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {data.relatedGuides.map((guide) => (
              <div 
                key={guide.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>Publishing Guide</span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">
                    {guide.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onNavigate('knowledge-hub');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer w-fit"
                >
                  <span>Read Guide in Knowledge Hub</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Call to Action Footer Section */}
      <section className="mt-16 py-16 bg-gradient-to-br from-blue-950 to-indigo-950 text-white px-4 text-center border-t border-amber-500/15">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-amber-400">
            Ready to Launch with Perkins Publisher?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-lg mx-auto">
            Book a complimentary bestseller blueprint evaluation with our executive directors. We will review your manuscript scope, formatting, and distribution strategy.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenConsultation(serviceId)}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl cursor-pointer shadow-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>Schedule My Free Consultation</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
