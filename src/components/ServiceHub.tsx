import { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { 
  PenTool, BookOpen, CheckSquare, Sparkles, TrendingUp, Mic, Palette,
  Clock, Award, Gift, ChevronRight, HelpCircle, CheckCircle, MessageSquare
} from 'lucide-react';

interface ServiceHubProps {
  onOpenConsultation: (serviceId?: string) => void;
}

export default function ServiceHub({ onOpenConsultation }: ServiceHubProps) {
  const [activeTab, setActiveTab] = useState<string>('publishing');

  const getIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'PenTool': return <PenTool size={size} />;
      case 'CheckSquare': return <CheckSquare size={size} />;
      case 'Sparkles': return <Sparkles size={size} />;
      case 'TrendingUp': return <TrendingUp size={size} />;
      case 'Mic': return <Mic size={size} />;
      case 'Palette': return <Palette size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  const activeService = SERVICES.find(s => s.id === activeTab) || SERVICES[0];

  return (
    <section id="services" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full inline-block">
            WHAT WE EXCELLENTLY DO
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Comprehensive Book Publishing & Creative Services
          </h2>
          <p className="text-sm text-gray-500 font-bold">
            We operate as a full-service literary house. Whether you have a sketchy raw design or a pristine 100,000-word draft, we help you master the craft.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-12">
          {SERVICES.map((serv) => {
            const isSelected = serv.id === activeTab;
            return (
              <button
                key={serv.id}
                onClick={() => setActiveTab(serv.id)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-lg scale-105'
                    : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 ${isSelected ? 'text-amber-400 bg-white/10' : 'text-blue-900 bg-blue-50'}`}>
                  {getIcon(serv.iconName, 18)}
                </div>
                <span className="text-[10px] font-black tracking-tight uppercase line-clamp-2">
                  {serv.title.split(' ')[0]} {serv.title.split(' ')[1] || ''}
                </span>
                {isSelected && (
                  <span className="text-[9px] bg-amber-500 text-blue-950 px-1.5 py-0.2 rounded font-extrabold mt-1">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Service Detailed Grid Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100/80 animate-fadeIn">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Visual accent & Core Information */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-amber-100 text-amber-800 text-xs font-black uppercase px-3.5 py-1.5 rounded-lg flex items-center gap-1">
                  <Clock size={12} />
                  <span>Avg Timeline: {activeService.timeline}</span>
                </span>
                <span className="bg-blue-900 text-amber-400 text-xs font-black uppercase px-3.5 py-1.5 rounded-lg">
                  Est from ${activeService.startingPrice}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 leading-tight">
                {activeService.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                {activeService.description}
              </p>

              {/* Unique selling benefits checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest">
                  Key Strategic Benefits:
                </h4>
                {activeService.benefits.map((bText, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <CheckCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                    <span className="text-xs font-bold text-gray-700">{bText}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Key Deliverables & CTA Launcher */}
            <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                PROMISED DELIVERABLES INCLUDE
              </h4>
              
              <ul className="space-y-3">
                {activeService.deliverables.map((deliv, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs font-bold text-gray-700">
                    <ChevronRight size={14} className="text-blue-900 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-900/5 p-4 rounded-xl border border-blue-900/10 mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Gift size={15} className="text-amber-500" />
                  <span className="text-[11px] font-black text-blue-950 uppercase tracking-wider">
                    BONUS METADATA SETUP
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                  Every package includes assistance setting up keywords, pricing tiers, copyright paperwork forms, and retail categories free.
                </p>
              </div>

              <button
                id={`cta-inquiry-${activeService.id}`}
                onClick={() => onOpenConsultation(activeService.id)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-black text-xs uppercase tracking-wider py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all mt-6 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageSquare size={13} />
                <span>Begin {activeService.title.split(' ')[0]} Inquiry</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
