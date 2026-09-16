import React from 'react';

export interface PerkinsLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark' | 'footer';
  className?: string;
  markSize?: number;
  showTagline?: boolean;
  isDark?: boolean;
  onClick?: () => void;
}

/**
 * Official Perkins Publisher Dual-Tone Brand Emblem Mark
 * Symbolism:
 * - Left Navy Page with 3 White Manuscript Lines: Author's drafts, ghostwriting, editorial craftsmanship
 * - Golden Center Spine: Bridge to commercial publication
 * - Right Golden Ochre Page: Published prestige, bestselling recognition, gold-standard royalties
 * - Circular Outer Frame: Complete end-to-end publishing ecosystem
 */
export function PerkinsEmblemMark({ 
  size = 40, 
  isDark = false,
  className = '' 
}: { 
  size?: number; 
  isDark?: boolean;
  className?: string; 
}) {
  const strokeColor = isDark ? '#d4af37' : '#10223b';
  const leftPageFill = '#10223b';
  const spineFill = '#c59b27';
  const rightPageFill = '#c59b27';
  const rightPageStroke = isDark ? '#e5bb45' : 'none';

  return (
    <svg 
      viewBox="0 0 300 300" 
      width={size} 
      height={size} 
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="Perkins Publisher Brand Seal"
    >
      {/* Outer Circular Seal Frame */}
      <circle 
        cx="150" 
        cy="150" 
        r="134" 
        fill="none" 
        stroke={strokeColor} 
        strokeWidth="7" 
      />

      {/* Book Geometry */}
      <g transform="translate(150, 153)">
        {/* Left Page (Deep Navy with 3 White Manuscript Lines) */}
        <path 
          d="M -6 -42 
             C -38 -55, -82 -46, -104 -28 
             C -108 -6, -108 28, -104 50 
             C -82 34, -38 25, -6 40 
             Z" 
          fill={leftPageFill}
          stroke={isDark ? '#334e68' : 'none'}
          strokeWidth="2"
        />

        {/* 3 White Horizontal Manuscript Lines */}
        <line x1="-88" y1="-11" x2="-22" y2="-19" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <line x1="-88" y1="8" x2="-22" y2="0" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <line x1="-88" y1="27" x2="-22" y2="19" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

        {/* Center Golden Spine Hinge */}
        <rect x="-4.5" y="-43" width="9" height="86" rx="2" fill={spineFill} />

        {/* Right Page (Warm Ochre Gold) */}
        <path 
          d="M 6 -42 
             C 38 -55, 82 -46, 104 -28 
             C 108 -6, 108 28, 104 50 
             C 82 34, 38 25, 6 40 
             Z" 
          fill={rightPageFill}
          stroke={rightPageStroke}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
}

export default function PerkinsLogo({
  variant = 'horizontal',
  className = '',
  markSize = 38,
  showTagline = false,
  isDark = false,
  onClick
}: PerkinsLogoProps) {

  // 1. Mark only
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} onClick={onClick}>
        <PerkinsEmblemMark size={markSize} isDark={isDark} />
      </div>
    );
  }

  // 2. Horizontal Navbar Lockup
  if (variant === 'horizontal') {
    return (
      <div 
        className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}
        onClick={onClick}
      >
        <PerkinsEmblemMark 
          size={markSize} 
          isDark={isDark} 
          className="group-hover:scale-105" 
        />
        
        <div className="flex flex-col justify-center text-left leading-none">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-[15px] sm:text-[17px] font-black tracking-[0.20em] uppercase transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900 group-hover:text-blue-950'
            }`}>
              PERKINS
            </span>
            <span className="text-[13px] sm:text-[15px] font-extrabold tracking-[0.28em] uppercase text-amber-500 sm:text-[#c59b27]">
              PUBLISHER
            </span>
          </div>

          {showTagline && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-semibold text-slate-500 mt-1 hidden sm:block">
              Publishing • Editing • Author Branding
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Footer Variant
  if (variant === 'footer') {
    return (
      <div 
        className={`flex items-center gap-3 select-none ${className}`}
        onClick={onClick}
      >
        <PerkinsEmblemMark size={markSize || 42} isDark={true} />
        
        <div className="flex flex-col justify-center text-left leading-none">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-black tracking-[0.20em] uppercase text-white">
              PERKINS
            </span>
            <span className="text-sm sm:text-base font-extrabold tracking-[0.28em] uppercase text-amber-400">
              PUBLISHER
            </span>
          </div>

          <span className="text-[8.5px] tracking-[0.22em] uppercase font-bold text-slate-400 mt-1">
            Publishing • Editing • Author Branding
          </span>
        </div>
      </div>
    );
  }

  // 4. Stacked Full Seal (for Modals, Hero, Brand Showcase, About)
  return (
    <div 
      className={`flex flex-col items-center text-center select-none ${className}`}
      onClick={onClick}
    >
      <PerkinsEmblemMark 
        size={markSize || 90} 
        isDark={isDark} 
        className="mb-3.5 shadow-sm rounded-full" 
      />
      
      <span className={`text-2xl sm:text-3xl font-black tracking-[0.22em] uppercase leading-none ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>
        PERKINS
      </span>

      <span className="text-base sm:text-lg font-extrabold tracking-[0.34em] uppercase text-[#c59b27] mt-1.5 leading-none">
        PUBLISHER
      </span>

      {/* Gold Divider Line */}
      <div className="w-24 h-[1.5px] bg-[#c59b27]/80 my-2.5" />

      <span className="text-[9.5px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-slate-500">
        PUBLISHING • EDITING • AUTHOR BRANDING
      </span>
    </div>
  );
}
