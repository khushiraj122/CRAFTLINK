'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { X, Briefcase, Video, ShieldCheck, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, switchUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, selectedRole);
    setIsAuthModalOpen(false);
  };

  const handleInstantDemoLogin = (role: UserRole) => {
    switchUser(role);
    setIsAuthModalOpen(false);
  };

  const roleOptions: { role: UserRole; icon: React.ReactNode; label: string; sublabel: string }[] = [
    {
      role: 'client',
      icon: <Briefcase className="w-4 h-4" />,
      label: 'Client',
      sublabel: 'I want to hire talent',
    },
    {
      role: 'freelancer',
      icon: <Video className="w-4 h-4" />,
      label: 'Creator',
      sublabel: 'I want to get hired',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[var(--border-medium)] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
        style={{ background: 'var(--bg-elevated)' }}
      >
        {/* Top glow line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-60" />

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-[var(--border-subtle)]">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-faint)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)] transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo mark */}
          <div className="flex justify-center mb-4">
            <img
              src="/craftlink-logo.svg"
              alt="CraftLink"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          <h3 className="text-center font-display font-black text-2xl text-[var(--text-primary)] tracking-tight">
            {isSignUp ? 'Join CraftLink' : 'Welcome back'}
          </h3>
          <p className="text-center text-xs text-[var(--text-muted)] mt-1.5">
            {isSignUp
              ? 'Connect with verified video editors and software architects'
              : 'Sign in to manage projects, proposals, and messages'}
          </p>
        </div>

        <div className="px-7 py-6 space-y-5">
          {/* 1-Click Demo Banner */}
          <div
            className="rounded-xl p-4 border border-[var(--border-medium)]"
            style={{ background: 'var(--bg-card)' }}
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-3 flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Instant Demo — Click to Enter
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'client' as UserRole, emoji: '💼', label: 'Client' },
                { role: 'freelancer' as UserRole, emoji: '🎬', label: 'Creator' },
                { role: 'admin' as UserRole, emoji: '🛡️', label: 'Admin' },
              ].map(({ role, emoji, label }) => (
                <button
                  key={role}
                  onClick={() => handleInstantDemoLogin(role)}
                  className="py-2.5 px-2 rounded-xl font-bold text-[11px] transition-all duration-200 flex flex-col items-center gap-1 border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] hover:shadow-[0_0_12px_var(--accent-glow)]"
                >
                  <span className="text-base">{emoji}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Account Type Selector (Client / Creator only — no role sandbox) */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roleOptions.map(({ role, icon, label, sublabel }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedRole === role
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-glow)] shadow-[0_0_15px_var(--accent-glow)]'
                      : 'border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
                  }`}
                  style={{ background: selectedRole === role ? undefined : 'var(--bg-card)' }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={selectedRole === role ? 'text-[var(--accent-primary)]' : 'text-[var(--text-faint)]'}>
                      {icon}
                    </span>
                    {selectedRole === role && <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)]" />}
                  </div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{label}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{sublabel}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              className="btn-accent w-full flex items-center justify-center gap-2 mt-1"
            >
              <span>{isSignUp ? 'Create Account' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <p className="text-center text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
            {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-[var(--accent-primary)] hover:underline ml-1"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

