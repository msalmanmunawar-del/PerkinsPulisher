import { useState } from 'react';
import { 
  BookOpen, Sparkles, PenTool, CheckCircle, ArrowRight, DollarSign, 
  HelpCircle, ChevronDown, Award, Shield, Users, Mic, Layers, Star, 
  Clock, CheckSquare, Settings, FileText, Send, HelpCircle as HelpIcon, Play, Pause, ListTodo
} from 'lucide-react';

interface DynamicServicePageProps {
  serviceId: string;
  onOpenConsultation: (serviceId: string) => void;
  onNavigate: (page: string) => void;
}

export default function DynamicServicePage({
  serviceId,
  onOpenConsultation,
  onNavigate
}: DynamicServicePageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Custom configuration for each of the 11 key service lines
  const getServiceData = (id: string) => {
    switch (id) {
      case 'ghostwriting':
        return {
          title: 'Premium Book Ghostwriting Services',
          subtitle: 'Collaborate with New York Times Bestselling Authors',
          description: 'Turn your life achievements, business models, or creative ideas into a professionally drafted, commercially competitive book. We pair you with an elite ghostwriter in your specific genre who captures your authentic voice, coordinates deep outline maps, and delivers a flawless, turn-key manuscript.',
          tagline: 'CAPTURING YOUR BRAINPOWER, INKED TO PERFECTION.',
          stat1: '140+ Books Ghostwritten',
          stat2: '18 NYT Bestsellers',
          stat3: '100% Confidential (NDA)',
          features: [
            'Collaborative development of a detailed chapter-by-chapter outline',
            'Weekly 1-on-1 collaborative interviews to extract your insights, voice, and stories',
            'Elite developmental writing by veteran authors with major publishing credits',
            'Comprehensive developmental editing, style sheets, and polishing rounds included',
            'Strict non-disclosure agreements: you retain 100% of the authorship, rights, and royalties'
          ],
          process: [
            { step: '01', title: 'Deep Extraction Session', desc: 'A 3-hour collaborative interview to unpack your thesis, target market, tone, and complete narrative structure.' },
            { step: '02', title: 'Chapter Outline Map', desc: 'A comprehensive, chapter-by-chapter developmental roadmap highlighting themes, pacing, and core anecdotes.' },
            { step: '03', title: 'Drafting & Weekly Reviews', desc: 'Your dedicated writer develops the book in structured blocks of 10,000 words, reviewed by you weekly.' },
            { step: '04', title: 'Final Editorial Polish', desc: 'Our senior developmental editors review the completed draft to refine style, pace, and publishing readiness.' }
          ],
          faqs: [
            { q: 'Will my name be on the cover?', a: 'Absolutely. You are the sole author of the book. Our role is strictly confidential. No one will ever know a ghostwriter was involved unless you choose to tell them.' },
            { q: 'How long does the ghostwriting process take?', a: 'A standard non-fiction or business book (50,000 to 60,000 words) typically takes 12 to 16 weeks of structured collaborative development.' },
            { q: 'Who owns the copyright and royalties?', a: 'You retain 100% of the copyright, rights, and all future royalties from book sales. We do not participate in your sales revenue.' }
          ],
          authorSpotlight: 'Coached by Stephanie Weldon, our ghostwriting program matches you with writers who have written for major publishers including Penguin Random House and HarperCollins.'
        };
      case 'editing':
        return {
          title: 'Elite Developmental Editing & Proofreading',
          subtitle: 'Refine Your Manuscript for Global Literary Success',
          description: 'Every modern classic undergoes extensive, rigorous editorial passes. Our senior editors—former directors at major New York publishing houses—dissect your manuscript to enhance character arcs, thematic depth, logical argument structures, sentence flow, and microscopic grammatical layout.',
          tagline: 'CRAFTING FLAWLESS TEXT, PARAGRAPH BY PARAGRAPH.',
          stat1: '520+ Manuscripts Refined',
          stat2: 'Former NYT Editors',
          stat3: 'Two-Round Proofing',
          features: [
            'Structural developmental editing checking narrative pacing, character arcs, and core argument loops',
            'Line-by-line stylistic copyediting to refine sentence flow, tone vocabulary, and active voice metrics',
            'Rigorous final proofreading round targeting microscopic typos, punctuation, and typesetting alignment',
            'A comprehensive, multi-page Editorial Letter summarizing developmental strengths and tactical growth areas',
            'Direct access to your dedicated editor for collaborative feedback review sessions'
          ],
          process: [
            { step: '01', title: 'Editorial Assessment', desc: 'An initial read-through of your manuscript to gauge scope, structure, pacing, and developmental gaps.' },
            { step: '02', title: 'Developmental Edit Pass', desc: 'Deep restructuring, margin annotations, flow enhancements, and detailed chapter-by-chapter structural letters.' },
            { step: '03', title: 'Line Editing & Polish', desc: 'Fine-tuning of prose, word choices, syntactical clarity, paragraph transitions, and pacing metrics.' },
            { step: '04', title: 'Final Proofing', desc: 'A meticulous final read-through to trap lingering grammatical, spelling, formatting, and typographic errors.' }
          ],
          faqs: [
            { q: 'What is the difference between line editing and developmental editing?', a: 'Developmental editing looks at the big picture—pacing, logical flow, character arcs, and structure. Line editing focuses on the craft of the writing—sentence-by-sentence clarity, vocabulary, active voice, and rhythmic reading.' },
            { q: 'Can you edit a book written in any genre?', a: 'Yes. We have specialized editors for Business & Self-Help, Memoirs, Science Fiction & Fantasy, Mystery/Thrillers, and Academic/Non-fiction texts.' },
            { q: 'How long does a full edit take?', a: 'Typically 3 to 5 weeks depending on your word count and the depth of editing required.' }
          ],
          authorSpotlight: 'Led by chief editorial supervisor Zhana Xuere, our editorial team has combined experience of over 40 years preparing manuscripts for bestselling status.'
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
            { q: 'Who gets paid the royalties?', a: 'Amazon pays royalties directly to your bank account. Perkins Publishers takes 0% of your royalties. You receive 100% of the platform payouts.' },
            { q: 'Can I print physical hardcover copies of my book?', a: 'Yes! Amazon KDP and IngramSpark support premium print-on-demand hardcovers with dust jackets or case-laminate binding.' },
            { q: 'What is global distribution?', a: 'It makes your book available to over 40,000 libraries, indie bookstores, and international retailers through Ingram’s global catalog.' }
          ],
          authorSpotlight: 'Our Kindle SEO strategists specialize in mapping algorithms so your book ranks for organic buyer search queries from day one.'
        };
      case 'business':
        return {
          title: 'Business & Authority Book Publishing',
          subtitle: 'The Ultimate Marketing Tool for CEOs, Coaches, & Founders',
          description: 'A premium, physical book is the single most powerful business card in the world. We specialize in helping entrepreneurs, founders, consultants, and speakers plan, write, and launch authority-building business books that command high-ticket client signatures, premium speaking fees, and massive industry prestige.',
          tagline: 'DO NOT JUST BUILD A BUSINESS. PUBLISH YOUR INDUSTRY STANDARD.',
          stat1: '180+ Authority Books Published',
          stat2: 'Average 4.9x ROI on Leads',
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
            { q: 'Can I write off the publishing costs as a business expense?', a: 'Yes, most founders and businesses classify book production as a primary marketing and client acquisition expense.' }
          ],
          authorSpotlight: 'We have published books for founders, venture capitalists, corporate trial attorneys, and medical directors worldwide, facilitating millions in backend deals.'
        };
      case 'memoirs':
        return {
          title: 'Bespoke Memoir & Autobiography Publishing',
          subtitle: 'Preserve Your Legacy in a Premium, Elegant Volume',
          description: 'Your life stories, challenges, victories, and family histories deserve to be preserved in an elite literary heirloom. Our memoir writing and publishing program treats your personal history with immense dignity, matching you with sensitive, highly skilled historians who compile your memories into a captivating narrative structure.',
          tagline: 'YOUR STORY IS UNMATCHED. LEAVE A LEGACY THAT ENDURES FOREVER.',
          stat1: '95+ Personal Memoirs Crafted',
          stat2: 'Artisan Typography Formats',
          stat3: 'Family Legacy Heirlooms',
          features: [
            'Empathetic, highly respectful collaborative memoir writing sessions with certified biographers',
            'In-depth genealogical timeline mapping and chronological story structure checks',
            'Beautiful historical photo restoration and elegant placement throughout physical chapters',
            'Ultra-premium, bespoke physical printing: linen case binding, custom foils, and heavy cream paper',
            'Full custody of your personal archives and complete publishing independence'
          ],
          process: [
            { step: '01', title: 'Memory Mapping', desc: 'A comfortable, supportive multi-part interview series exploring family histories, life-altering turning points, and core lessons.' },
            { step: '02', title: 'Chronological Plotting', desc: 'Compiling dates, photos, letters, and locations into a cohesive, novel-like biographical timeline.' },
            { step: '03', title: 'Creative Storytelling', desc: 'Developing beautiful prose that reads like a cinematic saga while preserving your genuine voice and expressions.' },
            { step: '04', title: 'Artisan Book Binding', desc: 'Designing customized front wraps and utilizing elite printers for a luxurious physical feel and look.' }
          ],
          faqs: [
            { q: 'Can I publish a memoir strictly for my family and friends?', a: 'Yes! You can choose to distribute your memoir globally, or configure it on private print channels so only family and friends can order physical copies.' },
            { q: 'Do you help restore old photographs for the interior pages?', a: 'Yes. Our design team restores old photographs, slides, and historical documents, incorporating them beautifully in high-resolution into your book layout.' },
            { q: 'How private is this process?', a: 'We adhere to strict privacy mandates. All drafts, notes, transcripts, and photos are encrypted, and we sign robust NDAs prior to any discussions.' }
          ],
          authorSpotlight: 'We help turn lifetimes of trials and triumphs into beautiful literary volumes, preserving lessons for generations to come.'
        };
      case 'children':
        return {
          title: 'Premium Children\'s Book Publishing & Illustration',
          subtitle: 'Dazzle Young Readers with Breathtaking Custom Art',
          description: 'Creating a classic children\'s book requires an exquisite marriage of storytelling, visual layouts, and flawless print-ready dimensions. We couple your moral lessons and characters with world-class artists, manage full-bleed illustration setups, and format books for high-resolution physical printing and mobile device e-readers.',
          tagline: 'BRINGING IMAGINATION TO LIFE, PAGE BY BEAUTIFUL PAGE.',
          stat1: '160+ Children\'s Books Created',
          stat2: 'Award-Winning Custom Artists',
          stat3: 'High-DPI Vector Printing',
          features: [
            'Bespoke, hand-drawn digital illustration packages customized to your target age demographic',
            'Full character concept drafting, model sheet formulation, and storyboard mapping',
            'Perfect layout configurations: managing gutters, full bleed margins, safety lines, and font sizing',
            'Optimization for digital devices: Kindle Kids, Apple iPad Books, and Google Play books',
            'Wholesale cost print configurations for durable hardcovers and rich gloss papers'
          ],
          process: [
            { step: '01', title: 'Storyboard & Layout Mapping', desc: 'Dividing your children\'s manuscript text into page-by-page visual descriptions and choosing standard trim sizes.' },
            { step: '02', title: 'Character Design Concepts', desc: 'Developing custom model drafts for main characters, refining facial expressions, poses, and clothing.' },
            { step: '03', title: 'Full Illustration & Color', desc: 'Executing beautiful, high-resolution layered color files matching your preferred aesthetic style.' },
            { step: '04', title: 'Text Layout & Print Prep', desc: 'Superimposing bold, readable text, setting up correct CMYK printers profile, and compiling ready-to-upload files.' }
          ],
          faqs: [
            { q: 'Who owns the copyrights to the illustrations?', a: 'You do. Unlike typical illustration agencies, Perkins Publishers handles all artist contract buyouts so you own 100% of the graphic copyrights.' },
            { q: 'What age groups do you illustrate for?', a: 'We specialize in early reader picture books (ages 0-5), illustrated storybooks (ages 6-8), and middle-grade chapter books (ages 9-12).' },
            { q: 'What styles of art do you offer?', a: 'We offer watercolor, clean modern vector designs, whimsical hand-drawn pencil styles, 3D render designs, and classic cartoon styles.' }
          ],
          authorSpotlight: 'Our kids\' books department coordinates directly with children\'s literary experts to ensure your book satisfies developmental language and visual guidelines.'
        };
      case 'audiobook':
        return {
          title: 'Audiobook Voice Casting, Recording, & Mastering',
          subtitle: 'Enrich Your Readership with Elite SAG-AFTRA Narrators',
          description: 'Audible and Apple Books are experiencing explosive growth. Capture this major market with a pristine, captivating audio performance. We handle voice casting audition panels, manage professional SAG-AFTRA studio recordings, and master audio tracks to perfectly satisfy ACX standards.',
          tagline: 'THE PERFECT VOICE, CAPTIVATING LISTENERS WORLDWIDE.',
          stat1: '240+ Audiobooks Mastered',
          stat2: 'SAG-AFTRA Voice Talent',
          stat3: '100% ACX Compliance',
          features: [
            'Sourcing custom voice demo reels from leading, high-rated professional audiobook narrators',
            'Direct management of SAG-AFTRA contracts, compensation, and royalty splits if applicable',
            'State-of-the-art studio recording with high-fidelity audio gear and custom acoustic configurations',
            'Microscopic audio mastering: breathing removal, noise floor reduction, and decibel normalization',
            'Guaranteed approval and listing on Audible, iTunes, Spotify Audiobooks, and Audiobooks.com'
          ],
          process: [
            { step: '01', title: 'Narrator Casting Calls', desc: 'Creating script excerpt sample files and auditioning top narrators matching your preferred tone, accent, and gender.' },
            { step: '02', title: 'Studio Recording', desc: 'Supervising the reading sessions, maintaining pronunciation lists, and logging chapter audio files.' },
            { step: '03', title: 'Post-Production Mastering', desc: 'Precision editing to delete pops, long breaths, and page flips, adjusting RMS amplitudes for ACX specs.' },
            { step: '04', title: 'Audible Distribution', desc: 'Registering metadata, uploading master MP3 chapters, and managing Audible publishing approval portals.' }
          ],
          faqs: [
            { q: 'How long does it take to produce an audiobook?', a: 'Typically 4 to 6 weeks. The rule of thumb is that 10,000 words equals about 1 hour of finished audio.' },
            { q: 'Can I narrate my own audiobook?', a: 'Yes! If you have high-quality recording gear and an acoustically treated space, we provide guidance checklists and execute the final mastering/editing.' },
            { q: 'What is ACX?', a: 'ACX is the Audiobook Creation Exchange, the platform owned by Amazon that distributes audiobooks to Audible, iTunes, and Amazon.' }
          ],
          authorSpotlight: 'We have produced audiobooks in every major category—mystery thrillers, memoirs, business guides, and fantasy, achieving pristine audio certifications.'
        };
      case 'marketing':
        return {
          title: 'Strategic Bestseller Marketing & Metadata Optimization',
          subtitle: 'Do Not Write a Silent Masterpiece. Dominate Bestseller Trackers.',
          description: 'The difference between a forgotten book and a global bestseller is a strategic marketing engine. We launch hyper-targeted promotional campaigns, audit search algorithms, place custom Amazon PPC search advertisements, execute press releases, and optimize your book to secure #1 Bestseller categories.',
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
            { q: 'How much should I spend on book ads?', a: 'We recommend starting with modest daily budgets of $5 to $10, optimizing keyword click-through rates before scaling up.' }
          ],
          authorSpotlight: 'Our book promotional campaigns have reached millions of readers worldwide, securing national and international media placements.'
        };
      case 'pr-branding':
        return {
          title: 'Author PR & Personal Branding Blueprint',
          subtitle: 'Position Yourself as the Supreme Authority in Your Niche',
          description: 'A great book is only half the battle; building a prominent personal brand around your book establishes lifelong career authority. We design premium speaker pages, coordinate national digital PR press releases, construct authoritative brand messaging, and format highly clickable press kits.',
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
            { q: 'Do you guarantee media features?', a: 'We guarantee placement on major digital news hubs through our wire syndication partnerships, and pitch directly to target trade editors.' }
          ],
          authorSpotlight: 'Our personal branding team has shaped the public profiles of Fortune 500 executives, Silicon Valley founders, and elite academic researchers.'
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
            { q: 'What is a carousel post?', a: 'A document post on LinkedIn that allows users to swipe through a series of highly visual, content-rich executive slides.' }
          ],
          authorSpotlight: 'We coordinate with enterprise managers to build thought-leadership engines that generate organic outbound leads and speaking invites.'
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
            { q: 'How many bookings does your campaign typically secure?', a: 'Our standard booking campaigns aim to secure 6 to 12 highly aligned podcast bookings within a 90-day period.' }
          ],
          authorSpotlight: 'Our team acts as your elite booking agency, letting you focus entirely on delivering a powerful, inspirational speech on the mic.'
        };
      default:
        return {
          title: 'Premium Author Services',
          subtitle: 'Global Bestseller Book Production',
          description: 'Publish your book with the industry\'s leading service provider.',
          tagline: '100% INDEPENDENCE. 100% ROYALTIES.',
          stat1: 'Premium Craftsmanship',
          stat2: 'Verified Results',
          stat3: 'Dedicated Support',
          features: [],
          process: [],
          faqs: [],
          authorSpotlight: ''
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

  // Compute KDP Royalties
  const computeKdpRoyalties = () => {
    const isHardcover = kdpCoverType === 'hardcover';
    // Standard KDP printing math
    // Paperback: $0.85 fixed cost + $0.012 per page (b&w)
    // Hardcover: $5.65 fixed cost + $0.012 per page
    const pageEstimate = Math.ceil(kdpWordCount / 250);
    const printingCost = isHardcover 
      ? 5.65 + (pageEstimate * 0.012)
      : 0.85 + (pageEstimate * 0.012);
    
    // Amazon KDP keeps 40% on print channels
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
    let multiplier = 0.015; // proofreading
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
      label,
      speedWeeks,
      estCost: Math.round(estCost)
    };
  };

  const editingResults = computeEditingMetrics();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      
      {/* Visual Service Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-20 lg:py-28 text-white px-4 border-b border-amber-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e293b,transparent_60%)] opacity-40"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-400 uppercase tracking-widest border border-amber-500/20">
              <Sparkles size={12} />
              {data.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              {data.title}
            </h1>
            <p className="text-xl text-slate-300 font-bold leading-normal">
              {data.subtitle}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              {data.description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onOpenConsultation(serviceId)}
                className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Schedule My Free consultation</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigate('knowledge-hub')}
                className="bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl border border-white/10 transition-all cursor-pointer"
              >
                Visit Knowledge Hub
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
              <h3 className="text-lg font-black uppercase text-amber-400 border-b border-white/10 pb-3 flex items-center gap-2">
                <Award size={18} />
                Bestseller Program Metrics
              </h3>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Scope</p>
                  <p className="text-sm font-black text-white mt-1">{data.stat1.split(' ')[0]}</p>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{data.stat1.split(' ').slice(1).join(' ')}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Authority</p>
                  <p className="text-sm font-black text-white mt-1">{data.stat2.split(' ')[0]}</p>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{data.stat2.split(' ').slice(1).join(' ')}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Security</p>
                  <p className="text-sm font-black text-white mt-1">100%</p>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Rights Kept</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Included Deliverables</p>
                <ul className="space-y-2">
                  {data.features.slice(0, 3).map((feat, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed font-bold">
                      <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={14} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Service-Specific Tool Wrapper Section */}
      <section className="py-16 px-4 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-black uppercase text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full tracking-widest">INTERACTIVE PUBLISHING LAB</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {serviceId === 'kdp' ? 'Amazon KDP Royalty Estimator' : 
               serviceId === 'editing' ? 'Editorial Budget & Word Grader' : 
               serviceId === 'ghostwriting' ? 'Collaborative Manuscript Pacing Planner' : 
               serviceId === 'children' ? 'Illustration Style & Art Palettes' : 
               serviceId === 'audiobook' ? 'ACX Narrator Casting Panel' : 
               'Tailored Launch & Program Timeline Builder'}
            </h2>
            <p className="text-sm text-slate-500 font-semibold max-w-xl mx-auto">
              Experiment with our customized program engines to view live estimates, trim sizing formats, and design pacing roadmaps.
            </p>
          </div>

          {/* Interactive Widget 1: Amazon KDP Royalty Calculator */}
          {serviceId === 'kdp' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-5">
                <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Configure Trim and Estimates</h3>
                
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Manuscript Word Count</label>
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{kdpWordCount.toLocaleString()} words</span>
                    <span>~ {Math.ceil(kdpWordCount / 250)} printed pages</span>
                  </div>
                  <input 
                    type="range" 
                    min={20000} 
                    max={120000} 
                    step={5000} 
                    value={kdpWordCount} 
                    onChange={(e) => setKdpWordCount(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Print Style</label>
                    <select 
                      value={kdpCoverType}
                      onChange={(e) => setKdpCoverType(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-xs font-bold rounded-lg p-2.5 text-white"
                    >
                      <option value="paperback">Standard Paperback</option>
                      <option value="hardcover">Casebound Hardcover</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Retail List Price ($)</label>
                    <input 
                      type="number" 
                      min={4.99} 
                      max={49.99} 
                      step={0.5} 
                      value={kdpListPrice}
                      onChange={(e) => setKdpListPrice(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-700 text-xs font-bold rounded-lg p-2 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Target First-Year Sales</label>
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{kdpSales.toLocaleString()} copies sold</span>
                  </div>
                  <input 
                    type="range" 
                    min={200} 
                    max={5000} 
                    step={100} 
                    value={kdpSales} 
                    onChange={(e) => setKdpSales(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-6 bg-slate-800/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Estimated Revenue Breakdowns</h4>
                
                <div className="space-y-3 divide-y divide-slate-800">
                  <div className="flex justify-between text-xs font-semibold py-2">
                    <span className="text-slate-400">Total Storefront Sales Volume</span>
                    <span className="font-extrabold text-white">${(kdpListPrice * kdpSales).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold py-2">
                    <span className="text-slate-400">Amazon Retailer Cut (40%)</span>
                    <span className="text-red-400 font-extrabold">-${parseFloat(kdpResults.amazonCut).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold py-2">
                    <span className="text-slate-400">Print-On-Demand Production (per unit: ${kdpResults.unitPrinting})</span>
                    <span className="text-red-400 font-bold">-${parseFloat(kdpResults.printingTotal).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black py-3 text-amber-400 border-t border-slate-800">
                    <span>Your Bestseller Net Profit (100% Retained)</span>
                    <span className="text-xl">${parseFloat(kdpResults.profit).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-[10px] text-amber-300 font-bold leading-normal">
                  💡 <strong>Traditional Alternative:</strong> A legacy publisher pays only 10% royalties, netting you less than $1.50 per sale on a $15 paperback. With Perkins KDP programs, you pocket over <strong>${kdpResults.netPerBook} net royalty</strong> per sale!
                </div>
              </div>
            </div>
          )}

          {/* Interactive Widget 2: Editing Calculator */}
          {serviceId === 'editing' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 space-y-5">
                <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Manuscript Specification Grader</h3>
                
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Word Count</label>
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>{editWordCount.toLocaleString()} words</span>
                    <span>~ {Math.ceil(editWordCount / 350)} double-spaced pages</span>
                  </div>
                  <input 
                    type="range" 
                    min={20000} 
                    max={120000} 
                    step={2500} 
                    value={editWordCount} 
                    onChange={(e) => setEditWordCount(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Editorial Depth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setEditLevel('proofreading')}
                      className={`py-2.5 px-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${editLevel === 'proofreading' ? 'bg-amber-500 text-blue-950 border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      Proofreading
                    </button>
                    <button 
                      onClick={() => setEditLevel('developmental')}
                      className={`py-2.5 px-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${editLevel === 'developmental' ? 'bg-amber-500 text-blue-950 border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      Developmental
                    </button>
                    <button 
                      onClick={() => setEditLevel('double')}
                      className={`py-2.5 px-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${editLevel === 'double' ? 'bg-amber-500 text-blue-950 border-amber-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                    >
                      Elite Double Pass
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 bg-slate-800/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Calculated Production Metrics</h4>
                
                <div className="space-y-3 divide-y divide-slate-800">
                  <div className="flex justify-between text-xs font-semibold py-2">
                    <span className="text-slate-400">Target Editorial Tier</span>
                    <span className="text-amber-400 font-extrabold uppercase text-[10px]">{editLevel}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold py-2">
                    <span className="text-slate-400">Editorial Methodology</span>
                    <span className="text-white font-bold">{editingResults.label}</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold py-2">
                    <span className="text-slate-400">Estimated Timeline Turnaround</span>
                    <span className="text-white font-extrabold">{editingResults.speedWeeks} Weeks</span>
                  </div>
                  <div className="flex justify-between text-sm font-black py-3 text-amber-400 border-t border-slate-800">
                    <span>Estimated Editorial Budget</span>
                    <span className="text-xl">${editingResults.estCost.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[10px] text-blue-300 font-bold leading-normal">
                  🚀 <strong>Quality Guarantee:</strong> Every Perkins developmental edit includes an initial manuscript diagnostic audit plus a dedicated Zoom review with your NYT-credited editor.
                </div>
              </div>
            </div>
          )}

          {/* Interactive Widget 3: Ghostwriting Manuscript Planner */}
          {serviceId === 'ghostwriting' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Manuscript Pacing Planner</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                  <FileText className="mx-auto text-amber-400" size={24} />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Chapter Count</p>
                  <p className="text-lg font-black text-white">12 Chapters</p>
                  <p className="text-[10px] text-slate-400">~ 4,500 words per chapter</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                  <Clock className="mx-auto text-amber-400" size={24} />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Weekly Interviews</p>
                  <p className="text-lg font-black text-white">14 Weeks</p>
                  <p className="text-[10px] text-slate-400">Recorded audio transcription</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-center space-y-2">
                  <Users className="mx-auto text-amber-400" size={24} />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Confidentiality Guard</p>
                  <p className="text-lg font-black text-white">100% Blind NDA</p>
                  <p className="text-[10px] text-slate-400">Corporate-grade data lock</p>
                </div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-xs font-black text-amber-400 uppercase tracking-widest">Ready to Capture Your Brainpower?</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-bold">Unpack your stories in structured chapters with our NYT-credited biographers.</p>
                </div>
                <button 
                  onClick={() => onOpenConsultation('ghostwriting')}
                  className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-lg cursor-pointer shrink-0"
                >
                  Schedule Outline Session
                </button>
              </div>
            </div>
          )}

          {/* Interactive Widget 4: Children's Art Style Selector */}
          {serviceId === 'children' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Artistic Palette & Character Styles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'watercolor', label: 'Classic Watercolor', color: 'from-pink-400 to-indigo-400', desc: 'Soft textures, whimsical, pastel blends' },
                  { id: 'vector', label: 'Bold Digital Vector', color: 'from-amber-400 to-red-400', desc: 'High contrast, sharp edges, modern clean' },
                  { id: 'pencil', label: 'Hand-Sketched Pencil', color: 'from-stone-400 to-stone-600', desc: 'Detailed shading, nostalgic, vintage feel' },
                  { id: '3d-style', label: 'CGI Whimsical 3D', color: 'from-blue-400 to-emerald-400', desc: 'Rich depths, clay-molded visual aesthetic' }
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setIllustrationStyle(style.id)}
                    className={`p-4 rounded-2xl text-left border text-white transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-32 ${illustrationStyle === style.id ? 'bg-slate-800 border-amber-500 ring-2 ring-amber-500/20' : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/60'}`}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${style.color} shadow-lg`} />
                    <div className="space-y-0.5 z-10">
                      <p className="text-xs font-black uppercase tracking-tight">{style.label}</p>
                      <p className="text-[9px] text-slate-400 font-bold leading-normal">{style.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-xs text-amber-300 font-bold leading-relaxed">
                💡 <strong>Artist Buyouts Included:</strong> Perkins Publishers registers full graphic copyright buyouts from our contracted illustrators. You hold 100% of the visual character licensing rights for merchandise, animation, and spin-offs!
              </div>
            </div>
          )}

          {/* Interactive Widget 5: Audiobook ACX casting demo */}
          {serviceId === 'audiobook' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
              <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Narrator Voice Sample Casting</h3>
              
              <div className="space-y-3">
                {[
                  { name: 'David Vance', accent: 'British RP / Deep & Authoritative', time: 'Non-Fiction, Memoirs', id: 'david' },
                  { name: 'Sarah Sterling', accent: 'American Standard / Warm & Engaging', time: 'Self-Help, Business Books', id: 'sarah' },
                  { name: 'James Thorne', accent: 'Manhattan Noir / Gritty & Paced', time: 'Mystery, Crime Fiction', id: 'james' }
                ].map((actor) => (
                  <div key={actor.id} className="flex items-center justify-between p-4 bg-slate-800/60 border border-slate-800 rounded-xl">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-white">{actor.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{actor.accent} • <span className="text-amber-500 font-extrabold">{actor.time}</span></p>
                    </div>
                    <button
                      onClick={() => setPlayingAudition(playingAudition === actor.id ? null : actor.id)}
                      className="p-2.5 rounded-full bg-slate-700 hover:bg-amber-500 text-white hover:text-blue-950 transition-colors cursor-pointer"
                    >
                      {playingAudition === actor.id ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  </div>
                ))}
              </div>

              {playingAudition && (
                <div className="p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-center text-xs text-amber-300 font-bold animate-pulse">
                  🔊 Simulated Audition Track Playing: "{playingAudition.toUpperCase()}" reciting Chapter One manuscript guidelines...
                </div>
              )}
            </div>
          )}

          {/* Fallback general interactive launch week planner */}
          {serviceId !== 'kdp' && serviceId !== 'editing' && serviceId !== 'ghostwriting' && serviceId !== 'children' && serviceId !== 'audiobook' && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-md font-black uppercase text-amber-400 border-b border-slate-800 pb-2">Launch Week campaign Elements</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <div className="text-2xl font-black text-amber-400">60-Day</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preparation Runway</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <div className="text-2xl font-black text-amber-400">100%</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metadata Indexing</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-800 space-y-1 text-center">
                  <div className="text-2xl font-black text-amber-400">#1 Rank</div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Algorithm Targeted</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center leading-relaxed font-bold">
                Our tailored personal programs package your insights into ready-to-sell assets targeting high-value corporate clients.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Entity-Rich Editorial Deep-Dive Block */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200/60 space-y-6 leading-relaxed">
            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase border-b border-slate-100 pb-4 flex items-center gap-2">
              <Shield className="text-amber-500" size={20} />
              The Perkins Professional Standard & Authority Guidelines
            </h3>
            <p className="text-xs text-slate-600 font-bold leading-normal">
              Unlike online crowd-sourcing directories or high-fee, non-collaborative traditional vanity printers, Perkins Publishers handles your manuscript as an asset of supreme cultural and business value.
            </p>
            <p className="text-xs text-slate-600 font-bold leading-normal">
              Whether you are an executive compiling 20 years of organizational frameworks or a seasoned writer composing a highly anticipated memoir, we align each step of formatting, editing, and upload administrative tasks with elite commercial publishing metrics. We purchase official ISBN blocks, execute formal Copyright registry catalogs, and format interiors according to industry-standard gutters and spine sizes.
            </p>
            <p className="text-xs text-slate-600 font-bold leading-normal">
              Your manuscript undergoes dual-round proofing from editors previously coordinating catalogs at major New York publishing agencies. Once polished, your metadata, search tags, and Kindle configurations are tested against Amazon KDP and Ingram algorithms, securing immediate indexation.
            </p>
          </div>

          {/* Process Timeline Block */}
          <div className="space-y-8">
            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase text-center">Your Structured Publishing Timeline</h3>
            <div className="grid sm:grid-cols-4 gap-6 relative">
              {data.process.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-3 relative">
                  <span className="absolute -top-4 left-6 text-2xl font-black text-amber-500/10 bg-slate-50 px-2">{step.step}</span>
                  <h4 className="text-xs font-black text-slate-900 uppercase pt-2">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Structured FAQ Block */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest">HAVE QUESTIONS?</span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Frequently Answered Queries</h3>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left p-5 flex justify-between items-center text-xs font-black text-slate-900 uppercase hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} size={16} />
                </button>
                
                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 font-bold leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Author Spotlight / Coached Quote */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl text-center space-y-3">
            <p className="text-xs text-amber-900 font-black uppercase tracking-wider">⭐ Elite Program Supervisor Spotlight</p>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed italic">
              "{data.authorSpotlight}"
            </p>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase">Stephanie Weldon, Perkins Publishers Executive Director</p>
          </div>

        </div>
      </section>

      {/* Call to Action Footer Panel */}
      <section className="py-16 bg-gradient-to-br from-blue-950 to-indigo-950 text-white px-4 text-center border-t border-amber-500/15">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-amber-400">Ready to Publish Your Bestseller?</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-bold max-w-lg mx-auto">
            Book a complimentary bestseller blueprint session with our executive directors. We will analyze your manuscript, trim layouts, illustration palettes, or ghostwriting timelines.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenConsultation(serviceId)}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl cursor-pointer shadow-xl inline-flex items-center gap-2"
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
