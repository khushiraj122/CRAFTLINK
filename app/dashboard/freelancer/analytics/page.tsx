'use client';
export default function FreelancerAnalyticsPage() {
  const metrics = [
    { label: 'Profile Views (30d)', value: 0, icon: '👁️' },
    { label: 'Response Rate', value: '—', icon: '⚡' },
    { label: 'Repeat Clients', value: 0, icon: '🔁' },
    { label: 'Avg. Rating', value: '—', icon: '⭐' },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Analytics</h1>
      <p className="text-[#6B6B6B] mb-8">Track your performance and growth</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {metrics.map(m => (
          <div key={m.label} className="bg-white rounded-2xl p-5 border border-[#E5E0D8]">
            <span className="text-2xl block mb-3">{m.icon}</span>
            <p className="text-2xl font-bold text-[#1A1A1A]">{m.value}</p>
            <p className="text-xs text-[#6B6B6B] mt-1">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
        <span className="text-4xl mb-4 block">📈</span>
        <p className="font-semibold text-[#1A1A1A]">Analytics charts coming soon</p>
        <p className="text-[#6B6B6B] text-sm mt-1">Detailed earnings and views charts will appear here once you have active jobs.</p>
      </div>
    </div>
  );
}
