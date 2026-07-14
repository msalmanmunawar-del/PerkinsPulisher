import { useState, useEffect } from 'react';
import { 
  BookOpen, Phone, Menu, X, Shield, Award, Sparkles, ChevronDown, 
  PenTool, CheckSquare, Settings, Flame, Star, BookMarked, Mic, 
  Palette, Library, Send, HelpCircle, FileText, Share2, Award as AwardIcon, Users
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { LogoConfig } from '../types';

interface HeaderProps {
  logoConfig: LogoConfig;
  onNavigate: (page: string) => void;
  activePage: string;
  onOpenConsultation: () => void;
}

export default function Header({
  logoConfig,
  onNavigate,
  activePage,
  onOpenConsultation,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    { label: 'Ghostwriting Services', id: 'service-ghostwriting', desc: 'Work with NYT bestselling biographers.' },
    { label: 'Elite Editorial & Proofing', id: 'service-editing', desc: 'Grammar, style, and flow refinement.' },
    { label: 'Amazon KDP Setup', id: 'service-kdp', desc: 'Self-publishing metadata and uploads.' },
    { label: 'Business & Authority Books', id: 'service-business', desc: 'Lead generation and prestige assets.' },
    { label: 'Memoirs & Legacy Books', id: 'service-memoirs', desc: 'Preserve personal histories in foil linen.' },
    { label: 'Children’s Book Production', id: 'service-children', desc: 'Custom high-resolution illustrations.' },
    { label: 'Audiobook Castings', id: 'service-audiobook', desc: 'Cast SAG-AFTRA voice actors and master.' },
    { label: 'Bestseller Marketing', id: 'service-marketing', desc: 'PPC ad management and category rank.' },
    { label: 'PR & Personal Branding', id: 'service-pr-branding', desc: 'Media kit design and press distribution.' },
    { label: 'LinkedIn Thought Leadership', id: 'service-linkedin', desc: 'B2B lead generation from your book.' },
    { label: 'Speaking & Podcast Bookings', id: 'service-podcast-speaking', desc: 'Outreach to top show hosts.' },
  ];

  const industriesList = [
    { label: 'Coaches', id: 'industry-coaches', desc: 'High-ticket client acquisition.' },
    { label: 'Consultants', id: 'industry-consultants', desc: 'Secure high-value corporate retainers.' },
    { label: 'Doctors & Dentists', id: 'industry-doctors', desc: 'Establish patient trust & practice growth.' },
    { label: 'Attorneys & Lawyers', id: 'industry-lawyers', desc: 'Command authority in legal niches.' },
    { label: 'CEOs & Executives', id: 'industry-ceos', desc: 'Amplify corporate brand & secure funding.' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    
    // Smooth scroll if target is on home page
    if (['services', 'portfolio', 'reviews', 'insights', 'seo-scorecard'].includes(id)) {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      onNavigate(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderLogo = () => {
    if (!logoConfig) return null;

    if (logoConfig.type === 'custom_svg' && logoConfig.customSvgMarkup) {
      return (
        <div 
          className="flex items-center gap-2 relative h-9 flex-shrink-0"
          dangerouslySetInnerHTML={{ __html: logoConfig.customSvgMarkup }} 
        />
      );
    }

    if (logoConfig.type === 'custom_image' && logoConfig.customImageUrl) {
      return (
        <div className="flex items-center gap-2 flex-shrink-0">
          <img 
            src={logoConfig.customImageUrl} 
            alt="Perkins Publishers" 
            className="h-9 w-auto max-h-10 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {logoConfig.text && (
            <span className={`${logoConfig.fontFamily} ${logoConfig.textSize} ${logoConfig.letterSpacing} ${logoConfig.isUppercase ? 'uppercase' : ''} text-slate-900 group-hover:text-amber-600 transition-colors duration-300 font-bold`}>
              {logoConfig.text}
            </span>
          )}
        </div>
      );
    }

    // Default icon + text configuration
    const LogoIcon = (Icons as any)[logoConfig.iconName] || Icons.BookOpen;

    return (
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className={`${logoConfig.textColor} group-hover:text-amber-600 transition-colors duration-300`}>
          <LogoIcon size={logoConfig.iconSize} strokeWidth={logoConfig.strokeWidth} />
        </div>
        <span 
          className={`${logoConfig.fontFamily} ${logoConfig.textSize} ${logoConfig.letterSpacing} ${logoConfig.isUppercase ? 'uppercase' : ''} ${logoConfig.textColor} group-hover:text-amber-600 transition-colors duration-300 font-semibold`}
        >
          {logoConfig.text}
        </span>
      </div>
    );
  };

  return (
    <header className="w-full z-50">
      
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-[#103460] to-amber-950 text-white py-2 px-4 text-xs font-semibold flex flex-wrap justify-between items-center border-b border-amber-500/10">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-amber-500 text-black text-[10px] px-1.5 py-0.5 rounded uppercase font-extrabold animate-pulse">OFFER</span>
          <span className="text-gray-200">Submit Your Manuscript Today & Receive 100% Royalties & Digital Asset Setup!</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <a href="tel:18033463495" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Phone size={13} className="text-amber-400" />
            <span>+1 (803) 346-3495</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
            : 'bg-white py-4'
        } border-b border-gray-100 sticky top-0`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 cursor-pointer group select-none flex-shrink-0"
          >
            {renderLogo()}
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-600 ${
                activePage === 'home' ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-gray-600'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <button
                className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-600 flex items-center gap-1 cursor-pointer ${
                  activePage.startsWith('service-') ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-gray-600'
                }`}
              >
                <span>Services</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              
              {/* Dropdown Menu Card */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:grid grid-cols-2 gap-4 w-[500px] bg-white border border-gray-150 p-6 rounded-2xl shadow-2xl animate-scaleUp z-50">
                <div className="col-span-2 border-b border-gray-100 pb-2 mb-1">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Bestseller Production Tracks</p>
                </div>
                {servicesList.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleNavClick(srv.id)}
                    className="text-left hover:bg-slate-50 p-2.5 rounded-xl transition-colors cursor-pointer group/item flex gap-3 items-start"
                  >
                    <div className="bg-amber-500/10 text-amber-600 p-1.5 rounded-lg group-hover/item:bg-amber-500 group-hover/item:text-blue-950 transition-colors shrink-0 mt-0.5">
                      <BookOpen size={14} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-900 uppercase leading-none group-hover/item:text-amber-600 transition-colors">{srv.label.split(' ')[0]} {srv.label.split(' ').slice(1).join(' ')}</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-1 leading-tight">{srv.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Solutions Dropdown */}
            <div className="relative group py-2">
              <button
                className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-600 flex items-center gap-1 cursor-pointer ${
                  activePage.startsWith('industry-') ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-gray-600'
                }`}
              >
                <span>Industries</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              
              <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-white border border-gray-150 p-4 rounded-2xl shadow-2xl animate-scaleUp z-50">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Authority Playbooks</p>
                <div className="space-y-1">
                  {industriesList.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => handleNavClick(ind.id)}
                      className="w-full text-left hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer block"
                    >
                      <p className="text-[11px] font-black text-slate-900 uppercase">{ind.label}</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-0.5 leading-tight">{ind.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('knowledge-hub')}
              className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-600 ${
                activePage === 'knowledge-hub' ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-gray-600'
              }`}
            >
              Knowledge Hub
            </button>

            <button
              onClick={() => handleNavClick('seo-scorecard')}
              className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-600 ${
                activePage === 'seo-scorecard' ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-gray-600'
              }`}
            >
              Audit Scorecard
            </button>

            <button
              onClick={() => handleNavClick('search-console')}
              className={`text-xs font-black uppercase tracking-wider transition-all hover:text-amber-600 ${
                activePage === 'search-console' ? 'text-blue-900 border-b-2 border-amber-500 pb-1' : 'text-gray-600'
              }`}
            >
              Search Console
            </button>

          </div>

          {/* Call / Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:18033463495"
              className="flex flex-col items-end group"
            >
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Direct Line
              </span>
              <span className="text-xs font-black text-blue-950 flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                +1 (803) 346-3495
              </span>
            </a>
            <button
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              <span>Free Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-amber-600 p-1 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 absolute top-full left-0 w-full shadow-2xl animate-fadeIn z-50 max-h-[80vh] overflow-y-auto">
            
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-gray-50"
            >
              Home
            </button>

            {/* Mobile Services Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pl-6 space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {servicesList.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleNavClick(srv.id)}
                      className="w-full text-left py-1.5 text-[10px] font-black uppercase text-slate-500 hover:text-amber-600"
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Industries Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>Industries</span>
                <ChevronDown size={14} className={`transition-transform ${mobileIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileIndustriesOpen && (
                <div className="pl-6 space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {industriesList.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => handleNavClick(ind.id)}
                      className="w-full text-left py-1.5 text-[10px] font-black uppercase text-slate-500 hover:text-amber-600"
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('knowledge-hub')}
              className="w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-gray-50"
            >
              Knowledge Hub
            </button>

            <button
              onClick={() => handleNavClick('seo-scorecard')}
              className={`w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider hover:bg-gray-50 ${
                activePage === 'seo-scorecard' ? 'text-blue-900 bg-slate-50' : 'text-slate-700'
              }`}
            >
              Audit Scorecard
            </button>

            <button
              onClick={() => handleNavClick('search-console')}
              className={`w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider hover:bg-gray-50 ${
                activePage === 'search-console' ? 'text-blue-900 bg-slate-50' : 'text-slate-700'
              }`}
            >
              Search Console
            </button>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="tel:18033463495"
                className="flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-extrabold text-blue-950 border border-gray-250 bg-gray-50"
              >
                <Phone size={14} className="text-amber-600" />
                <span>Call Us: +1 (803) 346-3495</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 py-3.5 rounded-xl text-[10px] uppercase tracking-wider font-black shadow-md text-center cursor-pointer"
              >
                GET FREE CONSULTATION
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
