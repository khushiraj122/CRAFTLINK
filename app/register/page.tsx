'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Role = 'client' | 'freelancer';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [profession, setProfession] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, companyName, profession }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Registration failed.');
      return;
    }

    router.push('/login?registered=true');
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Cinzel, serif' }}>
            CraftLink
          </h1>
          <p className="text-[#6B6B6B] mt-2">Create your account</p>
        </div>

        <div className="paper-card rounded-2xl p-8">
          {/* Role selector */}
          <div className="flex gap-2 mb-6 bg-[var(--bg-secondary)] rounded-xl p-1">
            {(['client', 'freelancer'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${
                  role === r
                    ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-sm'
                    : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                }`}
              >
                {r === 'client' ? '💼 I\'m Hiring' : '🎨 I\'m a Freelancer'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)} required
              placeholder="Full name"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
            />
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
            />
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
              placeholder="Password (min. 8 characters)"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
            />
            {role === 'client' && (
              <input
                type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company name (optional)"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
              />
            )}
            {role === 'freelancer' && (
              <input
                type="text" value={profession} onChange={(e) => setProfession(e.target.value)}
                placeholder="Your profession (e.g. UI/UX Designer)"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
              />
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              id="register-submit-btn"
              type="submit" disabled={loading}
              className="w-full py-3 px-4 bg-[var(--accent-primary)] text-white font-semibold rounded-xl hover:bg-[#d4521f] transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B6B6B] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[var(--accent-primary)] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

