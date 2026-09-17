import { useState, useEffect } from 'react';
import { 
  BookOpen, Phone, Menu, X, Shield, Award, Sparkles, ChevronDown, 
  PenTool, CheckSquare, Settings, Flame, Star, BookMarked, Mic, 
  Palette, Library, Send, HelpCircle, FileText, Share2, Award as AwardIcon, Users, MapPin, ExternalLink, Globe, Calculator, Search
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { LogoConfig } from '../types';
import PerkinsLogo from './PerkinsLogo';

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
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicesList = [
    { label: 'Book Publishing & Distribution', id: 'service-publishing', desc: 'Amazon, Ingram & 40,000+ bookstores worldwide.' },
    { label: 'Ghostwriting Services', id: 'service-ghostwriting', desc: 'Work with NYT bestselling biographers.' },
    { label: 'Elite Editorial & Proofing', id: 'service-editing', desc: 'Grammar, style, and flow refinement.' },
    { label: 'Custom Cover Design & Layout', id: 'service-cover-design', desc: 'Award-winning book jackets and interior typesetting.' },
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

  const locationsList = [
    { label: 'London & UK', id: 'location-uk-london', flag: '🇬🇧', desc: 'Waterstones & British Library deposit.' },
    { label: 'Ireland (Dublin)', id: 'location-ireland', flag: '🇮🇪', desc: 'Easons, Dubray & Trinity College deposit.' },
    { label: 'Australia (Sydney/Melb)', id: 'location-australia', flag: '🇦🇺', desc: 'Dymocks, NED deposit & local AU printing.' },
    { label: 'New Zealand (Auckland)', id: 'location-new-zealand', flag: '🇳🇿', desc: 'Whitcoulls, Paper Plus & NZD royalties.' },
    { label: 'Deutschland & DACH', id: 'location-germany-berlin', flag: '🇩🇪', desc: 'Thalia, VLB & German print-on-demand.' },
    { label: 'Switzerland (Zurich)', id: 'location-switzerland-zurich', flag: '🇨🇭', desc: 'Wealth managers & corporate founders.' },
    { label: 'Għajnsielem HQ (Malta)', id: 'location-malta', flag: '🇲🇹', desc: 'Verified European Union headquarters.' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    
    // Smooth scroll if target is on home page
    if (['services', 'faq', 'insights', 'seo-scorecard'].includes(id)) {
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

    if (logoConfig.type === 'emblem') {
      return (
        <PerkinsLogo 
          variant="horizontal" 
          markSize={38} 
          showTagline={false}
        />
      );
    }

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
      <div className="bg-gradient-to-r from-slate-950 via-[#0f294a] to-amber-950 text-white py-2 px-4 text-xs font-semibold flex flex-wrap justify-between items-center border-b border-amber-500/20">
        <div 
          className="flex items-center gap-2 mx-auto sm:mx-0 cursor-pointer group" 
          onClick={onOpenConsultation}
          title="Click to claim the €499 All-Inclusive Publishing Package"
        >
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-wider animate-pulse shadow-sm">
            FLASH OFFER • 74% OFF
          </span>
          <span className="text-gray-100 group-hover:text-amber-300 transition-colors">
            Complete Publishing Package: <strong className="text-amber-300">€499</strong> <span className="line-through text-gray-400 text-[11px]">€1,899</span> • Cover + Editing + 3 Formats (eBook, Paper, Hard) + 100+ Platforms!
          </span>
          <span className="hidden lg:inline-flex items-center gap-1 text-amber-400 group-hover:text-amber-300 font-black text-[11px] underline ml-1">
            Claim €499 Deal &rarr;
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3.5 text-[11px]">
          <div className="hidden md:flex items-center gap-1.5 text-amber-200/90 font-medium">
            <MapPin size={11} className="text-red-400" />
            <span>Għajnsielem, Gozo, Malta</span>
            <a 
              href="https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-white transition-colors ml-1 font-bold inline-flex items-center gap-0.5 cursor-pointer"
              title="View official business profile on Google Maps"
            >
              <span>Maps</span>
              <ExternalLink size={9} />
            </a>
          </div>
          <span className="text-slate-600 hidden md:inline">•</span>
          <div className="flex items-center gap-2 text-slate-200">
            <a 
              href="tel:18033463495" 
              className="hover:text-amber-300 transition-colors font-bold flex items-center gap-1 text-white" 
              title="International Calling Line (Global Author Desk)"
            >
              <Globe size={11} className="text-amber-400" />
              <span>Int'l: +1 (803) 346-3495</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="tel:+35699444044" 
              className="text-slate-300 hover:text-white transition-colors" 
              title="Malta Local Direct Desk"
            >
              <span className="text-slate-400 text-[10px] font-bold">MT:</span> +356 9944 4044
            </a>
          </div>
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

          {/* Desktop Nav Items - Clean & Professional Layout */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePage === 'home' 
                  ? 'text-blue-950 bg-blue-50/80 font-black shadow-2xs' 
                  : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative group py-1">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePage.startsWith('service-') 
                    ? 'text-blue-950 bg-blue-50/80 font-black shadow-2xs' 
                    : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              {/* Dropdown Menu Card */}
              <div className="absolute top-full left-0 hidden group-hover:grid grid-cols-2 gap-3 w-[520px] bg-white border border-slate-200 p-5 rounded-2xl shadow-2xl animate-scaleUp z-50">
                <div className="col-span-2 border-b border-slate-100 pb-2 mb-0.5 flex justify-between items-center">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Bestseller Production Tracks</p>
                  <span className="text-[9px] text-slate-400 font-bold">100% Royalties Retained</span>
                </div>
                {servicesList.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleNavClick(srv.id)}
                    className="text-left hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer group/item flex gap-2.5 items-start"
                  >
                    <div className="bg-amber-500/10 text-amber-600 p-1.5 rounded-lg group-hover/item:bg-amber-500 group-hover/item:text-blue-950 transition-colors shrink-0 mt-0.5">
                      <BookOpen size={13} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black text-slate-900 uppercase leading-snug group-hover/item:text-amber-600 transition-colors truncate">{srv.label}</p>
                      <p className="text-[9.5px] text-slate-400 font-medium mt-0.5 leading-tight line-clamp-1">{srv.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Solutions Dropdown */}
            <div className="relative group py-1">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePage.startsWith('industry-') 
                    ? 'text-blue-950 bg-blue-50/80 font-black shadow-2xs' 
                    : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50'
                }`}
              >
                <span>Industries</span>
                <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xl animate-scaleUp z-50">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2.5 border-b border-slate-100 pb-2">Authority Playbooks</p>
                <div className="space-y-1">
                  {industriesList.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => handleNavClick(ind.id)}
                      className="w-full text-left hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer block"
                    >
                      <p className="text-[11px] font-black text-slate-900 uppercase">{ind.label}</p>
                      <p className="text-[9.5px] text-slate-400 font-medium mt-0.5 leading-tight">{ind.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Regional & Global Desks Dropdown */}
            <div className="relative group py-1">
              <button
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  activePage.startsWith('location-') 
                    ? 'text-blue-950 bg-blue-50/80 font-black shadow-2xs' 
                    : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50'
                }`}
              >
                <span>Global Desks</span>
                <ChevronDown size={13} className="text-slate-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full left-0 hidden group-hover:block w-80 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xl animate-scaleUp z-50">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2.5 border-b border-slate-100 pb-2">Global Publishing Desks</p>
                <div className="space-y-1">
                  {locationsList.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleNavClick(loc.id)}
                      className="w-full text-left hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer block group/loc"
                    >
                      <p className="text-[11px] font-black text-slate-900 uppercase flex items-center gap-1.5 group-hover/loc:text-amber-600">
                        <span>{loc.flag}</span>
                        <span>{loc.label}</span>
                      </p>
                      <p className="text-[9.5px] text-slate-400 font-medium mt-0.5 leading-tight">{loc.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Knowledge Hub */}
            <button
              onClick={() => handleNavClick('knowledge-hub')}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePage === 'knowledge-hub' 
                  ? 'text-blue-950 bg-blue-50/80 font-black shadow-2xs' 
                  : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50'
              }`}
            >
              Knowledge Hub
            </button>

            {/* Royalty Calculator */}
            <button
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-slate-600 hover:text-amber-600 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Calculator size={13} className="text-amber-600" />
              <span>Royalty Calculator</span>
            </button>

            {/* €499 Special Offer Quick Link */}
            <button
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('special-offer')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 hover:bg-amber-500/25 text-amber-900 border border-amber-500/40 flex items-center gap-1.5 shadow-2xs"
            >
              <Flame size={13} className="text-amber-600 fill-amber-600 animate-pulse" />
              <span>€499 Package</span>
              <span className="text-[9px] bg-amber-500 text-blue-950 px-1 py-0.2 rounded font-black">74% OFF</span>
            </button>

          </div>

          {/* Clean Executive Contact & Consultation CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Direct Calling Line Capsule with Clean Popover */}
            <div className="relative group/call py-1">
              <a
                href="tel:18033463495"
                className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-amber-400 rounded-xl transition-all shadow-2xs group/btn cursor-pointer"
                title="International Calling Line (Global Author Desk)"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <Globe size={13} />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 group-hover/btn:text-blue-900 transition-colors">
                      Int'l Line
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <span className="text-xs font-black text-slate-900 group-hover/btn:text-blue-950 font-mono tracking-tight mt-0.5 leading-tight">
                    +1 (803) 346-3495
                  </span>
                </div>
                <ChevronDown size={12} className="text-slate-400 group-hover/call:rotate-180 transition-transform ml-1" />
              </a>

              {/* Clean, high-end flyout menu showing both desks */}
              <div className="absolute right-0 top-full pt-2 hidden group-hover/call:block w-72 z-50 animate-scaleUp">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl shadow-xl space-y-1.5">
                  <div className="px-2 py-1 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[9.5px] font-black uppercase tracking-widest text-slate-400">Official Call Desks</span>
                    <span className="text-[8.5px] text-emerald-700 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Open 24/7</span>
                  </div>

                  {/* Primary International Calling Line */}
                  <a
                    href="tel:18033463495"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all group/opt"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Globe size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-900 group-hover/opt:text-blue-950">Int'l Calling Line</span>
                        <span className="text-[8px] bg-blue-100 text-blue-900 font-extrabold px-1 rounded uppercase">Primary</span>
                      </div>
                      <p className="text-xs font-black font-mono text-blue-950 mt-0.5">+1 (803) 346-3495</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Worldwide Authors & 24/7 Intake</p>
                    </div>
                  </a>

                  {/* Malta / EU Local Desk */}
                  <a
                    href="tel:+35699444044"
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group/opt2"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-900 group-hover/opt2:text-slate-950">Malta & EU Desk</span>
                        <span className="text-[8px] bg-slate-100 text-slate-600 font-bold px-1 rounded uppercase">Local HQ</span>
                      </div>
                      <p className="text-xs font-black font-mono text-slate-800 mt-0.5">+356 9944 4044</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Għajnsielem, Gozo Registered Office</p>
                    </div>
                  </a>

                  {/* Quick Maps link */}
                  <div className="pt-1.5 border-t border-slate-100">
                    <a
                      href="https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 hover:text-blue-900 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-red-500" />
                        <span>Għajnsielem HQ on Google Maps</span>
                      </span>
                      <ExternalLink size={10} className="text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Consultation Button */}
            <button
              onClick={onOpenConsultation}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 shrink-0"
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
            
            {/* Promo Banner inside mobile menu */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('special-offer')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 p-3.5 rounded-2xl border border-amber-500/40 text-white cursor-pointer shadow-md"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-blue-950 px-2 py-0.5 rounded-full">
                  74% OFF FLASH DEAL
                </span>
                <span className="text-xs font-black text-amber-400">Now €499</span>
              </div>
              <p className="text-xs font-black text-white">Complete 3-Format Publishing Package</p>
              <p className="text-[10px] text-gray-300 mt-0.5">Cover + Editing + eBook, Paper & Hardcover + 100+ Platforms</p>
            </div>

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

            {/* Mobile Global Desks Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                className="w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>Global Desks</span>
                <ChevronDown size={14} className={`transition-transform ${mobileLocationsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileLocationsOpen && (
                <div className="pl-6 space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  {locationsList.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleNavClick(loc.id)}
                      className="w-full text-left py-1.5 text-[10px] font-black uppercase text-slate-500 hover:text-amber-600 flex items-center gap-1.5"
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
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

            {/* Mobile Royalty Calculator */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('home');
                setTimeout(() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="w-full text-left py-2 px-3 rounded-md text-xs font-black uppercase tracking-wider text-slate-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Calculator size={14} className="text-amber-600" />
              <span>Royalty Calculator</span>
            </button>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <a
                href="https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-bold text-slate-700 border border-gray-200 bg-white hover:bg-slate-50 transition-colors"
                title="View Perkins Publisher on Google Maps"
              >
                <MapPin size={14} className="text-red-500" />
                <span>Għajnsielem HQ on Google Maps</span>
                <ExternalLink size={11} className="text-slate-400" />
              </a>
              <div className="grid grid-cols-1 gap-2">
                <a
                  href="tel:18033463495"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-900 border border-blue-200 bg-blue-50/60 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-blue-700 shrink-0" />
                    <span className="font-extrabold text-blue-950">Int'l Calling Line:</span>
                  </div>
                  <span className="font-mono text-blue-950 font-black">+1 (803) 346-3495</span>
                </a>
                <a
                  href="tel:+35699444044"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 border border-gray-200 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-slate-500 shrink-0" />
                    <span className="font-bold text-slate-700">Malta Desk:</span>
                  </div>
                  <span className="font-mono text-slate-800 font-bold">+356 9944 4044</span>
                </a>
              </div>
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
