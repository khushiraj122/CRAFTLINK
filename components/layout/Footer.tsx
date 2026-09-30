'use client';
import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategorySlug } = useApp();

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navTo = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="mt-20 pt-16 pb-10 border-t border-[var(--border-subtle)] relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-40" />

      {/* Background grid */}
      <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[var(--border-subtle)]">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <img
                src="/craftlink-logo.svg"
                alt="CraftLink"
                className="h-10 w-auto object-contain mb-2"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const next = e.currentTarget.nextSibling as HTMLElement;
                  if (next) next.style.display = 'block';
                }}
              />
              {/* Text fallback */}
              <span className="hidden font-display font-black text-2xl text-[var(--text-primary)]">
                Craft<span className="text-[var(--accent-primary)]">link</span>
              </span>
            </div>

            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              The premium freelance marketplace connecting visionary companies with verified human creative talent — video editors, developers, and digital artisans.
            </p>

            <div
              className="inline-flex items-center gap-2 text-[11px] font-mono text-[var(--accent-primary)] px-4 py-2.5 rounded-full border border-[var(--border-medium)]"
              style={{ background: 'var(--accent-glow)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_6px_var(--accent-primary)]" />
              100% Human Craft • No AI Hallucinations
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-display font-bold text-[var(--text-primary)] text-sm mb-4 uppercase tracking-wider">Specializations</p>
              <ul className="space-y-2.5">
                {[
                  { slug: 'video_editing', label: 'YouTube & Commercial Editors' },
                  { slug: 'motion_graphics', label: '3D Motion & Cinema 4D' },
                  { slug: 'web_development', label: 'React & Next.js Architects' },
                  { slug: 'mobile_development', label: 'SwiftUI & React Native' },
                  { slug: 'ui_ux_design', label: 'Design Systems & UI/UX' },
                ].map(({ slug, label }) => (
                  <li key={slug}>
                    <button
                      onClick={() => handleCategoryClick(slug)}
                      className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display font-bold text-[var(--text-primary)] text-sm mb-4 uppercase tracking-wider">Platform</p>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => navTo('how-it-works')} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => navTo('how-it-works')} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    Escrow Protection
                  </button>
                </li>
                <li>
                  <button onClick={() => navTo('directory')} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    Browse Top Creators
                  </button>
                </li>
                <li>
                  <button onClick={() => navTo('how-it-works')} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    Verification Standards
                  </button>
                </li>
                <li>
                  <span className="text-[12px] text-[var(--accent-primary)] cursor-pointer hover:underline">
                    Apply as Pro Creator
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-display font-bold text-[var(--text-primary)] text-sm mb-4 uppercase tracking-wider">Trust & Safety</p>
              <ul className="space-y-2.5">
                {[
                  { icon: <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" />, label: 'Milestone Escrow' },
                  { label: 'Frame-accurate Feedback' },
                  { label: 'Dispute Mediation' },
                  { label: 'NDAs & IP Protection' },
                ].map(({ icon, label }, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
                    {icon}
                    <span>{label}</span>
                  </li>
                ))}
                <li className="pt-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[var(--accent-primary)] px-2.5 py-1 rounded-full border border-[var(--border-medium)]"
                    style={{ background: 'var(--accent-glow)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                    All Systems Operational
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-mono text-[var(--text-faint)]">
            © {new Date().getFullYear()} CraftLink Inc. Built for true digital artisans.
          </span>
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-faint)]">
            {['Terms of Service', 'Privacy Charter', 'Security Audits'].map(item => (
              <span key={item} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

