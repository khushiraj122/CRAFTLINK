'use client';
import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-bottom-4 duration-200"
            style={{
              background: isError ? 'rgba(20, 5, 5, 0.95)' : 'var(--bg-elevated)',
              borderColor: isSuccess
                ? 'var(--accent-primary)'
                : isError
                ? '#ef4444'
                : 'var(--border-medium)',
              backdropFilter: 'blur(16px)',
              boxShadow: isSuccess
                ? '0 8px 32px rgba(0,0,0,0.5), 0 0 20px var(--accent-glow)'
                : '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--text-primary)' }}
              >
                {toast.title}
              </p>
              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded-lg transition-colors"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
