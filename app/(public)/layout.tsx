'use client';

import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { HiringModal } from '@/components/hire/HiringModal';
import { ShareModal } from '@/components/common/ShareModal';
import { ToastContainer } from '@/components/common/ToastContainer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col font-sans" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AuthModal />
        <HiringModal />
        <ShareModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
