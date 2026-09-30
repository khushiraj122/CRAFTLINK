'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Search,
  Bell,
  Bookmark,
  MessageSquare,
  Briefcase,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Zap,
} from 'lucide-react';

/* ── Inline Logo using the CraftLink brand image ── */
const CraftLinkLogo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-0 cursor-pointer select-none group focus:outline-none"
    aria-label="Go to home"
  >
    <img
      src="/craftlink-logo.svg"
      alt="CraftLink"
      className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(0,229,168,0.5)]"
      onError={(e) => {
        /* Fallback text logo if image not found */
        (e.currentTarget as HTMLImageElement).style.display = 'none';
        const next = e.currentTarget.nextSibling as HTMLElement;
        if (next) next.style.display = 'flex';
      }}
    />
    {/* Text fallback */}
    <span className="hidden items-center gap-1.5 font-display font-black text-xl tracking-tight text-[var(--text-primary)]">
      <span>Craft</span>
      <span className="text-[var(--accent-primary)]">link</span>
    </span>
  </button>
);

/* ── Theme Toggle Button ── */
const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-btn"
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border border-[var(--border-medium)] bg-[var(--bg-card)] hover:border-[var(--accent-primary)] hover:shadow-[0_0_12px_var(--accent-glow)] text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentRole,
    activeView,
    setActiveView,
    setSelectedFreelancerId,
    unreadNotificationsCount,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    logout,
    setIsAuthModalOpen,
    currentClientProfile,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const savedCount = currentClientProfile?.savedFreelancerIds?.length || 0;

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('directory');
  };

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    if (view === 'freelancer-profile' && currentUser?.freelancerProfileId) {
      setSelectedFreelancerId(currentUser.freelancerProfileId);
    }
  };

  const navLinkClass = (view: string) =>
    `relative py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
      activeView === view
        ? 'text-[var(--accent-primary)]'
        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
    }`;

  const activeUnderline = (view: string) =>
    activeView === view ? (
      <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[var(--accent-primary)] rounded-full shadow-[0_0_6px_var(--accent-glow)]" />
    ) : null;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[var(--border-subtle)]'
          : 'border-b border-[var(--border-subtle)]'
      }`}
      style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      {/* Top Status Strip */}
      <div className="border-b border-[var(--border-subtle)] px-4 sm:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-tight text-[var(--text-muted)]">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_6px_var(--accent-primary)]" />
          <span>VERIFIED HUMAN CREATIVE TALENT</span>
          <span className="hidden md:inline opacity-40">|</span>
          <span className="hidden md:inline">Escrow Protected Contracts &amp; Live Code/Video Vetting</span>
        </div>

        {/* Live platform status */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-faint)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          <span className="text-[var(--accent-primary)] font-bold">PLATFORM ONLINE</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <CraftLinkLogo onClick={() => handleNavClick('home')} />

        {/* Search Bar — Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center flex-1 max-w-sm mx-6 relative"
        >
          <Search className="w-3.5 h-3.5 text-[var(--text-faint)] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search editors, devs, designers..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full text-[var(--text-primary)] font-sans focus:outline-none transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-glow)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-medium)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 text-[var(--text-faint)] hover:text-[var(--text-primary)] text-sm"
            >
              ×
            </button>
          )}
        </form>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5">
          <button onClick={() => handleNavClick('directory')} className={navLinkClass('directory')}>
            Explore Talent
            {activeUnderline('directory')}
          </button>

          {currentRole === 'client' && (
            <>
              <button onClick={() => handleNavClick('hiring-history')} className={navLinkClass('hiring-history')}>
                My Projects
                {activeUnderline('hiring-history')}
              </button>
              <button onClick={() => handleNavClick('client-profile')} className={`${navLinkClass('client-profile')} flex items-center gap-1`}>
                <Bookmark className="w-3 h-3" />
                Saved ({savedCount})
                {activeUnderline('client-profile')}
              </button>
            </>
          )}

          {currentRole === 'freelancer' && (
            <>
              <button onClick={() => handleNavClick('freelancer-dashboard')} className={navLinkClass('freelancer-dashboard')}>
                Workstation
                {activeUnderline('freelancer-dashboard')}
              </button>
              <button onClick={() => handleNavClick('freelancer-profile')} className={navLinkClass('freelancer-profile')}>
                My Portfolio
                {activeUnderline('freelancer-profile')}
              </button>
            </>
          )}

          {currentRole === 'admin' && (
            <button onClick={() => handleNavClick('admin')} className={`${navLinkClass('admin')} flex items-center gap-1`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Admin Panel
              {activeUnderline('admin')}
            </button>
          )}

          <button onClick={() => handleNavClick('how-it-works')} className={navLinkClass('how-it-works')}>
            How It Works
            {activeUnderline('how-it-works')}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {currentUser ? (
            <>
              {/* Messages */}
              <button
                onClick={() => handleNavClick('messages')}
                className="relative w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[0_0_10px_var(--accent-glow)] transition-all duration-200"
                title="Messages"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-primary)] rounded-full ring-2 ring-[var(--bg-primary)] shadow-[0_0_6px_var(--accent-primary)]" />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:shadow-[0_0_10px_var(--accent-glow)] transition-all duration-200"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 flex items-center justify-center px-1 bg-[var(--accent-primary)] text-[#080f0d] text-[9px] font-black rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {isNotifDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl p-4 z-50 shadow-2xl border border-[var(--border-medium)]"
                    style={{ background: 'var(--bg-elevated)', backdropFilter: 'blur(20px)' }}
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[var(--text-primary)]">Notifications</span>
                        <span className="badge-success">{unreadNotificationsCount} new</span>
                      </div>
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] font-bold text-[var(--text-faint)] hover:text-[var(--accent-primary)] transition-colors"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {notifications.length === 0 ? (
                        <p className="text-center py-8 text-xs text-[var(--text-faint)] italic">No notifications yet.</p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationAsRead(notif.id);
                              if (notif.linkType === 'hiring') {
                                setActiveView(currentRole === 'freelancer' ? 'freelancer-dashboard' : 'hiring-history');
                              } else if (notif.linkType === 'messages') {
                                setActiveView('messages');
                              }
                              setIsNotifDropdownOpen(false);
                            }}
                            className={`px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                              !notif.read
                                ? 'bg-[var(--accent-glow)] border border-[var(--border-medium)]'
                                : 'hover:bg-[var(--bg-card)]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-bold text-[var(--text-primary)]">{notif.title}</p>
                              <span className="text-[10px] text-[var(--text-faint)] whitespace-nowrap font-mono">{notif.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-2">{notif.description}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full border border-[var(--border-medium)] hover:border-[var(--accent-primary)] bg-[var(--bg-card)] transition-all duration-200 hover:shadow-[0_0_10px_var(--accent-glow)]"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-[var(--border-medium)]"
                  />
                  <div className="text-left hidden xl:block">
                    <span className="block text-[11px] font-bold text-[var(--text-primary)] leading-tight">{currentUser.name}</span>
                    <span className="block text-[10px] text-[var(--accent-primary)] font-bold uppercase tracking-wider">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl p-2 z-50 shadow-2xl border border-[var(--border-medium)]"
                    style={{ background: 'var(--bg-elevated)', backdropFilter: 'blur(20px)' }}
                  >
                    <div className="px-3 py-2.5 mb-1 border-b border-[var(--border-subtle)]">
                      <p className="text-xs font-bold text-[var(--text-primary)]">{currentUser.name}</p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">{currentUser.email}</p>
                    </div>

                    {currentRole === 'client' && (
                      <>
                        <MenuBtn icon={<UserIcon className="w-3.5 h-3.5" />} label="Client Profile & Saved" onClick={() => { handleNavClick('client-profile'); setIsUserMenuOpen(false); }} />
                        <MenuBtn icon={<Briefcase className="w-3.5 h-3.5" />} label="Contracts & Invoices" onClick={() => { handleNavClick('hiring-history'); setIsUserMenuOpen(false); }} />
                      </>
                    )}
                    {currentRole === 'freelancer' && (
                      <>
                        <MenuBtn icon={<Briefcase className="w-3.5 h-3.5" />} label="Freelancer Dashboard" onClick={() => { handleNavClick('freelancer-dashboard'); setIsUserMenuOpen(false); }} />
                        <MenuBtn icon={<UserIcon className="w-3.5 h-3.5" />} label="Public Portfolio" onClick={() => { handleNavClick('freelancer-profile'); setIsUserMenuOpen(false); }} />
                      </>
                    )}
                    {currentRole === 'admin' && (
                      <MenuBtn icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Admin Controls" onClick={() => { handleNavClick('admin'); setIsUserMenuOpen(false); }} />
                    )}

                    <div className="border-t border-[var(--border-subtle)] mt-1 pt-1">
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] px-3 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-accent flex items-center gap-1.5 text-[11px]"
                id="get-started-btn"
              >
                <Zap className="w-3.5 h-3.5" />
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border-medium)] bg-[var(--bg-card)] text-[var(--text-muted)]"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-[var(--border-subtle)] px-6 py-5 space-y-4"
          style={{ background: 'var(--navbar-bg)', backdropFilter: 'blur(16px)' }}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--text-faint)] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talent..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-full focus:outline-none"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)' }}
            />
          </form>

          <div className="flex flex-col space-y-1">
            <MobileLink label="Explore Talent Directory" onClick={() => handleNavClick('directory')} active={activeView === 'directory'} />
            <MobileLink label="How It Works" onClick={() => handleNavClick('how-it-works')} active={activeView === 'how-it-works'} />
            {currentRole === 'client' && (
              <>
                <MobileLink label="My Projects & Invoices" onClick={() => handleNavClick('hiring-history')} active={activeView === 'hiring-history'} />
                <MobileLink label={`Saved Shortlist (${savedCount})`} onClick={() => handleNavClick('client-profile')} active={activeView === 'client-profile'} />
              </>
            )}
            {currentRole === 'freelancer' && (
              <>
                <MobileLink label="Freelancer Workstation" onClick={() => handleNavClick('freelancer-dashboard')} active={activeView === 'freelancer-dashboard'} />
                <MobileLink label="My Portfolio" onClick={() => handleNavClick('freelancer-profile')} active={activeView === 'freelancer-profile'} />
              </>
            )}
            {currentRole === 'admin' && (
              <MobileLink label="Admin Panel" onClick={() => handleNavClick('admin')} active={activeView === 'admin'} />
            )}
            <MobileLink label="Messages & Quotes" onClick={() => handleNavClick('messages')} active={activeView === 'messages'} />
          </div>

          {!currentUser && (
            <div className="pt-2 flex gap-3">
              <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="flex-1 btn-outline text-center text-[11px]">
                Sign In
              </button>
              <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }} className="flex-1 btn-accent text-center text-[11px]">
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

/* ── Small Helpers ── */
const MenuBtn: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--accent-glow)] hover:text-[var(--accent-primary)] rounded-xl transition-colors flex items-center gap-2"
  >
    {icon}
    {label}
  </button>
);

const MobileLink: React.FC<{ label: string; onClick: () => void; active?: boolean }> = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
      active
        ? 'text-[var(--accent-primary)] bg-[var(--accent-glow)] border border-[var(--border-medium)]'
        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
    }`}
  >
    {label}
  </button>
);

