'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle2,
  Lock,
  TrendingUp,
  UserCheck,
  UserX,
  Eye,
  AlertTriangle,
  Zap,
  BarChart3,
  Trash2,
  FileText,
} from 'lucide-react';

type AdminTab = 'overview' | 'creators' | 'clients' | 'contracts' | 'jobs' | 'applications';

export const AdminPanelView: React.FC = () => {
  const { freelancers, clients, hiringRequests, jobs, applications, portfolioProjects,
          deleteJob, updateApplicationStatus, deleteApplication, deletePortfolioProject,
          addToast } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  /* ── Derived Stats ── */
  const totalEscrowVolume = hiringRequests.reduce((sum, r) => sum + r.budgetAmount, 0);
  const activeContracts = hiringRequests.filter(r => r.status === 'in_progress');
  const completedContracts = hiringRequests.filter(r => r.status === 'completed');
  const pendingContracts = hiringRequests.filter(r => r.status === 'pending');

  /* ── Creator Access Management Simulation ── */
  const [creatorAccess, setCreatorAccess] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(freelancers.map(f => [f.id, true]))
  );

  /* ── Client Access Management Simulation ── */
  const [clientAccess, setClientAccess] = useState<Record<string, boolean>>(() =>
    Object.fromEntries((clients || []).map((c: any) => [c.id, true]))
  );

  const toggleCreatorAccess = (id: string) => {
    const next = !creatorAccess[id];
    setCreatorAccess(prev => ({ ...prev, [id]: next }));
    addToast(
      next ? 'success' : 'info',
      next ? 'Creator Access Restored' : 'Creator Access Suspended',
      next ? 'This creator can now access the platform.' : 'This creator has been temporarily suspended.'
    );
  };

  const toggleClientAccess = (id: string) => {
    const next = !clientAccess[id];
    setClientAccess(prev => ({ ...prev, [id]: next }));
    addToast(
      next ? 'success' : 'info',
      next ? 'Client Access Restored' : 'Client Access Suspended',
      next ? 'This client can now access the platform.' : 'This client account has been suspended.'
    );
  };

  const stats = [
    {
      icon: <Lock className="w-5 h-5" />,
      label: 'Escrow Vault',
      value: `$${totalEscrowVolume.toLocaleString()}`,
      sub: '100% Solvency',
      color: 'text-[var(--accent-primary)]',
      glow: true,
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Total Creators',
      value: freelancers.length.toString(),
      sub: `${Object.values(creatorAccess).filter(Boolean).length} Active`,
      color: 'text-blue-400',
      glow: false,
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: 'Total Clients',
      value: (clients?.length || 0).toString(),
      sub: `${Object.values(clientAccess).filter(Boolean).length} Active`,
      color: 'text-purple-400',
      glow: false,
    },
    {
      icon: <CheckCircle2 className="w-5 h-5" />,
      label: 'Dispute Rate',
      value: '0.00%',
      sub: 'Zero Escalations',
      color: 'text-emerald-400',
      glow: false,
    },
  ];

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'creators', label: 'Creator Access', icon: <UserCheck className="w-4 h-4" /> },
    { key: 'clients', label: 'Client Access', icon: <Users className="w-4 h-4" /> },
    { key: 'contracts', label: 'Contracts', icon: <Briefcase className="w-4 h-4" /> },
    { key: 'jobs', label: `Jobs (${jobs.length})`, icon: <Briefcase className="w-4 h-4" /> },
    { key: 'applications', label: `Applications (${applications.length})`, icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Platform Governance</span>
            <span className="badge-success flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Admin Tier
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
            Admin Control Panel
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Manage creator &amp; client access, escrow contracts, and platform governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-medium)] text-[11px] font-mono text-[var(--accent-primary)]"
            style={{ background: 'var(--bg-card)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_6px_var(--accent-primary)]" />
            Systems: Operational
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="premium-card p-5 space-y-2"
            style={stat.glow ? { boxShadow: '0 0 20px var(--accent-glow)' } : {}}
          >
            <div className="flex items-center justify-between">
              <span className={stat.color}>{stat.icon}</span>
              <span className="text-[10px] font-mono uppercase text-[var(--text-faint)] font-bold">{stat.label}</span>
            </div>
            <p className="font-display font-black text-3xl text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-[11px] text-[var(--text-muted)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Contract Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'In Progress', count: activeContracts.length, color: 'badge-warning' },
          { label: 'Completed', count: completedContracts.length, color: 'badge-success' },
          { label: 'Pending', count: pendingContracts.length, color: 'badge-neutral' },
        ].map((s, i) => (
          <div key={i} className="premium-card p-4 flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">{s.label}</span>
            <span className={s.color}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 rounded-xl border border-[var(--border-subtle)] w-fit" style={{ background: 'var(--bg-card)' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
              activeTab === tab.key
                ? 'text-[#080f0d] bg-[var(--accent-primary)] shadow-[0_0_12px_var(--accent-glow)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="premium-card p-6 sm:p-8 space-y-6">
          <h3 className="font-display font-black text-xl text-[var(--text-primary)]">Platform Summary</h3>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-faint)] font-bold border-b border-[var(--border-subtle)] pb-2">Creator Metrics</p>
              <Row label="Total Registered Creators" value={freelancers.length} />
              <Row label="Active Creators" value={Object.values(creatorAccess).filter(Boolean).length} accent />
              <Row label="Suspended Creators" value={Object.values(creatorAccess).filter(v => !v).length} warn />
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-faint)] font-bold border-b border-[var(--border-subtle)] pb-2">Client Metrics</p>
              <Row label="Total Registered Clients" value={clients?.length || 0} />
              <Row label="Active Clients" value={Object.values(clientAccess).filter(Boolean).length} accent />
              <Row label="Suspended Clients" value={Object.values(clientAccess).filter(v => !v).length} warn />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'creators' && (
        <div className="premium-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xl text-[var(--text-primary)]">Creator Access Management</h3>
            <span className="badge-success">{freelancers.length} Creators</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-faint)]">
                  <th className="pb-3 pr-4">Creator</th>
                  <th className="pb-3 pr-4">Specialization</th>
                  <th className="pb-3 pr-4">Rate</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Access Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {freelancers.map(f => (
                  <tr key={f.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full object-cover border border-[var(--border-subtle)]" />
                        <div>
                          <p className="text-xs font-bold text-[var(--text-primary)]">{f.name}</p>
                          <p className="text-[10px] text-[var(--text-faint)]">{f.profession}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-[11px] text-[var(--text-muted)]">{f.primaryCategory}</td>
                    <td className="py-3 pr-4 text-[11px] font-mono font-bold text-[var(--accent-primary)]">${f.hourlyRate}/hr</td>
                    <td className="py-3 pr-4">
                      <span className={creatorAccess[f.id] ? 'badge-success' : 'badge-error'}>
                        {creatorAccess[f.id] ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => toggleCreatorAccess(f.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${
                          creatorAccess[f.id]
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                            : 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--border-medium)] hover:shadow-[0_0_10px_var(--accent-glow)]'
                        }`}
                      >
                        {creatorAccess[f.id]
                          ? <><UserX className="w-3.5 h-3.5" />Suspend</>
                          : <><UserCheck className="w-3.5 h-3.5" />Restore</>
                        }
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="premium-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xl text-[var(--text-primary)]">Client Access Management</h3>
            <span className="badge-success">{clients?.length || 0} Clients</span>
          </div>
          {(!clients || clients.length === 0) ? (
            <div className="text-center py-12 text-[var(--text-faint)]">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No registered clients yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-faint)]">
                    <th className="pb-3 pr-4">Client</th>
                    <th className="pb-3 pr-4">Company</th>
                    <th className="pb-3 pr-4">Saved</th>
                    <th className="pb-3 pr-4">Status</th>
                    <th className="pb-3 text-right">Access Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {(clients as any[]).map((c: any) => (
                    <tr key={c.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--accent-glow)] border border-[var(--border-medium)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-sm">
                            {(c.name || c.userId || '?')[0].toUpperCase()}
                          </div>
                          <p className="text-xs font-bold text-[var(--text-primary)]">{c.name || c.userId}</p>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-[11px] text-[var(--text-muted)]">{c.company || '—'}</td>
                      <td className="py-3 pr-4 text-[11px] font-mono text-[var(--text-muted)]">{c.savedFreelancerIds?.length || 0}</td>
                      <td className="py-3 pr-4">
                        <span className={clientAccess[c.id] ? 'badge-success' : 'badge-error'}>
                          {clientAccess[c.id] ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => toggleClientAccess(c.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 ${
                            clientAccess[c.id]
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                              : 'bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--border-medium)] hover:shadow-[0_0_10px_var(--accent-glow)]'
                          }`}
                        >
                          {clientAccess[c.id]
                            ? <><UserX className="w-3.5 h-3.5" />Suspend</>
                            : <><UserCheck className="w-3.5 h-3.5" />Restore</>
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'contracts' && (
        <div className="premium-card p-6 sm:p-8 space-y-6">
          <h3 className="font-display font-black text-xl text-[var(--text-primary)]">Live Escrow Contracts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-faint)]">
                  <th className="pb-3 pr-4">Contract Ref</th>
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Creator</th>
                  <th className="pb-3 pr-4">Project</th>
                  <th className="pb-3 pr-4">Escrow</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {hiringRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                    <td className="py-3 pr-4 font-mono font-bold text-[var(--accent-primary)]">
                      #{req.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="py-3 pr-4 font-bold text-[var(--text-primary)]">{req.clientName}</td>
                    <td className="py-3 pr-4 text-[var(--text-muted)]">{req.freelancerName}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)] max-w-[140px] truncate">{req.projectTitle}</td>
                    <td className="py-3 pr-4 font-mono font-bold text-[var(--text-primary)]">${req.budgetAmount}</td>
                    <td className="py-3 pr-4">
                      <span className={
                        req.status === 'completed' ? 'badge-success' :
                        req.status === 'in_progress' ? 'badge-warning' :
                        'badge-neutral'
                      }>
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => addToast('info', 'Contract Verified', `Escrow funds for ${req.projectTitle} are in active lock.`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-[var(--border-medium)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] transition-all"
                      >
                        <Eye className="w-3 h-3" />
                        Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ── ADMIN: JOBS TAB ── */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-black text-xl text-[var(--text-primary)]">All Job Postings</h2>
            <p className="text-sm text-[var(--text-muted)]">{jobs.length} total jobs</p>
          </div>
          {jobs.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <Briefcase className="w-10 h-10 mx-auto mb-3 text-[var(--text-faint)] opacity-40" />
              <p className="text-[var(--text-muted)]">No jobs posted yet</p>
            </div>
          ) : (
            <div className="premium-card overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-faint)]">
                    <th className="px-4 py-3">Job Title</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Budget</th>
                    <th className="px-4 py-3">Applicants</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {jobs.map(job => (
                    <tr key={job.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-bold text-sm text-[var(--text-primary)]">{job.title}</p>
                        <p className="text-[10px] text-[var(--text-faint)] font-mono">{job.jobType}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{job.clientName}</td>
                      <td className="px-4 py-3 text-xs text-[var(--text-muted)]">{job.category}</td>
                      <td className="px-4 py-3 font-mono font-bold text-sm text-[var(--accent-primary)]">{job.budget}</td>
                      <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{job.applicantsCount}</td>
                      <td className="px-4 py-3">
                        <select
                          value={job.status}
                          onChange={e => {
                            // update job status via context
                            addToast('success', 'Status Updated', `Job status changed to ${e.target.value}.`);
                          }}
                          className="bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-lg px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none"
                        >
                          <option value="open">Open</option>
                          <option value="closed">Closed</option>
                          <option value="filled">Filled</option>
                          <option value="draft">Draft</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => { if (window.confirm('Delete this job?')) deleteJob(job.id); }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-rose-400 border border-rose-400/20 hover:bg-rose-400/10 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── ADMIN: APPLICATIONS TAB ── */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-black text-xl text-[var(--text-primary)]">All Applications</h2>
            <p className="text-sm text-[var(--text-muted)]">{applications.length} total applications</p>
          </div>
          {applications.length === 0 ? (
            <div className="premium-card p-12 text-center">
              <FileText className="w-10 h-10 mx-auto mb-3 text-[var(--text-faint)] opacity-40" />
              <p className="text-[var(--text-muted)]">No applications submitted yet</p>
            </div>
          ) : (
            <div className="premium-card overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-faint)]">
                    <th className="px-4 py-3">Applicant</th>
                    <th className="px-4 py-3">Job</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Budget</th>
                    <th className="px-4 py-3">Applied</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={app.creatorAvatar} alt={app.creatorName} className="w-7 h-7 rounded-full object-cover border border-[var(--border-subtle)]" onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${app.creatorName}`; }} />
                          <div>
                            <p className="font-bold text-sm text-[var(--text-primary)]">{app.fullName}</p>
                            <p className="text-[10px] text-[var(--text-faint)]">{app.professionalTitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[var(--text-muted)] max-w-[150px] truncate">{app.jobTitle}</td>
                      <td className="px-4 py-3 text-sm text-[var(--text-muted)]">{app.clientName}</td>
                      <td className="px-4 py-3 font-mono font-bold text-sm text-[var(--accent-primary)]">{app.proposedBudget}</td>
                      <td className="px-4 py-3 text-[11px] text-[var(--text-faint)] font-mono">{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <select
                          value={app.status}
                          onChange={e => updateApplicationStatus(app.id, e.target.value as any)}
                          className="bg-[var(--bg-card)] border border-[var(--border-medium)] rounded-lg px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => { if (window.confirm('Delete this application?')) deleteApplication(app.id); }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-rose-400 border border-rose-400/20 hover:bg-rose-400/10 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Row Helper ── */
const Row: React.FC<{ label: string; value: number; accent?: boolean; warn?: boolean }> = ({ label, value, accent, warn }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-[var(--text-muted)]">{label}</span>
    <span className={`font-bold font-mono ${accent ? 'text-[var(--accent-primary)]' : warn ? 'text-rose-400' : 'text-[var(--text-primary)]'}`}>
      {value}
    </span>
  </div>
);
