'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      // Fetch session to get role for redirect
      const res = await fetch('/api/auth/session');
      const session = await res.json();
      const role = session?.user?.role;
      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'freelancer') router.push('/dashboard/freelancer');
      else router.push('/dashboard/client');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Cinzel, serif' }}>
            CraftLink
          </h1>
          <p className="text-[#6B6B6B] mt-2">Sign in to your account</p>
        </div>

        <div className="paper-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#EB5E28] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[var(--accent-primary)] text-white font-semibold rounded-xl hover:bg-[#d4521f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B6B6B] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[var(--accent-primary)] font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#A0A0A0] mt-6">
          <Link href="/" className="hover:text-[var(--accent-primary)] transition-colors">
            ← Back to CraftLink
          </Link>
        </p>
      </div>
    </div>
  );
}

