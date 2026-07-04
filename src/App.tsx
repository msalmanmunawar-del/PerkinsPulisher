import { useState, useEffect, FormEvent } from 'react';
import { Inquiry, LogoConfig } from './types';
import Header from './components/Header';
import { ORIGINAL_LOGO_PRESET } from './components/LogoSandbox';
import Hero from './components/Hero';
import TimesSquareSection from './components/TimesSquareSection';
import ServiceHub from './components/ServiceHub';
import CompareSection from './components/CompareSection';
import BookSlider from './components/BookSlider';
import CostCalculator from './components/CostCalculator';
import Testimonials from './components/Testimonials';
import AuthorInsights from './components/AuthorInsights';
import LeadAuditScorecard from './components/LeadAuditScorecard';
import Footer from './components/Footer';
import { useToast } from './components/Toast';

import { X, CheckCircle, Sparkles, Phone, Award, BookOpen, Loader2 } from 'lucide-react';

export default function App() {
  const { success: showSuccessToast, warn: showWarningToast } = useToast();
  const [activePage, setActivePage] = useState<string>('home');
  const [logoConfig, setLogoConfig] = useState<LogoConfig>(ORIGINAL_LOGO_PRESET);
  const [consultationModalOpen, setConsultationModalOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Modal Inquiry Form inputs
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalGenre, setModalGenre] = useState('fiction');
  const [modalWordCount, setModalWordCount] = useState<number>(45000);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubmitted, setModalSubmitted] = useState(false);

  // Load saved configurations
  useEffect(() => {
    const savedLogo = localStorage.getItem('perkins_publisher_logo_config');
    if (savedLogo) {
      try {
        setLogoConfig(JSON.parse(savedLogo));
      } catch (err) {
        setLogoConfig(ORIGINAL_LOGO_PRESET);
      }
    }
  }, []);

  // Add inquiry handler - strictly delivers to email via backend SMTP integration
  const handleAddNewInquiry = (data: {
    name: string;
    email: string;
    phone: string;
    genre: string;
    wordCount: number;
    services?: string[];
    estimatedPrice?: number;
    message?: string;
  }) => {
    const finalServices = data.services || (selectedServiceId ? [selectedServiceId] : ['publishing']);
    
    // Simple price estimator loop
    let calculatedEst = data.estimatedPrice;
    if (!calculatedEst) {
      calculatedEst = finalServices.length * 1500;
      if (data.wordCount > 60000) calculatedEst += 900;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      genre: data.genre,
      wordCount: data.wordCount,
      services: finalServices,
      status: 'New',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      estimatedPrice: calculatedEst,
      message: data.message
    };

    setIsSubmitting(true);

    fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry),
    })
      .then(async (res) => {
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.message || 'SMTP transmission failed');
        }
        return resData;
      })
      .then((resData) => {
        setIsSubmitting(false);
        showSuccessToast(
          resData.message || "Your inquiry has been successfully sent directly to our business email!",
          "Inquiry Delivered"
        );
        setModalSubmitted(true);
        setTimeout(() => {
          setModalSubmitted(false);
          setConsultationModalOpen(false);
          setModalName('');
          setModalEmail('');
          setModalPhone('');
          setModalMessage('');
        }, 4000);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error('❌ [Inquiry Delivery Failure]:', err);
        showWarningToast(
          err.message || "Email delivery failed. Please verify your connection or SMTP settings.",
          "Delivery Failed"
        );
      });
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalEmail || !modalPhone) return;

    handleAddNewInquiry({
      name: modalName,
      email: modalEmail,
      phone: modalPhone,
      genre: modalGenre,
      wordCount: modalWordCount,
      message: modalMessage,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f19] text-gray-100">
      
      {/* Navigation Header */}
      <Header
        logoConfig={logoConfig}
        onNavigate={setActivePage}
        activePage={activePage}
        onOpenConsultation={() => {
          setSelectedServiceId(undefined);
          setConsultationModalOpen(true);
        }}
      />

      {/* Main Client Replica Site */}
      <main className="flex-grow bg-white text-gray-800">
        
        {/* Hero Section with Quick Book estimate and checklist */}
        <Hero
          onSubmitInquiry={(data) => {
            handleAddNewInquiry({
              name: data.name,
              email: data.email,
              phone: data.phone,
              genre: data.genre,
              wordCount: data.wordCount,
              message: data.message
            });
          }}
          onOpenCalculator={() => {
            document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
            setActivePage('calculator');
          }}
        />

        {/* Times Square video trailer highlight panel */}
        <TimesSquareSection
          onOpenConsultation={() => {
            setSelectedServiceId(undefined);
            setConsultationModalOpen(true);
          }}
        />

        {/* Detailed services overview tab card stack */}
        <ServiceHub
          onOpenConsultation={(serviceId) => {
            setSelectedServiceId(serviceId);
            setConsultationModalOpen(true);
          }}
        />

        {/* Perkins vs Traditional comparative diagram block */}
        <CompareSection
          onOpenConsultation={() => {
            setSelectedServiceId(undefined);
            setConsultationModalOpen(true);
          }}
        />

        {/* Portfolio bestseller books showcase */}
        <BookSlider
          onOpenConsultation={() => {
            setSelectedServiceId(undefined);
            setConsultationModalOpen(true);
          }}
        />

        {/* Live investment pricing computation wizard */}
        <CostCalculator
          onSubmitInquiry={(calcData) => {
            handleAddNewInquiry({
              name: calcData.name,
              email: calcData.email,
              phone: calcData.phone,
              genre: calcData.genre,
              wordCount: calcData.wordCount,
              services: calcData.services,
              estimatedPrice: calcData.estimatedPrice
            });
          }}
        />

        {/* Success Stories Testimonials & FAQ Accordions */}
        <Testimonials
          onOpenConsultation={() => {
            setSelectedServiceId(undefined);
            setConsultationModalOpen(true);
          }}
        />

        {/* Author Insights Section with Curated SEO Content by Zhana Xuere */}
        <AuthorInsights
          onOpenConsultation={() => {
            setSelectedServiceId(undefined);
            setConsultationModalOpen(true);
          }}
        />

        {/* Interactive Bestseller Scorecard & Amazon SEO Keyword Matcher */}
        <LeadAuditScorecard
          onOpenInquiry={(subject) => {
            setSelectedServiceId(undefined);
            setModalMessage(`Submitting my automated Bestseller Scorecard results to Stephanie Weldon.\nStatus: ${subject}\nI would love to arrange a personalized publishing session.`);
            setConsultationModalOpen(true);
          }}
        />

      </main>

      {/* Brand Site Footer */}
      <Footer
        logoConfig={logoConfig}
        onNavigate={setActivePage}
      />

      {/* Free Quotation Proposal Modal Structure */}
      {consultationModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-3xl text-gray-900 border border-amber-500/10 text-left">
            
            {/* Modal Ribbon Header */}
            <div className="px-6 py-4.5 bg-gradient-to-r from-blue-950 to-indigo-950 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500 text-blue-950 p-1 rounded font-black">
                  <BookOpen size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase">Get Free Consultation</h3>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">PERKINS BESTSELLER ROADMAP</p>
                </div>
              </div>
              <button
                onClick={() => setConsultationModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal main content wrap */}
            <div className="p-6 sm:p-8">
              {modalSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200 text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-black text-blue-950">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-sm mx-auto">
                    Your estimated blueprint and manuscript draft specifications have been sent directly to Stephanie Weldon's business email. We will reach out to you shortly to arrange a personalized bestseller design session!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  
                  {selectedServiceId && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-center justify-between text-xs font-bold text-amber-800">
                      <span>🎯 Targeted Inquiry: {selectedServiceId.toUpperCase()} Component</span>
                      <span className="text-[9px] bg-amber-500 text-blue-950 py-0.5 px-2 rounded uppercase font-black">ACTIVE</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Author Name *</label>
                    <input
                      type="text"
                      required
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      placeholder="e.g. Elena Petrova"
                      className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder="elena@example.com"
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Phone Contact *</label>
                      <input
                        type="tel"
                        required
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        placeholder="+1 (212) 555-0199"
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Book Genre</label>
                      <select
                        value={modalGenre}
                        onChange={(e) => setModalGenre(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="fiction">Fiction Novel</option>
                        <option value="nonfiction">Non-Fiction Textbook</option>
                        <option value="scifi">Sci-Fi & Fantasy Adventure</option>
                        <option value="selfhelp">Self-Help & Business Manual</option>
                        <option value="memoir">Memoir / Family History</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex justify-between">
                        <span>Word Count</span>
                        <span className="text-amber-600 font-extrabold">{modalWordCount.toLocaleString()}</span>
                      </label>
                      <div className="pt-2">
                        <input
                          type="range"
                          min={5000}
                          max={120000}
                          step={5000}
                          value={modalWordCount}
                          onChange={(e) => setModalWordCount(parseInt(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Briefly Describe Your Story Ideas</label>
                    <textarea
                      value={modalMessage}
                      onChange={(e) => setModalMessage(e.target.value)}
                      placeholder="e.g. High fantasy adventure centering an ancient forgotten compass vault structure..."
                      className="w-full h-18 bg-gray-50 border border-gray-250 rounded-lg p-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-55 disabled:cursor-not-allowed text-blue-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-lg text-center cursor-pointer transition-all active:translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <span>Lock My Publishing Roadmap Consultation</span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}


    </div>
  );
}
