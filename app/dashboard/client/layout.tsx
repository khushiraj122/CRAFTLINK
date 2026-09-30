import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

const clientNav = [
  { href: '/dashboard/client', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/client/projects', label: 'My Projects', icon: '📁' },
  { href: '/dashboard/client/saved', label: 'Saved Talent', icon: '❤️' },
  { href: '/dashboard/client/messages', label: 'Messages', icon: '💬' },
  { href: '/dashboard/client/settings', label: 'Settings', icon: '⚙️' },
];

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      <DashboardSidebar role="client" navItems={clientNav} />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
