import { useState, useEffect } from 'react';
import { BookOpen, Phone, Menu, X, Shield, Award, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  activePage: string;
  onOpenConsultation: () => void;
  onToggleConsole: () => void;
  showConsole: boolean;
  inquiriesCount: number;
}

export default function Header({
  onNavigate,
  activePage,
  onOpenConsultation,
  onToggleConsole,
  showConsole,
  inquiriesCount,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Our Services', id: 'services' },
    { label: 'Featured Books', id: 'portfolio' },
    { label: 'Cost Calculator', id: 'calculator' },
    { label: 'Our Reviews', id: 'reviews' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    // Smooth scroll if matching ID is on the page
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full z-50">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-navy-950 via-[#103460] to-amber-950 text-white py-2 px-4 text-xs font-semibold flex flex-wrap justify-between items-center border-b border-amber-500/10">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-amber-500 text-black text-[10px] px-1.5 py-0.5 rounded uppercase font-extrabold animate-pulse">OFFER</span>
          <span className="text-gray-200">Submit Your Manuscript Today & Receive 100% Royalties & Digital Asset Setup!</span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <a href="tel:18033463495" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Phone size={13} className="text-amber-400" />
            <span>+1 (803) 346-3495</span>
          </a>
          <span className="text-gray-400">|</span>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-amber-400 transition-colors" onClick={onToggleConsole}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${inquiriesCount > 0 ? 'bg-amber-400' : 'bg-green-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${inquiriesCount > 0 ? 'bg-amber-500' : 'bg-green-500'}`}></span>
            </span>
            <span>
              {showConsole ? 'Exit CRM View' : `Publisher CRM (${inquiriesCount})`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled || showConsole
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white py-5'
        } border-b border-gray-100 sticky top-0`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
              <BookOpen size={20} strokeWidth={1.5} />
            </div>
            <span className="text-base font-normal tracking-[0.18em] uppercase text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
              PERKINS PUBLISHER
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold transition-all hover:text-amber-600 ${
                  activePage === item.id
                    ? 'text-blue-900 border-b-2 border-amber-500 pb-1'
                    : 'text-gray-600'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Call / Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:18033463495"
              className="flex flex-col items-end group"
            >
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Talk to a Consultant
              </span>
              <span className="text-sm font-black text-blue-950 flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                +1 (803) 346-3495
              </span>
            </a>
            <button
              id="header-cta"
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-sm font-extrabold px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={16} />
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <div
              className="text-xs font-semibold text-gray-500 cursor-pointer border border-gray-200 px-2.5 py-1 rounded"
              onClick={onToggleConsole}
            >
              CRM ({inquiriesCount})
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-amber-600 p-1 cursor-pointer"
              aria-label="Toggle Menu"
              id="menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 absolute top-full left-0 w-full shadow-xl animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2 px-3 rounded-md text-sm font-bold block ${
                  activePage === item.id
                    ? 'bg-amber-500/10 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="tel:18033463495"
                className="flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-extrabold text-blue-950 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <Phone size={16} className="text-amber-600" />
                <span>Call Us: +1 (803) 346-3495</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 py-3 rounded-lg text-xs uppercase tracking-wider font-black shadow-md text-center cursor-pointer"
              >
                REQUEST A FREE CONSULTATION
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
