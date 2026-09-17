import { Book, Service, Testimonial, FAQItem } from './types';

export interface PromotionalPackage {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  promotionalPrice: number;
  discountPercentage: number;
  currency: string;
  slotsTotal: number;
  slotsRemaining: number;
  platformsCount: string;
  deliverables: {
    title: string;
    description: string;
  }[];
}

export const PROMOTIONAL_PACKAGE: PromotionalPackage = {
  id: 'promo-publishing-499',
  badge: '🔥 SPECIAL AUTHOR GRANT • 74% OFF',
  title: 'All-Inclusive €499 Complete Publishing Package',
  subtitle: 'Full book production with custom cover design, line editing, interior typesetting across all 3 versions (eBook, Paperback, Hardcover), and global publishing on 100+ major platforms.',
  originalPrice: 1899,
  promotionalPrice: 499,
  discountPercentage: 74,
  currency: '€',
  slotsTotal: 15,
  slotsRemaining: 4,
  platformsCount: '100+',
  deliverables: [
    {
      title: 'Custom Book Cover Design',
      description: 'Striking front, back, and spine wrap art tailored to your genre, optimized for digital displays and physical printing.'
    },
    {
      title: 'Professional Line Editing & Proofreading',
      description: 'Comprehensive manuscript polish by senior literary editors for punctuation, syntax, consistency, and pacing.'
    },
    {
      title: 'Interior Formatting in All 3 Versions',
      description: 'Typesetting for 1) Universal eBook (EPUB/Kindle), 2) Paperback with print bleed, and 3) Premium Hardcover case-wrap edition.'
    },
    {
      title: 'Publishing on 100+ Major Platforms',
      description: 'Worldwide distribution on Amazon KDP, Barnes & Noble, Apple Books, IngramSpark, Google Play, Kobo, Waterstones, and 40,000+ bookstores.'
    },
    {
      title: '100% Royalties & Full Copyrights',
      description: 'You keep 100% of your book earnings and retain full intellectual ownership. Zero ongoing publisher commission.'
    },
    {
      title: 'Official ISBN & Commercial Barcodes',
      description: 'Official EU and international ISBN allocation and compliant print barcodes provided with zero hidden fees.'
    }
  ]
};

export const SERVICES: Service[] = [
  {
    id: 'promo-publishing-499',
    title: '🌟 Flash Promotion: €499 All-Inclusive Package (74% OFF)',
    description: 'Special promotional publishing package: Complete custom cover design, professional line editing, interior formatting for all three versions (eBook, paperback, hardcover), and worldwide publishing across 100+ major platforms with 100% royalties retained.',
    iconName: 'Sparkles',
    benefits: [
      'Save €1,400 with our promotional author grant (Now only €499)',
      'Includes custom cover + professional editing + 3 formats (eBook, paper, hard)',
      'Worldwide live distribution on 100+ major platforms with 100% royalties retained'
    ],
    timeline: '4 to 6 weeks',
    deliverables: [
      'Custom Cover Design (Front, Back & Spine wrap)',
      'Line Editing & Complete Manuscript Proofreading',
      'All 3 formats: Responsive eBook (EPUB), Paperback, & Hardcover',
      'Worldwide distribution on Amazon, Barnes & Noble, Apple Books, IngramSpark, & 100+ platforms'
    ],
    startingPrice: 499
  },
  {
    id: 'publishing',
    title: 'Book Publishing & Distribution',
    description: 'We offer both guided self-publishing setups and full distribution packages to get your book on Amazon, Barnes & Noble, Ingram, and Apple Books. We handle ISBN registration, copyright office filings, printing configurations, and distribution channels.',
    iconName: 'BookColor',
    benefits: [
      '100% Rights and Royalties remain yours',
      'Worldwide print-on-demand & Kindle eBook setups',
      'ISBN registration & formal U.S. Copyright office filing'
    ],
    timeline: '6 to 8 weeks',
    deliverables: [
      'Print-ready Paperback and Hardback formats',
      'Universally responsive EPUB format for eReaders',
      'Direct distribution setup on major retailer dashboards'
    ],
    startingPrice: 1499
  },
  {
    id: 'ghostwriting',
    title: 'Professional Ghostwriting',
    description: 'Have a story to tell but struggle to find the words? Collaborate with our New York Times bestselling ghostwriters. We match you with an elite writer in your genre to capture your unique voice and narrative.',
    iconName: 'PenTool',
    benefits: [
      'Weekly collaborative outline and draft review sessions',
      'Comprehensive confidentiality with signed NDA agreements',
      'Perfect narrative structure tailored to keep readers hooked'
    ],
    timeline: '12 to 16 weeks',
    deliverables: [
      'Complete, professionally typed manuscript (50k - 80k words)',
      'Chapter-by-chapter developmental outline development',
      'Ready-to-edit finalized manuscript draft'
    ],
    startingPrice: 4999
  },
  {
    id: 'editing',
    title: 'Elite Editorial & Proofreading',
    description: 'Every classic book undergoes layers of rigorous editing. Our editors dissect your book for grammar, character development, thematic arches, syntax flow, and line-by-line stylistic pacing.',
    iconName: 'CheckSquare',
    benefits: [
      'Evaluated by former editors of major publishing houses',
      'Dual-round process: Developmental editor + Precision Proofreader',
      'Constructive feedback markup & custom stylistic style sheet file'
    ],
    timeline: '3 to 5 weeks',
    deliverables: [
      'Tracked Changes document with thorough edit markups',
      'Polished, ready-to-typeset clean manuscript files',
      'Detailed editorial summary critique breakdown report'
    ],
    startingPrice: 899
  },
  {
    id: 'cover-design',
    title: 'Custom Cover Design & Layout',
    description: 'An eye-catching cover is an author\'s ultimate marketing asset. Award-winning graphic designers craft striking wrappers and formatted internal typography aligned with printing standards.',
    iconName: 'Sparkles',
    benefits: [
      '3 custom conceptual design directions based on target market research',
      'Striking custom back-cover copy block layout configuration',
      'Flawless typesetting typography pairing for elite interior readability'
    ],
    timeline: '2 to 3 weeks',
    deliverables: [
      'High-resolution print-wrap PDF (Front, Back, and spine spine thickness)',
      'Digital e-book vector mockup assets for social media promotion',
      'Beautifully formatted interior book PDF layout ready for print'
    ],
    startingPrice: 699
  },
  {
    id: 'marketing',
    title: 'Strategic Bestseller Marketing',
    description: 'A great book is forgotten without strategic marketing. We launch a hyper-targeted promotional campaign, coordinate press releases, run Amazon PPC ads, and place you on bestseller trackers.',
    iconName: 'TrendingUp',
    benefits: [
      'Direct optimization of search metadata, keywords, and category targets',
      'Guaranteed features in major publishing reviews & articles',
      'Managed advertising budgets across Amazon KDP, BookBub, and Facebook'
    ],
    timeline: '4 to 6 weeks',
    deliverables: [
      'Tailored Marketing Roadmap showing targeted milestones',
      'Optimized author profile setup and custom press kit assets',
      'Monthly analytics review tracking ranking achievements'
    ],
    startingPrice: 1999
  },
  {
    id: 'audiobook',
    title: 'Audiobook Voice Casting & Mastering',
    description: 'Enrich your readership with dynamic narrations. We cast SAG-AFTRA voice actors, record in state-of-the-art voice studios, and master audio formats perfectly satisfying Audible and iTunes standards.',
    iconName: 'Mic',
    benefits: [
      'Access to dozens of top-rated narrator voice sample auditions',
      'Perfect sound production: pop filters, breath suppression, tone master',
      'Hassle-free upload administration handling royalty settings'
    ],
    timeline: '4 to 6 weeks',
    deliverables: [
      'ACX-compliant MP3 chapter files ready for Audible distribution',
      'Engaging 30-second retail audio sampler clip',
      'Flawless metadata naming configurations for podcast stores'
    ],
    startingPrice: 1299
  },
  {
    id: 'illustration',
    title: 'Custom Book Illustration',
    description: 'Perfect for children\'s books, sci-fi manuals, culinary steps, and fantasy maps. Our professional artists produce dazzling, character-filled illustrations in high resolution coordinate themes.',
    iconName: 'Palette',
    benefits: [
      'Fully customized character concept drafts before colorizing',
      'Vibrant color palette pairings capturing tone correctly',
      'High DPI assets preventing digital blurring or pixel issues'
    ],
    timeline: '4 to 8 weeks',
    deliverables: [
      'Completed digital canvas layered files in vector PDF',
      'Beautifully formatted full bleed layouts fitting target books',
      'Promotional character stickers and wallpaper assets'
    ],
    startingPrice: 999
  }
];

export const BOOKS: Book[] = [];

export const TESTIMONIALS: Testimonial[] = [];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How do royalties and book rights work with Perkins Publisher?',
    answer: 'Unlike traditional publishing houses or high-fee vanity agencies, we believe authors should own their work. You retain 100% of your publishing rights, 100% of copyrights, and you keep 100% of all generated royalties from book sales. We never take a percentage from your retailer payouts.',
    category: 'royalties'
  },
  {
    id: 'faq2',
    question: 'What is the average timeline to get my book published?',
    answer: 'For raw manuscripts that need final proofreading, typesetting layout, and cover graphic wrapping, the turnaround is generally 6 to 10 weeks. If you work with our veteran Ghostwriting department to develop the manuscript from scratch, it takes 12 to 16 weeks to ensure premium literary standards.',
    category: 'process'
  },
  {
    id: 'faq3',
    question: 'Where will my book be available for sale?',
    answer: 'We distribute books worldwide across 40,000+ bookstores, libraries, and retail networks. This includes Amazon (Kindle and Paperback), Barnes & Noble, Apple Books, Ingram, Kobo Books, Google Play, and Baker & Taylor.',
    category: 'distribution'
  },
  {
    id: 'faq4',
    question: 'Do I have to pay anything upfront, and what are the fees?',
    answer: 'We operate on a transparent, flat-fee-for-service model. There are zero hidden costs, recurring administration costs, or ongoing royalty cuts. You pay only for the custom services your book requires (such as formatting, editing, or illustration packages) which are structured clearly in our contracts upfront.',
    category: 'pricing'
  },
  {
    id: 'faq5',
    question: 'Can I print physical copies of my book, and how much do they cost?',
    answer: 'Yes! We configure your book on the absolute highest grade print-on-demand networks, allowing readers to buy paperback or premium case-bound hardcovers immediately. You can order author discount bulk books for reading events at bare wholesale print costs (e.g., around $3-$4 per paperback, depending on page thickness).',
    category: 'process'
  }
];
