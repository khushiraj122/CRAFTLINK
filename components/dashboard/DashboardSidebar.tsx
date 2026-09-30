'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

interface DashboardSidebarProps {
  role: 'admin' | 'client' | 'freelancer';
  navItems: NavItem[];
}

const roleColors = {
  admin: { accent: '#7C3AED', light: '#F5F3FF', label: 'Admin Panel' },
  client: { accent: '#0EA5E9', light: '#F0F9FF', label: 'Client Dashboard' },
  freelancer: { accent: '#EB5E28', light: '#FFF7F4', label: 'Freelancer Studio' },
};

export function DashboardSidebar({ role, navItems }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { accent, light, label } = roleColors[role];

  return (
    <aside className="w-64 min-h-screen bg-[var(--bg-card)] border-r border-[#E5E0D8] flex flex-col">
      {/* Header */}
      <div className="px-5 py-5 border-b border-[#E5E0D8]" style={{ backgroundColor: light }}>
        <Link href="/" className="block mb-3">
          <span className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Cinzel, serif' }}>
            CraftLink
          </span>
        </Link>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: accent }}
        >
          {label}
        </span>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-[#E5E0D8]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: accent }}
          >
            {session?.user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{session?.user?.name}</p>
            <p className="text-xs text-[#6B6B6B] truncate">{session?.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'text-[#4A4A4A] hover:bg-[var(--bg-secondary)] hover:text-[#1A1A1A]'
              }`}
              style={isActive ? { backgroundColor: accent } : {}}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#E5E0D8] space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#4A4A4A] hover:bg-[var(--bg-secondary)] transition-all"
        >
          <span className="text-lg">🌐</span> Back to Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <span className="text-lg">🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}

