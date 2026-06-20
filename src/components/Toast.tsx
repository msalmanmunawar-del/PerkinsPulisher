import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warn: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toastInput: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      ...toastInput,
      id,
      duration: toastInput.duration ?? 5000,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (message: string, title?: string) => showToast({ type: 'success', message, title });
  const error = (message: string, title?: string) => showToast({ type: 'error', message, title });
  const warn = (message: string, title?: string) => showToast({ type: 'warning', message, title });
  const info = (message: string, title?: string) => showToast({ type: 'info', message, title });

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast, success, error, warn, info }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div 
      id="toast-notifications-root"
      className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 min-w-[320px] max-w-[420px] pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 5000;

  useEffect(() => {
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const stepSize = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onDismiss(toast.id);
          return 0;
        }
        return prev - stepSize;
      });
    }, intervalTime);

    // Initial timeout as safety backup
    const backupTimeout = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(backupTimeout);
    };
  }, [duration, toast.id, onDismiss]);

  const styleConfig = {
    success: {
      bg: 'bg-white border-blue-950/20 text-blue-950',
      progressBar: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      iconColor: 'text-emerald-500 bg-emerald-50',
      icon: <CheckCircle className="w-5 h-5" />,
      tag: 'Success'
    },
    warning: {
      bg: 'bg-white border-blue-950/20 text-blue-950',
      progressBar: 'bg-gradient-to-r from-amber-500 to-amber-600',
      iconColor: 'text-amber-500 bg-amber-50',
      icon: <AlertTriangle className="w-5 h-5" />,
      tag: 'Attention'
    },
    error: {
      bg: 'bg-white border-blue-950/20 text-blue-950',
      progressBar: 'bg-gradient-to-r from-rose-500 to-rose-600',
      iconColor: 'text-rose-500 bg-rose-50',
      icon: <XCircle className="w-5 h-5" />,
      tag: 'Error'
    },
    info: {
      bg: 'bg-white border-blue-950/20 text-blue-950',
      progressBar: 'bg-gradient-to-r from-blue-500 to-blue-600',
      iconColor: 'text-blue-500 bg-blue-50',
      icon: <Info className="w-5 h-5" />,
      tag: 'Notice'
    }
  }[toast.type];

  return (
    <div
      onClick={() => onDismiss(toast.id)}
      className={`group pointer-events-auto flex flex-col w-full ${styleConfig.bg} rounded-2xl border shadow-xl relative overflow-hidden transform transition-all duration-300 ease-out hover:scale-102 hover:shadow-2xl cursor-pointer select-none animate-slideInRight`}
    >
      {/* Upper content row */}
      <div className="flex gap-3.5 p-4 items-start">
        {/* Styled icon wrap */}
        <div className={`p-2 rounded-xl shrink-0 ${styleConfig.iconColor} border border-black/5 flex items-center justify-center`}>
          {styleConfig.icon}
        </div>

        {/* Text Area */}
        <div className="flex-grow space-y-0.5 text-left pr-2">
          {toast.title ? (
            <h4 className="text-xs font-black tracking-tight text-blue-950">{toast.title}</h4>
          ) : (
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400">{styleConfig.tag} Notification</span>
          )}
          <p className="text-[11px] leading-relaxed font-bold text-slate-600">{toast.message}</p>
        </div>

        {/* Manual Dismiss button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(toast.id);
          }}
          className="text-slate-350 hover:text-slate-600 transition-colors pt-0.5 shrink-0"
          aria-label="Dismiss Alert"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic linear countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
        <div 
          className={`h-full ${styleConfig.progressBar} transition-all duration-75`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
