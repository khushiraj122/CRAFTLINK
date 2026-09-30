'use client';
import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { PortfolioProject, PortfolioCategory } from '@/types';
import {
  Plus, Edit2, Trash2, Eye, X, Save, AlertCircle, Image as ImageIcon,
  Link, Tag, Wrench, ChevronRight, Loader2, FolderOpen, ExternalLink
} from 'lucide-react';

const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'Graphic Design', 'Branding', 'UI/UX', 'Video Editing',
  'Motion Graphics', 'Web Development', 'Mobile Development',
  'Illustration', 'Photography', '3D & VFX', 'Other',
];

const CATEGORY_COLORS: Record<string, string> = {
  'Graphic Design': 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  'Branding': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  'UI/UX': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Video Editing': 'text-red-400 bg-red-500/10 border-red-500/20',
  'Motion Graphics': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Web Development': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'Mobile Development': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Illustration': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  'Photography': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  '3D & VFX': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  'Other': 'text-gray-400 bg-gray-500/10 border-gray-500/20',
};

const isValidUrl = (v: string) => { try { new URL(v); return true; } catch { return false; } };

const blank = (): Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'> => ({
  creatorId: '',
  title: '',
  coverImage: '',
  description: '',
  category: 'Graphic Design',
  tools: [],
  images: [],
  projectLink: '',
});

export const CreatorPortfolioView: React.FC = () => {
  const {
    portfolioProjects, currentFreelancerProfile,
    createPortfolioProject, updatePortfolioProject, deletePortfolioProject,
    addToast,
  } = useApp();

  const myProjects = useMemo(() =>
    portfolioProjects.filter(p => p.creatorId === currentFreelancerProfile?.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [portfolioProjects, currentFreelancerProfile]
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState<string>('All');
  const [form, setForm] = useState<Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>>(blank());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toolInput, setToolInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [saving, setSaving] = useState(false);

  const previewProject = previewId ? portfolioProjects.find(p => p.id === previewId) : null;

  const setF = (k: string, v: any) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Required';
    if (!form.coverImage.trim()) e.coverImage = 'Required';
    else if (!isValidUrl(form.coverImage)) e.coverImage = 'Invalid URL (include https://)';
    if (!form.description.trim()) e.description = 'Required';
    if (!form.category) e.category = 'Required';
    if (form.projectLink && !isValidUrl(form.projectLink)) e.projectLink = 'Invalid URL';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const openCreate = () => {
    setForm({ ...blank(), creatorId: currentFreelancerProfile?.id || '' });
    setEditingId(null);
    setToolInput('');
    setImageInput('');
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (p: PortfolioProject) => {
    setForm({ ...p });
    setEditingId(p.id);
    setToolInput('');
    setImageInput('');
    setErrors({});
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 300));
    if (editingId) {
      updatePortfolioProject(editingId, form);
    } else {
      createPortfolioProject({ ...form, creatorId: currentFreelancerProfile?.id || '' });
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this project?')) deletePortfolioProject(id);
  };

  const addTool = () => {
    const t = toolInput.trim();
    if (!t) return;
    if (!form.tools.includes(t)) setF('tools', [...form.tools, t]);
    setToolInput('');
  };

  const addImage = () => {
    const url = imageInput.trim();
    if (!url || !isValidUrl(url)) { addToast('error', 'Invalid URL', 'Enter a valid image URL with https://'); return; }
    setF('images', [...form.images, url]);
    setImageInput('');
  };

  const filteredProjects = catFilter === 'All' ? myProjects : myProjects.filter(p => p.category === catFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)]">My Portfolio</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{myProjects.length} projects · Visible to clients and visitors</p>
        </div>
        <button onClick={openCreate} className="btn-accent flex items-center gap-2">
          <Plus className="w-4 h-4" />Add Project
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...PORTFOLIO_CATEGORIES].map(c => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${catFilter === c ? 'bg-[var(--accent-primary)] text-[#080f0d] border-transparent' : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-medium)]'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="premium-card p-16 text-center">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-[var(--text-faint)] opacity-40" />
          <p className="font-display font-bold text-lg text-[var(--text-primary)]">No projects yet</p>
          <p className="text-sm text-[var(--text-muted)] mt-1 mb-6">Add your first portfolio project</p>
          <button onClick={openCreate} className="btn-accent mx-auto flex items-center gap-2">
            <Plus className="w-4 h-4" />Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="premium-card overflow-hidden group">
              {/* Cover */}
              <div className="relative aspect-video bg-[var(--bg-elevated)] overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/800x450/0d1a16/00e5a8?text=${encodeURIComponent(project.title)}`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 gap-2">
                  <button onClick={() => setPreviewId(project.id)} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:bg-white/30 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button onClick={() => openEdit(project)} className="flex items-center gap-1 bg-[var(--accent-primary)]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[#080f0d] text-xs font-bold hover:bg-[var(--accent-primary)] transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="flex items-center gap-1 bg-rose-500/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:bg-rose-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {/* Info */}
              <div className="p-4 space-y-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${CATEGORY_COLORS[project.category] || 'badge-neutral'}`}>
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-base text-[var(--text-primary)] line-clamp-1">{project.title}</h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2">{project.description}</p>
                {project.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tools.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-0.5 text-[10px] font-mono border border-[var(--border-subtle)] text-[var(--text-faint)] rounded">{t}</span>
                    ))}
                    {project.tools.length > 3 && <span className="text-[10px] text-[var(--text-faint)]">+{project.tools.length - 3}</span>}
                  </div>
                )}
                {project.projectLink && (
                  <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-[var(--accent-primary)] hover:underline" onClick={e => e.stopPropagation()}>
                    <ExternalLink className="w-3 h-3" /> View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── ADD / EDIT FORM MODAL ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl my-6 rounded-2xl border border-[var(--border-medium)] shadow-2xl" style={{ background: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)]">
              <h3 className="font-display font-black text-lg text-[var(--text-primary)]">
                {editingId ? 'Edit Project' : 'Add Portfolio Project'}
              </h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-primary)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Title + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Project Title *" error={errors.title}>
                  <input className="input-field" value={form.title} onChange={e => setF('title', e.target.value)} placeholder="My Amazing Project" />
                </FormField>
                <FormField label="Category *" error={errors.category}>
                  <select className="input-field" value={form.category} onChange={e => setF('category', e.target.value as PortfolioCategory)}>
                    {PORTFOLIO_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FormField>
              </div>

              {/* Cover Image */}
              <FormField label="Cover Image URL *" error={errors.coverImage}>
                <input className="input-field" type="url" value={form.coverImage} onChange={e => setF('coverImage', e.target.value)} placeholder="https://images.unsplash.com/..." />
                {form.coverImage && isValidUrl(form.coverImage) && (
                  <img src={form.coverImage} alt="cover" className="mt-2 w-full h-32 object-cover rounded-lg border border-[var(--border-subtle)]" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                )}
              </FormField>

              {/* Description */}
              <FormField label="Description *" error={errors.description}>
                <textarea className="input-field" rows={4} value={form.description} onChange={e => setF('description', e.target.value)} placeholder="Describe the project, your role, and outcome..." />
              </FormField>

              {/* Tools */}
              <FormField label="Tools / Software Used">
                <div className="flex gap-2">
                  <input className="input-field flex-1" value={toolInput} onChange={e => setToolInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTool())} placeholder="e.g. Figma" />
                  <button onClick={addTool} className="btn-outline px-4 text-sm">Add</button>
                </div>
                {form.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.tools.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border-medium)] text-xs text-[var(--text-muted)]">
                        {t}
                        <button onClick={() => setF('tools', form.tools.filter(x => x !== t))} className="text-[var(--text-faint)] hover:text-rose-400"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </FormField>

              {/* Additional Images */}
              <FormField label="Additional Image URLs">
                <div className="flex gap-2">
                  <input className="input-field flex-1" type="url" value={imageInput} onChange={e => setImageInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())} placeholder="https://..." />
                  <button onClick={addImage} className="btn-outline px-4 text-sm">Add</button>
                </div>
                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-full h-20 object-cover rounded-lg border border-[var(--border-subtle)]" />
                        <button onClick={() => setF('images', form.images.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </FormField>

              {/* Project Link */}
              <FormField label="Project Link" error={errors.projectLink}>
                <input className="input-field" type="url" value={form.projectLink || ''} onChange={e => setF('projectLink', e.target.value)} placeholder="https://..." />
              </FormField>
            </div>

            <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-accent flex items-center gap-2">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Project</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PREVIEW MODAL ── */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl my-6 rounded-2xl border border-[var(--border-medium)] shadow-2xl overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <img src={previewProject.coverImage} alt={previewProject.title} className="w-full aspect-video object-cover" onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/900x500/0d1a16/00e5a8?text=${encodeURIComponent(previewProject.title)}`; }} />
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border mb-2 ${CATEGORY_COLORS[previewProject.category] || 'badge-neutral'}`}>{previewProject.category}</span>
                  <h2 className="font-display font-black text-2xl text-[var(--text-primary)]">{previewProject.title}</h2>
                </div>
                <button onClick={() => setPreviewId(null)} className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-primary)] shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{previewProject.description}</p>
              {previewProject.tools.length > 0 && (
                <div>
                  <p className="text-[10px] font-mono uppercase text-[var(--text-faint)] mb-2">Tools Used</p>
                  <div className="flex flex-wrap gap-2">
                    {previewProject.tools.map(t => <span key={t} className="px-2.5 py-1 rounded-lg border border-[var(--border-medium)] text-xs font-mono text-[var(--text-muted)]">{t}</span>)}
                  </div>
                </div>
              )}
              {previewProject.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {previewProject.images.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full aspect-video object-cover rounded-xl border border-[var(--border-subtle)]" />
                  ))}
                </div>
              )}
              {previewProject.projectLink && (
                <a href={previewProject.projectLink} target="_blank" rel="noopener noreferrer" className="btn-accent inline-flex items-center gap-2 mt-2">
                  <ExternalLink className="w-4 h-4" /> View Live Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Form Field helper ── */
const FormField: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{label}</label>
    {children}
    {error && <p className="text-[11px] text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);
