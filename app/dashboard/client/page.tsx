// @ts-nocheck
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import HiringRequest from '@/models/HiringRequest';
import ClientProfile from '@/models/ClientProfile';
import Link from 'next/link';

export default async function ClientOverviewPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  const clientProfileId = (session?.user as any)?.clientProfileId;

  await connectDB();

  const [activeContracts, completedContracts, pendingContracts, profile] = await Promise.all([
    HiringRequest.countDocuments({ clientId: userId, status: 'in_progress' }),
    HiringRequest.countDocuments({ clientId: userId, status: 'completed' }),
    HiringRequest.countDocuments({ clientId: userId, status: 'pending' }),
    clientProfileId ? ClientProfile.findById(clientProfileId).lean() : null,
  ]);

  const recentContracts = await HiringRequest.find({ clientId: userId })
    .sort({ createdAt: -1 }).limit(5).lean();

  const kpis = [
    { label: 'Active Projects', value: activeContracts, icon: '🔥', color: '#0EA5E9' },
    { label: 'Completed', value: completedContracts, icon: '✅', color: '#10B981' },
    { label: 'Pending Review', value: pendingContracts, icon: '⏳', color: '#F59E0B' },
    { label: 'Total Spent', value: `$${(profile as any)?.totalSpent || 0}`, icon: '💰', color: '#8B5CF6' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Welcome back, {session?.user?.name?.split(' ')[0]}! 👋</h1>
        <p className="text-[#6B6B6B] mt-1">Here's your project activity at a glance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-[#E5E0D8] shadow-sm">
            <span className="text-2xl block mb-3">{kpi.icon}</span>
            <p className="text-2xl font-bold text-[#1A1A1A]">{kpi.value}</p>
            <p className="text-sm text-[#6B6B6B] mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E0D8] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1A1A1A]">Recent Projects</h2>
            <Link href="/dashboard/client/projects" className="text-xs text-[#EB5E28] hover:underline font-medium">View all →</Link>
          </div>
          {recentContracts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#6B6B6B] text-sm">No projects yet.</p>
              <Link href="/directory" className="text-sm text-[#EB5E28] font-medium hover:underline mt-2 block">Browse freelancers →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentContracts.map((c: any) => (
                <div key={c._id.toString()} className="flex items-center justify-between py-3 border-b border-[#E5E0D8] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{c.projectTitle}</p>
                    <p className="text-xs text-[#6B6B6B]">with {c.freelancerName} · ${c.budgetAmount}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">
                    {c.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/directory', label: 'Find Freelancers', icon: '🔍' },
              { href: '/dashboard/client/projects', label: 'My Projects', icon: '📁' },
              { href: '/dashboard/client/saved', label: 'Saved Talent', icon: '❤️' },
              { href: '/dashboard/client/messages', label: 'Messages', icon: '💬' },
            ].map(a => (
              <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F6F3EC] transition-colors text-sm font-medium text-[#1A1A1A]">
                <span>{a.icon}</span>{a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
