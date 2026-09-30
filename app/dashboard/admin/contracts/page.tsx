'use client';

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

export default function AdminContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/contracts${statusFilter ? `?status=${statusFilter}` : ''}`)
      .then(r => r.json()).then(d => { setContracts(d.contracts || []); setLoading(false); });
  }, [statusFilter]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">All Contracts</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Monitor and manage all platform contracts</p>
      </div>

      <div className="flex gap-3 mb-6">
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setLoading(true); }}
          className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]">
          <option value="">All Statuses</option>
          {['pending','accepted','in_progress','in_review','completed','cancelled','rejected'].map(s => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
        {loading ? <div className="p-8 text-center text-[#6B6B6B]">Loading…</div>
        : contracts.length === 0 ? <div className="p-8 text-center text-[#6B6B6B]">No contracts found.</div>
        : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E0D8] bg-[#F8F7F4]">
                {['Project', 'Client', 'Freelancer', 'Budget', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => {
                const sc = STATUS_COLORS[c.status] || { bg: '#F3F4F6', text: '#374151' };
                return (
                  <tr key={c._id} className="border-b border-[#E5E0D8] last:border-0 hover:bg-[#FDFCF9] transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-[#1A1A1A] max-w-[180px] truncate">{c.projectTitle}</td>
                    <td className="px-5 py-4 text-xs text-[#6B6B6B]">{c.clientName}</td>
                    <td className="px-5 py-4 text-xs text-[#6B6B6B]">{c.freelancerName}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-[#1A1A1A]">${c.budgetAmount}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                        style={{ backgroundColor: sc.bg, color: sc.text }}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#6B6B6B]">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
