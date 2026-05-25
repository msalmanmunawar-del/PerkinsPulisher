import { useState, FormEvent } from 'react';
import { Inquiry } from '../types';
import { SERVICES } from '../data';
import { 
  Users, CheckCircle2, AlertCircle, Trash2, Mail, Phone, Calendar, Filter, Send, Download, Sparkles, Database 
} from 'lucide-react';

interface InquiryConsoleProps {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, newStatus: Inquiry['status']) => void;
  onDeleteInquiry: (id: string) => void;
  onInjectSample: () => void;
}

export default function InquiryConsole({
  inquiries,
  onUpdateStatus,
  onDeleteInquiry,
  onInjectSample,
}: InquiryConsoleProps) {
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [emailText, setEmailText] = useState<string>('');
  const [emailSuccess, setEmailSuccess] = useState<boolean>(false);

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeFilter === 'all') return true;
    return inq.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const selectedInquiry = inquiries.find((i) => i.id === selectedInquiryId);

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!emailText) return;
    
    setEmailSuccess(true);
    setTimeout(() => {
      setEmailSuccess(false);
      setEmailText('');
    }, 3000);
  };

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Reviewing': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'In Contact': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Contract Sent': return 'bg-green-50 text-green-800 border-green-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  return (
    <section className="py-12 bg-slate-900 text-white border-b-4 border-amber-500 animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 px-2.5 py-1 rounded inline-flex items-center gap-1.5">
              <Database size={11} />
              <span>Publisher Administration Console</span>
            </span>
            <h2 className="text-2xl font-black text-white">Inquiry CRM Workstation</h2>
            <p className="text-xs text-slate-400 font-bold">Monitor incoming author quote computations, change lead statuses, and draft bestseller proposal agreements.</p>
          </div>
          <button
            onClick={onInjectSample}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-blue-950 text-xs font-black uppercase px-4 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Inject Test Lead</span>
          </button>
        </div>

        {/* Lead Panel Grid Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Leads list */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
            
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap gap-2 items-center justify-between">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users size={14} />
                <span>Author Leads ({filteredInquiries.length})</span>
              </span>
              
              {/* Dropdown status filtration */}
              <div className="flex gap-1">
                {(['all', 'New', 'Reviewing', 'In Contact', 'Contract Sent'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setActiveFilter(st)}
                    className={`text-[9px] font-black uppercase px-2 py-1 rounded transition-colors cursor-pointer ${
                      activeFilter === st
                        ? 'bg-amber-500 text-blue-950'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="py-20 text-center space-y-2 text-slate-500">
                <AlertCircle className="mx-auto" size={24} />
                <p className="text-xs font-bold uppercase tracking-widest">No author submissions located in this segment</p>
                <p className="text-[10px]">Use the calculator or submission forms above to generate inquiries instantly!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800 max-h-[450px] overflow-y-auto">
                {filteredInquiries.map((inq) => {
                  const srvTitleList = inq.services.map(sid => {
                    const found = SERVICES.find(s => s.id === sid);
                    return found ? found.title.split(' ')[0] : sid;
                  }).join(', ');

                  const isSelected = selectedInquiryId === inq.id;

                  return (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiryId(inq.id)}
                      className={`p-4 transition-colors cursor-pointer text-left flex justify-between items-center ${
                        isSelected ? 'bg-slate-800/80' : 'hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-white">{inq.name}</h4>
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded border ${getStatusColor(inq.status)}`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold italic truncate max-w-xs">{inq.email} • {inq.phone}</p>
                        <p className="text-[9px] text-amber-500 font-bold uppercase">Specs: {inq.wordCount.toLocaleString()} words ({srvTitleList})</p>
                      </div>

                      <div className="text-right space-y-1.5 shrink-0">
                        <span className="text-sm font-black text-amber-400">${inq.estimatedPrice.toLocaleString()}</span>
                        <p className="text-[8px] text-slate-500 font-bold uppercase">{inq.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Block: Lead Details and Actions Form */}
          <div className="lg:col-span-5">
            {selectedInquiry ? (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 animate-fadeIn text-left">
                
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase">LEAD SPECS BOARD</span>
                    <h3 className="text-lg font-black text-amber-400 leading-tight">{selectedInquiry.name}</h3>
                    <p className="text-xs font-bold text-gray-400 mb-1">{selectedInquiry.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onDeleteInquiry(selectedInquiry.id);
                      setSelectedInquiryId(null);
                    }}
                    className="text-slate-500 hover:text-red-400 p-2 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                    title="Delete Inqury"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Specific Specs Details Block */}
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-0.5">
                    <span className="text-[9px] text-slate-500 tracking-wider font-extrabold uppercase">WORD COUNT</span>
                    <p className="text-white font-black">{selectedInquiry.wordCount.toLocaleString()} words</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-0.5">
                    <span className="text-[9px] text-slate-500 tracking-wider font-extrabold uppercase">EST. INVESTMENT</span>
                    <p className="text-amber-400 font-black">${selectedInquiry.estimatedPrice.toLocaleString()}</p>
                  </div>
                </div>

                {/* Status Updater Radio button list */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Update Pipeline Status:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['New', 'Reviewing', 'In Contact', 'Contract Sent'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => onUpdateStatus(selectedInquiry.id, st)}
                        className={`text-[9px] font-black uppercase px-2.5 py-1 rounded transition-all cursor-pointer border ${
                          selectedInquiry.status === st
                            ? 'bg-amber-500 text-blue-950 border-amber-600 font-extrabold shadow-sm'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick simulated communication box */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block flex items-center gap-1">
                    <Mail size={12} />
                    <span>Send CRM Proposal Package Draft</span>
                  </span>

                  {emailSuccess ? (
                    <div className="py-4 text-center text-xs text-green-400 font-black flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>Simulated Proposal Sent to {selectedInquiry.name}!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendEmail} className="space-y-3">
                      <textarea
                        required
                        value={emailText}
                        onChange={(e) => setEmailText(e.target.value)}
                        placeholder={`Dear ${selectedInquiry.name.split(' ')[0]}, we reviewed your manuscript draft spec calculations, and here is our official Perkins bestseller proposal plan...`}
                        className="w-full h-24 bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs font-bold text-gray-100 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-600 font-mono"
                      ></textarea>
                      <button
                        type="submit"
                        className="w-full bg-blue-900 hover:bg-blue-950 text-white font-extrabold text-[10px] uppercase py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow border border-blue-900/10"
                      >
                        <Send size={11} />
                        <span>Send Simulated Author Email</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-slate-950 p-12 rounded-2xl border border-slate-800 text-center text-slate-500 space-y-2 text-xs">
                <AlertCircle className="mx-auto" size={24} />
                <p className="font-bold uppercase tracking-widest text-slate-400">No Author lead is selected</p>
                <p>Click on an incoming row from the left side panel list to view full options, update pipeline milestones, or launch draft agreements.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
