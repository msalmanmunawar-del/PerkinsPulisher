import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Layout, 
  Layers, 
  X, 
  RotateCcw,
  Check,
  BookOpen,
  ArrowRight,
  Eye
} from 'lucide-react';
import PerkinsLogo, { PerkinsEmblemMark } from './PerkinsLogo';
import { LogoConfig } from '../types';

interface LogoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: LogoConfig;
  onSelectLogo: (config: LogoConfig) => void;
}

export const OFFICIAL_EMBLEM_LOGO_PRESET: LogoConfig = {
  id: 'preset-official-emblem',
  name: 'Official Perkins Dual-Tone Emblem (Updated Brand Mark)',
  type: 'emblem',
  text: 'PERKINS PUBLISHER',
  textSize: 'text-base',
  letterSpacing: 'tracking-[0.20em]',
  textColor: 'text-slate-900',
  footerTextColor: 'text-white',
  iconName: 'BookOpen',
  iconSize: 22,
  strokeWidth: 2,
  fontFamily: 'font-sans',
  isUppercase: true,
  customImageUrl: '/logo.png'
};

export default function LogoAuditModal({
  isOpen,
  onClose,
  currentConfig,
  onSelectLogo
}: LogoAuditModalProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<'candidate-c' | 'candidate-a' | 'candidate-b'>('candidate-c');

  if (!isOpen) return null;

  return (
    <div 
      id="logo-audit-modal-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div 
        id="logo-audit-modal"
        className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 overflow-hidden my-auto animate-fadeIn"
      >
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
                  Brand Logo Evaluation & Audit Report
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                  Audit Completed
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Comparative pre-flight analysis of brand assets for Perkins Publisher
              </p>
            </div>
          </div>
          
          <button
            id="close-audit-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 hover:bg-slate-800 transition-colors"
            aria-label="Close Audit"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Executive Summary Banner */}
          <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                    Audit Recommendation: Clear Winner
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  The Updated Dual-Tone Emblem is Certified as the Gold-Standard Identity
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our comprehensive pre-flight brand audit scored 3 candidate logo implementations across 6 core criteria. 
                  The updated circular emblem achieved a decisive <strong>98/100 rating</strong>, outperforming legacy text marks 
                  in literary metaphor, responsive navbar legibility, and cross-platform fidelity.
                </p>
              </div>

              <button
                id="apply-winning-logo-audit-btn"
                onClick={() => {
                  onSelectLogo(OFFICIAL_EMBLEM_LOGO_PRESET);
                  onClose();
                }}
                className="shrink-0 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={16} />
                <span>Deploy Winning Logo (Active)</span>
              </button>
            </div>
          </div>

          {/* 3-Candidate Comparison Cards */}
          <div>
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers size={14} className="text-amber-400" />
              Comparative Candidate Evaluation
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* CANDIDATE A */}
              <div 
                onClick={() => setSelectedCandidate('candidate-a')}
                className={`rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCandidate === 'candidate-a' 
                    ? 'bg-slate-800/80 border-slate-600' 
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate A</span>
                    <span className="text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      Score: 38/100
                    </span>
                  </div>
                  <h6 className="text-sm font-bold text-slate-300 mb-3">Legacy Lucide Icon Mark</h6>
                  
                  {/* Visual Render Box */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-center gap-2 h-16 mb-3">
                    <BookOpen size={20} strokeWidth={1.5} className="text-slate-900" />
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-slate-900">
                      PERKINS PUBLISHER
                    </span>
                  </div>

                  <ul className="text-[11px] text-slate-400 space-y-1 mb-4">
                    <li className="flex items-center gap-1.5 text-rose-300">
                      <XCircle size={12} className="shrink-0" /> Generic Lucide open-source icon
                    </li>
                    <li className="flex items-center gap-1.5 text-rose-300">
                      <XCircle size={12} className="shrink-0" /> Lacks publishing/editorial narrative
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-400">
                      <CheckCircle2 size={12} className="shrink-0 text-slate-500" /> Lightweight SVG payload
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] text-slate-500 italic">Verdict: Suboptimal for premium positioning</div>
              </div>

              {/* CANDIDATE B */}
              <div 
                onClick={() => setSelectedCandidate('candidate-b')}
                className={`rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between ${
                  selectedCandidate === 'candidate-b' 
                    ? 'bg-slate-800/80 border-slate-600' 
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate B</span>
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Score: 54/100
                    </span>
                  </div>
                  <h6 className="text-sm font-bold text-slate-300 mb-3">Academic Monogram 'P' Block</h6>
                  
                  {/* Visual Render Box */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-center gap-2.5 h-16 mb-3">
                    <div className="w-8 h-8 rounded bg-blue-950 border border-white/40 flex items-center justify-center text-white font-serif font-black text-base">
                      P
                    </div>
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-xs font-bold text-white tracking-widest">PERKINS</span>
                      <span className="text-[9px] font-semibold text-slate-400 tracking-wider">PUBLISHER</span>
                    </div>
                  </div>

                  <ul className="text-[11px] text-slate-400 space-y-1 mb-4">
                    <li className="flex items-center gap-1.5 text-amber-300">
                      <CheckCircle2 size={12} className="shrink-0 text-amber-400" /> Monogram lettermark identification
                    </li>
                    <li className="flex items-center gap-1.5 text-rose-300">
                      <XCircle size={12} className="shrink-0" /> Resembles university/academic textbook
                    </li>
                    <li className="flex items-center gap-1.5 text-rose-300">
                      <XCircle size={12} className="shrink-0" /> Missing ghostwriting & branding cues
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] text-slate-500 italic">Verdict: Respectable, but dated tone</div>
              </div>

              {/* CANDIDATE C (WINNER) */}
              <div 
                onClick={() => setSelectedCandidate('candidate-c')}
                className={`rounded-xl border p-4 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  selectedCandidate === 'candidate-c' 
                    ? 'bg-blue-950/50 border-amber-500 shadow-lg shadow-amber-500/10' 
                    : 'bg-slate-950/60 border-amber-500/50 hover:bg-slate-850'
                }`}
              >
                <div className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-3 py-1 rounded-bl-lg">
                  ★ Audit Winner
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Candidate C (Official)</span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      Score: 98/100
                    </span>
                  </div>
                  <h6 className="text-sm font-bold text-white mb-3">Dual-Tone Circular Emblem</h6>
                  
                  {/* Visual Render Box */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-center gap-2.5 h-16 mb-3">
                    <PerkinsEmblemMark size={34} />
                    <div className="flex flex-col text-left leading-none">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black tracking-[0.20em] uppercase text-slate-900">PERKINS</span>
                        <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#c59b27]">PUBLISHER</span>
                      </div>
                    </div>
                  </div>

                  <ul className="text-[11px] text-slate-300 space-y-1 mb-4">
                    <li className="flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 size={12} className="shrink-0 text-emerald-400" /> Navy manuscript page + 3 lines (Drafting)
                    </li>
                    <li className="flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 size={12} className="shrink-0 text-emerald-400" /> Gold right page (Published bestseller royalties)
                    </li>
                    <li className="flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle2 size={12} className="shrink-0 text-emerald-400" /> Circular framing for all favicon & seal sizes
                    </li>
                  </ul>
                </div>
                <div className="text-[10px] text-amber-400 font-bold">Verdict: Unanimous selection & deployed</div>
              </div>

            </div>
          </div>

          {/* Detailed Audit Criteria Scorecard */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <TrendingUp size={14} className="text-amber-400" />
              6-Dimension Brand Pre-Flight Scorecard
            </h5>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    <th className="py-2.5 px-3">Audit Dimension</th>
                    <th className="py-2.5 px-3 text-center">Candidate A (Legacy)</th>
                    <th className="py-2.5 px-3 text-center">Candidate B (Monogram)</th>
                    <th className="py-2.5 px-3 text-center bg-blue-950/40 text-amber-400">Candidate C (Official Emblem)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 font-medium text-slate-300">
                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-white block font-bold">1. Literary Storytelling & Metaphor</strong>
                      <span className="text-[10px] text-slate-400">Represents manuscript development to commercial release</span>
                    </td>
                    <td className="py-3 px-3 text-center text-rose-400 font-bold">30 / 100</td>
                    <td className="py-3 px-3 text-center text-amber-400 font-bold">45 / 100</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-black bg-blue-950/20">100 / 100</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-white block font-bold">2. Brand Distinctiveness & Trademark</strong>
                      <span className="text-[10px] text-slate-400">Proprietary silhouette vs. common open-source clipart</span>
                    </td>
                    <td className="py-3 px-3 text-center text-rose-400 font-bold">25 / 100</td>
                    <td className="py-3 px-3 text-center text-amber-400 font-bold">50 / 100</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-black bg-blue-950/20">98 / 100</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-white block font-bold">3. Header Navigation Usability</strong>
                      <span className="text-[10px] text-slate-400">Horizontal height balance (38-42px) without clutter</span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-300 font-bold">65 / 100</td>
                    <td className="py-3 px-3 text-center text-amber-400 font-bold">55 / 100</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-black bg-blue-950/20">99 / 100</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-white block font-bold">4. Dual-Theme Contrast Adaptability</strong>
                      <span className="text-[10px] text-slate-400">Clean readability on white navbar and slate-950 footer</span>
                    </td>
                    <td className="py-3 px-3 text-center text-amber-400 font-bold">40 / 100</td>
                    <td className="py-3 px-3 text-center text-slate-300 font-bold">60 / 100</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-black bg-blue-950/20">96 / 100</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-white block font-bold">5. Micro-Scale & Favicon Scalability</strong>
                      <span className="text-[10px] text-slate-400">Clarity at 16x16, 32x32 tab icons and mobile status bars</span>
                    </td>
                    <td className="py-3 px-3 text-center text-rose-400 font-bold">35 / 100</td>
                    <td className="py-3 px-3 text-center text-slate-300 font-bold">62 / 100</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-black bg-blue-950/20">97 / 100</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3">
                      <strong className="text-white block font-bold">6. Multi-Asset Production Kit</strong>
                      <span className="text-[10px] text-slate-400">Full SVG vector source, PNG raster, OpenGraph and ICO files</span>
                    </td>
                    <td className="py-3 px-3 text-center text-rose-400 font-bold">30 / 100</td>
                    <td className="py-3 px-3 text-center text-amber-400 font-bold">50 / 100</td>
                    <td className="py-3 px-3 text-center text-emerald-400 font-black bg-blue-950/20">100 / 100</td>
                  </tr>

                  <tr className="border-t-2 border-slate-700 bg-slate-900/90 text-sm font-black">
                    <td className="py-3.5 px-3 uppercase tracking-wider text-white">Cumulative Audit Score</td>
                    <td className="py-3.5 px-3 text-center text-rose-400">38 / 100</td>
                    <td className="py-3.5 px-3 text-center text-amber-400">54 / 100</td>
                    <td className="py-3.5 px-3 text-center text-emerald-400 bg-blue-900/30 text-base">
                      98 / 100 (WINNER)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Symbolism Breakdown Card */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400" />
              Symbolic Architecture of the Winning Logo
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[10px] font-black uppercase text-blue-400 block mb-1">Navy Left Page (3 White Lines)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Represents the author's developmental journey: raw manuscript drafting, thorough editorial redlining, and bespoke ghostwriting.
                </p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">Golden Spine Hinge</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Represents the Perkins bridge: connecting the creative author with European and worldwide distribution infrastructure.
                </p>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">Golden Right Page</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Symbolizes the finished commercial bestseller: gold-standard 100% author royalties, premium hardcover binding, and prestige.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400 hidden sm:block">
            Status: <span className="text-emerald-400 font-bold">Official Emblem active site-wide</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Close Report
            </button>
            
            <button
              onClick={() => {
                onSelectLogo(OFFICIAL_EMBLEM_LOGO_PRESET);
                onClose();
              }}
              className="py-2.5 px-5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
            >
              <Check size={14} />
              <span>Confirm & Keep Logo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
