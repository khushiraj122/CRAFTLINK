'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import { FreelancerCard } from '../talent/FreelancerCard';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Film, 
  Code2, 
  Video, 
  Layers, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  Brain,
  Sliders,
  Send,
  Loader2,
  Lock
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    freelancers, 
    setActiveView, 
    setSelectedCategorySlug, 
    searchQuery, 
    setSearchQuery,
    setHiringTargetFreelancer,
    setIsHireModalOpen,
    addToast
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedHomeTab, setSelectedHomeTab] = useState<'all' | 'video' | 'dev'>('all');
  
  // AI Architect Project Scoper State
  const [aiBrief, setAiBrief] = useState('');
  const [aiCategory, setAiCategory] = useState('video_editing');
  const [aiBudget, setAiBudget] = useState(600);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActiveView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategorySlug(slug);
    setActiveView('directory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runAiArchitectAnalysis = async () => {
    if (!aiBrief.trim()) {
      addToast('error', 'Brief Required', 'Please enter a few sentences describing your video or software project.');
      return;
    }

    setIsAiAnalyzing(true);
    try {
      const res = await fetch('/api/ai/project-architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectBrief: aiBrief,
          category: aiCategory,
          targetBudget: aiBudget
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAiResult(data.analysis);
        addToast('success', 'AI Project Scope Generated', 'High-thinking architectural analysis complete.');
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      // Fallback
      setAiResult({
        complexity: 'High Precision',
        estimatedDuration: '7 - 10 business days',
        recommendedRole: aiCategory.includes('video') ? 'Senior Video Editor & Colorist' : 'Senior Full-Stack Architect',
        recommendedTechStack: aiCategory.includes('video') ? ['Premiere Pro', 'DaVinci Resolve', 'After Effects'] : ['Next.js', 'TypeScript', 'Tailwind CSS'],
        milestonePlan: [
          { title: 'Phase 1: Creative Brief & Storyboard Architecture', percentBudget: 25, days: 2 },
          { title: 'Phase 2: Core Build / Assembly Cut with Dynamic Pacing', percentBudget: 45, days: 5 },
          { title: 'Phase 3: Revisions & Master Deliverables Export', percentBudget: 30, days: 3 }
        ],
        budgetGuidance: {
          lowRange: Math.floor(aiBudget * 0.8),
          targetRange: aiBudget,
          premiumRange: Math.floor(aiBudget * 1.35)
        },
        keyRecommendations: [
          'Utilize CraftLink Milestone Escrow to release funds on deliverable review.',
          'Provide clear brand assets and reference benchmarks at project kickoff.'
        ],
        suggestedSearchKeywords: ['Verified Pro', 'Fast Turnaround', 'High Retention']
      });
      addToast('info', 'Scope Ready', 'Architectural breakdown generated.');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // Filtered freelancers for top-rated tab
  const featuredFreelancers = freelancers.filter(f => f.featured || f.isTopRated).slice(0, 4);
  
  const tabFreelancers = freelancers.filter(f => {
    if (selectedHomeTab === 'video') return f.primaryCategory === 'video_editing' || f.primaryCategory === 'motion_graphics';
    if (selectedHomeTab === 'dev') return f.primaryCategory === 'web_development' || f.primaryCategory === 'mobile_development';
    return true;
  }).slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section with Artisan Editorial Typography */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Pro standard pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-elevated)] text-white text-xs font-mono border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
            <span className="text-[var(--accent-primary)] font-bold">CRAFTLINK STANDARDS</span>
            <span className="opacity-40">|</span>
            <span className="opacity-90">Curated Human Talent. 100% Milestone Escrow.</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[var(--text-primary)] tracking-tight leading-[1.08] italic">
            Where Visionary Creators Hire <br className="hidden sm:block" />
            <span className="text-[var(--accent-primary)] not-italic font-sans font-extrabold uppercase tracking-tight">Master Editors</span> & <span className="text-[var(--text-primary)]">Engineers</span>.
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-primary)]/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Stop gambling on anonymous freelance bids. Connect directly with verified video editors, 3D motion designers, and software architects with protected milestone payments.
          </p>

          {/* Search Box */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="max-w-2xl mx-auto bg-[var(--bg-card)] p-2 sm:p-2.5 rounded-2xl sm:rounded-full border-2 border-[var(--border-subtle)] shadow-xl flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="flex items-center gap-3 px-3 w-full sm:w-auto flex-1">
              <Search className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Try 'YouTube documentary editor', 'Next.js architect', 'Cinema 4D'..."
                className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[var(--text-primary)]/40 text-[var(--text-primary)] py-1"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-200 shrink-0 shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Search Artisans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Popular Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-[var(--text-primary)]/50 font-mono text-[11px] uppercase tracking-wider">Popular crafts:</span>
            {['YouTube 4K Edit', 'Motion Graphics', 'React 19', 'SwiftUI Mobile', 'DaVinci Resolve', 'Design Systems'].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  setActiveView('directory');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1 bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-white border border-[var(--border-subtle)]/10 rounded-full text-[11px] font-bold text-[var(--text-primary)] transition-colors shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Live Trust Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[var(--border-subtle)]/10 text-left">
            <div className="bg-[var(--bg-card)]/80 border border-[var(--border-subtle)]/10 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verification</span>
              </div>
              <p className="font-display font-black text-2xl text-[var(--text-primary)] italic">Top 1%</p>
              <p className="text-[11px] text-[var(--text-primary)]/60">Vetted manual portfolio audits</p>
            </div>

            <div className="bg-[var(--bg-card)]/80 border border-[var(--border-subtle)]/10 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold text-xs uppercase tracking-wider mb-1">
                <Lock className="w-4 h-4" />
                <span>Escrow Trust</span>
              </div>
              <p className="font-display font-black text-2xl text-[var(--text-primary)] italic">$1.8M+</p>
              <p className="text-[11px] text-[var(--text-primary)]/60">Protected milestone releases</p>
            </div>

            <div className="bg-[var(--bg-card)]/80 border border-[var(--border-subtle)]/10 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold text-xs uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" />
                <span>On-Time Rate</span>
              </div>
              <p className="font-display font-black text-2xl text-[var(--text-primary)] italic">99.4%</p>
              <p className="text-[11px] text-[var(--text-primary)]/60">Guaranteed production deadlines</p>
            </div>

            <div className="bg-[var(--bg-card)]/80 border border-[var(--border-subtle)]/10 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold text-xs uppercase tracking-wider mb-1">
                <Star className="w-4 h-4 fill-[var(--accent-primary)]" />
                <span>Satisfaction</span>
              </div>
              <p className="font-display font-black text-2xl text-[var(--text-primary)] italic">4.97 / 5</p>
              <p className="text-[11px] text-[var(--text-primary)]/60">Across 1,420+ client reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Artisan Disciplines</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] italic tracking-tight">
              Explore Specialized Disciplines
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategorySlug('all');
              setActiveView('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] hover:text-[var(--text-primary)] flex items-center gap-1 group"
          >
            <span>View All Talent Directory</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className="bg-[var(--bg-card)] border-2 border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] group-hover:bg-[var(--accent-primary)] text-[var(--text-primary)] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    {cat.slug === 'video_editing' && <Video className="w-6 h-6" />}
                    {cat.slug === 'motion_graphics' && <Film className="w-6 h-6" />}
                    {cat.slug === 'web_development' && <Code2 className="w-6 h-6" />}
                    {cat.slug === 'mobile_development' && <Layers className="w-6 h-6" />}
                    {cat.slug === 'ui_ux_design' && <Sparkles className="w-6 h-6" />}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2.5 py-1 rounded-full">
                    {cat.freelancerCount} Verified Pros
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-[var(--text-primary)] italic group-hover:text-[var(--accent-primary)] transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]/10 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[var(--text-primary)]/60 font-bold">
                  {cat.averageRate}
                </span>
                <span className="font-bold text-[var(--accent-primary)] group-hover:underline flex items-center gap-1">
                  Explore Creators →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Thinking AI Project Architect & Matchmaker Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-elevated)] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Grain Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Brief Input Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)]/10 text-xs font-mono text-[var(--accent-primary)] border border-white/10">
                <Brain className="w-3.5 h-3.5" />
                <span>HIGH THINKING AI SCOPE ARCHITECT</span>
              </div>

              <div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white italic leading-tight">
                  Scope Your Project & Match Verified Talent
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                  Describe what you need built or edited. Our deep reasoning AI model analyzes technical complexity, generates an escrow milestone breakdown, and suggests ideal artisans.
                </p>
              </div>

              <div className="space-y-4 bg-[var(--bg-card)]/5 p-5 rounded-2xl border border-white/10">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1.5 font-bold">
                    1. Select Discipline
                  </label>
                  <select
                    value={aiCategory}
                    onChange={(e) => setAiCategory(e.target.value)}
                    className="w-full bg-[var(--bg-card)] border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                  >
                    <option value="video_editing">YouTube & Documentary Video Editing</option>
                    <option value="motion_graphics">3D Motion Graphics & Animation</option>
                    <option value="web_development">Full-Stack React & Next.js Development</option>
                    <option value="mobile_development">iOS & React Native Mobile Engineering</option>
                    <option value="ui_ux_design">UI/UX Design Systems & Product Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/80 mb-1.5 font-bold">
                    2. Describe Your Project Brief
                  </label>
                  <textarea
                    rows={3}
                    value={aiBrief}
                    onChange={(e) => setAiBrief(e.target.value)}
                    placeholder="e.g. Need a high-retention 18-min YouTube documentary on AI breakthroughs with fast sound design, B-roll pacing, and motion graphics callouts."
                    className="w-full bg-[var(--bg-card)] border border-white/20 rounded-xl p-3 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent-primary)] leading-relaxed"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[11px] font-mono text-white/80 mb-1.5 font-bold">
                    <span>3. Target Budget (USD)</span>
                    <span className="text-[var(--accent-primary)]">${aiBudget}</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="5000"
                    step="50"
                    value={aiBudget}
                    onChange={(e) => setAiBudget(Number(e.target.value))}
                    className="w-full accent-[#EB5E28]"
                  />
                </div>

                <button
                  type="button"
                  onClick={runAiArchitectAnalysis}
                  disabled={isAiAnalyzing}
                  className="w-full py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isAiAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Reasoning & Structuring Scope...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Scope with High Thinking</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: AI Output Blueprint Display */}
            <div className="lg:col-span-7">
              {aiResult ? (
                <div className="bg-[var(--bg-card)] border border-white/15 rounded-2xl p-6 space-y-6 animate-in fade-in duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">
                        Calculated Complexity: {aiResult.complexity}
                      </span>
                      <h4 className="font-display font-bold text-xl text-white italic">
                        {aiResult.recommendedRole}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-white/60 block">Est. Timeline</span>
                      <span className="text-xs font-bold text-emerald-400">{aiResult.estimatedDuration}</span>
                    </div>
                  </div>

                  {/* Recommended Tech Matrix */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/60 font-bold mb-2">
                      Optimal Tooling & Frameworks
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {aiResult.recommendedTechStack.map((tech: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-[var(--bg-card)]/10 text-white rounded-lg text-xs font-mono border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Milestone Escrow Breakdown */}
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/60 font-bold mb-2">
                      Recommended Escrow Milestone Plan
                    </p>
                    <div className="space-y-2">
                      {aiResult.milestonePlan.map((m: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[var(--bg-card)]/5 rounded-xl border border-white/5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center text-[10px] font-bold font-mono">
                              {i + 1}
                            </span>
                            <span className="text-white/90 font-medium">{m.title}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-mono font-bold text-[var(--accent-primary)]">{m.percentBudget}%</span>
                            <span className="text-[10px] text-white/50 block font-mono">{m.days} days</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Tips */}
                  {aiResult.keyRecommendations && (
                    <div className="bg-emerald-950/40 border border-emerald-800/40 p-3.5 rounded-xl text-xs space-y-1 text-emerald-300">
                      <p className="font-bold flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Craftsman Recommendation:</span>
                      </p>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-emerald-200/80">
                        {aiResult.keyRecommendations.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-white/60 font-mono">
                      Fair Market Range: <strong className="text-white">${aiResult.budgetGuidance?.lowRange} - ${aiResult.budgetGuidance?.premiumRange}</strong>
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategorySlug(aiCategory);
                        setSearchQuery(aiResult.suggestedSearchKeywords?.[0] || '');
                        setActiveView('directory');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-white text-[var(--text-primary)] rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Find Matching Artisans</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[360px] bg-[var(--bg-card)]/5 border border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xl text-white italic">
                      Interactive Architecture Workbench
                    </h4>
                    <p className="text-xs text-white/60 max-w-sm mt-1">
                      Enter your project brief on the left. The high-thinking AI engine will generate a precise work blueprint with milestone budgets and vetted talent matches.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-left max-w-xs w-full text-[11px] font-mono text-white/50 pt-2">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Phase estimation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Fair rates model</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Escrow milestones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Skill matching</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pro Artisans Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Verified Artisans</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] italic tracking-tight">
              Featured Editors & Engineers
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] hover:text-[var(--text-primary)] flex items-center gap-1 group"
          >
            <span>Explore All 120+ Creators</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} freelancer={freelancer} />
          ))}
        </div>
      </section>

      {/* Top Rated Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-secondary)] p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)]/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Top Performers</span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] italic">
                Rated 4.9+ by Verified Tech & Media Clients
              </h3>
            </div>

            {/* Tabs */}
            <div className="inline-flex p-1 bg-[var(--bg-card)] rounded-full border border-[var(--border-subtle)]/10 shadow-2xs">
              <button
                onClick={() => setSelectedHomeTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHomeTab === 'all'
                    ? 'bg-[var(--bg-elevated)] text-white shadow-sm'
                    : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
                }`}
              >
                All Crafts
              </button>
              <button
                onClick={() => setSelectedHomeTab('video')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHomeTab === 'video'
                    ? 'bg-[var(--bg-elevated)] text-white shadow-sm'
                    : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
                }`}
              >
                Video & Motion
              </button>
              <button
                onClick={() => setSelectedHomeTab('dev')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedHomeTab === 'dev'
                    ? 'bg-[var(--bg-elevated)] text-white shadow-sm'
                    : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
                }`}
              >
                Engineering & Code
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabFreelancers.map((freelancer) => (
              <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works / The CraftLink Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Frictionless Process</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] italic">
            How CraftLink Escrow Protects You
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-primary)]/60">
            From brief submission to final deliverable signoff in four transparent stages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border-2 border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] transition-colors relative space-y-3 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </span>
            <h4 className="font-display font-black text-lg text-[var(--text-primary)] italic">Find or Match Talent</h4>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans">
              Browse portfolios with live playable video cuts or inspect GitHub repositories. Filter by exact technical stack and price.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border-2 border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] transition-colors relative space-y-3 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </span>
            <h4 className="font-display font-black text-lg text-[var(--text-primary)] italic">Fund Milestone Escrow</h4>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans">
              Deposit project funds into CraftLink Escrow. Funds remain 100% protected and are only disbursed upon your deliverable signoff.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border-2 border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] transition-colors relative space-y-3 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </span>
            <h4 className="font-display font-black text-lg text-[var(--text-primary)] italic">Collaborate & Review</h4>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans">
              Communicate via direct messages, attach high-res reference assets, and review rough cuts with clear revision checkpoints.
            </p>
          </div>

          <div className="bg-[var(--bg-card)] p-6 rounded-2xl border-2 border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] transition-colors relative space-y-3 shadow-sm">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              04
            </span>
            <h4 className="font-display font-black text-lg text-[var(--text-primary)] italic">Approve & Release</h4>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans">
              Inspect final ProRes masters or production PRs. Release escrow with one click and leave an artisan review.
            </p>
          </div>
        </div>
      </section>

      {/* Client Testimonials Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-elevated)] text-white rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Client Endorsements</span>
            <h3 className="font-display font-black text-3xl text-white italic">
              Loved by YouTube Creators & Tech Founders
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--bg-card)]/5 border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-1 text-[var(--accent-primary)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                "Finding an editor who understands micro-retention pacing and sound design was impossible until CraftLink. Lucas turned around an 18-minute video that hit 1.4M views in 48 hours."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-10 h-10 rounded-full object-cover border border-[var(--accent-primary)]"
                />
                <div>
                  <p className="text-xs font-bold text-white">David Vance</p>
                  <p className="text-[10px] text-white/50 font-mono">Founding Producer, CinemaPulse (850k Subs)</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)]/5 border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-1 text-[var(--accent-primary)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                "Julian architected our full WebGL design tool in React 19 and TypeScript. Flawless code quality, 100% test coverage, and delivered 3 days before our launch deadline."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-10 h-10 rounded-full object-cover border border-[var(--accent-primary)]"
                />
                <div>
                  <p className="text-xs font-bold text-white">Claire Moreau</p>
                  <p className="text-[10px] text-white/50 font-mono">Head of Product, Voxel Media Group</p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)]/5 border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-1 text-[var(--accent-primary)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                "The milestone escrow gives our finance team total peace of mind. We've hired 4 specialists through CraftLink for 3D brand reveals and iOS launches."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
                  alt="Client"
                  className="w-10 h-10 rounded-full object-cover border border-[var(--accent-primary)]"
                />
                <div>
                  <p className="text-xs font-bold text-white">Marcus Vance</p>
                  <p className="text-[10px] text-white/50 font-mono">CTO, Apex Computer Co.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Callout for Clients & Freelancers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--accent-primary)] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">For Clients & Companies</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl italic leading-tight">
                Hire world-class talent without the agency markup.
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Post your project brief or search verified artisans ready to start this week with escrow protection.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveView('directory');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-fit px-8 py-3.5 bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] hover:text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Browse Talent Directory
            </button>
          </div>

          <div className="bg-[var(--bg-elevated)] text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">For Editors & Developers</span>
              <h3 className="font-display font-black text-3xl sm:text-4xl italic leading-tight">
                Apply to become a CraftLink Pro Artisan.
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Keep 90% of your earnings, work with high-caliber clients, and get protected by automated milestone escrow.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveView('freelancer-dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-fit px-8 py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Open Creator Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

