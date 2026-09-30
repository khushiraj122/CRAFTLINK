'use client';
import React from 'react';
import { PortfolioItem } from '@/types';
import { X, ExternalLink, Play, Code2, Sparkles, Film, CheckCircle2 } from 'lucide-react';

interface PortfolioLightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onHireCreator?: () => void;
}

export const PortfolioLightbox: React.FC<PortfolioLightboxProps> = ({
  item,
  onClose,
  onHireCreator
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-4 border-[var(--border-subtle)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[var(--border-subtle)]/10 flex items-center justify-between bg-[var(--bg-card)] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[var(--accent-primary)] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
              {item.category}
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-[var(--text-primary)] italic truncate max-w-md sm:max-w-lg">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Media Preview Stage */}
        <div className="bg-[#0D0D0D] p-2 sm:p-4 flex items-center justify-center min-h-[300px] sm:min-h-[420px] relative">
          {item.mediaType === 'video' ? (
            <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl relative bg-black">
              <video
                src={item.mediaUrl}
                controls
                autoPlay
                poster={item.thumbnail}
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML video.
              </video>
            </div>
          ) : item.mediaType === 'code' ? (
            <div className="w-full max-w-3xl bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-xl p-6 font-mono text-xs border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] opacity-60 ml-2">production-architecture.tsx</span>
                </div>
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[var(--accent-primary)] hover:underline"
                  >
                    <span>View Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="space-y-2 opacity-90 text-[11px] leading-relaxed">
                <p className="text-emerald-400 font-bold">// Optimized for 100/100 Core Web Vitals & Sub-100ms Latency</p>
                <p className="text-indigo-300">export async function <span className="text-amber-300">renderCraftExperience</span>(props: StreamProps) &#123;</p>
                <p className="pl-4 text-stone-300">const pipeline = await initZeroLatencyWorker(&#123; frameRate: 120 &#125;);</p>
                <p className="pl-4 text-stone-300">return &lt;CreativeCanvas engine=&#123;pipeline&#125; strictTypeCheck=&#123;true&#125; /&gt;;</p>
                <p className="text-indigo-300">&#125;</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                <span>Repository: {item.mediaUrl}</span>
                <span>TypeScript 5.8 • Strict Mode</span>
              </div>
            </div>
          ) : (
            <img
              src={item.mediaUrl || item.thumbnail}
              alt={item.title}
              className="max-h-[500px] w-auto object-contain rounded-lg shadow-2xl"
            />
          )}
        </div>

        {/* Details and Context */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]/10">
            <div>
              {item.clientName && (
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]/50">
                  Client: <span className="text-[var(--text-primary)]">{item.clientName}</span>
                </p>
              )}
              {item.metrics && (
                <div className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Performance Metric: {item.metrics}</span>
                </div>
              )}
            </div>

            {onHireCreator && (
              <button
                onClick={() => {
                  onClose();
                  onHireCreator();
                }}
                className="px-6 py-3 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-md shrink-0"
              >
                Hire For Similar Project
              </button>
            )}
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/60 mb-2">Project Blueprint & Scope</h4>
            <p className="text-sm sm:text-base text-[var(--text-primary)]/80 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/60 mb-2">Technical Skills & Tooling</h4>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)]/15 text-[var(--text-primary)] rounded-full text-xs font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

