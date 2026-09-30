// @ts-nocheck
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import UserModel from '@/models/User';
import HiringRequest from '@/models/HiringRequest';
import VerificationRequest from '@/models/VerificationRequest';
import AdminReport from '@/models/AdminReport';
import Link from 'next/link';

async function getStats() {
  await connectDB();
  const [totalUsers, totalContracts, pendingVerifications, openReports] = await Promise.all([
    UserModel.countDocuments(),
    HiringRequest.countDocuments(),
    VerificationRequest.countDocuments({ status: 'pending' }),
    AdminReport.countDocuments({ status: 'open' }),
  ]);
  const [clients, freelancers, admins] = await Promise.all([
    UserModel.countDocuments({ role: 'client' }),
    UserModel.countDocuments({ role: 'freelancer' }),
    UserModel.countDocuments({ role: 'admin' }),
  ]);
  const recentUsers = await UserModel.find({}, { password: 0 }).sort({ createdAt: -1 }).limit(5).lean();
  return { totalUsers, totalContracts, pendingVerifications, openReports, clients, freelancers, admins, recentUsers };
}

export default async function AdminOverviewPage() {
  const session = await auth();
  const stats = await getStats();

  const kpis = [
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#7C3AED', sub: `${stats.clients} clients · ${stats.freelancers} freelancers · ${stats.admins} admins` },
    { label: 'Total Contracts', value: stats.totalContracts, icon: '📋', color: '#0EA5E9', sub: 'All time' },
    { label: 'Pending Verifications', value: stats.pendingVerifications, icon: '✅', color: '#F59E0B', sub: 'Awaiting review', href: '/dashboard/admin/verification' },
    { label: 'Open Reports', value: stats.openReports, icon: '🚩', color: '#EF4444', sub: 'Requires action', href: '/dashboard/admin/reports' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Platform Overview</h1>
        <p className="text-[#6B6B6B] mt-1">Welcome back, {session?.user?.name}. Here&apos;s what&apos;s happening on CraftLink.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-[#E5E0D8] shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              {kpi.href && (
                <Link href={kpi.href} className="text-xs text-[#EB5E28] hover:underline font-medium">View →</Link>
              )}
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A] mb-1">{kpi.value}</p>
            <p className="text-sm font-medium text-[#1A1A1A]">{kpi.label}</p>
            <p className="text-xs text-[#6B6B6B] mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/dashboard/admin/users', label: 'Manage Users', icon: '👥' },
              { href: '/dashboard/admin/verification', label: 'Review Verifications', icon: '✅' },
              { href: '/dashboard/admin/reports', label: 'Handle Reports', icon: '🚩' },
              { href: '/dashboard/admin/contracts', label: 'View All Contracts', icon: '📋' },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F6F3EC] transition-colors text-sm font-medium text-[#1A1A1A]">
                <span>{a.icon}</span>{a.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6">
          <h2 className="font-semibold text-[#1A1A1A] mb-4">Recent Users</h2>
          <div className="space-y-3">
            {stats.recentUsers.map((u: any) => (
              <div key={u._id.toString()} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">{u.name}</p>
                  <p className="text-xs text-[#6B6B6B]">{u.email}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                  style={{
                    backgroundColor: u.role === 'admin' ? '#F5F3FF' : u.role === 'freelancer' ? '#FFF7F4' : '#F0F9FF',
                    color: u.role === 'admin' ? '#7C3AED' : u.role === 'freelancer' ? '#EB5E28' : '#0EA5E9',
                  }}>
                  {u.role}
                </span>
              </div>
            ))}
            {stats.recentUsers.length === 0 && <p className="text-sm text-[#6B6B6B]">No users yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
