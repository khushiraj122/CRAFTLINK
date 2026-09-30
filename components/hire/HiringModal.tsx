'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FreelancerProfile, Milestone, Attachment } from '@/types';
import { 
  X, 
  ShieldCheck, 
  UploadCloud, 
  Plus, 
  Trash2, 
  Calendar, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const HiringModal: React.FC = () => {
  const { 
    isHireModalOpen, 
    setIsHireModalOpen, 
    hiringTargetFreelancer, 
    currentUser, 
    currentClientProfile, 
    createHiringRequest,
    setIsAuthModalOpen,
    addToast
  } = useApp();

  const [projectTitle, setProjectTitle] = useState('');
  const [category, setCategory] = useState(hiringTargetFreelancer?.primaryCategory || 'video_editing');
  const [selectedPackage, setSelectedPackage] = useState<'Basic' | 'Standard' | 'Premium' | 'Custom'>('Standard');
  const [budgetType, setBudgetType] = useState<'fixed' | 'hourly'>('fixed');
  const [budgetAmount, setBudgetAmount] = useState<number>(hiringTargetFreelancer?.pricingPackages.standard.price || 500);
  const [deadline, setDeadline] = useState('2026-08-30');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 'm-init-1', title: 'Initial Draft / Milestone 1 Scope', amount: 250, completed: false },
    { id: 'm-init-2', title: 'Final Polish & Full Deliverables', amount: 250, completed: false }
  ]);

  if (!isHireModalOpen || !hiringTargetFreelancer) return null;

  const handlePackageChange = (pkg: 'Basic' | 'Standard' | 'Premium' | 'Custom') => {
    setSelectedPackage(pkg);
    if (pkg === 'Basic') {
      const p = hiringTargetFreelancer.pricingPackages.basic;
      setBudgetAmount(p.price);
      setMilestones([{ id: 'm-1', title: p.title, amount: p.price, completed: false }]);
    } else if (pkg === 'Standard') {
      const p = hiringTargetFreelancer.pricingPackages.standard;
      setBudgetAmount(p.price);
      setMilestones([
        { id: 'm-1', title: 'Phase 1: Concept & Assembly', amount: Math.floor(p.price * 0.5), completed: false },
        { id: 'm-2', title: 'Phase 2: Final Masters & Revisions', amount: Math.ceil(p.price * 0.5), completed: false }
      ]);
    } else if (pkg === 'Premium') {
      const p = hiringTargetFreelancer.pricingPackages.premium;
      setBudgetAmount(p.price);
      setMilestones([
        { id: 'm-1', title: 'Phase 1: Architecture / Storyboard', amount: Math.floor(p.price * 0.4), completed: false },
        { id: 'm-2', title: 'Phase 2: Master Production Cut / Core Code', amount: Math.floor(p.price * 0.4), completed: false },
        { id: 'm-3', title: 'Phase 3: Final Delivery & All Asset Exports', amount: Math.floor(p.price * 0.2), completed: false }
      ]);
    }
  };

  const handleAddMilestone = () => {
    setMilestones(prev => [
      ...prev,
      { id: 'm-' + Date.now(), title: `Milestone ${prev.length + 1}`, amount: 100, completed: false }
    ]);
  };

  const handleRemoveMilestone = (id: string) => {
    if (milestones.length <= 1) return;
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newAtt: Attachment = {
        name: file.name,
        url: '#',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type
      };
      setAttachments(prev => [...prev, newAtt]);
      addToast('success', 'File Attached', `${file.name} ready for transmission.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!projectTitle || !description) {
      addToast('error', 'Missing Information', 'Please provide a project title and description.');
      return;
    }

    createHiringRequest({
      clientId: currentClientProfile?.id || 'cli-guest',
      clientName: currentUser.name,
      clientAvatar: currentUser.avatar,
      clientCompany: currentClientProfile?.companyName || 'Private Client',
      clientEmail: currentUser.email,
      freelancerId: hiringTargetFreelancer.id,
      freelancerName: hiringTargetFreelancer.name,
      freelancerAvatar: hiringTargetFreelancer.avatar,
      freelancerProfession: hiringTargetFreelancer.profession,
      projectTitle,
      category,
      description,
      budgetType,
      budgetAmount,
      deadline,
      selectedPackage,
      attachments,
      milestones
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-4 border-[var(--border-subtle)] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={() => setIsHireModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[var(--text-primary)]/50 hover:text-[var(--text-primary)] rounded-full hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Creator Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[var(--border-subtle)]/10">
          <img
            src={hiringTargetFreelancer.avatar}
            alt={hiringTargetFreelancer.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[var(--accent-primary)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-xl italic">{hiringTargetFreelancer.name}</h3>
              {hiringTargetFreelancer.isVerifiedPro && (
                <span className="px-2 py-0.5 bg-[var(--accent-primary)] text-white text-[9px] font-black uppercase tracking-wider rounded-full">
                  Pro Artisan
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--accent-primary)] font-bold">{hiringTargetFreelancer.profession}</p>
            <p className="text-[11px] text-[var(--text-primary)]/60 font-mono">
              Rate: ${hiringTargetFreelancer.hourlyRate}/hr • Starting at ${hiringTargetFreelancer.startingPrice}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Package / Scope Selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/70 mb-2">
              Choose Service Tier or Custom Scope
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {(['Basic', 'Standard', 'Premium', 'Custom'] as const).map((pkg) => (
                <button
                  key={pkg}
                  type="button"
                  onClick={() => handlePackageChange(pkg)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedPackage === pkg
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 font-bold shadow-sm'
                      : 'border-[var(--border-subtle)]/10 bg-[var(--bg-card)] hover:border-[var(--border-subtle)]/30'
                  }`}
                >
                  <p className="text-xs font-black uppercase">{pkg}</p>
                  <p className="text-xs font-mono font-bold text-[var(--accent-primary)] mt-1">
                    {pkg === 'Custom' 
                      ? 'Flexible' 
                      : `$${hiringTargetFreelancer.pricingPackages[pkg.toLowerCase() as 'basic' | 'standard' | 'premium'].price}`}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Project Title */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/70 mb-1">
              Project Title
            </label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. YouTube 20-min Documentary Edit or Next.js Web App Feature"
              className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-xl text-sm focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>

          {/* Budget and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/70 mb-1">
                Total Budget (USD)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-[var(--text-primary)]/40 absolute left-3.5 top-3" />
                <input
                  type="number"
                  min="50"
                  required
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-xl text-sm font-mono font-bold focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/70 mb-1">
                Target Delivery Deadline
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[var(--text-primary)]/40 absolute left-3.5 top-3" />
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-xl text-sm font-mono focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Project Description / Creative Brief */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/70 mb-1">
              Creative Brief & Technical Requirements
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your vision, raw asset specs (e.g. 4K ProRes / Next.js GitHub repo), key deliverables, and reference links..."
              className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-xl text-sm focus:outline-none focus:border-[var(--accent-primary)] leading-relaxed"
            />
          </div>

          {/* Milestones Breakdown */}
          <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-subtle)]/10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/80">
                Escrow Milestones
              </label>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="text-[11px] font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Milestone
              </button>
            </div>

            <div className="space-y-2">
              {milestones.map((m, idx) => (
                <div key={m.id} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[var(--text-primary)]/50 w-5">#{idx + 1}</span>
                  <input
                    type="text"
                    value={m.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, title: val } : item));
                    }}
                    placeholder="Milestone description"
                    className="flex-1 px-3 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/15 rounded-lg text-xs"
                  />
                  <div className="relative w-24">
                    <span className="absolute left-2.5 top-1.5 text-xs text-[var(--text-primary)]/50">$</span>
                    <input
                      type="number"
                      value={m.amount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, amount: val } : item));
                      }}
                      className="w-full pl-6 pr-2 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/15 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(m.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reference Files Upload */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/70 mb-2">
              Attach Brief / Wireframe / Reference Media
            </label>
            <div className="border-2 border-dashed border-[var(--border-subtle)]/20 hover:border-[var(--accent-primary)] rounded-xl p-4 text-center bg-[var(--bg-card)]/50 cursor-pointer transition-colors relative">
              <input
                type="file"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-6 h-6 text-[var(--accent-primary)] mx-auto mb-1" />
              <p className="text-xs font-bold text-[var(--text-primary)]">Click or Drag & Drop Reference Files</p>
              <p className="text-[10px] text-[var(--text-primary)]/50 mt-0.5">PDF briefs, Figma PNGs, scripts, or video clips</p>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((att, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)]/15 rounded-lg text-xs font-mono"
                  >
                    <FileText className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>{att.name}</span>
                    <span className="text-[10px] opacity-60">({att.size})</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Escrow Guarantee Notice */}
          <div className="bg-[var(--bg-elevated)] text-white p-4 rounded-xl flex items-start gap-3 border border-white/10">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-[var(--text-primary)]">100% Escrow Protection Guaranteed</p>
              <p className="text-[var(--text-primary)]/70 mt-0.5 leading-relaxed">
                Funds are securely held in escrow and only released upon your explicit approval of each milestone deliverable.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsHireModalOpen(false)}
              className="px-6 py-3 border border-[var(--border-subtle)]/20 text-[var(--text-primary)] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Fund Escrow & Send Proposal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

