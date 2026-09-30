'use client';
import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  Video, 
  Code2, 
  FileCheck, 
  Scale,
  Users
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { setActiveView, setSelectedCategorySlug } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">The CraftLink Standard</span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-[var(--text-primary)] italic">
          How CraftLink Protects Creators & Clients
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-primary)]/70 leading-relaxed font-sans">
          A modern marketplace engineered for high-stakes video productions and mission-critical engineering projects with 100% milestone escrow guarantees.
        </p>
      </div>

      {/* 4 Step Visual Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--border-subtle)] p-6 sm:p-8 space-y-4 shadow-md relative">
          <span className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] text-white font-mono font-bold text-sm flex items-center justify-center">
            01
          </span>
          <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Find Vetted Talent</h3>
          <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed font-sans">
            Every editor and developer passes a manual portfolio audit. Review real timeline cuts, 4K color grade samples, or inspect clean React/Swift codebase architectures.
          </p>
        </div>

        <div className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--accent-primary)] p-6 sm:p-8 space-y-4 shadow-xl relative">
          <span className="w-10 h-10 rounded-full bg-[var(--accent-primary)] text-white font-mono font-bold text-sm flex items-center justify-center">
            02
          </span>
          <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Fund Milestone Escrow</h3>
          <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed font-sans">
            Break the project into granular phases (Rough Cut, Sound Design, Final Delivery). Client deposits are held in a secure escrow vault until you approve each milestone.
          </p>
        </div>

        <div className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--border-subtle)] p-6 sm:p-8 space-y-4 shadow-md relative">
          <span className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] text-white font-mono font-bold text-sm flex items-center justify-center">
            03
          </span>
          <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Direct Creative Sync</h3>
          <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed font-sans">
            Communicate directly through our encrypted messaging workspace. Share asset links, request revision passes, and sync on creative feedback in real-time.
          </p>
        </div>

        <div className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--border-subtle)] p-6 sm:p-8 space-y-4 shadow-md relative">
          <span className="w-10 h-10 rounded-full bg-emerald-700 text-white font-mono font-bold text-sm flex items-center justify-center">
            04
          </span>
          <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Signoff & Release</h3>
          <p className="text-xs text-[var(--text-primary)]/75 leading-relaxed font-sans">
            Verify the ProRes master export or merged GitHub pull request. Once 100% satisfied, release milestone funds instantly and leave a verified client review.
          </p>
        </div>
      </div>

      {/* Deep Dives: For Clients vs. For Freelancers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--bg-elevated)] text-white rounded-3xl p-8 sm:p-10 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Client Protection Protocol</span>
          <h3 className="font-display font-black text-3xl italic">Why Companies Trust CraftLink</h3>
          <ul className="space-y-4 text-xs sm:text-sm text-white/80">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span><strong>Zero Payment Risk:</strong> Freelancers never receive funds until you inspect and approve the submitted deliverable.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span><strong>Guaranteed Turnaround Deadlines:</strong> Strict milestone schedules ensure your YouTube upload dates and product launches stay on track.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span><strong>Fair Dispute Arbitration:</strong> In the rare event of a disagreement, CraftLink creative supervisors review raw footage and brief logs.</span>
            </li>
          </ul>
          <button
            onClick={() => {
              setActiveView('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-colors"
          >
            Explore Talent Directory
          </button>
        </div>

        <div className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-3xl p-8 sm:p-10 border-2 border-[var(--border-subtle)] space-y-6 shadow-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Artisan Standard</span>
          <h3 className="font-display font-black text-3xl italic">Why Editors & Engineers Work Here</h3>
          <ul className="space-y-4 text-xs sm:text-sm text-[var(--text-primary)]/80">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span><strong>Guaranteed Payouts:</strong> No chasing invoices. Funds are locked into escrow before you ever open Premiere Pro or VS Code.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span><strong>Keep 90% of Your Earnings:</strong> Flat 10% platform fee compared to legacy 20-30% agency cuts.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
              <span><strong>High-Caliber Clients:</strong> Work with established creators, tech startups, and funded studios that respect your craft.</span>
            </li>
          </ul>
          <button
            onClick={() => {
              setActiveView('freelancer-dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-[var(--accent-primary)] transition-colors"
          >
            Go to Creator Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

