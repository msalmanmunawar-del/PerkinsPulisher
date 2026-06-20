import { BookOpen, Mail, Phone, MapPin, ShieldCheck, Heart, Database } from 'lucide-react';
import * as Icons from 'lucide-react';
import { LogoConfig } from '../types';

interface FooterProps {
  logoConfig: LogoConfig;
  onNavigate: (sectionId: string) => void;
  onToggleConsole: () => void;
  showConsole: boolean;
}

export default function Footer({ logoConfig, onNavigate, onToggleConsole, showConsole }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (id: string) => {
    onNavigate(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderLogo = () => {
    if (!logoConfig) return null;

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
                <button onClick={() => handleNav('services')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Core Publishing Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Featured Bestsellers Shelf
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('calculator')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Interactive Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('insights')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Author Insights Lounge
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services shortcuts */}
          <div className="space-y-4">
            <h4 className="text-white text-[11px] font-black tracking-widest uppercase">CREATIVE SOLUTIONS</h4>
            <ul className="space-y-2.5 font-bold">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Professional Ghostwriting
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Developmental Book Editing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  Stunning Custom Cover Design
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-500 transition-colors cursor-pointer text-left block">
                  ACX Mastered Audiobooks
                </button>
              </li>
            </ul>
          </div>

          {/* Contact coordinates column */}
          <div className="space-y-4 text-[11px]">
            <h4 className="text-white text-[11px] font-black tracking-widest uppercase">GET IN TOUCH</h4>
            <div className="space-y-3 font-semibold">
              <p className="flex items-start gap-2.5">
                <MapPin className="text-amber-500 shrink-0 mt-0.5" size={14} />
                <span>1320 Main St, Columbia, SC 29201</span>
              </p>
              <a href="tel:18033463495" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="text-amber-500 shrink-0" size={14} />
                <span>+1 (803) 346-3495</span>
              </a>
              <a href="mailto:info@perkinspublisher.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="text-amber-500 shrink-0" size={14} />
                <span>info@perkinspublisher.com</span>
              </a>
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

          {/* Admin CRM Dashboard entry toggle */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">System Operator:</span>
            <button
              id="admin-crm-toggle"
              onClick={onToggleConsole}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-black uppercase text-[9px] border transition-all cursor-pointer ${
                showConsole
                  ? 'bg-amber-500 text-blue-950 border-amber-600'
                  : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <Database size={11} />
              <span>{showConsole ? 'CLOSE PUBLISHER CRM' : 'OPEN CRM WORKSPACE'}</span>
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
}
