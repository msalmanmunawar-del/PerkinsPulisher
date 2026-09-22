import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Phone, 
  Globe, 
  CheckCheck, 
  ChevronRight,
  Flame,
  Clock,
  ShieldCheck,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
  options?: { label: string; action: string }[];
}

interface LiveChatWidgetProps {
  onOpenConsultation?: () => void;
}

const PRIMARY_PHONE = '+1 (803) 346-3495';
const WHATSAPP_URL = 'https://wa.me/18033463495?text=Hello%20Perkins%20Publisher%2C%20I%20am%20inquiring%20about%20publishing%20my%20book.';

export default function LiveChatWidget({ onOpenConsultation }: LiveChatWidgetProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'livechat' | 'whatsapp'>('livechat');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'agent',
        text: 'Hello! 👋 Welcome to Perkins Publisher. I am Stephanie from our Senior Editorial Desk.',
        time: 'Just now'
      },
      {
        id: 'welcome-2',
        sender: 'agent',
        text: 'Are you planning to publish a new manuscript, or would you like details on our subsidized €499 All-Inclusive Package?',
        time: 'Just now',
        options: [
          { label: '🔥 Claim €499 Package (74% OFF)', action: 'promo' },
          { label: '📖 Royalties & Rights Policy', action: 'royalties' },
          { label: '⏱️ Publishing Timelines', action: 'timeline' },
          { label: '📱 Switch to WhatsApp', action: 'whatsapp' },
          { label: '📞 Speak with an Editor', action: 'call' }
        ]
      }
    ];
  });
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnreadCount(0);
    }
  }, [messages, isChatOpen]);

  // Listen for global open-live-chat custom events from header or buttons
  useEffect(() => {
    const handleOpenLiveChat = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsChatOpen(true);
      setActiveTab('livechat');
      if (customEvent.detail?.initialMessage) {
        addUserMessage(customEvent.detail.initialMessage);
      }
    };

    window.addEventListener('open-live-chat', handleOpenLiveChat);
    return () => window.removeEventListener('open-live-chat', handleOpenLiveChat);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;
    setInputVal('');
    addUserMessage(text);
  };

  const addUserMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, newMsg]);

    // Generate intelligent contextual response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateAgentReply(text);
      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 900);
  };

  const handleOptionClick = (option: { label: string; action: string }) => {
    if (option.action === 'whatsapp') {
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    if (option.action === 'call') {
      window.location.href = 'tel:18033463495';
      return;
    }
    if (option.action === 'consultation' && onOpenConsultation) {
      onOpenConsultation();
      return;
    }
    handleSendMessage(option.label);
  };

  const generateAgentReply = (userText: string): ChatMessage => {
    const lower = userText.toLowerCase();

    if (lower.includes('499') || lower.includes('promo') || lower.includes('package') || lower.includes('offer') || lower.includes('discount')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: 'Our €499 Flash Package (subsidized from €1,899) includes custom 3D cover design, comprehensive interior typesetting, full line editing, 3 standard formats (eBook, paperback, dust jacket hardcover), and distribution across 100+ global retailers including Amazon, Barnes & Noble, Ingram, and Apple Books.',
        time: getCurrentTime(),
        options: [
          { label: 'Claim This €499 Deal Now', action: 'consultation' },
          { label: 'Chat with Editor on WhatsApp', action: 'whatsapp' },
          { label: 'Ask About Royalties', action: 'royalties' }
        ]
      };
    }

    if (lower.includes('royalt') || lower.includes('right') || lower.includes('ownership') || lower.includes('keep')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: 'At Perkins Publisher, you retain 100% of your royalties and 100% of your intellectual property rights. We never take any percentage of your book sales. Payouts go directly to your designated bank account.',
        time: getCurrentTime(),
        options: [
          { label: '🔥 Lock in €499 Package', action: 'promo' },
          { label: 'Speak with Senior Editor', action: 'call' },
          { label: 'Message on WhatsApp', action: 'whatsapp' }
        ]
      };
    }

    if (lower.includes('timeline') || lower.includes('how long') || lower.includes('weeks') || lower.includes('time')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: 'Standard turnkey publishing takes between 3 to 5 weeks from approved final manuscript to live retail distribution. We also offer an express 14-day delivery sprint if you have an urgent book launch deadline.',
        time: getCurrentTime(),
        options: [
          { label: 'Request Timeline Review', action: 'consultation' },
          { label: 'Chat on WhatsApp', action: 'whatsapp' }
        ]
      };
    }

    if (lower.includes('ghostwriting') || lower.includes('write my book') || lower.includes('author')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: 'Our professional ghostwriting service pairs you with a bestselling author in your exact genre. We conduct structured interview sessions, outline your chapters, and write a ready-to-publish 50,000 to 80,000-word book while keeping 100% author confidentiality.',
        time: getCurrentTime(),
        options: [
          { label: 'Discuss Ghostwriting Project', action: 'consultation' },
          { label: 'WhatsApp Intake Desk', action: 'whatsapp' }
        ]
      };
    }

    if (lower.includes('call') || lower.includes('phone') || lower.includes('number') || lower.includes('contact')) {
      return {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: `You can reach our global intake desk directly at ${PRIMARY_PHONE}. Our senior publishing coordinators are available 24/7 for author consultations. Or, message us immediately on WhatsApp!`,
        time: getCurrentTime(),
        options: [
          { label: 'Call +1 (803) 346-3495 Now', action: 'call' },
          { label: 'Start WhatsApp Chat', action: 'whatsapp' }
        ]
      };
    }

    // Default friendly assistant response
    return {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      text: 'Thank you for sharing that! Our editorial director can provide an exact manuscript review and custom proposal tailored to your goals. Would you like to reserve the subsidized €499 package, or chat with us on WhatsApp for instant manuscript review?',
      time: getCurrentTime(),
      options: [
        { label: 'Claim €499 Package', action: 'consultation' },
        { label: 'Chat on WhatsApp (+1 803 346-3495)', action: 'whatsapp' },
        { label: 'Call Direct Line', action: 'call' }
      ]
    };
  };

  return (
    <aside 
      aria-label="Author Support & Live Chat"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none"
    >
      
      {/* Active Live Chat / WhatsApp Window */}
      {isChatOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] h-[540px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scaleUp transition-all duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white p-4 relative shrink-0">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-black text-lg">
                    P
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-blue-950"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-sm text-white tracking-tight">Perkins Live Chat</h3>
                    <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase">
                      Active
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <span>Editorial Intake Desk • Typically replies in &lt; 1 min</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize chat"
                  aria-label="Minimize chat"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Dual Channel Switcher: Live Web Chat vs. WhatsApp */}
            <div className="grid grid-cols-2 gap-1.5 mt-2.5 bg-black/25 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('livechat')}
                className={`py-1.5 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'livechat'
                    ? 'bg-amber-500 text-blue-950 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <MessageSquare size={13} />
                <span>Live Web Chat</span>
              </button>
              <button
                onClick={() => {
                  window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
                }}
                className="py-1.5 px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 text-white hover:bg-[#25D366] hover:text-slate-950 cursor-pointer group"
                title="Launch WhatsApp directly"
              >
                <MessageCircle size={13} className="text-[#25D366] group-hover:text-slate-950 fill-current" />
                <span>WhatsApp.me</span>
              </button>
            </div>
          </div>

          {/* Quick Offer Flash Alert */}
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-amber-950 shrink-0">
            <span className="font-black flex items-center gap-1">
              <Flame size={13} className="text-amber-600 fill-amber-600 animate-pulse" />
              <span>€499 Complete Package (74% OFF)</span>
            </span>
            <button
              onClick={() => {
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="font-bold underline text-amber-900 hover:text-amber-950 cursor-pointer"
            >
              Claim &rarr;
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-950 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {/* Interactive Option Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Quick actions:
                      </span>
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="w-full text-left p-2 rounded-xl text-[11px] font-bold bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-blue-950 border border-slate-200 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                        >
                          <span className="truncate">{opt.label}</span>
                          <ChevronRight size={12} className="text-slate-400 group-hover:text-amber-600 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9.5px] text-slate-400 font-bold px-1.5 mt-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl rounded-tl-xs border border-slate-200 shadow-2xs w-20">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100"></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about publishing, pricing, royalties..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-blue-950 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                title="Send message"
              >
                <Send size={15} />
              </button>
            </form>

            {/* Quick Contacts strip */}
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-semibold px-0.5">
              <a href="tel:18033463495" className="hover:text-blue-950 flex items-center gap-1">
                <Globe size={11} className="text-blue-950" />
                <span>+1 (803) 346-3495</span>
              </a>
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-bold"
              >
                <MessageCircle size={11} className="fill-emerald-700" />
                <span>WhatsApp.me</span>
              </a>
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Trigger Dock (Dual: Live Web Chat + WhatsApp) */}
      <div className="flex items-center gap-2.5">
        
        {/* WhatsApp Quick Button (Green) */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Direct WhatsApp (+1 803 346-3495)"
          aria-label="Direct WhatsApp Support"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-0" />
          <MessageCircle size={24} className="fill-white text-[#25D366] group-hover:scale-110 transition-transform" />
          
          {/* Tooltip on hover */}
          <span className="hidden sm:group-hover:block absolute right-full mr-2.5 bg-slate-900 text-white text-[11px] font-black px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md pointer-events-none">
            WhatsApp
          </span>
        </a>

        {/* Live Chat Main Button (Navy / Amber with Online Indicator) */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-expanded={isChatOpen}
          aria-label={isChatOpen ? "Close Live Chat" : "Open Live Chat with Perkins Publisher"}
          className={`group relative flex items-center gap-2 px-4 py-3 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border ${
            isChatOpen
              ? 'bg-slate-900 border-slate-700 text-white'
              : 'bg-gradient-to-r from-blue-950 via-[#0d223a] to-blue-900 border-amber-400/40 text-white shadow-blue-950/40'
          }`}
          title="Open Live Chat Support"
        >
          {isChatOpen ? (
            <>
              <X size={20} className="text-white" />
              <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Close</span>
            </>
          ) : (
            <>
              <div className="relative">
                <MessageSquare size={19} className="text-amber-400 fill-amber-400/20" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-950 animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs font-black tracking-wide text-white flex items-center gap-1.5">
                  <span>Live Chat</span>
                  <span className="text-[9px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.2 rounded-full uppercase">
                    Online
                  </span>
                </span>
                <span className="text-[9.5px] text-slate-300 font-medium hidden sm:inline">
                  Editorial Desk
                </span>
              </div>
            </>
          )}

          {/* Unread message badge */}
          {!isChatOpen && unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-blue-950 font-black text-[10px] flex items-center justify-center border-2 border-white shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

      </div>

    </aside>
  );
}
