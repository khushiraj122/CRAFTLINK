'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Copy, Check, Share2, XIcon, Link2 } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, shareData, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !shareData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareData.url || window.location.href);
    setCopied(true);
    addToast('success', 'Link Copied', 'Profile URL copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-2 border-[var(--border-subtle)] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[var(--text-primary)]/50 hover:text-[var(--text-primary)] rounded-full hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl italic">{shareData.title}</h3>
            <p className="text-xs text-[var(--text-primary)]/60">Share this artisan profile with your network</p>
          </div>
        </div>

        <p className="text-xs text-[var(--text-primary)]/70 mb-4 bg-[var(--bg-elevated)]/5 p-3 rounded-lg border border-[var(--border-subtle)]/10 font-display italic">
          "{shareData.text}"
        </p>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            readOnly
            value={shareData.url || window.location.href}
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-lg px-3 py-2 text-xs font-mono text-[var(--text-primary)] focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[var(--bg-elevated)] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-primary)] transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://XIcon.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url || window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <XIcon className="w-4 h-4" />
            Share on X
          </a>
          <a
            href={`https://www.Link2.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url || window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0077b5] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#006097] transition-colors"
          >
            <Link2 className="w-4 h-4" />
            Link2
          </a>
        </div>
      </div>
    </div>
  );
};

