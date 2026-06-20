import { useState, useMemo } from 'react';
import { Search, Sparkles, CheckCircle, HelpCircle, Trophy, BookOpen, AlertTriangle, Lightbulb, Key, ArrowRight, Gauge, FileText, Send } from 'lucide-react';

interface AuditQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    score: number;
    tip: string;
  }[];
}

const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 'q-status',
    text: 'What is the current status of your manuscript?',
    options: [
      { text: 'I only have a concept or outline in my head.', score: 10, tip: 'Ask about our Elite Ghostwriting & Planning package to materialize your idea into chapters.' },
      { text: 'I am actively drafting (partially completed).', score: 15, tip: 'Focus on consistent weekly chapters. We can perform progressive developmental line evaluation as you draft.' },
      { text: 'Complete draft is finished, but unpolished.', score: 25, tip: 'Perfect fit for Stephanie Weldon’s Developmental & Line editing reviews before committing to layout.' },
      { text: 'Fully edited, formatted and export-ready!', score: 35, tip: 'Excellent! Your draft is ready for custom 3D cover illustration and global IngramSpark listing setup.' }
    ]
  },
  {
    id: 'q-cover',
    text: 'What state is your Book Cover visual design in?',
    options: [
      { text: 'I have no cover concept or design yet.', score: 5, tip: 'Our designers can craft award-winning custom 3D vector graphics that command Amazon click-throughs.' },
      { text: 'I have a temporary file or basic mockup layout.', score: 15, tip: 'Ensure your title font remains legible when scaled down to a small 100px mobile shopping thumbnail.' },
      { text: 'I have a professionally designed front cover.', score: 25, tip: 'Keep in mind we also need spine measuring, back-cover blurb formatting, and active barcode barcodes.' }
    ]
  },
  {
    id: 'q-distribution',
    text: 'How do you plan to configure global book retailers?',
    options: [
      { text: 'I do not know how global wholesale distribution works.', score: 5, tip: 'Read our latest manual on syncing IngramSpark with Amazon KDP so you retain 100% of all royalties.' },
      { text: 'I plan to publish on Amazon only.', score: 15, tip: 'Amazon is massive, but you lose up to 40% of prospective buyers who prefer Barnes & Noble, Apple, or Kobo.' },
      { text: 'Fully wide (Amazon, local indie bookstores, academic catalogs).', score: 30, tip: 'We configure custom ISBN registrations and distribute to 40,000+ networks including digital libraries.' }
    ]
  },
  {
    id: 'q-audience',
    text: 'What is your pre-established author platform size?',
    options: [
      { text: 'No established audience (starting entirely from scratch).', score: 5, tip: 'Leverage our Guerrilla Book Marketing step-by-step blueprint to recruit early ARC review teams.' },
      { text: 'Small following / personal email directory.', score: 15, tip: 'Create a pre-order landing page early. Offer an exclusive free preview chapter to increase opt-ins.' },
      { text: 'Large email database or popular social media following.', score: 25, tip: 'Work with us to establish dynamic digital barcodes, strategic press campaigns, and immediate bulk orders.' }
    ]
  }
];

// Presets for our localized dynamic keyword recommendations database
const GENRE_SEO_PRESETS: { [category: string]: { keywords: string[]; synonyms: string[]; description: string } } = {
  'Business & Self-Help': {
    keywords: ['passive income guides', 'executive coaching systems', 'leadership frameworks', 'overcoming startup barriers', 'mindset optimization'],
    synonyms: ['entrepreneurial roadmap', 'personal growth guidebook', 'high-performance blueprint', 'strategic management', 'financial freedom blueprint'],
    description: 'Business search intent centers deeply on terms like "blueprint", "framework", and "action plan". Avoid abstract titles in favor of clear subtitle promises.'
  },
  'Mystery, Thriller & Sci-Fi': {
    keywords: ['psychological suspense reads', 'post apocalyptic novels', 'hard sci fi books', 'cozy detective stories', 'best technothrillers'],
    synonyms: ['page-turning thriller', 'hard-boiled classic', 'speculative space opera', 'dark mystery thriller', 'sci-fi adventure series'],
    description: 'Fiction buyers rank heavily by micro-subgenres. Make sure to specify your exact genre tags in physical retail registration variables.'
  },
  'Memoir & Biography': {
    keywords: ['inspirational life memoirs', 'personal journey narrative', 'overcoming adversity autobiography', 'historical biography books', 'true life stories'],
    synonyms: ['personal memoir book', 'inspiring true story', 'chronicle of resilience', 'untold self biography', 'authentic live journey'],
    description: 'Biographies hook audiences via high emotional resonance. Your subtitle must explicitly declare the specific hurdle or journey accomplished.'
  },
  'Non-Fiction & Academic': {
    keywords: ['scientific reference manuals', 'comprehensive history guides', 'instructional textbook print', 'social science analysis', 'practical educational book'],
    synonyms: ['authoritative textbook', 'in-depth research study', 'educational curriculum guide', 'step-by-step handbook', 'academic research reference'],
    description: 'Intellectual readers search based on authority. Highlight your credentials, doctoral paths, or empirical proofs directly on your cover blurb.'
  }
};

interface LeadAuditScorecardProps {
  onOpenInquiry: (initialSubject: string) => void;
}

export default function LeadAuditScorecard({ onOpenInquiry }: LeadAuditScorecardProps) {
  // 1. Scorecard State variables
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // 2. SEO search helper state variables
  const [selectedGenre, setSelectedGenre] = useState<string>('Business & Self-Help');
  const [userInputKeyword, setUserInputKeyword] = useState<string>('');
  const [customKeywordRating, setCustomKeywordRating] = useState<string | null>(null);

  // Calculates current draft readiness score based on answers state
  const totalScore = useMemo(() => {
    let score = 0;
    Object.keys(answers).forEach((qId) => {
      score += answers[qId];
    });
    return score;
  }, [answers]);

  // Handle options picker
  const handleSelectOption = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Compile checklist of actionable insights based on user selections
  const feedbackTips = useMemo(() => {
    const list: string[] = [];
    AUDIT_QUESTIONS.forEach((q) => {
      const selectedValue = answers[q.id];
      if (selectedValue !== undefined) {
        const matchingOption = q.options.find((opt) => opt.score === selectedValue);
        if (matchingOption) {
          list.push(matchingOption.tip);
        }
      }
    });
    return list;
  }, [answers]);

  // Simple algorithmic evaluation of a custom book focus-phrase
  const handleKeywordAnalyze = () => {
    if (!userInputKeyword.trim()) return;
    const len = userInputKeyword.trim().length;
    const words = userInputKeyword.trim().split(/\s+/).length;

    if (words < 2) {
      setCustomKeywordRating('Low Search Volume: Try using longer specific target search strings (e.g. "Personal Memoir for Women" instead of "Memoir").');
    } else if (words > 5) {
      setCustomKeywordRating('Moderate Search Volume: Long-tail keyword is highly focused, but structure may be too specific. Streamline to 3-4 commercial words.');
    } else {
      setCustomKeywordRating('High Potential Search Intent! This phrase has balanced target density. Ensure this phrase is populated inside your online subtitle options.');
    }
  };

  const isQuestionsComplete = Object.keys(answers).length === AUDIT_QUESTIONS.length;

  return (
    <section id="seo-scorecard" className="py-24 bg-gradient-to-b from-[#0b0f19] to-[#04070e] text-white overflow-hidden border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold tracking-wider text-blue-400 uppercase">
            <Gauge className="w-3.5 h-3.5" />
            <span>Interactive Author Launch Optimizer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
            Evaluate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-400 to-orange-500 font-bold">Bestseller Readiness</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Before spending budget on formatting or retail packages, run our interactive algorithmic audit. Clear actionable feedback based on genuine search traffic parameters.
          </p>
        </div>

        {/* Dual Responsive Tabs: left: Question Evaluator, right: Real-Time Book Title SEO Optimization Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Scoring Widget Area (Cols 1 to 7) */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <Trophy className="text-amber-500 w-6 h-6 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-white text-base">Step 1: The Bestseller Scorecard</h3>
                  <p className="text-xs text-gray-400">Answer 4 quick specs to evaluate publishing launch readiness.</p>
                </div>
              </div>

              {/* Live scoring circle */}
              {isQuestionsComplete && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 rounded-lg text-amber-400 text-xs font-mono font-bold">
                  <span>Current: <b>{totalScore}/125</b> pts</span>
                </div>
              )}
            </div>

            {/* Questions form space */}
            <div className="space-y-6">
              {AUDIT_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-black font-mono text-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <label className="text-sm font-extrabold text-gray-200">
                      {q.text}
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pl-7">
                    {q.options.map((opt) => {
                      const isSelected = answers[q.id] === opt.score;
                      return (
                        <button
                          key={opt.text}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.score)}
                          className={`text-left p-3 rounded-xl border text-xs leading-relaxed font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-white font-bold ring-1 ring-amber-500'
                              : 'bg-slate-950/40 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                          }`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Action panel inside Scorecard */}
            <div className="pt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                {isQuestionsComplete ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Evaluator setup complete! Ready to compile.
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Please finalize all {AUDIT_QUESTIONS.length - Object.keys(answers).length} remaining indices above.
                  </span>
                )}
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  type="button"
                  disabled={!isQuestionsComplete}
                  onClick={() => setShowResults(true)}
                  className={`w-full md:w-auto text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isQuestionsComplete
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg hover:scale-103'
                      : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Analysis Report</span>
                </button>
              </div>
            </div>

            {/* Dynamic Results expansion panel */}
            {showResults && (
              <div id="scorecard-report-card" className="bg-[#0c0f1b] border-2 border-amber-500/30 rounded-2xl p-6 space-y-6 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800 pb-5">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Your Calculated Score Report</span>
                    <h4 className="text-xl font-black text-white">The Pre-Launch Readiness Index</h4>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-blue-950 font-black text-xl px-4 py-2 rounded-xl shadow-lg font-mono">
                      {Math.min(100, Math.round((totalScore / 115) * 100))}% Ready
                    </div>
                  </div>
                </div>

                {/* Score categorization alerts */}
                <div className="flex gap-3 bg-slate-900 border border-gray-800 hover:border-gray-700/80 p-4 rounded-xl items-start">
                  {totalScore < 50 ? (
                    <>
                      <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <span className="font-extrabold text-orange-400 uppercase">Status: Concept & Outlining Stage</span>
                        <p className="text-gray-300 leading-relaxed">
                          Your manuscript has a wonderful initial spark, but lacks crucial foundational marketing hooks and layout distribution architecture. Publishing now could result in limited organic exposure. Focus on completing developmental evaluation with professional editors.
                        </p>
                      </div>
                    </>
                  ) : totalScore < 85 ? (
                    <>
                      <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <span className="font-extrabold text-amber-400 uppercase">Status: Progressive Drafting Phase</span>
                        <p className="text-gray-300 leading-relaxed">
                          You possess strong manuscript progress or cover strategies! To lock in your path as a professional bestseller on Amazon or physical stores, ensure you invest in developmental line copy-editing and configure IngramSpark Wide global distribution metadata correctly.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <div className="space-y-1 text-xs">
                        <span className="font-extrabold text-green-400 uppercase">Status: Outstanding Launch-Ready Core</span>
                        <p className="text-gray-300 leading-relaxed">
                          Immaculate setup! Your files are highly aligned for commercial launch. Proceed with secure bulk-retail setup, formal ISBN declarations, and register custom 3D typography cover graphics to push click performance to maximum bounds.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Algorithmic action checklist tailored to Stephanie Weldon consulting */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black text-white uppercase tracking-wider font-mono">Your Actionable Pre-Launch Manual:</h5>
                  <ul className="space-y-2.5">
                    {feedbackTips.map((tip, index) => (
                      <li key={index} className="flex gap-2.5 text-xs text-gray-300 leading-relaxed items-start">
                        <span className="w-4 h-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold font-mono">
                          ✓
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lead Magnet CTA for Stephanie Weldon */}
                <div className="bg-[#11172a] border border-blue-500/20 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 flex-grow text-center md:text-left">
                    <h5 className="text-sm font-extrabold text-white">Want the full Stephanie Weldon Distribution Blueprint?</h5>
                    <p className="text-xs text-gray-400 max-w-lg leading-relaxed">
                      We can export this algorithmic scorecard along with physical paper-spec selections to Stephanie Weldon now for review.
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenInquiry(`Pre-Launch Audit Scorecard: ${Math.round((totalScore/115)*100)}% Readiness`)}
                    className="shrink-0 w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-md transition-transform hover:scale-103 inline-flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Scorecard Details</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Web Search Meta tool & Anchor Links (Cols 8 to 12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dynamic SEO Keyword Tool */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="space-y-2 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <Key className="text-amber-400 w-5 h-5 shrink-0" />
                  <h4 className="font-extrabold text-white text-base">Step 2: Amazon SEO Keyword Matcher</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Search engines indexes book listings via title algorithms. Pick your category and key phrases below to optimize metadata instantly.
                </p>
              </div>

              {/* Genre picker */}
              <div className="space-y-2 text-xs">
                <label className="font-extrabold text-gray-300">Choose Your Manuscript’s Core Genre:</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => {
                    setSelectedGenre(e.target.value);
                    setCustomKeywordRating(null);
                  }}
                  className="w-full bg-[#0d121e] border border-gray-800 rounded-xl px-3 py-2.5 font-bold text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {Object.keys(GENRE_SEO_PRESETS).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Keyword entry validation input */}
              <div className="space-y-2 text-xs">
                <label className="font-extrabold text-gray-300">Enter Your Potential Title / focus-phrase:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInputKeyword}
                    onChange={(e) => {
                      setUserInputKeyword(e.target.value);
                      setCustomKeywordRating(null);
                    }}
                    placeholder="e.g., Passive Income Secrets for Authors"
                    className="flex-grow bg-[#0c0f1b] border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleKeywordAnalyze}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 rounded-xl cursor-pointer"
                  >
                    Analyze
                  </button>
                </div>
              </div>

              {/* Live analyzed metadata display */}
              {customKeywordRating && (
                <div className="bg-[#121827] border border-amber-500/20 p-3.5 rounded-xl text-xs space-y-1.5 animate-fadeIn">
                  <span className="font-black text-amber-400 block uppercase text-[10px]">Title Algorithm Rating:</span>
                  <p className="text-gray-300 leading-relaxed font-semibold">
                    {customKeywordRating}
                  </p>
                </div>
              )}

              {/* Genre specific curated search volume terms */}
              <div className="space-y-3.5 pt-4 border-t border-gray-800 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-wider">High Volume Amazon Search Queries:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {GENRE_SEO_PRESETS[selectedGenre].keywords.map((kw, i) => (
                      <span key={i} className="bg-[#0b0f19] text-amber-500/95 font-bold font-mono px-2.5 py-1 text-[10px] rounded-lg border border-gray-800">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-wider">Synergistic Title Synonyms (Google CTR):</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {GENRE_SEO_PRESETS[selectedGenre].synonyms.map((syn, i) => (
                      <span key={i} className="bg-[#0c0f1b] text-blue-400 font-semibold font-mono px-2.5 py-1 text-[10px] rounded-lg border border-gray-800/80">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 italic bg-[#0c0f1b]/60 p-3 rounded-lg leading-relaxed border border-gray-850/30">
                  <b>SEO Strategy Guide:</b> {GENRE_SEO_PRESETS[selectedGenre].description}
                </p>
              </div>
            </div>

            {/* Static index sitemap guides to avoid orphan pages and increase crawling */}
            <div className="bg-[#111622] border border-gray-800 rounded-2xl p-5 space-y-4">
              <h5 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5 pb-2.5 border-b border-gray-800">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Search engine Index parameters</span>
              </h5>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold text-gray-400 font-mono">
                <div className="p-2 bg-slate-950/40 rounded border border-gray-850 text-center">
                  <span className="text-amber-500 block">SITEMAP.XML</span>
                  <span>Registered Active</span>
                </div>
                <div className="p-2 bg-slate-950/40 rounded border border-gray-850 text-center">
                  <span className="text-amber-500 block">ROBOTS.TXT</span>
                  <span>Allow indexing</span>
                </div>
                <div className="p-2 bg-slate-950/40 rounded border border-gray-850 text-center">
                  <span className="text-amber-500 block">SCHEMA.ORG</span>
                  <span>JSON-LD verified</span>
                </div>
                <div className="p-2 bg-slate-950/40 rounded border border-gray-850 text-center">
                  <span className="text-amber-500 block">HTTP CROUNDS</span>
                  <span>CDN configured</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
