import { Book, Service, Testimonial, FAQItem } from './types';

export const SERVICES: Service[] = [
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

export const BOOKS: Book[] = [
  {
    id: 'book1',
    title: 'The Crimson Skyline',
    author: 'Marcus Vance',
    genre: 'fiction',
    coverGradient: 'from-red-950 via-slate-900 to-black',
    coverPattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
    rating: 4.8,
    badge: '🏆 #1 NYT BESTSELLER',
    synopsis: 'A high-stakes thriller centered around Julian Thorne, a senior cryptographic codebreaker in Manhattan who stumbles upon an encrypted file containing coordinates of assets that don\'t officially exist. As the web closes, Julian must choose between trusting his allies or trusting his instincts.',
    firstChapter: [
      'CHAPTER ONE: THE MIDNIGHT DECRPYT',
      'The neon glare from the billboard on 42nd Street sliced through the heavy blinds of Julian\'s office, casting crimson slats across his desk like fresh incision lines.',
      'It was 3:17 AM.',
      'On his primary display, a progress sequence was frozen at 99.8%. For six weeks, the servers in the basement had been chewing on a 4096-bit cryptographic sequence snatched from a defunct satellite in geostationary orbit over the Baltic Sea.',
      'Julian exhaled slowly, cold coffee burning his throat. He put his fingers over the hot aluminum chassis of his keyboard, feeling the high-voltage vibration of the machinery underneath.',
      'Then, the console chimed. A soft, acoustic note that sounded like a chime of death in the empty boardroom.',
      'DECIPHER COMPLETE.',
      'The text that populated the canvas did not form binary strings or foreign languages. Instead, it was an ledger. A neat, alphabetical manifest of corporate bank accounts, political assets, and names. At the top of page three, staring in high contrast gray-white text, was Julian\'s own social security number, tagged with a single field status: DISPOSABLE.',
      'He reached for his phone, but before his fingers brushed the glass, the screen lit up with a secure notification from an unknown sender: "They know you opened it. Leave via the laundry shoot. Do not touch the elevators."'
    ]
  },
  {
    id: 'book2',
    title: 'Pathways to Resilience',
    author: 'Dr. Eleanor Chase',
    genre: 'nonfiction',
    coverGradient: 'from-[#0d2a4a] via-[#104a75] to-[#0b1b2d]',
    coverPattern: 'bg-[linear-gradient(to_right_bottom,_var(--tw-gradient-stops))]',
    rating: 4.9,
    badge: '🔥 CRITICS\' CHOICE',
    synopsis: 'An essential psychological blueprint explaining how human neural circuits withstand extreme, unexpected life modifications. Dr. Chase combines decade-long clinical behavioral experiments with pragmatic strategies to cultivate mental grit under modern exhaustion environments.',
    firstChapter: [
      'CHAPTER ONE: THE ARCHITECTURE OF STATIC',
      'We tend to view mental resilience as a muscular structure—something to be hardened through pain, stiffened against trauma, and loaded with heavy burdens of stoicism.',
      'Our evolutionary biology argues otherwise.',
      'The ancient redwood tree stands over three hundred feet tall, weathering Pacific storms not by remaining entirely rigid, but by interlocking its shallow root network with neighboring redwoods, distributing the shock of the winds across a community.',
      'In psychology, our neural connections mimic this ancient redwood forest. When life events crash over our consciousness, the instinct to isolate, and stiffen our resolve is a biological trap. True resilience is elastic.',
      'During my twelve-year study of trauma survivors at the neuro-scientific lab in Zurich, we noticed a consistent biomarker in patients who recovered from profound chronic stress. Their cortisol curves didn\'t flatten; their neural networks formed new, creative detour loops around injured memory files.',
      'They didn\'t fixate on returning to what was. They surrendered the old blueprint and quickly drafted a dynamic new frame.'
    ]
  },
  {
    id: 'book3',
    title: 'Echoes of the Cosmos',
    author: 'S. J. Miller',
    genre: 'scifi',
    coverGradient: 'from-[#1e0b36] via-[#3a085c] to-black',
    coverPattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
    rating: 4.7,
    badge: '🚀 SCI-FI WORLD AWARD',
    synopsis: 'Set in the year 2394, human explorer teams exploring the Kuiper Belt discover an acoustic signal broadcasting from inside Pluto\'s frozen mantle. As Captain Sarah Chen attempts to translate the planetary echo, her team discovers the horrifying reality: the signal isn\'t a message. It is a clock countdown.',
    firstChapter: [
      'CHAPTER ONE: PLUTO\'S PULSE',
      'Space, in popular imagination, is an infinite cathedral of quietude.',
      'But to Captain Sarah Chen, space was a screeching metal scrap-yard.',
      'The exploratory crawler *The Boreas* vibrated with the deep, mechanical rumble of diamond-tipped drill bits slicing through nitrogen ice at negative three hundred and eighty degrees Fahrenheit. To Sarah, the vibration was comforting—it meant the life support lines were circulating heat through her oxygen vest.',
      'Then, the drills hit bedrock. The vibration ceased.',
      'Instead, a magnetic pulsation hummed through the cabin floor, causing the heavy wrenches on the magnetic tool pegs to chime in unison.',
      '"Sarah, you seeing the acoustic sensors?" Chief Engineer Mercer whispered, his face glowing pale blue behind his helmet visor. He pointed directly to the seismograph readouts.',
      'It was a rhythmic, mathematical thump-thump. Repeating exactly every 14.3 seconds.',
      'It wasn\'t static interference from Saturn\'s auroral belts, nor was it thermal expansion inside the drills. It was a rhythmic planetary heartbeat. And our sensors registered that the pulse was speeding up, shave-by-shave, with each revolving orbit.'
    ]
  },
  {
    id: 'book4',
    title: 'Stardust Memories',
    author: 'Cassandra Thorne',
    genre: 'memoir',
    coverGradient: 'from-[#422006] via-[#78350f] to-stone-900',
    coverPattern: 'bg-[linear-gradient(to_bottom_right,_var(--tw-gradient-stops))]',
    rating: 4.9,
    badge: '✨ READERS\' TOP CHOICE',
    synopsis: 'An evocative, beautifully descriptive memoir of Cassandra Thorne\'s days growing up inside the bohemian counter-culture art studios of Greenwich Village in the early 1970s. This book chronicles the raw, unfiltered struggles of her family finding their creative voice among literary icons.',
    firstChapter: [
      'CHAPTER ONE: THE SCENT OF TURPENTINE',
      'If you close your eyes and ask me what home felt like in 1972, I will tell you it tasted of filterless Gitanes cigarettes, turpentine, and stale espresso from the Cafe Reggio.',
      'We lived in a loft on MacDougal Street, with tin ceilings so rusted they flaked metallic snow over our pillows whenever the subway train roared below ground.',
      'My mother was an expressionist painter who believed canvas stretcher bars were more vital than bread. My father spent his afternoons writing free-verse poems on yellow napkins from the diner next door, claiming that printing presses were handcuffs for real thinkers.',
      'I was seven years old when James Baldwin sat in our kitchen, drinking rye whiskey from a chipped teacup and explaining to me why writing was the only honest way to scream without hurting anyone.',
      'In those days, Greenwich Village wasn\'t a wealthy tourist museum. It was an operating room for artists, where we sliced our hearts open every night to examine the wounds under candlelight, hoping to find a fragment of absolute truth inside.'
    ]
  },
  {
    id: 'book5',
    title: 'Unshakable Foundations',
    author: 'Robert Haynes',
    genre: 'selfhelp',
    coverGradient: 'from-amber-950 via-slate-900 to-black',
    coverPattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
    rating: 4.8,
    badge: '📊 BUSINESS BESTSELLER',
    synopsis: 'Robert Haynes delivers the definitive strategic guide for modern founders, providing a pragmatic manual on how to structure a business that resists market volatility, automates logistics, and secures lasting funding.',
    firstChapter: [
      'CHAPTER ONE: THE ILLUSION OF SCALE',
      'Most startups collapse not because they fail to attract initial interest, but because they accelerate before stabilizing their launch foundations.',
      'They scale on top of a swamp of unproven assumptions.',
      'In my twenty years of advising venture capital firms across Silicon Valley, I have seen founders raise fifty million dollars based purely on visual slides, only to burn it all within eighteen months on bloated team setups and visual vanity metrics.',
      'Grit in business is not about speed. It is about understanding unit economics from day one.',
      'If it costs you fifteen dollars to acquire a customer who only yields you ten dollars in lifetime value, then acquiring a million customers doesn\'t make you a unicorn. It makes you bankrupt at scale.',
      'We must return to old-school arithmetic. Before you spend a dollar on advertising, ensure your primary offer holds true under pressure. Test your pricing models, talk with real users directly, and make sure your team runs extremely lean.'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Sandra Mitchell',
    role: 'Bestselling Authoress',
    bookTitle: 'The Midnight Silhouette',
    rating: 5,
    date: 'May 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    comment: 'Working with Perkins Publisher was the turning point of my literary career. After two publishers rejected my manuscript, the editorial team at Perkins helped restructure our plot tension and designed an elite cover that immediately went viral. I kept 100% of our royalties, and my book hit #1 in the Amazon Mystery category!',
    verified: true
  },
  {
    id: 'test2',
    name: 'Dr. Robert Chen',
    role: 'Neuroscientist & Academic Author',
    bookTitle: 'Pathways to Resilience',
    rating: 5,
    date: 'April 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    comment: 'The formatting design of my textbook was incredibly complex, with intricate neurological charts and diagnostic comparative models. Perkins Publisher didn\'t flinch. Their structural typesetting layout was absolutely stunning, and the physical print quality was elite. Our marketing consultant also set up an Amazon Ads strategy that continues to yield incredible passive revenue streams.',
    verified: true
  },
  {
    id: 'test3',
    name: 'Clara Vane',
    role: 'Indie Science-fiction Writer',
    bookTitle: 'Echoes of the Cosmos',
    rating: 5,
    date: 'March 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    comment: 'I requested their premier ghostwriting and cover combo for our cosmic space opera. The collaborative writing sessions were so inspiring—it felt like they were inside my head! The final product felt polished, pacing was stellar, and it reads like a major motion picture script. Direct upload administration assistance made distribution perfectly smooth.',
    verified: true
  },
  {
    id: 'test4',
    name: 'Arthur Sterling',
    role: 'Retired Journalist & Historian',
    bookTitle: 'Beyond the Berlin Wall',
    rating: 5,
    date: 'February 2, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    comment: 'As a career reporter, I am fiercely protective of my writing voice. The senior proofreading team at Perkins Publisher treated my historical archive memoir with immense care—fixing typographic inconsistencies without altering my fundamental natural delivery style. Highly recommended services.',
    verified: true
  }
];

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
