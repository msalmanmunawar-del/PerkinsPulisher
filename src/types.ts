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
