'use client';
import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Job, JobType, PortfolioCategory } from '@/types';
import {
  Plus, Edit2, Trash2, Eye, X, Save, AlertCircle, Briefcase,
  Calendar, DollarSign, Users, Tag, Loader2, ChevronRight,
  CheckCircle2, Clock, Search, Filter
} from 'lucide-react';

const CATEGORIES: string[] = [
  'Graphic Design', 'Branding', 'UI/UX', 'Video Editing',
  'Motion Graphics', 'Web Development', 'Mobile Development',
  'Illustration', 'Photography', '3D & VFX', 'Other',
];
const JOB_TYPES: JobType[] = ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'One-time'];
const STATUS_OPTIONS = ['open', 'closed', 'filled', 'draft'] as const;

const STATUS_BADGE: Record<string, string> = {
  open: 'badge-success',
  closed: 'badge-error',
  filled: 'text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase',
  draft: 'badge-neutral',
};

const blankJob = (): Omit<Job, 'id' | 'postedAt' | 'updatedAt' | 'applicantsCount' | 'status' | 'clientId' | 'clientName' | 'clientAvatar' | 'clientCompany'> => ({
  title: '',
  description: '',
  requiredSkills: [],
  budget: '',
  deadline: '',
  jobType: 'Freelance',
  category: 'UI/UX',
});

type ViewMode = 'list' | 'applications';

export const ClientJobsView: React.FC = () => {
  const {
    jobs, applications, clients, currentClientProfile,
    createJob, updateJob, deleteJob, updateApplicationStatus,
    setSelectedJobId, selectedJobId, addToast,
    freelancers, setActiveView, setSelectedFreelancerId,
  } = useApp();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ReturnType<typeof blankJob>>(blankJob());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillInput, setSkillInput] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  /* ── Client's jobs ── */
  const myJobs = useMemo(() =>
    jobs.filter(j => j.clientId === currentClientProfile?.id)
      .filter(j => !searchQ || j.title.toLowerCase().includes(searchQ.toLowerCase()))
      .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()),
    [jobs, currentClientProfile, searchQ]
  );

  /* ── Applications for selected job ── */
  const jobApps = useMemo(() =>
    applications.filter(a => a.jobId === selectedJobId)
      .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()),
    [applications, selectedJobId]
  );

  const selectedApp = selectedAppId ? jobApps.find(a => a.id === selectedAppId) : null;
  const selectedJob = selectedJobId ? jobs.find(j => j.id === selectedJobId) : null;

  /* ── Helpers ── */
  const setF = (k: string, v: any) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.description.trim()) e.description = 'Required';
    if (!form.budget.trim()) e.budget = 'Required';
    if (!form.deadline) e.deadline = 'Required';
    if (!form.category) e.category = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openCreate = () => {
    setForm(blankJob());
    setEditingId(null);
    setSkillInput('');
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (job: Job) => {
    setForm({
      title: job.title,
      description: job.description,
      requiredSkills: [...job.requiredSkills],
      budget: job.budget,
      deadline: job.deadline.split('T')[0],
      jobType: job.jobType as JobType,
      category: job.category,
    });
    setEditingId(job.id);
    setSkillInput('');
    setErrors({});
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!validate() || !currentClientProfile) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    if (editingId) {
      updateJob(editingId, form);
    } else {
      createJob({
        ...form,
        clientId: currentClientProfile.id,
        clientName: currentClientProfile.name,
        clientAvatar: currentClientProfile.avatar,
        clientCompany: currentClientProfile.companyName,
      });
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (jobId: string) => {
    if (window.confirm('Delete this job and all its applications?')) deleteJob(jobId);
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (!form.requiredSkills.includes(s)) setF('requiredSkills', [...form.requiredSkills, s]);
    setSkillInput('');
  };

  const openApplications = (job: Job) => {
    setSelectedJobId(job.id);
    setViewMode('applications');
    setSelectedAppId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewCreatorProfile = (creatorId: string) => {
    const fl = freelancers.find(f => f.id === creatorId);
    if (fl) {
      setSelectedFreelancerId(fl.id);
      setActiveView('profile');
    } else {
      addToast('info', 'Profile', 'Creator profile not available.');
    }
  };

  const STATUS_COLORS: Record<string, string> = {
    Pending: 'badge-neutral',
    'Under Review': 'badge-warning',
    Shortlisted: 'text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase',
    Accepted: 'badge-success',
    Rejected: 'badge-error',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          {viewMode === 'applications' && (
            <button onClick={() => { setViewMode('list'); setSelectedJobId(null); setSelectedAppId(null); }} className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider mb-3 transition-colors">
              ← Back to My Jobs
            </button>
          )}
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
            {viewMode === 'applications' ? `Applications — ${selectedJob?.title}` : 'My Job Postings'}
          </h1>
          {viewMode === 'list' && <p className="text-sm text-[var(--text-muted)] mt-1">{myJobs.length} jobs posted</p>}
          {viewMode === 'applications' && <p className="text-sm text-[var(--text-muted)] mt-1">{jobApps.length} applicants</p>}
        </div>
        {viewMode === 'list' && (
          <button onClick={openCreate} className="btn-accent flex items-center gap-2">
            <Plus className="w-4 h-4" />Post New Job
          </button>
        )}
      </div>

      {/* ── JOB LIST ── */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="premium-card p-3 flex items-center gap-3">
            <Search className="w-4 h-4 text-[var(--text-faint)] shrink-0" />
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search your jobs..." className="bg-transparent flex-1 text-sm focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-faint)]" />
          </div>

          {myJobs.length === 0 ? (
            <div className="premium-card p-16 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-[var(--text-faint)] opacity-40" />
              <p className="font-display font-bold text-lg text-[var(--text-primary)]">No jobs posted yet</p>
              <p className="text-sm text-[var(--text-muted)] mt-1 mb-6">Post your first job to find talented creators</p>
              <button onClick={openCreate} className="btn-accent mx-auto flex items-center gap-2">
                <Plus className="w-4 h-4" />Post a Job
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myJobs.map(job => {
                const appCount = applications.filter(a => a.jobId === job.id).length;
                return (
                  <div key={job.id} className="premium-card p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={STATUS_BADGE[job.status] || 'badge-neutral'}>{job.status}</span>
                          <span className="badge-neutral">{job.category}</span>
                          <span className="badge-neutral">{job.jobType}</span>
                        </div>
                        <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">{job.title}</h3>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{job.description}</p>
                        {job.requiredSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {job.requiredSkills.slice(0, 4).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded-lg text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-faint)]">{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <p className="font-display font-black text-lg text-[var(--accent-primary)]">{job.budget}</p>
                        <p className="text-[11px] text-[var(--text-faint)] mt-1 flex items-center gap-1 justify-end">
                          <Calendar className="w-3 h-3" />{new Date(job.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                      <div className="flex items-center gap-4 text-xs text-[var(--text-faint)]">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{appCount} applicants</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openApplications(job)} className="flex items-center gap-1.5 text-xs font-bold text-[var(--accent-primary)] hover:underline">
                          View Applications ({appCount}) <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => openEdit(job)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(job.id)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-rose-400 hover:border-rose-400/30 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── APPLICATIONS VIEW ── */}
      {viewMode === 'applications' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Application list */}
          <div className={`${selectedApp ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-3`}>
            {jobApps.length === 0 ? (
              <div className="premium-card p-12 text-center">
                <Users className="w-10 h-10 mx-auto mb-3 text-[var(--text-faint)] opacity-40" />
                <p className="font-bold text-[var(--text-primary)]">No applications yet</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">Creators haven't applied to this job yet</p>
              </div>
            ) : (
              jobApps.map(app => (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`premium-card p-4 cursor-pointer transition-all ${selectedApp?.id === app.id ? 'border-[var(--accent-primary)] bg-[var(--accent-glow)]' : 'hover:border-[var(--border-medium)]'}`}
                >
                  <div className="flex items-start gap-3">
                    <img src={app.creatorAvatar} alt={app.creatorName} className="w-10 h-10 rounded-full object-cover border border-[var(--border-subtle)] shrink-0" onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${app.creatorName}`; }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-sm text-[var(--text-primary)] truncate">{app.fullName}</p>
                        <span className={STATUS_COLORS[app.status] || 'badge-neutral'}>{app.status}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">{app.professionalTitle}</p>
                      <p className="text-[11px] text-[var(--text-faint)] font-mono mt-0.5">Budget: {app.proposedBudget} · {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Application Detail */}
          {selectedApp && (
            <div className="lg:col-span-8 space-y-4">
              <div className="premium-card p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedApp.creatorAvatar} alt={selectedApp.creatorName} className="w-14 h-14 rounded-2xl object-cover border-2 border-[var(--border-medium)]" onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${selectedApp.creatorName}`; }} />
                    <div>
                      <h3 className="font-display font-black text-xl text-[var(--text-primary)]">{selectedApp.fullName}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{selectedApp.professionalTitle}</p>
                      <p className="text-xs text-[var(--text-faint)] font-mono">{selectedApp.location}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAppId(null)} className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-primary)]">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <div><p className="text-[10px] text-[var(--text-faint)] uppercase font-mono mb-1">Email</p><p className="text-sm text-[var(--text-primary)]">{selectedApp.email}</p></div>
                  <div><p className="text-[10px] text-[var(--text-faint)] uppercase font-mono mb-1">Phone</p><p className="text-sm text-[var(--text-primary)]">{selectedApp.phone}</p></div>
                  <div><p className="text-[10px] text-[var(--text-faint)] uppercase font-mono mb-1">Proposed Budget</p><p className="text-sm font-bold text-[var(--accent-primary)]">{selectedApp.proposedBudget}</p></div>
                  <div><p className="text-[10px] text-[var(--text-faint)] uppercase font-mono mb-1">Est. Delivery</p><p className="text-sm text-[var(--text-primary)]">{selectedApp.estimatedDelivery}</p></div>
                </div>

                {/* Skills */}
                {selectedApp.skills.length > 0 && (
                  <div className="mb-5">
                    <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono font-bold mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.skills.map(s => <span key={s} className="px-2.5 py-1 rounded-xl border border-[var(--border-medium)] text-xs font-mono text-[var(--text-muted)]">{s}</span>)}
                    </div>
                  </div>
                )}

                {/* Experience */}
                <div className="mb-5">
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono font-bold mb-1">Experience</p>
                  <p className="text-sm text-[var(--text-secondary)]">{selectedApp.experience}</p>
                </div>

                {/* Cover Letter */}
                <div className="mb-5 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono font-bold mb-2">Cover Letter</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{selectedApp.coverLetter}</p>
                </div>

                {/* Additional Message */}
                {selectedApp.additionalMessage && (
                  <div className="mb-5">
                    <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono font-bold mb-1">Additional Message</p>
                    <p className="text-sm text-[var(--text-secondary)]">{selectedApp.additionalMessage}</p>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedApp.portfolioLink && <a href={selectedApp.portfolioLink} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs flex items-center gap-1.5">Portfolio ↗</a>}
                  {selectedApp.behance && <a href={selectedApp.behance} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs flex items-center gap-1.5">Behance ↗</a>}
                  {selectedApp.dribbble && <a href={selectedApp.dribbble} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs flex items-center gap-1.5">Dribbble ↗</a>}
                  {selectedApp.linkedin && <a href={selectedApp.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs flex items-center gap-1.5">LinkedIn ↗</a>}
                  <button onClick={() => viewCreatorProfile(selectedApp.creatorId)} className="btn-outline text-xs flex items-center gap-1.5">CraftLink Profile ↗</button>
                </div>

                {/* Status Controls */}
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono font-bold mb-3">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => updateApplicationStatus(selectedApp.id, s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedApp.status === s ? 'bg-[var(--accent-primary)] text-[#080f0d] border-transparent' : 'border-[var(--border-medium)] text-[var(--text-muted)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── JOB FORM MODAL ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl my-6 rounded-2xl border border-[var(--border-medium)] shadow-2xl" style={{ background: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
              <h3 className="font-display font-black text-lg text-[var(--text-primary)]">{editingId ? 'Edit Job' : 'Post New Job'}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <FField label="Job Title *" error={errors.title}>
                <input className="input-field" value={form.title} onChange={e => setF('title', e.target.value)} placeholder="e.g. UI/UX Designer for SaaS Product" />
              </FField>

              <FField label="Description *" error={errors.description}>
                <textarea className="input-field" rows={5} value={form.description} onChange={e => setF('description', e.target.value)} placeholder="Describe the project, deliverables, and what you're looking for..." />
              </FField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FField label="Category *" error={errors.category}>
                  <select className="input-field" value={form.category} onChange={e => setF('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FField>
                <FField label="Job Type *">
                  <select className="input-field" value={form.jobType} onChange={e => setF('jobType', e.target.value as JobType)}>
                    {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </FField>
                <FField label="Budget *" error={errors.budget}>
                  <input className="input-field" value={form.budget} onChange={e => setF('budget', e.target.value)} placeholder="e.g. $500 - $1500 or Negotiable" />
                </FField>
                <FField label="Deadline *" error={errors.deadline}>
                  <input className="input-field" type="date" value={form.deadline} onChange={e => setF('deadline', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </FField>
              </div>

              <FField label="Required Skills">
                <div className="flex gap-2">
                  <input className="input-field flex-1" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="e.g. Figma, React" />
                  <button onClick={addSkill} className="btn-outline px-4 text-sm">Add</button>
                </div>
                {form.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.requiredSkills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-medium)] text-xs font-mono text-[var(--text-muted)]">
                        {s}
                        <button onClick={() => setF('requiredSkills', form.requiredSkills.filter(x => x !== s))} className="text-[var(--text-faint)] hover:text-rose-400"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </FField>
            </div>

            <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-accent flex items-center gap-2">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />{editingId ? 'Update Job' : 'Post Job'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FField: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</label>
    {children}
    {error && <p className="text-[11px] text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);
