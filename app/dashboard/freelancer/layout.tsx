import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

const freelancerNav = [
  { href: '/dashboard/freelancer', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/freelancer/jobs', label: 'My Jobs', icon: '💼' },
  { href: '/dashboard/freelancer/profile', label: 'Edit Profile', icon: '✏️' },
  { href: '/dashboard/freelancer/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/freelancer/messages', label: 'Messages', icon: '💬' },
  { href: '/dashboard/freelancer/verification', label: 'Get Verified', icon: '🏆' },
];

export default function FreelancerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar role="freelancer" navItems={freelancerNav} />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
