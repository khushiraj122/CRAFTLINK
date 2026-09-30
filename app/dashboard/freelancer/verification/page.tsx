'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function FreelancerVerificationPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ idDocumentType: '', portfolioProofUrl: '', experienceSummary: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const userId = (session?.user as any)?.id;
    const res = await fetch('/api/admin/verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        freelancerId: userId,
        freelancerName: session?.user?.name,
        freelancerAvatar: (session?.user as any)?.avatar || '',
        profession: (session?.user as any)?.profession || 'Freelancer',
        ...form,
        submittedAt: new Date().toISOString(),
      }),
    });
    setLoading(false);
    if (res.ok) setSubmitted(true);
    else setError('Submission failed. You may have already submitted a request.');
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <span className="text-5xl block mb-4">🎉</span>
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Request Submitted!</h1>
        <p className="text-[#6B6B6B]">Our team will review your verification request within 2-3 business days. You'll be notified once approved.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Get Verified Pro 🏆</h1>
        <p className="text-[#6B6B6B] mt-1">Stand out with a Verified Pro badge. Our team manually reviews all applications.</p>
      </div>

      <div className="bg-[#FFF7F4] border border-[#EB5E28]/20 rounded-2xl p-5 mb-6">
        <h2 className="font-semibold text-[#EB5E28] mb-2">Benefits of Verification</h2>
        <ul className="text-sm text-[#4A4A4A] space-y-1.5">
          {['Verified Pro badge on your profile', 'Priority placement in search results', 'Access to premium client projects', 'Higher trust and conversion rate'].map(b => (
            <li key={b} className="flex items-center gap-2"><span className="text-[#EB5E28]">✓</span>{b}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">ID Document Type</label>
            <select value={form.idDocumentType} onChange={e => setForm({ ...form, idDocumentType: e.target.value })} required
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28]">
              <option value="">Select ID type…</option>
              <option>Passport</option>
              <option>Driver's License</option>
              <option>National ID Card</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Portfolio Proof URL</label>
            <input type="url" value={form.portfolioProofUrl} onChange={e => setForm({ ...form, portfolioProofUrl: e.target.value })} required
              placeholder="https://behance.net/yourprofile or GitHub link…"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Experience Summary</label>
            <textarea value={form.experienceSummary} onChange={e => setForm({ ...form, experienceSummary: e.target.value })} required rows={4}
              placeholder="Describe your professional experience, notable clients, and what makes you an expert…"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28] resize-none"
            />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2.5">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#EB5E28] text-white font-semibold rounded-xl hover:bg-[#d4521f] transition-colors disabled:opacity-60">
            {loading ? 'Submitting…' : 'Submit Verification Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
