export interface Book {
  id: string;
  title: string;
  author: string;
  genre: 'fiction' | 'nonfiction' | 'scifi' | 'selfhelp' | 'memoir';
  coverGradient: string;
  coverPattern: string;
  rating: number;
  badge?: string;
  synopsis: string;
  firstChapter: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
  timeline: string;
  deliverables: string[];
  startingPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  bookTitle: string;
  rating: number;
  date: string;
  avatar: string;
  comment: string;
  verified: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  genre: string;
  wordCount: number;
  services: string[];
  status: 'New' | 'Reviewing' | 'In Contact' | 'Contract Sent' | 'Archived';
  date: string;
  estimatedPrice: number;
  message?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'royalties' | 'process' | 'pricing' | 'distribution';
}

export interface LogoConfig {
  id: string;
  name: string;
  type: 'original' | 'serif' | 'modern' | 'custom_image' | 'custom_svg';
  text: string;
  textSize: string;      // e.g. "text-base", "text-lg", "text-xl", "text-sm"
  letterSpacing: string; // e.g. "tracking-[0.18em]", "tracking-widest", etc.
  textColor: string;     // Tailwind color class for text in light mode
  footerTextColor: string; // Tailwind color class for footer logo in dark mode
  iconName: string;      // Name of lucide icon like "BookOpen", "BookOpenCheck", "Sparkles", "Bookmark", "Crown"
  iconSize: number;      // e.g. 20
  strokeWidth: number;   // e.g. 1.5, 2
  fontFamily: string;    // e.g. "font-sans", "font-serif", "font-mono"
  isUppercase: boolean;  // whether logo text is uppercase
  customImageUrl?: string; // used when type = 'custom_image'
  customSvgMarkup?: string; // used when type = 'custom_svg'
}

