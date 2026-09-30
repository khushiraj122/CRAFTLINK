// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PortfolioItem, Skill, WorkExperience, Education } from '@/types';
import { CreatorJobsView } from '@/components/jobs/CreatorJobsView';
import { CreatorPortfolioView } from '@/components/portfolio/CreatorPortfolioView';
import { CreatorPublicProfileView } from '@/components/portfolio/CreatorPublicProfileView';
import { 
  DollarSign, 
  Briefcase, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  MessageSquare, 
  Play, 
  Code2, 
  ShieldCheck, 
  Save, 
  Layers, 
  FileText,
  User,
  Settings,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export const FreelancerDashboardView: React.FC = () => {
  const { 
    currentUser, 
    currentFreelancerProfile, 
    freelancers, 
    hiringRequests, 
    updateFreelancerProfile, 
    respondToHiringRequest, 
    startOrOpenConversation, 
    addToast 
  } = useApp();

  // Find or fallback to currently logged in / demo freelancer
  const profile = currentFreelancerProfile || freelancers[0];

  const [activeTab, setActiveTab] = useState<'requests' | 'portfolio' | 'earnings' | 'skills_exp' | 'profile_settings' | 'my_portfolio' | 'public_profile' | 'jobs'>('requests');

  // Profile Settings Form State
  const [name, setName] = useState(profile.name);
  const [profession, setProfession] = useState(profile.profession);
  const [bio, setBio] = useState(profile.bio);
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate);
  const [startingPrice, setStartingPrice] = useState(profile.startingPrice);
  const [availability, setAvailability] = useState<'available' | 'booked' | 'unavailable'>(profile.availability);
  const [location, setLocation] = useState(profile.location);
  const [avatar, setAvatar] = useState(profile.avatar);

  // New Portfolio Item State
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState('Video Editing');
  const [newPortMediaType, setNewPortMediaType] = useState<'video' | 'code' | 'image'>('video');
  const [newPortThumb, setNewPortThumb] = useState('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80');
  const [newPortVideoUrl, setNewPortVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortMetrics, setNewPortMetrics] = useState('+1.2M YouTube Views');
  const [newPortTags, setNewPortTags] = useState('Premiere, 4K, Color Grade');

  // New Skill State
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Video Editing');
  const [newSkillLevel, setNewSkillLevel] = useState<'Master' | 'Expert' | 'Advanced'>('Expert');

  // Relevant hiring requests for this freelancer
  const myRequests = hiringRequests.filter(req => 
    req.freelancerId === profile.id || profile.id === 'f-1'
  );

  const pendingRequests = myRequests.filter(r => r.status === 'pending');
  const activeRequests = myRequests.filter(r => r.status === 'in_progress');
  const completedRequests = myRequests.filter(r => r.status === 'completed');

  // Financial Metrics Calculation
  const totalEarnings = profile.earningsMetrics?.totalEarned || 34800;
  const inEscrow = myRequests.filter(r => r.status === 'in_progress').reduce((acc, r) => acc + r.budgetAmount, 0);
  const completedJobsCount = profile.completedProjectsCount;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateFreelancerProfile({
      name,
      profession,
      bio,
      hourlyRate: Number(hourlyRate),
      startingPrice: Number(startingPrice),
      availability,
      location,
      avatar
    });
    addToast('success', 'Artisan Profile Updated', 'Your public rates and bio are now live in the directory.');
  };

  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim() || !newPortDesc.trim()) {
      addToast('error', 'Missing Information', 'Please provide project title and description.');
      return;
    }

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle,
      category: newPortCategory,
      mediaType: newPortMediaType,
      thumbnail: newPortThumb,
      videoUrl: newPortMediaType === 'video' ? newPortVideoUrl : undefined,
      description: newPortDesc,
      metrics: newPortMetrics,
      tags: newPortTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    const updatedPortfolio = [newItem, ...profile.portfolio];
    updateFreelancerProfile({ portfolio: updatedPortfolio });
    setIsAddingPortfolio(false);
    setNewPortTitle('');
    setNewPortDesc('');
    addToast('success', 'Deliverable Added', 'New portfolio project added to your showcase.');
  };

  const handleDeletePortfolioItem = (itemId: string) => {
    const updated = profile.portfolio.filter(p => p.id !== itemId);
    updateFreelancerProfile({ portfolio: updated });
    addToast('info', 'Item Removed', 'Portfolio case study deleted.');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      level: newSkillLevel
    };
    updateFreelancerProfile({
      skills: [...profile.skills, newSkill]
    });
    setNewSkillName('');
    addToast('success', 'Skill Added', `${newSkill.name} added to your competency matrix.`);
  };

  const handleRemoveSkill = (skillName: string) => {
    updateFreelancerProfile({
      skills: profile.skills.filter(s => s.name !== skillName)
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Availability Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Artisan Studio Workspace</span>
            <span className="px-2 py-0.5 bg-[var(--accent-primary)] text-white text-[10px] font-mono rounded font-bold">Verified Pro</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] italic mt-1">
            {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-primary)]/60 mt-0.5">
            {profile.profession} • Rate: ${profile.hourlyRate}/hr • Rating: {profile.rating}★ ({profile.reviewsCount} reviews)
          </p>
        </div>

        {/* Availability Switcher */}
        <div className="flex items-center gap-3 bg-[var(--bg-card)] p-2 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold px-2">Status:</span>
          <select
            value={availability}
            onChange={(e: any) => {
              setAvailability(e.target.value);
              updateFreelancerProfile({ availability: e.target.value });
              addToast('info', 'Status Updated', `Availability set to ${e.target.value}`);
            }}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)]/10 rounded-xl px-3 py-1.5 text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
          >
            <option value="available">🟢 Available for Hire Now</option>
            <option value="booked">🟡 In Active Project (Limited)</option>
            <option value="unavailable">🔴 Booked Out / Unavailable</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <DollarSign className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Total Earnings</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">${totalEarnings.toLocaleString()}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">90% Payout Net</p>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[var(--accent-primary)]">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">In Escrow</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">${inEscrow.toLocaleString()}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">Secured in Contracts</p>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[var(--text-primary)]">
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Active Jobs</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">{activeRequests.length}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">{pendingRequests.length} Pending Proposals</p>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[var(--accent-primary)]">
            <Star className="w-5 h-5 fill-[var(--accent-primary)]" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Reputation</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">{profile.rating} / 5.0</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">{profile.onTimeDeliveryRate}% On-Time Delivery</p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b-2 border-[var(--border-subtle)]/10 gap-4 sm:gap-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'requests'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Hiring Requests & Milestones ({myRequests.length})</span>
          {pendingRequests.length > 0 && (
            <span className="px-1.5 py-0.2 bg-[var(--accent-primary)] text-white rounded-full text-[10px]">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Manage Portfolio ({profile.portfolio.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('earnings')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'earnings'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Earnings & Payouts</span>
        </button>

        <button
          onClick={() => setActiveTab('skills_exp')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'skills_exp'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Skills & Experience</span>
        </button>

        <button
          onClick={() => setActiveTab('profile_settings')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile_settings'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Profile & Rates</span>
        </button>

        <button
          onClick={() => setActiveTab('my_portfolio')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'my_portfolio'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Portfolio Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('public_profile')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'public_profile'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Public Portfolio</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'jobs'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Browse Jobs</span>
        </button>
      </div>

      {/* New Tab Panels */}
      {activeTab === 'my_portfolio' && <CreatorPortfolioView />}
      {activeTab === 'public_profile' && <CreatorPublicProfileView />}
      {activeTab === 'jobs' && <CreatorJobsView />}

      {/* Tab 1: Hiring Requests & Milestones */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          {/* Pending Proposals Section */}
          {pendingRequests.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>New Hiring Proposals Awaiting Your Response ({pendingRequests.length})</span>
              </h3>

              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--accent-primary)] p-6 shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]/10">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Proposal Received</span>
                        <h4 className="font-display font-black text-xl text-[var(--text-primary)] italic">{req.projectTitle}</h4>
                        <p className="text-xs text-[var(--text-primary)]/70 font-mono">From: <strong>{req.clientName}</strong> ({req.clientEmail})</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] font-mono uppercase text-[var(--text-primary)]/50 font-bold block">Proposed Escrow</span>
                          <span className="font-display font-black text-2xl text-[var(--text-primary)] italic">${req.budgetAmount}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed font-sans">
                      {req.description}
                    </p>

                    <div className="bg-[var(--bg-secondary)] p-4 rounded-xl space-y-2">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/70 font-bold">Escrow Milestones Proposed:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {req.milestones.map((m, i) => (
                          <div key={m.id} className="p-2.5 bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)]/10 text-xs">
                            <span className="text-[10px] font-mono text-[var(--accent-primary)] block">Phase #{i + 1}</span>
                            <p className="font-bold text-[var(--text-primary)]">{m.title}</p>
                            <span className="font-mono text-[11px] text-[var(--text-primary)]/60">${m.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => startOrOpenConversation(req.clientId)}
                        className="px-4 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:text-white rounded-full text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Client</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => respondToHiringRequest(req.id, false)}
                          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-xs font-bold transition-colors"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => respondToHiringRequest(req.id, true)}
                          className="px-6 py-2 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                        >
                          Accept & Lock Escrow
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Jobs in Progress */}
          <div className="space-y-4">
            <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">
              Active Production Contracts ({activeRequests.length})
            </h3>

            {activeRequests.length > 0 ? (
              activeRequests.map((req) => (
                <div key={req.id} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]/10">
                    <div>
                      <h4 className="font-display font-black text-xl text-[var(--text-primary)] italic">{req.projectTitle}</h4>
                      <p className="text-xs text-[var(--accent-primary)] font-bold">Client: {req.clientName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[var(--text-primary)]/50 block">Escrow Funded</span>
                      <span className="font-display font-black text-xl text-emerald-600">${req.budgetAmount}</span>
                    </div>
                  </div>

                  {/* Milestones Checkpoints */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold">Milestones Status:</p>
                    {req.milestones.map((m, idx) => (
                      <div key={m.id} className="p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/10 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {m.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-600" />
                          )}
                          <span className="font-bold text-[var(--text-primary)]">{m.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold">${m.amount}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            m.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {m.completed ? 'Released' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => startOrOpenConversation(req.clientId)}
                      className="px-4 py-2 bg-[var(--bg-elevated)] text-white rounded-full text-xs font-bold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Deliver Draft in Chat</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-dashed border-[var(--border-subtle)]/20 p-10 text-center space-y-3">
                <Clock className="w-8 h-8 text-[var(--accent-primary)] mx-auto opacity-60" />
                <h4 className="font-display font-black text-lg italic">No active production jobs right now</h4>
                <p className="text-xs text-[var(--text-primary)]/60">Make sure your status is set to 'Available for Hire' to receive client briefs.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Manage Portfolio Showcase */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]/10">
            <div>
              <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Portfolio & Case Studies</h3>
              <p className="text-xs text-[var(--text-primary)]/60">Add high-resolution videos, motion reels, or code architecture previews.</p>
            </div>
            <button
              onClick={() => setIsAddingPortfolio(!isAddingPortfolio)}
              className="px-5 py-2.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingPortfolio ? 'Cancel' : 'Add New Deliverable'}</span>
            </button>
          </div>

          {/* Add Portfolio Form Modal / Collapse */}
          {isAddingPortfolio && (
            <form onSubmit={handleAddPortfolioItem} className="bg-[var(--bg-card)] p-6 rounded-2xl border-2 border-[var(--accent-primary)] space-y-4 shadow-lg">
              <h4 className="font-display font-black text-lg italic text-[var(--text-primary)]">New Deliverable Showcase</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={newPortTitle}
                    onChange={(e) => setNewPortTitle(e.target.value)}
                    placeholder="e.g. Masterclass Documentary Cut 4K"
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Category</label>
                  <select
                    value={newPortCategory}
                    onChange={(e) => setNewPortCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs"
                  >
                    <option value="Video Editing">Video Editing</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                    <option value="Design Systems">Design Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Thumbnail Image URL</label>
                  <input
                    type="url"
                    value={newPortThumb}
                    onChange={(e) => setNewPortThumb(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Key Metric / Result</label>
                  <input
                    type="text"
                    value={newPortMetrics}
                    onChange={(e) => setNewPortMetrics(e.target.value)}
                    placeholder="e.g. +2.4M Views or 99.9% Uptime"
                    className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Deliverable Description</label>
                <textarea
                  rows={3}
                  required
                  value={newPortDesc}
                  onChange={(e) => setNewPortDesc(e.target.value)}
                  placeholder="Describe your creative decisions, sound design layers, or software architecture..."
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingPortfolio(false)}
                  className="px-4 py-2 bg-stone-100 rounded-full text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase"
                >
                  Publish Deliverable
                </button>
              </div>
            </form>
          )}

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.portfolio.map((item) => (
              <div key={item.id} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 overflow-hidden shadow-2xs space-y-3 p-4 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-mono rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-display font-black text-base italic text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-xs text-[var(--text-primary)]/70 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">{item.metrics}</span>
                  <button
                    onClick={() => handleDeletePortfolioItem(item.id)}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Earnings & Payouts Dashboard */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Financial Overview</span>
                <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Artisan Earnings & Escrow Ledger</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-[var(--text-primary)]/50 block">Available for Instant Payout</span>
                <span className="font-display font-black text-3xl text-emerald-600">${(totalEarnings * 0.4).toFixed(2)}</span>
              </div>
            </div>

            {/* Monthly Earnings Chart Mockup / Visual */}
            <div className="bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)]/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase">2026 Monthly Net Volume</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +32% vs Last Quarter
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2 items-end h-36 pt-4 border-b border-[var(--border-subtle)]/10">
                {[
                  { m: 'Mar', val: 4200, pct: '50%' },
                  { m: 'Apr', val: 5600, pct: '65%' },
                  { m: 'May', val: 6800, pct: '80%' },
                  { m: 'Jun', val: 5100, pct: '60%' },
                  { m: 'Jul', val: 7900, pct: '92%' },
                  { m: 'Aug', val: 8400, pct: '98%' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-mono text-[var(--text-primary)]/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${item.val}
                    </span>
                    <div
                      className="w-full bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] rounded-t-lg transition-colors"
                      style={{ height: item.pct }}
                    ></div>
                    <span className="text-[10px] font-mono text-[var(--text-primary)]/60">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Direct Wire / Stripe Connect</p>
                  <p className="text-[11px] text-[var(--text-primary)]/60 font-mono">Connected: Chase Bank (•••• 4821)</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded">
                  Active
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Platform Fee Protocol</p>
                  <p className="text-[11px] text-[var(--text-primary)]/60 font-mono">10% Platform Escrow Fee (Transparent)</p>
                </div>
                <span className="px-2.5 py-1 bg-[var(--bg-elevated)] text-white text-[10px] font-mono font-bold rounded">
                  Artisan Tier
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Skills & Experience */}
      {activeTab === 'skills_exp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]/10 space-y-4">
            <h3 className="font-display font-black text-xl text-[var(--text-primary)] italic">Skills & Tooling</h3>
            
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Add skill (e.g. Cinema 4D)"
                className="flex-1 px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-xl text-xs font-bold"
              >
                Add
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {profile.skills.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-xl text-xs">
                  <div>
                    <span className="font-bold text-[var(--text-primary)]">{sk.name}</span>
                    <span className="text-[10px] text-[var(--text-primary)]/50 font-mono ml-2">({sk.level})</span>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(sk.name)}
                    className="p-1 text-rose-500 hover:bg-rose-100 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]/10 space-y-4">
            <h3 className="font-display font-black text-xl text-[var(--text-primary)] italic">Experience Timeline</h3>
            <div className="space-y-4">
              {profile.workExperience.map((exp) => (
                <div key={exp.id} className="p-3.5 bg-[var(--bg-secondary)] rounded-xl space-y-1">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-bold text-[var(--text-primary)]">{exp.role}</p>
                    <span className="text-[10px] font-mono text-[var(--accent-primary)]">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-primary)]/60 font-mono">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Profile & Rates Settings */}
      {activeTab === 'profile_settings' && (
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 p-6 sm:p-8 max-w-3xl space-y-6">
          <div>
            <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Public Profile & Pricing Rates</h3>
            <p className="text-xs text-[var(--text-primary)]/60">Customize how your artisan card and profile appear to potential clients.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Profession / Title</label>
                <input
                  type="text"
                  required
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Hourly Rate (USD)</label>
                <input
                  type="number"
                  required
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Starting Project Rate (USD)</label>
                <input
                  type="number"
                  required
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Bio / Tagline</label>
              <textarea
                rows={3}
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Location / Studio</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--text-primary)]/60 font-bold mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Rates</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

