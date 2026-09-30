'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#FEF9C3', text: '#92400E' },
  accepted: { bg: '#DCFCE7', text: '#166534' },
  in_progress: { bg: '#DBEAFE', text: '#1E40AF' },
  in_review: { bg: '#F3E8FF', text: '#6B21A8' },
  completed: { bg: '#D1FAE5', text: '#065F46' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B' },
  rejected: { bg: '#FEE2E2', text: '#991B1B' },
};

export default function ClientProjectsPage() {
  const { data: session } = useSession();
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const userId = (session?.user as any)?.id;

  useEffect(() => {
    if (!userId) return;
    const q = filter ? `&status=${filter}` : '';
    fetch(`/api/contracts?clientId=${userId}${q}`)
      .then(r => r.json()).then(d => { setContracts(d.contracts || []); setLoading(false); });
  }, [userId, filter]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">My Projects</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">Track your active and past hiring contracts</p>
        </div>
        <select value={filter} onChange={e => { setFilter(e.target.value); setLoading(true); }}
          className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]">
          <option value="">All Statuses</option>
          {['pending','accepted','in_progress','in_review','completed','cancelled'].map(s => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {loading ? <div className="p-8 text-center text-[#6B6B6B]">Loading projects…</div>
      : contracts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <span className="text-4xl mb-4 block">📁</span>
          <p className="font-semibold text-[#1A1A1A]">No projects yet</p>
          <p className="text-[#6B6B6B] text-sm mt-1">Start by hiring a freelancer from the directory.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contracts.map((c: any) => {
            const sc = STATUS_COLORS[c.status] || { bg: '#F3F4F6', text: '#374151' };
            return (
              <div key={c._id} className="bg-white rounded-2xl border border-[#E5E0D8] p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#1A1A1A]">{c.projectTitle}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                        style={{ backgroundColor: sc.bg, color: sc.text }}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B6B6B]">with <strong>{c.freelancerName}</strong> · {c.category}</p>
                    <p className="text-sm text-[#4A4A4A] mt-2 line-clamp-2">{c.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-[#1A1A1A]">${c.budgetAmount}</p>
                    <p className="text-xs text-[#6B6B6B]">{c.budgetType}</p>
                    <p className="text-xs text-[#6B6B6B] mt-1">Due: {c.deadline}</p>
                  </div>
                </div>
                {c.milestones?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#E5E0D8]">
                    <p className="text-xs font-medium text-[#6B6B6B] mb-2">Milestones ({c.milestones.filter((m: any) => m.completed).length}/{c.milestones.length} completed)</p>
                    <div className="w-full bg-[#F6F3EC] rounded-full h-1.5">
                      <div className="bg-[#EB5E28] h-1.5 rounded-full transition-all"
                        style={{ width: `${(c.milestones.filter((m: any) => m.completed).length / c.milestones.length) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
