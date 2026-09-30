import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

const adminNav = [
  { href: '/dashboard/admin', label: 'Overview', icon: '📊' },
  { href: '/dashboard/admin/users', label: 'Users', icon: '👥' },
  { href: '/dashboard/admin/contracts', label: 'Contracts', icon: '📋' },
  { href: '/dashboard/admin/reports', label: 'Reports', icon: '🚩' },
  { href: '/dashboard/admin/verification', label: 'Verification', icon: '✅' },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar role="admin" navItems={adminNav} />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
