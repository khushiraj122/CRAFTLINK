// @ts-nocheck
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import HiringRequest from '@/models/HiringRequest';
import FreelancerProfile from '@/models/FreelancerProfile';
import Link from 'next/link';

export default async function FreelancerOverviewPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  const freelancerProfileId = (session?.user as any)?.freelancerProfileId;

  await connectDB();

  const [activeJobs, completedJobs, pendingJobs, profile] = await Promise.all([
    HiringRequest.countDocuments({ freelancerId: userId, status: 'in_progress' }),
    HiringRequest.countDocuments({ freelancerId: userId, status: 'completed' }),
    HiringRequest.countDocuments({ freelancerId: userId, status: 'pending' }),
    freelancerProfileId ? FreelancerProfile.findById(freelancerProfileId).lean() : null,
  ]);

  const recentJobs = await HiringRequest.find({ freelancerId: userId })
    .sort({ createdAt: -1 }).limit(5).lean();

  const fp = profile as any;
  const kpis = [
    { label: 'Active Jobs', value: activeJobs, icon: '🔥', color: '#EB5E28' },
    { label: 'Completed', value: completedJobs, icon: '✅', color: '#10B981' },
    { label: 'Pending Offers', value: pendingJobs, icon: '📨', color: '#F59E0B' },
    { label: 'Total Earned', value: `$${fp?.earningsTotal || 0}`, icon: '💰', color: '#8B5CF6' },
  ];

  const profileStrength = fp ? Math.min(100, Math.round(
    ([fp.bio, fp.avatar, fp.bannerImage, fp.videoIntroUrl].filter(Boolean).length / 4 * 30) +
    ((fp.skills?.length || 0) > 0 ? 20 : 0) +
    ((fp.portfolio?.length || 0) > 0 ? 30 : 0) +
    (fp.isVerifiedPro ? 20 : 0)
  )) : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Studio Overview 🎨</h1>
        <p className="text-[#6B6B6B] mt-1">Welcome back, {session?.user?.name?.split(' ')[0]}. Here's your performance.</p>
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
            <h2 className="font-semibold text-[#1A1A1A]">Recent Jobs</h2>
            <Link href="/dashboard/freelancer/jobs" className="text-xs text-[#EB5E28] hover:underline font-medium">View all →</Link>
          </div>
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#6B6B6B] text-sm">No jobs yet. Complete your profile to get hired!</p>
              <Link href="/dashboard/freelancer/profile" className="text-sm text-[#EB5E28] font-medium hover:underline mt-2 block">Complete profile →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((j: any) => (
                <div key={j._id.toString()} className="flex items-center justify-between py-3 border-b border-[#E5E0D8] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{j.projectTitle}</p>
                    <p className="text-xs text-[#6B6B6B]">from {j.clientName} · ${j.budgetAmount}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 capitalize">
                    {j.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Profile Strength */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
            <h2 className="font-semibold text-[#1A1A1A] mb-3">Profile Strength</h2>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 bg-[#F6F3EC] rounded-full h-2">
                <div className="bg-[#EB5E28] h-2 rounded-full transition-all" style={{ width: `${profileStrength}%` }} />
              </div>
              <span className="text-sm font-bold text-[#EB5E28]">{profileStrength}%</span>
            </div>
            {profileStrength < 100 && (
              <Link href="/dashboard/freelancer/profile" className="text-xs text-[#EB5E28] hover:underline font-medium">
                Complete profile to attract more clients →
              </Link>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5">
            <h2 className="font-semibold text-[#1A1A1A] mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { href: '/dashboard/freelancer/jobs', label: 'View Jobs', icon: '💼' },
                { href: '/dashboard/freelancer/profile', label: 'Edit Profile', icon: '✏️' },
                { href: '/dashboard/freelancer/verification', label: 'Get Verified', icon: '🏆' },
                { href: '/dashboard/freelancer/messages', label: 'Messages', icon: '💬' },
              ].map(a => (
                <Link key={a.href} href={a.href} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F6F3EC] transition-colors text-sm font-medium text-[#1A1A1A]">
                  <span>{a.icon}</span>{a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
