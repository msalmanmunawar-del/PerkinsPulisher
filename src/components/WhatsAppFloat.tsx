import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCheck, Phone, Globe } from 'lucide-react';

interface WhatsAppFloatProps {
  onOpenConsultation?: () => void;
}

export default function WhatsAppFloat({ onOpenConsultation }: WhatsAppFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('I want to publish my book with Perkins Publisher');

  useEffect(() => {
    const handleOpenWhatsApp = () => {
      setIsOpen(true);
    };

    const handleOpenLiveChat = () => {
      if (typeof (window as any).Tawk_API?.maximize === 'function') {
        (window as any).Tawk_API.maximize();
      } else if (typeof (window as any).Tawk_API?.toggle === 'function') {
        (window as any).Tawk_API.toggle();
      }
    };

    window.addEventListener('open-whatsapp', handleOpenWhatsApp);
    window.addEventListener('open-live-chat', handleOpenLiveChat);
    return () => {
      window.removeEventListener('open-whatsapp', handleOpenWhatsApp);
      window.removeEventListener('open-live-chat', handleOpenLiveChat);
    };
  }, []);

  const primaryNumber = '18033463495'; // US / International Direct Line
  const maltaNumber = '35699444044'; // Malta / EU Local Desk

  const topics = [
    { label: '📖 Publish a Book', text: 'Hello Perkins Publisher, I would like to inquire about publishing my book.' },
    { label: '🔥 Claim €499 Offer', text: 'Hello, I would like to claim the €499 All-Inclusive Publishing Package for my manuscript.' },
    { label: '✍️ Ghostwriting', text: 'Hello, I am looking for professional ghostwriting services for my upcoming book.' },
    { label: '💰 Custom Quote', text: 'Hello, I would like to request an editorial review and custom publishing quote.' },
  ];

  const handleLaunchWhatsApp = (customText?: string, desk: 'primary' | 'malta' = 'primary') => {
    const textToSend = customText || selectedTopic;
    const targetNumber = desk === 'malta' ? maltaNumber : primaryNumber;
    const encodedText = encodeURIComponent(textToSend);
    const url = `https://wa.me/${targetNumber}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside 
      aria-label="WhatsApp Support"
      className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start select-none"
    >
      
      {/* Expandable Chat Flyout Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp origin-bottom-left transition-all duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white font-serif font-black text-lg">
                  P
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#075E54] shadow-xs"></span>
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm text-white tracking-tight">Perkins Publisher</h3>
                  <Sparkles size={12} className="text-amber-300" />
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  <span>Online • Editorial Intake Desk</span>
                </p>
              </div>
            </div>
            <p className="text-[10px] text-white/80 mt-2 font-medium">
              Typically replies in under 5 minutes • Direct 24/7 Author Assistance
            </p>
          </div>

          {/* Chat Bubble Body */}
          <div className="p-4 bg-slate-50 space-y-3.5">
            <div className="bg-white rounded-2xl p-3.5 rounded-tl-xs border border-slate-200/80 shadow-xs max-w-[92%] space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                <span>Editorial Advisory</span>
                <span className="flex items-center gap-0.5 text-blue-500">
                  <CheckCheck size={13} />
                </span>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Hello! 👋 Welcome to <strong className="text-blue-950 font-bold">Perkins Publisher</strong>. 
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">
                Connect directly with our senior publishing team on WhatsApp for immediate manuscript intake, custom quotes, or to claim our subsidized <strong className="text-amber-600 font-bold">€499 package</strong>.
              </p>
            </div>

            {/* Quick Topic Prompts */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                Select your inquiry:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {topics.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTopic(item.text);
                      handleLaunchWhatsApp(item.text);
                    }}
                    className="text-left p-2 rounded-xl text-[11px] font-bold bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs cursor-pointer truncate"
                    title={item.text}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleLaunchWhatsApp()}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle size={16} className="fill-white" />
              <span>Start WhatsApp Chat Now</span>
              <Send size={14} className="ml-1" />
            </button>

            {/* Calling Desks Footer */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10.5px] text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <Globe size={11} className="text-blue-950" />
                <span className="font-mono font-bold text-slate-700">+1 (803) 346-3495</span>
              </div>
              <button
                onClick={() => handleLaunchWhatsApp('Hello, I am contacting the Malta registered desk regarding European publishing.', 'malta')}
                className="text-[10px] text-slate-500 hover:text-emerald-700 underline font-semibold cursor-pointer"
              >
                Malta Desk WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Floating Trigger Button (Bottom-Left) */}
      <div className="flex items-center gap-2.5 flex-row">
        
        {/* Big Circular WhatsApp Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white shadow-2xl shadow-emerald-600/40 flex items-center justify-center transition-all duration-300 cursor-pointer group"
          title="Direct WhatsApp with Perkins Publisher (+1 803 346-3495)"
        >
          {/* Subtle Outer Pulsing Wave */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none group-hover:opacity-0" />
          
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <>
              <MessageCircle size={28} className="fill-white text-[#25D366] group-hover:scale-110 transition-transform" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-white shadow-sm">
                1
              </span>
            </>
          )}
        </button>

        {/* Tooltip Pill (Prompts user to the right of the button) */}
        {!isOpen && (
          <div 
            onClick={() => handleLaunchWhatsApp()}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-xs py-2 px-3.5 rounded-full shadow-lg border border-slate-200 cursor-pointer hover:border-emerald-300 hover:shadow-xl transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping shrink-0" />
            <span className="text-xs font-black text-slate-800 group-hover:text-emerald-700 transition-colors">
              Chat on WhatsApp
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded-full">
              Online
            </span>
          </div>
        )}

      </div>

    </aside>
  );
}
