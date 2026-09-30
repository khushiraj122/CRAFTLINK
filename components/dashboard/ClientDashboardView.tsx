// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { HiringRequest, FreelancerProfile } from '@/types';
import { ClientJobsView } from '@/components/jobs/ClientJobsView';
import { 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  ShieldCheck, 
  MessageSquare, 
  Plus, 
  ArrowUpRight, 
  FileText, 
  UserCheck, 
  AlertCircle, 
  ExternalLink,
  Sparkles,
  Download,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ClientDashboardView: React.FC = () => {
  const { 
    currentUser, 
    currentClientProfile, 
    hiringRequests, 
    freelancers, 
    savedFreelancerIds, 
    toggleSaveFreelancer, 
    setActiveView, 
    setSelectedFreelancerId, 
    setHiringTargetFreelancer, 
    setIsHireModalOpen, 
    startOrOpenConversation, 
    releaseMilestone, 
    updateClientProfile,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'saved' | 'invoices' | 'settings' | 'jobs'>('projects');
  const [projectStatusFilter, setProjectStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  // Client Profile Edit State
  const [companyName, setCompanyName] = useState(currentClientProfile?.companyName || '');
  const [website, setWebsite] = useState(currentClientProfile?.website || '');
  const [industry, setIndustry] = useState(currentClientProfile?.industry || '');
  const [bio, setBio] = useState(currentClientProfile?.bio || '');
  const [avatar, setAvatar] = useState(currentClientProfile?.avatar || currentUser?.avatar || '');

  // Filter client hiring requests
  const myRequests = hiringRequests.filter(req => 
    req.clientId === currentClientProfile?.id || req.clientEmail === currentUser?.email || req.clientId === 'cli-guest' || req.clientId === 'usr-cli-1'
  );

  const filteredProjects = myRequests.filter(req => {
    if (projectStatusFilter === 'all') return true;
    return req.status === projectStatusFilter;
  });

  const savedFreelancers = freelancers.filter(f => savedFreelancerIds.includes(f.id));

  // Compute Metrics
  const activeProjectsCount = myRequests.filter(r => r.status === 'in_progress' || r.status === 'pending').length;
  const completedProjectsCount = myRequests.filter(r => r.status === 'completed').length;
  const totalEscrowInvested = myRequests.reduce((sum, r) => sum + r.budgetAmount, 0);

  const handleReleaseMilestone = (requestId: string, milestoneId: string) => {
    releaseMilestone(requestId, milestoneId);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClientProfile({
      companyName,
      website,
      industry,
      bio,
      avatar
    });
    addToast('success', 'Profile Updated', 'Client organization profile saved.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Client Command Center</span>
            <span className="px-2 py-0.5 bg-[var(--bg-elevated)] text-white text-[10px] font-mono rounded">Hiring Role</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] italic mt-1">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-primary)]/60 mt-0.5">
            {currentClientProfile?.companyName || 'Private Client'} • Manage active escrow jobs, proposals, and verified talent.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveView('directory');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Hire New Artisan</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[var(--accent-primary)]">
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Active Scope</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">{activeProjectsCount}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">Projects in Escrow</p>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[var(--accent-primary)]">
            <DollarSign className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Total Volume</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">${totalEscrowInvested.toLocaleString()}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">Escrow Protected Funds</p>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Delivered</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">{completedProjectsCount}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">Completed Jobs</p>
        </div>

        <div className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-[var(--accent-primary)]">
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase font-bold text-[var(--text-primary)]/40">Shortlist</span>
          </div>
          <p className="font-display font-black text-3xl text-[var(--text-primary)] italic">{savedFreelancerIds.length}</p>
          <p className="text-[11px] text-[var(--text-primary)]/60">Bookmarked Artisans</p>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b-2 border-[var(--border-subtle)]/10 gap-4 sm:gap-8 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'projects'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Hiring Proposals & Projects ({myRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'saved'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Artisans ({savedFreelancerIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Escrow Invoices & History</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Organization Profile</span>
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
          <span>Job Postings</span>
        </button>
      </div>

      {/* Jobs Tab */}
      {activeTab === 'jobs' && <ClientJobsView />}

      {/* Tab 1: Hiring Proposals & Active Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Status Sub-filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'pending', label: 'Pending Proposal' },
              { id: 'in_progress', label: 'Active Escrow' },
              { id: 'completed', label: 'Completed' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setProjectStatusFilter(st.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                  projectStatusFilter === st.id
                    ? 'bg-[var(--bg-elevated)] text-white'
                    : 'bg-[var(--bg-card)] border border-[var(--border-subtle)]/10 text-[var(--text-primary)]/70 hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => {
                const totalMilestones = proj.milestones.length;
                const completedMilestones = proj.milestones.filter(m => m.completed).length;
                const progressPct = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

                return (
                  <div
                    key={proj.id}
                    className="bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-subtle)]/10 p-6 shadow-sm hover:border-[var(--accent-primary)] transition-colors space-y-5"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]/10">
                      <div className="flex items-center gap-3">
                        <img
                          src={proj.freelancerAvatar}
                          alt={proj.freelancerName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-primary)]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display font-black text-lg text-[var(--text-primary)] italic">
                              {proj.projectTitle}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              proj.status === 'in_progress'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : proj.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-stone-100 text-stone-700'
                            }`}>
                              {proj.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--accent-primary)] font-bold">
                            Artisan: <span className="text-[var(--text-primary)] cursor-pointer hover:underline" onClick={() => { setSelectedFreelancerId(proj.freelancerId); setActiveView('freelancer-profile'); }}>{proj.freelancerName}</span> • {proj.freelancerProfession}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-[var(--text-primary)]/50 uppercase font-bold block">Escrow Budget</span>
                          <span className="font-display font-black text-xl text-[var(--text-primary)] italic">${proj.budgetAmount}</span>
                        </div>
                        <button
                          onClick={() => startOrOpenConversation(proj.freelancerId)}
                          className="p-2.5 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white rounded-full text-[var(--text-primary)] transition-colors"
                          title="Open Project Chat"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Brief & Deliverables Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                      <div className="md:col-span-2 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-primary)]/50 font-bold">Project Scope / Brief:</span>
                        <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed line-clamp-2">
                          {proj.description}
                        </p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-xl space-y-1 font-mono text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-[var(--text-primary)]/60">Target Deadline:</span>
                          <span className="font-bold text-[var(--text-primary)]">{proj.deadline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--text-primary)]/60">Milestone Progress:</span>
                          <span className="font-bold text-[var(--accent-primary)]">{completedMilestones} / {totalMilestones} ({progressPct}%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone Progress Bar */}
                    <div className="w-full bg-[var(--bg-elevated)]/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[var(--accent-primary)] h-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>

                    {/* Interactive Milestone Escrow Release Table */}
                    <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)]/10 p-4 space-y-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/70 font-bold block">
                        Milestone Escrow Checkpoints:
                      </span>

                      <div className="space-y-2">
                        {proj.milestones.map((m, idx) => (
                          <div
                            key={m.id}
                            className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              m.completed
                                ? 'bg-emerald-50/70 border-emerald-200'
                                : 'bg-[var(--bg-card)] border-[var(--border-subtle)]/10'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {m.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border-2 border-[var(--border-subtle)]/30 shrink-0"></span>
                              )}
                              <div>
                                <p className="text-xs font-bold text-[var(--text-primary)]">{m.title}</p>
                                <p className="text-[10px] font-mono text-[var(--text-primary)]/50">Phase #{idx + 1}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 justify-between sm:justify-end">
                              <span className="font-mono font-bold text-xs text-[var(--text-primary)]">${m.amount}</span>

                              {m.completed ? (
                                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-mono font-bold">
                                  Funds Released ✓
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleReleaseMilestone(proj.id, m.id)}
                                  className="px-3.5 py-1.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-[11px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1"
                                >
                                  <span>Approve & Release ${m.amount}</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-dashed border-[var(--border-subtle)]/20 p-12 text-center space-y-4">
                <Briefcase className="w-10 h-10 text-[var(--accent-primary)] mx-auto opacity-70" />
                <h4 className="font-display font-black text-xl text-[var(--text-primary)] italic">No projects under this status</h4>
                <p className="text-xs text-[var(--text-primary)]/60">Explore verified video editors and software architects to start a new job.</p>
                <button
                  onClick={() => setActiveView('directory')}
                  className="px-6 py-2.5 bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase"
                >
                  Browse Talent Directory
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Saved / Shortlisted Freelancers */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">
              Your Shortlisted Artisans ({savedFreelancers.length})
            </h3>
            {savedFreelancers.length > 0 && (
              <span className="text-xs font-mono text-[var(--text-primary)]/50">Quick access for upcoming creative campaigns</span>
            )}
          </div>

          {savedFreelancers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedFreelancers.map((f) => (
                <div key={f.id} className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 p-5 shadow-sm hover:border-[var(--accent-primary)] transition-colors space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--border-subtle)]" />
                      <div>
                        <h4 className="font-display font-black text-base italic text-[var(--text-primary)]">{f.name}</h4>
                        <p className="text-xs font-bold text-[var(--accent-primary)]">{f.profession}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveFreelancer(f.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-full"
                      title="Remove from Shortlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-[var(--text-primary)]/70 line-clamp-2">{f.bio}</p>

                  <div className="pt-3 border-t border-[var(--border-subtle)]/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">${f.hourlyRate}/hr</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startOrOpenConversation(f.id)}
                        className="px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:text-white rounded-full text-xs font-bold transition-colors"
                      >
                        Chat
                      </button>
                      <button
                        onClick={() => {
                          setHiringTargetFreelancer(f);
                          setIsHireModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase transition-all"
                      >
                        Hire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-dashed border-[var(--border-subtle)]/20 p-12 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-[var(--accent-primary)] mx-auto opacity-50" />
              <h4 className="font-display font-black text-xl italic">No saved creators yet</h4>
              <p className="text-xs text-[var(--text-primary)]/60">Click the bookmark icon on any talent card in the directory to save them here.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Escrow Invoices & History */}
      {activeTab === 'invoices' && (
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]/10">
            <div>
              <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Escrow Invoices & Statement</h3>
              <p className="text-xs text-[var(--text-primary)]/60">Receipts and ledger for all milestone releases and deposits.</p>
            </div>
            <button
              onClick={() => addToast('info', 'Exporting Ledger', 'Downloading CSV statement...')}
              className="px-4 py-2 bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:text-white rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]/10 text-[10px] font-mono uppercase text-[var(--text-primary)]/50">
                  <th className="pb-3">Invoice Ref</th>
                  <th className="pb-3">Project & Deliverable</th>
                  <th className="pb-3">Artisan</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/5">
                {myRequests.map((req, idx) => (
                  <tr key={req.id} className="hover:bg-[var(--bg-secondary)]/50">
                    <td className="py-3 font-mono font-bold text-[var(--accent-primary)]">#INV-2026-00{idx + 1}</td>
                    <td className="py-3 font-bold">{req.projectTitle}</td>
                    <td className="py-3">{req.freelancerName}</td>
                    <td className="py-3 font-mono text-[var(--text-primary)]/60">Aug 0{idx + 1}, 2026</td>
                    <td className="py-3 font-mono font-bold">${req.budgetAmount}.00</td>
                    <td className="py-3">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-mono font-bold">
                        Paid via Escrow ✓
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Client Organization Profile Settings */}
      {activeTab === 'settings' && (
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 p-6 sm:p-8 space-y-6 max-w-2xl">
          <div>
            <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">Organization Profile</h3>
            <p className="text-xs text-[var(--text-primary)]/60">This info is shown to freelancers when you submit hiring proposals.</p>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                Company / Studio Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. CinemaPulse Media or Apex OS"
                className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                  Website / Social Channel
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://youtube.com/@channel"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                  Primary Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Tech SaaS / YouTube Media"
                  className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                Organization Bio / Project Overview
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Briefly describe what kind of video or software projects your company regularly commissions..."
                className="w-full px-3.5 py-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-xl text-xs focus:outline-none focus:border-[var(--accent-primary)] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              Save Organization Settings
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

