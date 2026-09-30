'use client';
import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { Job, JobApplication, PortfolioCategory } from '@/types';
import {
  Search, Filter, Briefcase, Clock, DollarSign, Tag, ChevronRight,
  ArrowLeft, Send, CheckCircle2, AlertCircle, X, ExternalLink, Calendar,
  MapPin, User, Phone, Mail, Link, FileText, Loader2
} from 'lucide-react';

const CATEGORIES: string[] = [
  'All', 'Graphic Design', 'Branding', 'UI/UX', 'Video Editing',
  'Motion Graphics', 'Web Development', 'Mobile Development',
  'Illustration', 'Photography', '3D & VFX', 'Other',
];

const JOB_TYPES = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Freelance', 'One-time'];

const STATUS_COLORS: Record<string, string> = {
  Pending: 'badge-neutral',
  'Under Review': 'badge-warning',
  Shortlisted: 'text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase',
  Accepted: 'badge-success',
  Rejected: 'badge-error',
};

/* ── Validation helpers ── */
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v: string) => /^[+\d\s\-()]{7,}$/.test(v);
const isValidUrl = (v: string) => { try { new URL(v); return true; } catch { return false; } };

type ViewState = 'list' | 'detail' | 'apply' | 'history';

export const CreatorJobsView: React.FC = () => {
  const {
    jobs, applications, currentFreelancerProfile, currentUser, clients,
    submitApplication, deleteApplication, updateApplicationStatus, addToast,
    setSelectedJobId, selectedJobId,
  } = useApp();

  const [view, setView] = useState<ViewState>('list');
  const [searchQ, setSearchQ] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  /* ── My Applications ── */
  const myApps = useMemo(() =>
    applications.filter(a => a.creatorId === currentFreelancerProfile?.id)
      .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()),
    [applications, currentFreelancerProfile]
  );

  /* ── Filtered Jobs ── */
  const openJobs = useMemo(() => {
    return jobs
      .filter(j => j.status === 'open')
      .filter(j => catFilter === 'All' || j.category === catFilter)
      .filter(j => typeFilter === 'All' || j.jobType === typeFilter)
      .filter(j => {
        if (!searchQ) return true;
        const q = searchQ.toLowerCase();
        return (
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.requiredSkills.some(s => s.toLowerCase().includes(q))
        );
      });
  }, [jobs, catFilter, typeFilter, searchQ]);

  /* ── Application Form State ── */
  const blankForm = {
    fullName: currentFreelancerProfile?.name || '',
    email: currentFreelancerProfile?.email || '',
    phone: '',
    location: currentFreelancerProfile?.location || '',
    professionalTitle: currentFreelancerProfile?.profession || '',
    skills: currentFreelancerProfile?.skills.map(s => s.name).join(', ') || '',
    experience: String(currentFreelancerProfile?.experienceYears || '') + ' years',
    portfolioLink: currentFreelancerProfile?.socialLinks?.website || '',
    resumeUrl: '',
    proposedBudget: '',
    estimatedDelivery: '',
    coverLetter: '',
    additionalMessage: '',
    behance: currentFreelancerProfile?.socialLinks?.behance || '',
    dribbble: currentFreelancerProfile?.socialLinks?.dribbble || '',
    linkedin: currentFreelancerProfile?.socialLinks?.linkedin || '',
    otherPortfolioLink: '',
  };
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setF = (k: string, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!isValidEmail(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!isValidPhone(form.phone)) e.phone = 'Invalid phone';
    if (!form.location.trim()) e.location = 'Required';
    if (!form.professionalTitle.trim()) e.professionalTitle = 'Required';
    if (!form.skills.trim()) e.skills = 'Required';
    if (!form.experience.trim()) e.experience = 'Required';
    if (!form.portfolioLink.trim()) e.portfolioLink = 'Required';
    else if (!isValidUrl(form.portfolioLink)) e.portfolioLink = 'Invalid URL (include https://)';
    if (!form.proposedBudget.trim()) e.proposedBudget = 'Required';
    if (!form.estimatedDelivery.trim()) e.estimatedDelivery = 'Required';
    if (!form.coverLetter.trim()) e.coverLetter = 'Required';
    if (form.behance && !isValidUrl(form.behance)) e.behance = 'Invalid URL';
    if (form.dribbble && !isValidUrl(form.dribbble)) e.dribbble = 'Invalid URL';
    if (form.linkedin && !isValidUrl(form.linkedin)) e.linkedin = 'Invalid URL';
    if (form.otherPortfolioLink && !isValidUrl(form.otherPortfolioLink)) e.otherPortfolioLink = 'Invalid URL';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleApply = async () => {
    if (!validate() || !selectedJob || !currentFreelancerProfile) return;
    setSubmitting(true);
    try {
      const ok = await submitApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        clientId: selectedJob.clientId,
        clientName: selectedJob.clientName,
        creatorId: currentFreelancerProfile.id,
        creatorName: currentFreelancerProfile.name,
        creatorAvatar: currentFreelancerProfile.avatar,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        professionalTitle: form.professionalTitle,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        experience: form.experience,
        portfolioLink: form.portfolioLink,
        resumeUrl: form.resumeUrl,
        proposedBudget: form.proposedBudget,
        estimatedDelivery: form.estimatedDelivery,
        coverLetter: form.coverLetter,
        additionalMessage: form.additionalMessage,
        behance: form.behance || undefined,
        dribbble: form.dribbble || undefined,
        linkedin: form.linkedin || undefined,
        otherPortfolioLink: form.otherPortfolioLink || undefined,
      });
      if (ok) { setSubmitted(true); }
    } finally {
      setSubmitting(false);
    }
  };

  const openDetail = (job: Job) => {
    setSelectedJobId(job.id);
    setView('detail');
    setSubmitted(false);
    setForm(blankForm);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setView('list');
    setSelectedJobId(null);
    setSubmitted(false);
  };

  /* ── Render ── */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          {(view === 'detail' || view === 'apply') && (
            <button onClick={goBack} className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </button>
          )}
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">
            {view === 'history' ? 'My Applications' : view === 'detail' ? selectedJob?.title : view === 'apply' ? 'Apply for Job' : 'Browse Jobs'}
          </h1>
          {view === 'list' && (
            <p className="text-sm text-[var(--text-muted)] mt-1">{openJobs.length} open positions available</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${view !== 'history' ? 'bg-[var(--accent-primary)] text-[#080f0d]' : 'border border-[var(--border-medium)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            <Briefcase className="w-3.5 h-3.5 inline mr-1.5" />Jobs
          </button>
          <button
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-1.5 ${view === 'history' ? 'bg-[var(--accent-primary)] text-[#080f0d]' : 'border border-[var(--border-medium)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
          >
            <FileText className="w-3.5 h-3.5" />My Applications ({myApps.length})
          </button>
        </div>
      </div>

      {/* ── JOB LIST ── */}
      {view === 'list' && (
        <div className="space-y-6">
          {/* Search + Filters */}
          <div className="premium-card p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--text-faint)]" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search jobs, skills, keywords..."
                className="input-field pl-9"
              />
            </div>
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="input-field w-full sm:w-44">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input-field w-full sm:w-36">
              {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {openJobs.length === 0 ? (
            <div className="premium-card p-16 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-[var(--text-faint)] opacity-40" />
              <p className="font-display font-bold text-lg text-[var(--text-primary)]">No jobs found</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {openJobs.map(job => {
                const alreadyApplied = myApps.some(a => a.jobId === job.id);
                return (
                  <div key={job.id} className="premium-card p-5 sm:p-6 hover:border-[var(--border-medium)] transition-all cursor-pointer" onClick={() => openDetail(job)}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="badge-neutral">{job.category}</span>
                          <span className="badge-neutral">{job.jobType}</span>
                          {alreadyApplied && <span className="badge-success">Applied</span>}
                        </div>
                        <h3 className="font-display font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] mb-1">{job.title}</h3>
                        <p className="text-sm text-[var(--text-muted)] mb-1">{job.clientName}{job.clientCompany ? ` — ${job.clientCompany}` : ''}</p>
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {job.requiredSkills.slice(0, 5).map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold border border-[var(--border-subtle)] text-[var(--text-muted)]">{s}</span>
                          ))}
                          {job.requiredSkills.length > 5 && <span className="text-[11px] text-[var(--text-faint)]">+{job.requiredSkills.length - 5} more</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <p className="font-display font-black text-lg text-[var(--accent-primary)]">{job.budget}</p>
                        <p className="text-[11px] text-[var(--text-faint)] flex items-center gap-1 justify-end mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(job.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-[11px] text-[var(--text-faint)] mt-1">{job.applicantsCount} applicants</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-subtle)]">
                      <p className="text-[11px] text-[var(--text-faint)] font-mono">Posted {new Date(job.postedAt).toLocaleDateString()}</p>
                      <span className="text-[var(--accent-primary)] text-xs font-bold flex items-center gap-1">View Details <ChevronRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── JOB DETAIL ── */}
      {view === 'detail' && selectedJob && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="premium-card p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge-neutral">{selectedJob.category}</span>
                <span className="badge-neutral">{selectedJob.jobType}</span>
                <span className="badge-success">Open</span>
              </div>
              <h2 className="font-display font-black text-2xl text-[var(--text-primary)] mb-2">{selectedJob.title}</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">{selectedJob.clientName}{selectedJob.clientCompany ? ` — ${selectedJob.clientCompany}` : ''}</p>
              <div className="prose max-w-none">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
              </div>
              <div className="mt-6">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-faint)] font-bold mb-3">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map(s => (
                    <span key={s} className="px-3 py-1 rounded-xl text-xs font-mono font-bold border border-[var(--border-medium)] text-[var(--text-secondary)]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="premium-card p-5 space-y-4">
              <div className="flex items-center gap-2 text-[var(--accent-primary)]">
                <DollarSign className="w-5 h-5" />
                <div>
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono">Budget</p>
                  <p className="font-display font-black text-xl text-[var(--text-primary)]">{selectedJob.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--text-muted)]" />
                <div>
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono">Deadline</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{new Date(selectedJob.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[var(--text-muted)]" />
                <div>
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono">Type</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{selectedJob.jobType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--text-muted)]" />
                <div>
                  <p className="text-[10px] text-[var(--text-faint)] uppercase font-mono">Applicants</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{selectedJob.applicantsCount}</p>
                </div>
              </div>
            </div>

            {myApps.some(a => a.jobId === selectedJob.id) ? (
              <div className="premium-card p-5 text-center border-[var(--accent-primary)]" style={{ borderColor: 'var(--accent-primary)' }}>
                <CheckCircle2 className="w-8 h-8 text-[var(--accent-primary)] mx-auto mb-2" />
                <p className="font-bold text-sm text-[var(--text-primary)]">Already Applied</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">View in My Applications</p>
              </div>
            ) : (
              <button
                onClick={() => { setView('apply'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-accent w-full flex items-center justify-center gap-2 py-3.5"
              >
                <Send className="w-4 h-4" />
                Apply Now
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── APPLICATION FORM ── */}
      {view === 'apply' && selectedJob && !submitted && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="premium-card p-5 flex items-center gap-3 border-[var(--accent-primary)]" style={{ borderColor: 'var(--accent-primary)', background: 'var(--accent-glow)' }}>
            <Briefcase className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)]">Applying for: {selectedJob.title}</p>
              <p className="text-xs text-[var(--text-muted)]">{selectedJob.clientName}{selectedJob.clientCompany ? ` — ${selectedJob.clientCompany}` : ''}</p>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <Section title="Personal Information">
            <Grid2>
              <Field label="Full Name *" error={errors.fullName}><input className="input-field" value={form.fullName} onChange={e => setF('fullName', e.target.value)} /></Field>
              <Field label="Email *" error={errors.email}><input className="input-field" type="email" value={form.email} onChange={e => setF('email', e.target.value)} /></Field>
              <Field label="Phone Number *" error={errors.phone}><input className="input-field" type="tel" value={form.phone} onChange={e => setF('phone', e.target.value)} placeholder="+1 555 000 0000" /></Field>
              <Field label="Location *" error={errors.location}><input className="input-field" value={form.location} onChange={e => setF('location', e.target.value)} placeholder="City, Country" /></Field>
            </Grid2>
          </Section>

          {/* PROFESSIONAL INFO */}
          <Section title="Professional Information">
            <Grid2>
              <Field label="Professional Title *" error={errors.professionalTitle}><input className="input-field" value={form.professionalTitle} onChange={e => setF('professionalTitle', e.target.value)} /></Field>
              <Field label="Experience *" error={errors.experience}><input className="input-field" value={form.experience} onChange={e => setF('experience', e.target.value)} placeholder="e.g. 5 years" /></Field>
            </Grid2>
            <Field label="Skills * (comma-separated)" error={errors.skills}>
              <input className="input-field" value={form.skills} onChange={e => setF('skills', e.target.value)} placeholder="e.g. Figma, After Effects, React" />
            </Field>
            <Field label="Portfolio Link *" error={errors.portfolioLink}>
              <input className="input-field" type="url" value={form.portfolioLink} onChange={e => setF('portfolioLink', e.target.value)} placeholder="https://yourportfolio.com" />
            </Field>
            <Field label="Resume/CV (URL or file name)" error={errors.resumeUrl}>
              <input className="input-field" value={form.resumeUrl} onChange={e => setF('resumeUrl', e.target.value)} placeholder="https://... or resume.pdf" />
            </Field>
          </Section>

          {/* PROJECT INFO */}
          <Section title="Project Information">
            <Grid2>
              <Field label="Proposed Budget *" error={errors.proposedBudget}><input className="input-field" value={form.proposedBudget} onChange={e => setF('proposedBudget', e.target.value)} placeholder="e.g. $500 or $50/hr" /></Field>
              <Field label="Estimated Delivery *" error={errors.estimatedDelivery}><input className="input-field" value={form.estimatedDelivery} onChange={e => setF('estimatedDelivery', e.target.value)} placeholder="e.g. 7 days" /></Field>
            </Grid2>
            <Field label="Cover Letter / Proposal *" error={errors.coverLetter}>
              <textarea className="input-field" rows={6} value={form.coverLetter} onChange={e => setF('coverLetter', e.target.value)} placeholder="Describe your approach, relevant experience, and why you're the best fit..." />
            </Field>
            <Field label="Additional Message">
              <textarea className="input-field" rows={3} value={form.additionalMessage} onChange={e => setF('additionalMessage', e.target.value)} placeholder="Any other information you'd like to share..." />
            </Field>
          </Section>

          {/* OTHER LINKS */}
          <Section title="Other Links">
            <Grid2>
              <Field label="Behance" error={errors.behance}><input className="input-field" type="url" value={form.behance} onChange={e => setF('behance', e.target.value)} placeholder="https://behance.net/..." /></Field>
              <Field label="Dribbble" error={errors.dribbble}><input className="input-field" type="url" value={form.dribbble} onChange={e => setF('dribbble', e.target.value)} placeholder="https://dribbble.com/..." /></Field>
              <Field label="LinkedIn" error={errors.linkedin}><input className="input-field" type="url" value={form.linkedin} onChange={e => setF('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></Field>
              <Field label="Other Portfolio Link" error={errors.otherPortfolioLink}><input className="input-field" type="url" value={form.otherPortfolioLink} onChange={e => setF('otherPortfolioLink', e.target.value)} placeholder="https://..." /></Field>
            </Grid2>
          </Section>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button onClick={() => setView('detail')} className="btn-outline flex-1 sm:flex-none">Cancel</button>
            <button
              onClick={handleApply}
              disabled={submitting}
              className="btn-accent flex-1 flex items-center justify-center gap-2"
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : <><Send className="w-4 h-4" />Submit Application</>}
            </button>
          </div>
        </div>
      )}

      {/* ── SUCCESS ── */}
      {view === 'apply' && submitted && (
        <div className="max-w-md mx-auto premium-card p-12 text-center space-y-4" style={{ borderColor: 'var(--accent-primary)' }}>
          <div className="w-16 h-16 rounded-full bg-[var(--accent-glow)] border border-[var(--border-medium)] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[var(--accent-primary)]" />
          </div>
          <h3 className="font-display font-black text-2xl text-[var(--text-primary)]">Application Sent!</h3>
          <p className="text-sm text-[var(--text-muted)]">Your application for <strong className="text-[var(--text-primary)]">{selectedJob?.title}</strong> has been submitted. The client will review it and update your status.</p>
          <div className="flex gap-3 pt-2 justify-center">
            <button onClick={goBack} className="btn-outline">Browse More Jobs</button>
            <button onClick={() => setView('history')} className="btn-accent">My Applications</button>
          </div>
        </div>
      )}

      {/* ── APPLICATION HISTORY ── */}
      {view === 'history' && (
        <div className="space-y-4">
          {myApps.length === 0 ? (
            <div className="premium-card p-16 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-[var(--text-faint)] opacity-40" />
              <p className="font-display font-bold text-lg text-[var(--text-primary)]">No applications yet</p>
              <p className="text-sm text-[var(--text-muted)] mt-1 mb-6">Browse jobs and apply to get started</p>
              <button onClick={() => setView('list')} className="btn-accent">Browse Jobs</button>
            </div>
          ) : (
            <div className="overflow-x-auto premium-card">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[10px] font-mono uppercase text-[var(--text-faint)]">
                    <th className="px-5 py-3">Job</th>
                    <th className="px-5 py-3">Client</th>
                    <th className="px-5 py-3">Budget</th>
                    <th className="px-5 py-3">Applied</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {myApps.map(app => (
                    <tr key={app.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-sm text-[var(--text-primary)]">{app.jobTitle}</p>
                        <p className="text-[11px] text-[var(--text-faint)] font-mono">#{app.jobId.slice(-6)}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-[var(--text-muted)]">{app.clientName}</td>
                      <td className="px-5 py-4 font-mono font-bold text-sm text-[var(--accent-primary)]">{app.proposedBudget}</td>
                      <td className="px-5 py-4 text-[11px] text-[var(--text-faint)] font-mono">{new Date(app.appliedAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4"><span className={STATUS_COLORS[app.status] || 'badge-neutral'}>{app.status}</span></td>
                      <td className="px-5 py-4 text-right">
                        {app.status === 'Pending' && (
                          <button onClick={() => deleteApplication(app.id)} className="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors">Withdraw</button>
                        )}
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

/* ── Helper sub-components ── */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="premium-card p-6 space-y-4">
    <h3 className="font-display font-bold text-base text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">{title}</h3>
    {children}
  </div>
);

const Grid2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

const Field: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div className="space-y-1">
    <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</label>
    {children}
    {error && <p className="text-[11px] text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);
