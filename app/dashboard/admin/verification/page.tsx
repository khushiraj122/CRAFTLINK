'use client';

import { useEffect, useState } from 'react';

export default function AdminVerificationPage() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/verification').then(r => r.json()).then(d => { setVerifications(d.verifications || []); setLoading(false); });
  }, []);

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    await fetch(`/api/admin/verification/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    setVerifications(prev => prev.map(v => v._id === id ? { ...v, status } : v));
  }

  const pending = verifications.filter(v => v.status === 'pending');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Verification Queue</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">{pending.length} pending verification request{pending.length !== 1 ? 's' : ''}</p>
      </div>

      {loading ? <div className="p-8 text-center text-[#6B6B6B]">Loading…</div>
      : pending.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <span className="text-4xl mb-4 block">🏆</span>
          <p className="text-[#1A1A1A] font-semibold">All caught up!</p>
          <p className="text-[#6B6B6B] text-sm mt-1">No pending verifications.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((v) => (
            <div key={v._id} className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[#1A1A1A]">{v.freelancerName}</p>
                    <span className="text-xs text-[#6B6B6B]">— {v.profession}</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] mb-2">ID Type: <strong>{v.idDocumentType}</strong></p>
                  <p className="text-sm text-[#4A4A4A]">{v.experienceSummary}</p>
                  {v.portfolioProofUrl && (
                    <a href={v.portfolioProofUrl} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-[#EB5E28] hover:underline mt-2 block">
                      View Portfolio Proof →
                    </a>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => updateStatus(v._id, 'approved')}
                    className="text-xs px-4 py-2 rounded-lg bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition-colors">
                    ✅ Approve
                  </button>
                  <button onClick={() => updateStatus(v._id, 'rejected')}
                    className="text-xs px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors">
                    ❌ Reject
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
