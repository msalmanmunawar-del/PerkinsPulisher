import { useState, useEffect, FormEvent } from 'react';
import { Inquiry, LogoConfig } from './types';
import Header from './components/Header';
import { ORIGINAL_LOGO_PRESET } from './components/LogoSandbox';
import Hero from './components/Hero';
import TimesSquareSection from './components/TimesSquareSection';
import ServiceHub from './components/ServiceHub';
import CompareSection from './components/CompareSection';
import BookSlider from './components/BookSlider';
import Testimonials from './components/Testimonials';
import AuthorInsights from './components/AuthorInsights';
import LeadAuditScorecard from './components/LeadAuditScorecard';
import Footer from './components/Footer';
import { useToast } from './components/Toast';
import SEO from './components/SEO';
import DynamicServicePage from './components/DynamicServicePage';
import DynamicIndustryPage from './components/DynamicIndustryPage';
import KnowledgeHub from './components/KnowledgeHub';

import { X, CheckCircle, Sparkles, Phone, Award, BookOpen, Loader2 } from 'lucide-react';

const MODAL_TRANSLATIONS = {
  en: {
    title: "Get Free Consultation",
    subtitle: "PERKINS BESTSELLER ROADMAP",
    targetedInquiry: "Targeted Inquiry: {id} Component",
    activeStatus: "ACTIVE",
    authorNameLabel: "Author Name *",
    authorNamePlaceholder: "e.g. Elena Petrova",
    emailLabel: "Email Address *",
    emailPlaceholder: "elena@example.com",
    phoneLabel: "Phone Contact *",
    phonePlaceholder: "+1 (212) 555-0199",
    genreLabel: "Book Genre",
    genres: {
      fiction: "Fiction Novel",
      nonfiction: "Non-Fiction Textbook",
      scifi: "Sci-Fi & Fantasy Adventure",
      selfhelp: "Self-Help & Business Manual",
      memoir: "Memoir / Family History"
    },
    wordCountLabel: "Word Count",
    describeLabel: "Briefly Describe Your Story Ideas",
    describePlaceholder: "e.g. High fantasy adventure centering an ancient forgotten compass vault structure...",
    submitting: "Transmitting Inquiry...",
    submitBtn: "Lock My Publishing Roadmap Consultation",
    successTitle: "Inquiry Sent Successfully!",
    successMessage: "Your estimated blueprint and manuscript draft specifications have been sent directly to Stephanie Weldon's business email. We will reach out to you shortly to arrange a personalized bestseller design session!"
  },
  es: {
    title: "Obtener consulta gratuita",
    subtitle: "PLAN DE BESTSELLER PERKINS",
    targetedInquiry: "Consulta dirigida: Componente {id}",
    activeStatus: "ACTIVO",
    authorNameLabel: "Nombre del autor *",
    authorNamePlaceholder: "ej. Elena Petrova",
    emailLabel: "Correo electrónico *",
    emailPlaceholder: "elena@ejemplo.com",
    phoneLabel: "Teléfono de contacto *",
    phonePlaceholder: "+1 (212) 555-0199",
    genreLabel: "Género del libro",
    genres: {
      fiction: "Novela de ficción",
      nonfiction: "Libro de no ficción",
      scifi: "Aventura de ciencia ficción y fantasía",
      selfhelp: "Manual de autoayuda y negocios",
      memoir: "Memorias / Historia familiar"
    },
    wordCountLabel: "Número de palabras",
    describeLabel: "Describa brevemente sus ideas para la historia",
    describePlaceholder: "ej. Una aventura de alta fantasía centrada en una antigua estructura de bóveda de brújula olvidada...",
    submitting: "Transmitiendo consulta...",
    submitBtn: "Reservar mi consulta del plan editorial",
    successTitle: "¡Consulta enviada con éxito!",
    successMessage: "Las especificaciones estimadas de su manuscrito y plan de bestseller se han enviado directamente al correo electrónico de Stephanie Weldon. ¡Nos pondremos en contacto con usted en breve para programar una sesión personalizada de diseño de bestseller!"
  }
};

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
  const [modalLang, setModalLang] = useState<'en' | 'es'>('en');

  const t = MODAL_TRANSLATIONS[modalLang];

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
      
      {/* Dynamic SEO Tag Injector */}
      <SEO activePage={activePage} />

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
        
        {activePage === 'home' && (
          <>
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
              onOpenScorecard={() => {
                const element = document.getElementById('seo-scorecard');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
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
          </>
        )}

        {activePage.startsWith('service-') && (
          <DynamicServicePage
            serviceId={activePage.replace('service-', '')}
            onOpenConsultation={() => {
              setSelectedServiceId(activePage);
              setConsultationModalOpen(true);
            }}
            onNavigate={setActivePage}
          />
        )}

        {activePage.startsWith('industry-') && (
          <DynamicIndustryPage
            industryId={activePage.replace('industry-', '')}
            onOpenConsultation={() => {
              setSelectedServiceId(activePage);
              setConsultationModalOpen(true);
            }}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'knowledge-hub' && (
          <KnowledgeHub
            onNavigate={setActivePage}
            onOpenConsultation={() => {
              setSelectedServiceId(undefined);
              setConsultationModalOpen(true);
            }}
          />
        )}

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
                  <h3 className="text-sm font-black uppercase">{t.title}</h3>
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <div className="flex bg-slate-900/80 p-0.5 rounded-full border border-white/10 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setModalLang('en')}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      modalLang === 'en'
                        ? 'bg-amber-500 text-blue-950 font-black'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalLang('es')}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      modalLang === 'es'
                        ? 'bg-amber-500 text-blue-950 font-black'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ES
                  </button>
                </div>

                <button
                  onClick={() => setConsultationModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal main content wrap */}
            <div className="p-6 sm:p-8">
              {modalSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-scaleUp">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200 text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-black text-blue-950">{t.successTitle}</h4>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-sm mx-auto">
                    {t.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  
                  {selectedServiceId && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-center justify-between text-xs font-bold text-amber-800">
                      <span>🎯 {t.targetedInquiry.replace('{id}', selectedServiceId.toUpperCase())}</span>
                      <span className="text-[9px] bg-amber-500 text-blue-950 py-0.5 px-2 rounded uppercase font-black">{t.activeStatus}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.authorNameLabel}</label>
                    <input
                      type="text"
                      required
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      placeholder={t.authorNamePlaceholder}
                      className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.emailLabel}</label>
                      <input
                        type="email"
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.phoneLabel}</label>
                      <input
                        type="tel"
                        required
                        value={modalPhone}
                        onChange={(e) => setModalPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.genreLabel}</label>
                      <select
                        value={modalGenre}
                        onChange={(e) => setModalGenre(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-250 rounded-lg px-3 py-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="fiction">{t.genres.fiction}</option>
                        <option value="nonfiction">{t.genres.nonfiction}</option>
                        <option value="scifi">{t.genres.scifi}</option>
                        <option value="selfhelp">{t.genres.selfhelp}</option>
                        <option value="memoir">{t.genres.memoir}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex justify-between">
                        <span>{t.wordCountLabel}</span>
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
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.describeLabel}</label>
                    <textarea
                      value={modalMessage}
                      onChange={(e) => setModalMessage(e.target.value)}
                      placeholder={t.describePlaceholder}
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
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <span>{t.submitBtn}</span>
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
