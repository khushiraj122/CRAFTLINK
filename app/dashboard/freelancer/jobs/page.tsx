'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function FreelancerJobsPage() {
  const { data: session } = useSession();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const userId = (session?.user as any)?.id;

  useEffect(() => {
    if (!userId) return;
    const q = filter ? `&status=${filter}` : '';
    fetch(`/api/contracts?freelancerId=${userId}${q}`)
      .then(r => r.json()).then(d => { setContracts(d.contracts || []); setLoading(false); });
  }, [userId, filter]);

  async function acceptJob(id: string) {
    await fetch(`/api/contracts/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'accepted' }),
    });
    setContracts(prev => prev.map(c => c._id === id ? { ...c, status: 'accepted' } : c));
  }

  async function rejectJob(id: string) {
    await fetch(`/api/contracts/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    });
    setContracts(prev => prev.map(c => c._id === id ? { ...c, status: 'rejected' } : c));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">My Jobs</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">Manage your contracts and deliverables</p>
        </div>
        <select value={filter} onChange={e => { setFilter(e.target.value); setLoading(true); }}
          className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28]">
          <option value="">All</option>
          {['pending','accepted','in_progress','in_review','completed','rejected'].map(s => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {loading ? <div className="p-8 text-center text-[#6B6B6B]">Loading jobs…</div>
      : contracts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <span className="text-4xl mb-4 block">💼</span>
          <p className="font-semibold text-[#1A1A1A]">No jobs yet</p>
          <p className="text-[#6B6B6B] text-sm mt-1">Complete your profile so clients can find and hire you!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contracts.map((c: any) => (
            <div key={c._id} className="bg-white rounded-2xl border border-[#E5E0D8] p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1A1A1A] mb-1">{c.projectTitle}</h3>
                  <p className="text-sm text-[#6B6B6B]">from <strong>{c.clientName}</strong> {c.clientCompany ? `· ${c.clientCompany}` : ''}</p>
                  <p className="text-sm text-[#4A4A4A] mt-2 line-clamp-2">{c.description}</p>
                  <div className="flex gap-4 mt-3 text-xs text-[#6B6B6B]">
                    <span>💰 ${c.budgetAmount} {c.budgetType}</span>
                    <span>📅 Due: {c.deadline}</span>
                    {c.selectedPackage && <span>📦 {c.selectedPackage}</span>}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {c.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => acceptJob(c._id)} className="text-xs px-3 py-2 rounded-lg bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-colors">Accept</button>
                      <button onClick={() => rejectJob(c._id)} className="text-xs px-3 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors">Decline</button>
                    </div>
                  )}
                  {c.status !== 'pending' && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 capitalize">
                      {c.status.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
