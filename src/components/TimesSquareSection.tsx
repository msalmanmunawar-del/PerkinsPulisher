import { useState } from 'react';
import { Play, X, Star, Sparkles, Tv, HelpCircle, Film } from 'lucide-react';

interface TimesSquareSectionProps {
  onOpenConsultation: () => void;
}

export default function TimesSquareSection({ onOpenConsultation }: TimesSquareSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePromoGenre, setActivePromoGenre] = useState<'thriller' | 'romance' | 'history' | 'scifi'>('thriller');
  const [isPlayingClip, setIsPlayingClip] = useState(false);

  const trailers = {
    thriller: {
      title: "The Midnight Silhouette",
      tagline: "A code locked in stone. A target that doesn't exist.",
      narration: [
        "In the silence of New York's cryptographic centers...",
        "A hidden ledger was unlocked.",
        "Now, Julian Thorne is running from shadows.",
        "The bestselling thriller of the year.",
        "Published, Formatted, and Rocketed to #1 by Perkins Publisher."
      ],
      color: "bg-red-950",
      accent: "text-red-500"
    },
    romance: {
      title: "Finding My Pitch",
      tagline: "Two wandering notes finding harmony in the dark.",
      narration: [
        "She lived for classical order.",
        "He played the chaotic rhythms of Greenwich midnight jazz.",
        "In the crowded cafe on MacDougal Street...",
        "A temporary summer duet became an lifelong symphony.",
        "A beautiful romance masterpiece. Designed by Perkins Publisher."
      ],
      color: "bg-pink-950",
      accent: "text-pink-400"
    },
    history: {
      title: "Beyond the Berlin Wall",
      tagline: "A reporter\'s quiet battle inside the Cold War machinery.",
      narration: [
        "For thirty years, forty stories lay hidden in an attic archive.",
        "The names of those who helped others scale the iron boundaries.",
        "Now, their testimony is printed in full clarity.",
        "A masterclass historical memoir.",
        "Edited, structured, and printed worldwide by Perkins Publisher."
      ],
      color: "bg-amber-950",
      accent: "text-amber-500"
    },
    scifi: {
      title: "Echoes of the Cosmos",
      tagline: "The core signal wasn\'t a greeting. It was a warning.",
      narration: [
        "Underneath Pluto\'s nitrogen ice sheet...",
        "A regular magnetic oscillation woke up.",
        "Captain Chen thought it was contact.",
        "The computer translated it as a clock ticks.",
        "The year\'s most mind-bending space epic. Published by Perkins Publisher."
      ],
      color: "bg-violet-950",
      accent: "text-violet-400"
    }
  };

  const currentPromo = trailers[activePromoGenre];

  return (
    <section className="bg-slate-950 text-white py-20 relative overflow-hidden">
      {/* Background neon dots */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent"></div>
      <div className="absolute -left-20 top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -right-20 bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold leading-none">
            <Tv size={13} />
            <span>EXCLUSIVE HIGHLIGHT FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Perkins Publisher Lights Up <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Times Square!</span>
          </h2>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            We don\'t just upload your books to a database—we coordinate professional book trailers and global billboard campaigns to generate real market presence. Learn why we get authors noticed.
          </p>
        </div>

        {/* Billboard Container */}
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-5xl relative overflow-hidden">
          
          {/* NYC Times Square City Scene Simulation */}
          <div className="relative aspect-video rounded-2xl bg-black border border-slate-700/50 shadow-2xl overflow-hidden group">
            
            {/* Dark background urban mock */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#131b2e] via-[#090b11] to-black opacity-90"></div>
            
            {/* Glowing neon shapes */}
            <div className="absolute left-6 top-6 bg-yellow-500/10 text-yellow-400 text-[10px] font-black uppercase px-2.5 py-1 rounded border border-yellow-500/25 tracking-widest leading-none">
              Broadway Billboard • Live Preview
            </div>

            {/* Simulated Animated Book Cover on Billboard */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-500">
              <div className="max-w-xl space-y-4 animate-pulse">
                <span className="text-[10px] font-extrabold uppercase bg-amber-500 text-black px-2 py-0.5 rounded tracking-widest">
                  Bestseller Alert
                </span>
                <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif drop-shadow-lg">
                  {currentPromo.title}
                </h3>
                <p className={`text-xs sm:text-sm font-bold uppercase ${currentPromo.accent} tracking-wider`}>
                  {currentPromo.tagline}
                </p>
                <p className="text-slate-400 text-xs font-medium max-w-md mx-auto hidden sm:block">
                  Featured on the Nasdaq giant billboard! Coordinated by Perkins Publisher to put global readers first.
                </p>
              </div>

              {/* Huge Play Button */}
              <button
                onClick={() => setModalOpen(true)}
                className="mt-8 bg-amber-500 hover:bg-amber-600 hover:scale-110 active:scale-95 text-blue-950 p-5 sm:p-6 rounded-full shadow-2.5xl transition-all cursor-pointer border-4 border-white/15"
                aria-label="Play Trailer"
              >
                <Play size={28} className="fill-blue-950 translate-x-0.5" />
              </button>
            </div>

            {/* Bottom Billboard banner ticker */}
            <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-black py-1 px-4 text-[10px] sm:text-xs font-black uppercase tracking-widest flex justify-between items-center overflow-hidden">
              <div className="flex gap-12 whitespace-nowrap animate-marquee">
                <span>🔥 PERKINS PUBLISHER BESTSELLERS 2026 — EXCLUSIVE TIMES SQUARE TRAILERS</span>
                <span className="hidden sm:inline">★ KEEP 100% OF YOUR RIGHTS</span>
                <span>★ SUBMIT YOUR BOOK TODAY</span>
              </div>
            </div>
          </div>

          {/* Quick interactive controls for standard replica */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center items-center">
            <span className="text-xs font-bold text-slate-400 mr-2">Pick Billboard Sample:</span>
            {(['thriller', 'romance', 'history', 'scifi'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setActivePromoGenre(g)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activePromoGenre === g
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-750'
                }`}
              >
                {g.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Cost Estimator Quick banner */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-900/40 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl text-center md:text-left">
          <div className="space-y-1">
            <p className="text-xs uppercase font-extrabold text-amber-400 tracking-widest">WANT TO SEE YOUR NAME IN PRINT?</p>
            <h4 className="text-lg font-black text-white">Join the Next Elite Group of Best-Selling Authors!</h4>
            <p className="text-xs text-slate-400 font-bold">Configure your packages in seconds to see estimated production costs.</p>
          </div>
          <a
            href="#calculator"
            className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs font-black uppercase px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Launch Interactive Cost Estimator
          </a>
        </div>

      </div>

      {/* Video Trailer Play SimulModal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-3xl text-white">
            
            {/* Modal Heading */}
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
              <div className="flex items-center gap-2 text-amber-500 font-extrabold text-sm">
                <Film size={16} />
                <span>Simulating Trailer: {currentPromo.title}</span>
              </div>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setIsPlayingClip(false);
                }}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Live Trailer Cinematic Simulator Content */}
            <div className={`p-8 min-h-[300px] flex flex-col justify-between ${currentPromo.color} transition-all duration-300 relative`}>
              
              {/* Star dust effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none"></div>

              <div className="space-y-6 text-center max-w-lg mx-auto py-6">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
                  <Sparkles size={12} />
                  <span>PRESENTING BOOK TRAILER</span>
                </p>
                <h4 className="text-4xl font-black font-serif tracking-tight drop-shadow-xl text-white">
                  {currentPromo.title}
                </h4>
                <p className="text-sm italic text-slate-300 font-medium leading-relaxed">
                  &quot; {currentPromo.tagline} &quot;
                </p>
                
                {/* Rolling Narrative subtitles simulation */}
                <div role="log" className="bg-black/50 p-4 rounded-xl border border-white/10 text-xs font-bold text-gray-200 mt-6 min-h-[80px] flex items-center justify-center transition-all duration-300">
                  <p className="leading-relaxed animate-pulse">
                    {isPlayingClip ? (
                      <span className="text-amber-400">🔥 Book trailer matches standard retail formatting, syndicating to global audiences. Coordinated by Perkins Publisher.</span>
                    ) : (
                      <span>Click the Simulation sequence below to generate narrative beats!</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Interaction buttons inside modal */}
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <div className="text-center text-[11px] font-bold text-slate-400 uppercase">
                  Explore Narrative Frame beats:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {currentPromo.narration.map((beat, bIdx) => (
                    <button
                      key={bIdx}
                      onClick={() => {
                        setIsPlayingClip(true);
                        const docLog = document.querySelector('[role="log"] p');
                        if (docLog) {
                          docLog.textContent = beat;
                        }
                      }}
                      className="bg-white/10 hover:bg-white/20 text-[10px] font-bold py-1.5 px-2 rounded text-center transition-colors truncate"
                      title={beat}
                    >
                      Beat {bIdx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsPlayingClip(true);
                      const docLog = document.querySelector('[role="log"] p');
                      if (docLog) {
                        docLog.textContent = "🎬 CAMERA LOGS: Times Square Campaign streaming continues. Submit your manuscript now to secure high visibility!";
                      }
                    }}
                    className="bg-amber-500 text-blue-950 font-black text-[10px] py-1.5 px-2 rounded text-center cursor-pointer col-span-2 sm:col-span-1"
                  >
                    Auto Loop
                  </button>
                </div>
              </div>

            </div>

            {/* Modal footer call */}
            <div className="px-6 py-5 bg-slate-950/60 border-t border-slate-800 text-center space-y-3">
              <p className="text-xs text-slate-300 font-semibold">
                Want a professionally directed cinematic trailer for your manuscript? Let Perkins build it.
              </p>
              <button
                onClick={() => {
                  setModalOpen(false);
                  onOpenConsultation();
                }}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-blue-950 text-xs font-black uppercase px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer animate-pulse"
              >
                <span>Request Custom Book Trailer</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
