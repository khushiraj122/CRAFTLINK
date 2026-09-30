'use client';

import { useEffect, useState } from 'react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports').then(r => r.json()).then(d => { setReports(d.reports || []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/reports/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    setReports(prev => prev.map(r => r._id === id ? { ...r, status } : r));
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Abuse Reports</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Review and resolve reports submitted by users</p>
      </div>

      {loading ? <div className="p-8 text-center text-[#6B6B6B]">Loading…</div>
      : reports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <span className="text-4xl mb-4 block">✅</span>
          <p className="text-[#1A1A1A] font-semibold">No open reports</p>
          <p className="text-[#6B6B6B] text-sm mt-1">All clear! No reports require your attention.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600">{r.reason}</span>
                    <span className="text-xs text-[#6B6B6B]">
                      by <strong>{r.reporterName}</strong> against <strong>{r.reportedUserName}</strong> ({r.reportedUserRole})
                    </span>
                  </div>
                  <p className="text-sm text-[#4A4A4A]">{r.details}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => updateStatus(r._id, 'investigating')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-medium hover:bg-amber-100 transition-colors">
                    Investigate
                  </button>
                  <button onClick={() => updateStatus(r._id, 'resolved')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors">
                    Resolve
                  </button>
                  <button onClick={() => updateStatus(r._id, 'dismissed')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
