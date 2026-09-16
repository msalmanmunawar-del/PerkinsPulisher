import { BookOpen, Mail, Phone, MapPin, ShieldCheck, Heart, Database, Star, ExternalLink, Clock, Navigation, Building2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { LogoConfig } from '../types';
import PerkinsLogo from './PerkinsLogo';

interface FooterProps {
  logoConfig: LogoConfig;
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ logoConfig, onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (id: string) => {
    if (['services', 'portfolio', 'reviews', 'insights', 'seo-scorecard', 'gmb-verified-profile'].includes(id)) {
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
          variant="footer" 
          markSize={40} 
        />
      );
    }

    if (logoConfig.type === 'custom_svg' && logoConfig.customSvgMarkup) {
      return (
        <div 
          className="flex items-center gap-2 relative h-9 text-white shrink-0"
          dangerouslySetInnerHTML={{ __html: logoConfig.customSvgMarkup }} 
        />
      );
    }

    if (logoConfig.type === 'custom_image' && logoConfig.customImageUrl) {
      return (
        <div className="flex items-center gap-2 text-white shrink-0">
          <img 
            src={logoConfig.customImageUrl} 
            alt="Perkins Publisher" 
            className="h-8 w-auto max-h-9 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {logoConfig.text && (
            <span className={`${logoConfig.fontFamily} ${logoConfig.textSize} ${logoConfig.letterSpacing} ${logoConfig.isUppercase ? 'uppercase' : ''} text-white font-bold`}>
              {logoConfig.text}
            </span>
          )}
        </div>
      );
    }

    // Default icon + text configuration (also supports original preset)
    const LogoIcon = (Icons as any)[logoConfig.iconName] || Icons.BookOpen;
    const footerTextColor = logoConfig.footerTextColor || 'text-white/90';

    return (
      <div className={`flex items-center gap-2.5 shrink-0 ${footerTextColor}`}>
        <LogoIcon size={logoConfig.iconSize - 2} strokeWidth={logoConfig.strokeWidth} className="shrink-0" />
        <span 
          className={`${logoConfig.fontFamily} ${logoConfig.textSize} ${logoConfig.letterSpacing} ${logoConfig.isUppercase ? 'uppercase' : ''} font-normal tracking-wider`}
        >
          {logoConfig.text}
        </span>
      </div>
    );
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      
      {/* Upper Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Main Brand Profile Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              {renderLogo()}
            </div>
             <p className="font-semibold text-slate-400 leading-relaxed text-[11px]">
              Global leader in professional manuscript development, premium self-publishing packages, ghostwriting, structural typesetting layouts, ACX audio casting, and strategic marketing campaigns. Turn your draft into a universal bestseller.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-500 font-extrabold bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/15 w-fit">
              <ShieldCheck size={14} className="shrink-0" />
              <span>Accredited Hybrid Publisher</span>
            </div>
          </div>

          {/* Quick links directories */}
          <div className="space-y-4">
            <h4 className="text-white text-[11px] font-black tracking-widest uppercase">EXPLORE PORTALS</h4>
            <ul className="space-y-2.5 font-bold">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Author Hero Launchpad
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('knowledge-hub')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Publishing Knowledge Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('seo-scorecard')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Bestseller Audit Scorecard
                </button>
              </li>
            </ul>

            <h4 className="text-white text-[11px] font-black tracking-widest uppercase pt-3">GLOBAL & REGIONAL DESKS</h4>
            <ul className="space-y-2 font-bold text-[10px]">
              <li>
                <button onClick={() => handleNav('location-uk-london')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇬🇧</span>
                  <span>London & United Kingdom</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('location-ireland')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇮🇪</span>
                  <span>Dublin & Ireland</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('location-australia')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇦🇺</span>
                  <span>Australia (Sydney/Melb)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('location-new-zealand')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇳🇿</span>
                  <span>New Zealand (Aotearoa)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('location-germany-berlin')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇩🇪</span>
                  <span>Deutschland & DACH</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('location-switzerland-zurich')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇨🇭</span>
                  <span>Switzerland (Zurich)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('location-malta')} className="hover:text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  <span>🇲🇹</span>
                  <span>Għajnsielem HQ (Malta)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services shortcuts */}
          <div className="space-y-4">
            <h4 className="text-white text-[11px] font-black tracking-widest uppercase">CREATIVE SOLUTIONS</h4>
            <ul className="space-y-2.5 font-bold">
              <li>
                <button onClick={() => handleNav('service-publishing')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Turnkey Book Publishing & Distribution
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-cover-design')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Book Cover Design & Typesetting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-ghostwriting')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Professional Ghostwriting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-editing')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Developmental Book Editing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-kdp')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Amazon KDP Setup & Prep
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-business')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Business & Authority Books
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('service-memoirs')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Memoirs & Legacy Publishing
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Local Authority Column */}
          <div className="space-y-4 text-[11px]">
            <div className="flex items-center justify-between">
              <h4 className="text-white text-[11px] font-black tracking-widest uppercase">EDITORIAL HEADQUARTERS</h4>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">
                Registered in Malta (EU)
              </span>
            </div>

            {/* Official Directory Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5">
                <Building2 size={14} className="text-amber-400 shrink-0" />
                <span className="text-white font-black text-[11px]">Perkins Publisher</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Registered European publishing house headquartered in Gozo, Malta. Authors retain 100% royalties and rights.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <a 
                  href="https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  title="View official business profile, photos, and verified reviews on Google Maps"
                >
                  <span>View Profile & Verified Reviews on Google Maps</span>
                  <ExternalLink size={10} />
                </a>
                <a 
                  href="https://maps.google.com/?q=Perkins+Publishers+G%C4%A7ajnsielem+Malta" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
                  title="Get directions to Perkins Publisher on Google Maps"
                >
                  <Navigation size={10} className="text-blue-400" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <div className="space-y-2.5 font-semibold text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="text-red-400 shrink-0 mt-0.5" size={14} />
                <div>
                  <p className="text-white font-bold">Għajnsielem, Gozo, GSM 1010, Malta</p>
                  <p className="text-slate-400 text-[10px]">European Union Legal Jurisdiction</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[10px] text-slate-400">
                <Clock className="text-amber-500 shrink-0" size={13} />
                <span>Mon – Fri: 08:00 – 19:00 CET</span>
              </div>

              <div className="space-y-1.5 pt-1">
                <a href="tel:18033463495" className="flex items-center gap-2 hover:text-white transition-colors" title="International Calling Line (Global Desk)">
                  <Phone className="text-amber-500 shrink-0" size={14} />
                  <span className="text-white font-bold">+1 (803) 346-3495</span>
                  <span className="text-[9px] bg-slate-800 text-amber-400 font-bold px-1.5 py-0.5 rounded border border-slate-700">Int'l Line</span>
                </a>
                <a href="tel:+35699444044" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors pl-5 text-xs" title="Malta & EU Local Direct Desk">
                  <span>+356 9944 4044</span>
                  <span className="text-[9px] bg-slate-800 text-slate-400 font-bold px-1.5 py-0.5 rounded border border-slate-700">Malta Desk</span>
                </a>
              </div>

              <a href="mailto:info@perkinspublisher.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="text-amber-500 shrink-0" size={14} />
                <span>info@perkinspublisher.com</span>
              </a>
            </div>

            {/* Quick GMB Card Navigation */}
            <div className="pt-1">
              <button
                onClick={() => handleNav('gmb-verified-profile')}
                className="inline-flex items-center gap-1 text-[10px] text-amber-400 hover:underline font-bold cursor-pointer"
              >
                <span>View Full GMB Entity & Credentials Matrix →</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Extreme Bottom Legal and Admin Switch margin */}
      <div className="bg-slate-990 py-6 border-t border-slate-900/60 text-[10px] font-bold text-slate-550">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          
          <div className="space-y-1">
            <p>© {currentYear} Perkins Publisher Co. All Rights Reserved. Fully Accompiled Replica.</p>
            <p className="text-slate-600 font-medium">All trademarks, trade names, and covers remain property of their respective author owners.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-500 font-black uppercase tracking-wider">
            <button onClick={() => onNavigate('privacy')} className="hover:text-amber-500 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-slate-700 select-none">•</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-amber-500 transition-colors cursor-pointer">
              Terms of Service
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
