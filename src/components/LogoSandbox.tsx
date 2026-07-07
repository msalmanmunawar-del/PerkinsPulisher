import { useState, useEffect } from 'react';
import { LogoConfig } from '../types';
import * as Icons from 'lucide-react';
import { 
  Sparkles, 
  Settings, 
  RotateCcw, 
  Check, 
  Eye, 
  FileCode, 
  Upload, 
  Copy, 
  Image as ImageIcon, 
  Type, 
  HelpCircle, 
  Sliders, 
  Zap, 
  Layout, 
  Info,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface LogoSandboxProps {
  currentConfig: LogoConfig;
  onUpdateConfig: (config: LogoConfig) => void;
}

// 1. Definitively preserve the standard ORIGINAL Classic Perkins Publisher logo as Option A.
export const ORIGINAL_LOGO_PRESET: LogoConfig = {
  id: 'preset-original',
  name: 'Perkins Classic (Original Backup)',
  type: 'original',
  text: 'PERKINS PUBLISHER',
  textSize: 'text-base',
  letterSpacing: 'tracking-[0.18em]',
  textColor: 'text-slate-900',
  footerTextColor: 'text-white/90',
  iconName: 'BookOpen',
  iconSize: 20,
  strokeWidth: 1.5,
  fontFamily: 'font-sans',
  isUppercase: true
};

const PRESETS: LogoConfig[] = [
  ORIGINAL_LOGO_PRESET,
  {
    id: 'preset-serif',
    name: 'Regency Serif (Premium Literary)',
    type: 'serif',
    text: 'Perkins Publisher',
    textSize: 'text-lg',
    letterSpacing: 'tracking-[0.15em]',
    textColor: 'text-slate-950',
    footerTextColor: 'text-amber-100',
    iconName: 'Award',
    iconSize: 22,
    strokeWidth: 1.5,
    fontFamily: 'font-serif',
    isUppercase: true
  },
  {
    id: 'preset-modern',
    name: 'Minimalist Modernist',
    type: 'modern',
    text: 'perkins•publisher',
    textSize: 'text-sm',
    letterSpacing: 'tracking-[0.22em]',
    textColor: 'text-amber-600',
    footerTextColor: 'text-amber-500',
    iconName: 'Sparkles',
    iconSize: 18,
    strokeWidth: 2,
    fontFamily: 'font-mono',
    isUppercase: false
  },
  {
    id: 'preset-royal',
    name: 'Editorial Monarch',
    type: 'serif',
    text: 'PERKINS PUBLISHERS',
    textSize: 'text-base',
    letterSpacing: 'tracking-[0.25em]',
    textColor: 'text-blue-950',
    footerTextColor: 'text-amber-400',
    iconName: 'Crown',
    iconSize: 20,
    strokeWidth: 1.25,
    fontFamily: 'font-serif',
    isUppercase: true
  }
];

export default function LogoSandbox({ currentConfig, onUpdateConfig }: LogoSandboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'customizer' | 'blueprint' | 'compare' | 'favicon'>('favicon');
  
  // Custom design inputs state
  const [customText, setCustomText] = useState(currentConfig.text);
  const [customType, setCustomType] = useState<LogoConfig['type']>(currentConfig.type);
  const [customFont, setCustomFont] = useState(currentConfig.fontFamily);
  const [customSpacing, setCustomSpacing] = useState(currentConfig.letterSpacing);
  const [customSize, setCustomSize] = useState(currentConfig.textSize);
  const [customIcon, setCustomIcon] = useState(currentConfig.iconName);
  const [isUppercase, setIsUppercase] = useState(currentConfig.isUppercase);
  const [imageUrl, setImageUrl] = useState(currentConfig.customImageUrl || '');
  const [svgMarkup, setSvgMarkup] = useState(currentConfig.customSvgMarkup || '');
  const [iconSize, setIconSize] = useState(currentConfig.iconSize);
  const [strokeWidth, setStrokeWidth] = useState(currentConfig.strokeWidth);
  const [textColorClass, setTextColorClass] = useState(currentConfig.textColor);
  const [footerColorClass, setFooterColorClass] = useState(currentConfig.footerTextColor);

  const [notification, setNotification] = useState<string | null>(null);

  // Synchronize dynamic custom values with active logo change
  useEffect(() => {
    setCustomText(currentConfig.text);
    setCustomType(currentConfig.type);
    setCustomFont(currentConfig.fontFamily);
    setCustomSpacing(currentConfig.letterSpacing);
    setCustomSize(currentConfig.textSize);
    setCustomIcon(currentConfig.iconName);
    setIsUppercase(currentConfig.isUppercase);
    setImageUrl(currentConfig.customImageUrl || '');
    setSvgMarkup(currentConfig.customSvgMarkup || '');
    setIconSize(currentConfig.iconSize);
    setStrokeWidth(currentConfig.strokeWidth);
    setTextColorClass(currentConfig.textColor);
    setFooterColorClass(currentConfig.footerTextColor);
  }, [currentConfig]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const applyCustomSettings = () => {
    const updated: LogoConfig = {
      id: 'custom-config',
      name: 'Custom User Creation',
      type: customType,
      text: customText,
      textSize: customSize,
      letterSpacing: customSpacing,
      textColor: textColorClass,
      footerTextColor: footerColorClass,
      iconName: customIcon,
      iconSize: iconSize,
      strokeWidth: strokeWidth,
      fontFamily: customFont,
      isUppercase: isUppercase,
      customImageUrl: imageUrl || undefined,
      customSvgMarkup: svgMarkup || undefined,
    };
    onUpdateConfig(updated);
    showNotification('🎨 Custom logo configuration applied universally!');
  };

  const selectPreset = (preset: LogoConfig) => {
    onUpdateConfig(preset);
    showNotification(`✅ Switched brand config to: ${preset.name}`);
  };

  // Helper dynamic component to render logo based on configuration
  const DynamicLogoRenderer = ({ config, isFooter = false }: { config: LogoConfig; isFooter?: boolean }) => {
    // 1. Handle SVG Type
    if (config.type === 'custom_svg' && config.customSvgMarkup) {
      return (
        <div 
          className="flex items-center gap-2 select-none"
          dangerouslySetInnerHTML={{ __html: config.customSvgMarkup }} 
        />
      );
    }

    // 2. Handle Image Type
    if (config.type === 'custom_image' && config.customImageUrl) {
      return (
        <div className="flex items-center gap-2 select-none">
          <img 
            src={config.customImageUrl} 
            alt="Perkins Publisher Logo" 
            className="h-10 w-auto object-contain max-h-12"
            onError={(e) => {
              // Fallback if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {config.text && (
            <span className={`${config.textSize} ${config.fontFamily} ${config.letterSpacing} ${isFooter ? 'text-white' : 'text-slate-900'} ${config.isUppercase ? 'uppercase' : ''} font-bold`}>
              {config.text}
            </span>
          )}
        </div>
      );
    }

    // 3. Handle Standard vector icon & stylized text (including original backup)
    const SelectedIcon = (Icons as any)[config.iconName] || Icons.BookOpen;
    const finalTextColor = isFooter ? config.footerTextColor : config.textColor;

    return (
      <div className={`flex items-center gap-2.5 select-none ${isFooter ? 'text-white/90' : 'text-slate-900'}`}>
        <div className={`transition-colors duration-300 ${finalTextColor}`}>
          <SelectedIcon size={config.iconSize} strokeWidth={config.strokeWidth} />
        </div>
        <span 
          className={`${config.fontFamily} ${config.textSize} ${config.letterSpacing} ${config.isUppercase ? 'uppercase' : ''} font-normal tracking-wider transition-colors duration-300 ${finalTextColor}`}
        >
          {config.text}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Badge */}
      <div className="fixed bottom-6 left-6 z-40 transition-all hover:scale-105 active:scale-95">
        <button
          id="logo-sandbox-trigger"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl border border-amber-500/20 cursor-pointer uppercase tracking-wider relative group"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <Settings size={15} className="animate-spin-slow text-amber-400 group-hover:rotate-45 transition-transform" />
          <span>🎨 brand & logo sandbox</span>
        </button>
      </div>

      {/* Main Drawer Shell */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div 
            id="logo-sandbox-pane"
            className="w-full max-w-xl bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl overflow-hidden"
          >
            
            {/* Header branding */}
            <div className="p-5 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 text-blue-950 p-2 rounded-lg font-black shrink-0">
                  <Layout size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">Brand Visual Studio</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">A/B Logo Comparison & Customized Preflight</p>
                </div>
              </div>
              <button
                id="close-sandbox-btn"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1.5 bg-slate-900 hover:bg-slate-800 rounded-full cursor-pointer"
                aria-label="Close Studio"
              >
                <Icons.X size={18} />
              </button>
            </div>

            {/* Notification Alert Banner */}
            {notification && (
              <div className="bg-amber-500 text-slate-950 text-xs font-bold py-2.5 px-4 text-center animate-slideDown flex items-center justify-center gap-2 shadow-inner">
                <Zap size={14} className="animate-bounce" />
                <span>{notification}</span>
              </div>
            )}

            {/* Sub-Navigation tabs */}
            <div className="grid grid-cols-5 border-b border-slate-800 bg-slate-950/50 p-1 gap-0.5 text-[9px] font-black uppercase tracking-wider">
              <button
                id="tab-favicon"
                onClick={() => setActiveTab('favicon')}
                className={`py-2 px-0.5 text-center rounded transition-colors cursor-pointer ${
                  activeTab === 'favicon' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                1. Favicon
              </button>
              <button
                id="tab-presets"
                onClick={() => setActiveTab('presets')}
                className={`py-2 px-0.5 text-center rounded transition-colors cursor-pointer ${
                  activeTab === 'presets' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                2. Presets
              </button>
              <button
                id="tab-customizer"
                onClick={() => setActiveTab('customizer')}
                className={`py-2 px-0.5 text-center rounded transition-colors cursor-pointer ${
                  activeTab === 'customizer' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                3. Design
              </button>
              <button
                id="tab-compare"
                onClick={() => setActiveTab('compare')}
                className={`py-2 px-0.5 text-center rounded transition-colors cursor-pointer ${
                  activeTab === 'compare' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                4. Compare
              </button>
              <button
                id="tab-blueprint"
                onClick={() => setActiveTab('blueprint')}
                className={`py-2 px-0.5 text-center rounded transition-colors cursor-pointer ${
                  activeTab === 'blueprint' 
                    ? 'bg-amber-500 text-slate-950' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                5. Code
              </button>
            </div>

            {/* Drawer Body Scroll Container */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* TAB FAVICON PREVIEW */}
              {activeTab === 'favicon' && (
                <div className="space-y-4 animate-fadeIn text-left">
                  <div className="bg-slate-950/70 p-4.5 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-black text-amber-400 tracking-wider uppercase mb-1.5 flex items-center gap-2">
                      <Sparkles size={14} className="text-amber-500 animate-pulse" />
                      Elite Bestseller Literary Favicon
                    </h4>
                    <p className="text-[11px] text-gray-400 font-bold leading-normal">
                      We replaced the generic AI-looking icon with an ultra-premium, classic literary monogram. This high-end design depicts a <strong className="text-white font-black">classical gold quill pen</strong> intersecting a <strong className="text-white font-black">scholarly open book</strong>, flanked by bestseller star sparkles.
                    </p>
                  </div>

                  {/* 1. Real Browser Tab Mockup */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">A. Live Browser Tab Preview</h5>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                      <div className="bg-slate-905 rounded-lg p-2.5 flex items-center gap-1.5 border border-slate-800">
                        {/* Simulated Browser Tab UI */}
                        <div className="flex bg-[#0b0f19] text-[11px] text-gray-200 font-bold px-3.5 py-2 rounded-t-lg border-t border-x border-slate-800/80 items-center gap-2 max-w-[210px] shadow-lg">
                          <img 
                            src="/favicon.svg" 
                            alt="Favicon" 
                            className="w-3.5 h-3.5 shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                          <span className="truncate pr-1 font-semibold text-[10.5px]">Perkins Publisher | Bestseller...</span>
                          <Icons.X size={10} className="text-slate-400 hover:text-white shrink-0 ml-auto" />
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold pl-2 truncate hidden sm:block">
                          https://perkinspublisher.com
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Side by Side High-Res Visual Renderings */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* SVG Vector Render */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">I. Scalable Vector (SVG)</span>
                      <div className="w-16 h-16 p-2 bg-[#0b0f19] rounded-xl border border-amber-500/10 shadow-lg flex items-center justify-center">
                        <img src="/favicon.svg" className="w-12 h-12" alt="Favicon Vector" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[8px] text-slate-500 font-extrabold uppercase">Favicon.svg (Recommended)</span>
                    </div>

                    {/* PNG Raster Render */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">II. Multi-Size PNG Asset</span>
                      <div className="w-16 h-16 p-2 bg-[#0b0f19] rounded-xl border border-amber-500/10 shadow-lg flex items-center justify-center">
                        <img src="/favicon.png" className="w-12 h-12 object-contain" alt="Favicon PNG" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[8px] text-slate-500 font-extrabold uppercase">Favicon.png (High-Res)</span>
                    </div>
                  </div>

                  {/* 3. Deep Brand Detail Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-slate-350 leading-relaxed text-[11px] font-bold">
                    <h5 className="text-[10px] font-black uppercase text-slate-300 tracking-widest flex items-center gap-1.5">
                      <Info size={12} className="text-amber-500" />
                      Design Craftsmanship Highlights
                    </h5>
                    <ul className="space-y-1.5 text-gray-400 pl-4 list-disc">
                      <li><span className="text-slate-200">Anti-AI-Slop Styling:</span> Removed all circular target loops. Designed an authentic heraldic crest combining the traditional serif stem and flowing literary elements.</li>
                      <li><span className="text-slate-200">High Contrast Palette:</span> Styled on a custom Deep Slate Slate (#0b0f19) background with gradient luxury gold lines to ensure peak visibility across both light-themed and dark-themed operating systems and browser bars.</li>
                      <li><span className="text-slate-200">Perfect Resolution Density:</span> Hand-tuned path stroke-widths to render beautifully even at standard 16x16 tab resolutions.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                    <h4 className="text-[11px] font-black text-amber-500 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                      <Info size={13} />
                      Zero-Risk Brand Playground
                    </h4>
                    <p className="text-[11px] text-gray-400 font-bold leading-normal">
                      We have cloned and saved your original <strong className="text-white">Perkins Classic</strong> logo in safety memory. You can switch to any alternative layout, try your new logo, and revert to the classic with a single click at any time.
                    </p>
                  </div>

                  <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Available Presets</h5>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {PRESETS.map((preset) => {
                      const isActive = currentConfig.id === preset.id || (preset.id === 'preset-original' && currentConfig.type === 'original');
                      return (
                        <div
                          key={preset.id}
                          id={`preset-card-${preset.id}`}
                          onClick={() => selectPreset(preset)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                            isActive
                              ? 'bg-slate-850 border-amber-500/80 shadow-md shadow-amber-500/5'
                              : 'bg-slate-950/40 hover:bg-slate-850/45 border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="text-xs font-black text-white block group-hover:text-amber-400 transition-colors">
                                {preset.name}
                              </span>
                              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">
                                {preset.id === 'preset-original' ? '🛡️ SECURED ORIGINAL BACKUP' : 'Stylized Layout Preset'}
                              </span>
                            </div>
                            
                            {isActive && (
                              <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                                Active Logo
                              </span>
                            )}
                          </div>

                          {/* Client Preview Bar wrapper */}
                          <div className="bg-white p-3 rounded-lg border border-slate-700/10 flex items-center justify-between mb-2">
                            <span className="text-[8px] font-extrabold text-slate-400 tracking-widest uppercase">Header Aspect:</span>
                            <DynamicLogoRenderer config={preset} isFooter={false} />
                          </div>

                          {/* Footer Preview Bar wrapper */}
                          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                            <span className="text-[8px] font-extrabold text-slate-500 tracking-widest uppercase">Footer Aspect:</span>
                            <DynamicLogoRenderer config={preset} isFooter={true} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: DESIGN STUDIO (CUSTOM LOGO) */}
              {activeTab === 'customizer' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800 text-left">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sliders size={14} className="text-amber-500" />
                      Configure Your New Logo Design
                    </h4>
                    
                    {/* Types of customization */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">LOGO ARCHITECTURE TYPE</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setCustomType('serif')}
                          className={`py-2 px-1 rounded text-center text-[10px] font-black uppercase tracking-wider border cursor-pointer ${
                            customType === 'serif' || customType === 'original' || customType === 'modern'
                              ? 'bg-blue-900 border-amber-500/50 text-white'
                              : 'bg-slate-900 border-slate-850 text-slate-400'
                          }`}
                        >
                          <Type size={12} className="inline mr-1" /> Vector + Text
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomType('custom_image')}
                          className={`py-2 px-1 rounded text-center text-[10px] font-black uppercase tracking-wider border cursor-pointer ${
                            customType === 'custom_image'
                              ? 'bg-blue-900 border-amber-500/50 text-white'
                              : 'bg-slate-900 border-slate-850 text-slate-400'
                          }`}
                        >
                          <ImageIcon size={12} className="inline mr-1" /> Image URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomType('custom_svg')}
                          className={`py-2 px-1 rounded text-center text-[10px] font-black uppercase tracking-wider border cursor-pointer ${
                            customType === 'custom_svg'
                              ? 'bg-blue-900 border-amber-500/50 text-white'
                              : 'bg-slate-900 border-slate-850 text-slate-400'
                          }`}
                        >
                          <FileCode size={12} className="inline mr-1" /> HTML / SVG
                        </button>
                      </div>
                    </div>

                    {/* Conditional inputs */}
                    {customType === 'custom_image' && (
                      <div className="space-y-3 p-3 bg-slate-900 rounded-lg border border-slate-800 animate-slideDown">
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">IMAGE LOGO SOURCE URL *</label>
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="e.g. https://yourdomain.com/assets/new-logo.png"
                            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-600"
                          />
                          <p className="text-[9px] text-gray-500 font-bold mt-1">If you have created a PNG/JPG or SVG logo asset, paste its URL above to display it live across the platform.</p>
                        </div>
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">COMPANION TEXT MARK (OPTIONAL)</label>
                          <input
                            type="text"
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="e.g. PERKINS"
                            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-600"
                          />
                        </div>
                      </div>
                    )}

                    {customType === 'custom_svg' && (
                      <div className="space-y-2 p-3 bg-slate-900 rounded-lg border border-slate-800 animate-slideDown">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">RAW SVG MARKUP CODE *</label>
                        <textarea
                          value={svgMarkup}
                          onChange={(e) => setSvgMarkup(e.target.value)}
                          placeholder='e.g. <svg width="40" height="40" viewBox="0 0 100 100">...'
                          className="w-full h-24 bg-slate-950 border border-slate-800 rounded p-2 text-xs font-mono text-cyan-400 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-600"
                        ></textarea>
                        <p className="text-[9px] text-gray-500 font-bold">Paste clean vector XML here. Make sure it contains proper viewbox attributes and styling rules.</p>
                      </div>
                    )}

                    {(customType !== 'custom_image' && customType !== 'custom_svg') && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Text Mark Config */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">BRAND TITLE TEXT</label>
                            <input
                              type="text"
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">SELECT VECTOR ICON</label>
                            <select
                              value={customIcon}
                              onChange={(e) => setCustomIcon(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="BookOpen">BookOpen (Classic)</option>
                              <option value="BookOpenCheck">BookOpenCheck</option>
                              <option value="Award">Award (Authority)</option>
                              <option value="Crown">Crown (Prestigious)</option>
                              <option value="Sparkles">Sparkles (Creative)</option>
                              <option value="Shield">Shield (Accredited)</option>
                              <option value="Bookmark">Bookmark</option>
                              <option value="Compass">Compass</option>
                            </select>
                          </div>
                        </div>

                        {/* Formatting adjustments */}
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">FONT PAIRING</label>
                            <select
                              value={customFont}
                              onChange={(e) => setCustomFont(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="font-sans">Inter Sans</option>
                              <option value="font-serif">Georgia Serif</option>
                              <option value="font-mono">JetBrains Mono</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">LETTER SPACING</label>
                            <select
                              value={customSpacing}
                              onChange={(e) => setCustomSpacing(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="tracking-[0.18em]">0.18em (Original)</option>
                              <option value="tracking-normal">Normal</option>
                              <option value="tracking-wide">Wide</option>
                              <option value="tracking-widest">Widest</option>
                              <option value="tracking-[0.25em]">Ultra Wide</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">SIZE INDEX</label>
                            <select
                              value={customSize}
                              onChange={(e) => setCustomSize(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                            >
                              <option value="text-sm">Small</option>
                              <option value="text-base">Medium (Original)</option>
                              <option value="text-lg">Large</option>
                              <option value="text-xl">Extra Large</option>
                            </select>
                          </div>
                        </div>

                        {/* Sliders for advanced spacing */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
                              <span>Icon Size</span>
                              <span className="text-amber-500">{iconSize}px</span>
                            </label>
                            <input
                              type="range"
                              min={14}
                              max={32}
                              value={iconSize}
                              onChange={(e) => setIconSize(Number(e.target.value))}
                              className="w-full accent-amber-500 bg-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
                              <span>Stroke Width</span>
                              <span className="text-amber-500">{strokeWidth}</span>
                            </label>
                            <input
                              type="range"
                              min={1}
                              max={3}
                              step={0.25}
                              value={strokeWidth}
                              onChange={(e) => setStrokeWidth(Number(e.target.value))}
                              className="w-full accent-amber-500 bg-slate-900"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="uppercase-chk"
                            checked={isUppercase}
                            onChange={(e) => setIsUppercase(e.target.checked)}
                            className="accent-amber-500 h-4 w-4 text-amber-500"
                          />
                          <label htmlFor="uppercase-chk" className="text-[10px] font-black uppercase text-slate-300 cursor-pointer">FORCE UPPERCASE BRAND MARKING</label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Temporary Preview Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-left">
                    <span className="text-[8px] font-extrabold text-slate-400 tracking-wider uppercase block">Sandbox Dynamic Preflight:</span>
                    
                    <div className="bg-white p-4 rounded-lg flex items-center justify-between">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">White Header Mock:</span>
                      
                      <div className="flex items-center gap-2">
                        {customType === 'custom_svg' && svgMarkup ? (
                          <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
                        ) : customType === 'custom_image' && imageUrl ? (
                          <div className="flex items-center gap-2">
                            <img src={imageUrl} className="h-9 w-auto object-contain" alt="Preview" onError={(e)=>(e.target as HTMLElement).style.display='none'} />
                            {customText && <span className={`${customSize} ${customFont} ${customSpacing} text-slate-900 ${isUppercase ? 'uppercase' : ''} font-bold`}>{customText}</span>}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2.5 text-slate-900">
                            <div className={textColorClass}>
                              {(() => {
                                const Selected = (Icons as any)[customIcon] || Icons.BookOpen;
                                return <Selected size={iconSize} strokeWidth={strokeWidth} />;
                              })()}
                            </div>
                            <span className={`${customFont} ${customSize} ${customSpacing} ${isUppercase ? 'uppercase' : ''} font-normal tracking-wider ${textColorClass}`}>
                              {customText}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <button
                    id="apply-studios-changes-btn"
                    onClick={applyCustomSettings}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-lg hover:shadow-amber-500/10 cursor-pointer text-center flex items-center justify-center gap-2"
                  >
                    <Check size={15} />
                    <span>Apply Custom Brand Settings universally</span>
                  </button>
                </div>
              )}

              {/* TAB 3: A/B SPLIT COMPARISON */}
              {activeTab === 'compare' && (
                <div className="space-y-4 animate-fadeIn text-left">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Layers size={14} className="text-amber-500" />
                      Comparative Pre-Flight Board
                    </h4>
                    <p className="text-[11px] text-gray-400 font-semibold leading-normal">
                      Compare your updated layout directly beside the original secured backup. Check letter density, visual height and contrast rendering before committing.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* OPTION A: ORIGINAL SECURED BACKUP */}
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 py-1 px-2.5 rounded border border-amber-500/20">
                          Option A: Clean Original Backup (Secured)
                        </span>
                        <button
                          id="revert-original-compare-btn"
                          onClick={() => selectPreset(ORIGINAL_LOGO_PRESET)}
                          className="text-[9px] font-black text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 bg-slate-900 py-1 px-2.5 rounded border border-slate-800"
                        >
                          <RotateCcw size={10} /> Revert To This
                        </button>
                      </div>

                      <div className="bg-white p-5 rounded-lg border border-slate-700/10 flex items-center justify-between">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Nav Banner:</span>
                        <div className="flex items-center gap-2.5 text-slate-900">
                          <Icons.BookOpen size={20} strokeWidth={1.5} className="text-slate-900" />
                          <span className="text-base font-normal tracking-[0.18em] uppercase text-slate-900">
                            PERKINS PUBLISHER
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* OPTION B: DYNAMIC BRAND SANDBOX CHOSEN LOGO */}
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 relative overflow-hidden">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 py-1 px-2.5 rounded border border-blue-500/20">
                          Option B: Current Active Logo
                        </span>
                        <div className="text-[9px] font-black text-slate-400">
                          {currentConfig.name}
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-lg border border-slate-700/10 flex items-center justify-between">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Nav Banner:</span>
                        <div className="flex items-center gap-1">
                          <DynamicLogoRenderer config={currentConfig} isFooter={false} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: BLUEPRINT & HELP */}
              {activeTab === 'blueprint' && (
                <div className="space-y-4 animate-fadeIn text-left text-xs text-slate-300 leading-relaxed">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Info size={14} className="text-amber-500" />
                      About Image & SVG Logo Import
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      If you've designed a specialized visual icon, exporting it as high-fidelity transparent PNG or nested SVG gives the cleanest aesthetic.
                    </p>
                    
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">SVG Markup Rule:</strong> Must start with `<svg>` and end with `</svg>`. Ensure vectors style colors are using `currentColor` or fixed HEX colors to render in both light or dark sections.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Asset Aspect Ratio:</strong> Keep heights between 36px to 44px for pixel-perfect integration into the header and extreme footer layout files.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-slate-400 font-bold">
                    <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider mb-1">State Synchronicity</h4>
                    <p className="text-[11px]">
                      Your configuration is bound into the React centralized context engine via states inside the root layout tree. When saving changes, local storage updates instantly to persist. Even if you refresh, your dynamic A/B comparison results are fully retained.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Sticky Backplate operations */}
            <div className="p-4 border-t border-slate-850 bg-slate-950 flex justify-between items-center gap-3">
              <button
                id="reset-original-backplate-btn"
                onClick={() => {
                  selectPreset(ORIGINAL_LOGO_PRESET);
                  showNotification('↩️ Restored Perkins Classic original brand layout!');
                }}
                className="py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-800 font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1.5"
              >
                <RotateCcw size={13} />
                <span>Reset to Classic</span>
              </button>
              
              <button
                id="close-sandbox-backplate-btn"
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-black text-xs uppercase tracking-wider cursor-pointer transition-all flex items-center gap-1"
              >
                <span>Continue Preview</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
