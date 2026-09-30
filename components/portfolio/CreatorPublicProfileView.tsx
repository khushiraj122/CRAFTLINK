'use client';
import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { FreelancerProfile } from '@/types';
import {
  User, MapPin, Globe, ExternalLink, Share2,
  Edit2, Save, X, Loader2, AlertCircle, Mail, Phone,
  Briefcase, Star, CheckCircle2, Image as ImageIcon, Link, Code2
} from 'lucide-react';

const PORTFOLIO_CATEGORIES: string[] = [
  'Graphic Design', 'Branding', 'UI/UX', 'Video Editing',
  'Motion Graphics', 'Web Development', 'Mobile Development',
  'Illustration', 'Photography', '3D & VFX', 'Other',
];

export const CreatorPublicProfileView: React.FC = () => {
  const {
    currentFreelancerProfile, portfolioProjects,
    updateFreelancerProfile, addToast,
  } = useApp();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<FreelancerProfile>>({});
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!currentFreelancerProfile) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-[var(--text-muted)]">No creator profile found.</p>
    </div>
  );

  const profile = currentFreelancerProfile;
  const myProjects = useMemo(() =>
    portfolioProjects.filter(p => p.creatorId === profile.id),
    [portfolioProjects, profile.id]
  );

  const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/freelancer/${profile.username}`;

  const startEdit = () => {
    setForm({ ...profile });
    setSkillInput('');
    setErrors({});
    setEditing(true);
  };

  const setF = (k: keyof FreelancerProfile, v: any) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k as string]; return n; });
  };

  const setSocial = (k: string, v: string) => {
    setForm(p => ({ ...p, socialLinks: { ...(p.socialLinks || {}), [k]: v } }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name?.trim()) e.name = 'Required';
    if (!form.profession?.trim()) e.profession = 'Required';
    if (!form.bio?.trim()) e.bio = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    updateFreelancerProfile(form);
    setSaving(false);
    setEditing(false);
    addToast('success', 'Profile Updated', 'Your public profile has been saved.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${profile.name} — CraftLink Portfolio`, url: publicUrl, text: `Check out ${profile.name}'s portfolio on CraftLink!` });
    } else {
      navigator.clipboard.writeText(publicUrl);
      addToast('success', 'Link Copied!', 'Portfolio link copied to clipboard.');
    }
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    const currentSkills = (form.skills || profile.skills) as any[];
    if (!currentSkills.find((sk: any) => sk.name === s)) {
      setForm(p => ({ ...p, skills: [...currentSkills, { name: s, level: 'Expert', category: 'Design' }] }));
    }
    setSkillInput('');
  };

  const removeSkill = (name: string) => {
    const currentSkills = (form.skills || profile.skills) as any[];
    setForm(p => ({ ...p, skills: currentSkills.filter((sk: any) => sk.name !== name) }));
  };

  const displayProfile = editing ? { ...profile, ...form } : profile;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">My Public Portfolio</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">This is how clients see your profile</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleShare} className="btn-outline flex items-center gap-2 text-sm">
            <Share2 className="w-4 h-4" />Share Link
          </button>
          <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 text-sm">
            <ExternalLink className="w-4 h-4" />View Public
          </a>
          {!editing && (
            <button onClick={startEdit} className="btn-accent flex items-center gap-2">
              <Edit2 className="w-4 h-4" />Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Public link banner */}
      <div className="premium-card p-4 mb-6 flex items-center gap-3" style={{ borderColor: 'var(--accent-primary)', background: 'var(--accent-glow)' }}>
        <Link className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
        <span className="text-sm text-[var(--text-muted)]">Your public portfolio:</span>
        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] text-sm font-mono hover:underline flex-1 truncate">{publicUrl}</a>
        <button onClick={() => { navigator.clipboard.writeText(publicUrl); addToast('success', 'Copied!', 'Portfolio link copied to clipboard.'); }} className="text-[11px] font-bold text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 px-3 py-1 rounded-lg hover:bg-[var(--accent-primary)] hover:text-[#080f0d] transition-all shrink-0">
          Copy Link
        </button>
      </div>

      {editing ? (
        /* ── EDIT FORM ── */
        <div className="space-y-6">
          <div className="premium-card p-6 space-y-5">
            <h3 className="font-display font-bold text-base text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Name *" error={errors.name}>
                <input className="input-field" value={form.name || ''} onChange={e => setF('name', e.target.value)} />
              </FormField>
              <FormField label="Professional Title *" error={errors.profession}>
                <input className="input-field" value={form.profession || ''} onChange={e => setF('profession', e.target.value)} placeholder="e.g. Senior UI/UX Designer" />
              </FormField>
            </div>
            <FormField label="Profile Photo URL">
              <input className="input-field" type="url" value={form.avatar || ''} onChange={e => setF('avatar', e.target.value)} placeholder="https://..." />
              {form.avatar && <img src={form.avatar as string} alt="avatar" className="mt-2 w-16 h-16 rounded-full object-cover border-2 border-[var(--border-medium)]" />}
            </FormField>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Location">
                <input className="input-field" value={form.location || ''} onChange={e => setF('location', e.target.value)} placeholder="City, Country" />
              </FormField>
              <FormField label="Years of Experience">
                <input className="input-field" type="number" value={form.experienceYears || ''} onChange={e => setF('experienceYears', Number(e.target.value))} />
              </FormField>
            </div>
            <FormField label="Bio *" error={errors.bio}>
              <textarea className="input-field" rows={4} value={form.bio || ''} onChange={e => setF('bio', e.target.value)} placeholder="Tell clients about yourself, your passion, and what makes you unique..." />
            </FormField>
            <FormField label="Full Story / About">
              <textarea className="input-field" rows={4} value={form.aboutStory || ''} onChange={e => setF('aboutStory', e.target.value)} placeholder="More in-depth about your journey, specialization, and work style..." />
            </FormField>
          </div>

          {/* Skills */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">Skills</h3>
            <div className="flex gap-2">
              <input className="input-field flex-1" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Add a skill..." />
              <button onClick={addSkill} className="btn-outline px-4">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {((form.skills || profile.skills) as any[]).map((s: any) => (
                <span key={s.name} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl border border-[var(--border-medium)] text-xs font-mono text-[var(--text-muted)]">
                  {s.name}
                  <button onClick={() => removeSkill(s.name)} className="text-[var(--text-faint)] hover:text-rose-400"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="premium-card p-6 space-y-4">
            <h3 className="font-display font-bold text-base text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">Contact & Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Website"><input className="input-field" type="url" value={(form.socialLinks as any)?.website || ''} onChange={e => setSocial('website', e.target.value)} placeholder="https://..." /></FormField>
              <FormField label="LinkedIn"><input className="input-field" type="url" value={(form.socialLinks as any)?.linkedin || ''} onChange={e => setSocial('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." /></FormField>
              <FormField label="GitHub"><input className="input-field" type="url" value={(form.socialLinks as any)?.github || ''} onChange={e => setSocial('github', e.target.value)} placeholder="https://github.com/..." /></FormField>
              <FormField label="Behance"><input className="input-field" type="url" value={(form.socialLinks as any)?.behance || ''} onChange={e => setSocial('behance', e.target.value)} placeholder="https://behance.net/..." /></FormField>
              <FormField label="Dribbble"><input className="input-field" type="url" value={(form.socialLinks as any)?.dribbble || ''} onChange={e => setSocial('dribbble', e.target.value)} placeholder="https://dribbble.com/..." /></FormField>
              <FormField label="Twitter/X"><input className="input-field" type="url" value={(form.socialLinks as any)?.twitter || ''} onChange={e => setSocial('twitter', e.target.value)} placeholder="https://twitter.com/..." /></FormField>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => setEditing(false)} className="btn-outline flex-none">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-accent flex items-center gap-2 flex-1 sm:flex-none justify-center">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Profile</>}
            </button>
          </div>
        </div>
      ) : (
        /* ── PUBLIC PREVIEW ── */
        <div className="space-y-6">
          {/* Hero Card */}
          <div className="premium-card overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10" style={{ backgroundImage: profile.bannerImage ? `url(${profile.bannerImage})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="px-6 pb-6">
              <div className="flex items-end gap-4 -mt-8 mb-4">
                <img src={profile.avatar} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-[var(--bg-elevated)] shadow-lg" onError={e => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`; }} />
                <div className="pb-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display font-black text-xl text-[var(--text-primary)]">{profile.name}</h2>
                    {profile.isVerifiedPro && <CheckCircle2 className="w-5 h-5 text-[var(--accent-primary)]" />}
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{profile.profession}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)] mb-4">
                {profile.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profile.location}</span>}
                {profile.experienceYears > 0 && <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{profile.experienceYears}y experience</span>}
                {profile.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-[var(--accent-primary)] text-[var(--accent-primary)]" />{profile.rating} ({profile.reviewsCount} reviews)</span>}
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{profile.bio}</p>
              {/* Social Links */}
              <div className="flex flex-wrap gap-2">
                {(Object.entries(profile.socialLinks || {}) as [string, string][]).filter(([, v]) => v).map(([k, v]) => (
                  <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-xl border border-[var(--border-medium)] text-xs font-bold text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all capitalize flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />{k}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="premium-card p-6">
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s: any) => (
                  <span key={s.name} className="px-3 py-1 rounded-xl text-xs font-bold font-mono border border-[var(--border-medium)] text-[var(--text-muted)]">{s.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Projects */}
          {myProjects.length > 0 && (
            <div className="premium-card p-6">
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-4">Portfolio Projects ({myProjects.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myProjects.slice(0, 6).map(proj => (
                  <div key={proj.id} className="rounded-xl overflow-hidden border border-[var(--border-subtle)] group">
                    <div className="aspect-video bg-[var(--bg-elevated)] overflow-hidden">
                      <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/400x225/0d1a16/00e5a8?text=${encodeURIComponent(proj.title)}`; }} />
                    </div>
                    <div className="p-3">
                      <span className="text-[10px] font-bold text-[var(--accent-primary)] uppercase">{proj.category}</span>
                      <p className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{proj.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {profile.workExperience.length > 0 && (
            <div className="premium-card p-6">
              <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-4">Experience</h3>
              <div className="space-y-4">
                {profile.workExperience.map(exp => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] mt-2 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-[var(--text-primary)]">{exp.role} <span className="font-normal text-[var(--text-muted)]">@ {exp.company}</span></p>
                      <p className="text-xs text-[var(--text-faint)]">{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FormField: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</label>
    {children}
    {error && <p className="text-[11px] text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);
