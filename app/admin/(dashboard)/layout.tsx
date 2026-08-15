'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

type NavItem = { href: string; label: string; icon: string; exact?: boolean; disabled?: boolean };
type NavSection = { section: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    section: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: 'grid', exact: true }],
  },
  {
    section: 'Manage',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: 'inbox' },
      { href: '/admin/reviews', label: 'Reviews', icon: 'star' },
      { href: '/admin/projects', label: 'Projects', icon: 'image' },
      { href: '/admin/images', label: 'Images', icon: 'photos' },
      { href: '/admin/services', label: 'Services', icon: 'wrench' },
      { href: '/admin/team', label: 'Team', icon: 'users' },
      { href: '/admin/service-area', label: 'Service Area', icon: 'map' },
    ],
  },
  {
    section: 'Account',
    items: [{ href: '/admin/settings', label: 'Settings', icon: 'settings' }],
  },
];

const ICONS: Record<string, JSX.Element> = {
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  photos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="M20 15l-4-4-8 8" />
      <path d="M2 8V3a1 1 0 0 1 1-1h5" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L2 19v3h3l7.3-7.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
      <path d="M8 2v16M16 6v16" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/admin/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Keep the server render and the browser's first render identical.
  // Firebase can restore a cached user very quickly, so the dashboard must
  // not render authenticated markup until React has finished hydrating.
  if (!hydrated || loading) {
    return (
      <div className="admin-auth">
        <p style={{ color: 'var(--steel-light)', fontFamily: 'var(--font-plex-mono)', fontSize: 13 }}>
          Loading…
        </p>
      </div>
    );
  }

  if (!user) {
    // Redirect effect above will kick in; render nothing in the meantime.
    return null;
  }

  const pageTitle =
    NAV.flatMap((s) => s.items).find((i) => (i.exact ? pathname === i.href : pathname.startsWith(i.href) && i.href !== '#'))
      ?.label || 'Dashboard';

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${menuOpen ? ' open' : ''}`}>
        <div className="admin-sidebar-brand">
          <span className="mark">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 11L12 4l9 7M5 10v9h14v-9"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <b>Ridgeline</b>
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="admin-nav">
          {NAV.map((section) => (
            <div key={section.section}>
              <div className="admin-nav-label">{section.section}</div>
              {section.items.map((item) => {
                const active = item.exact ? pathname === item.href : item.href !== '#' && pathname.startsWith(item.href);
                if (item.disabled) {
                  return (
                    <a key={item.label} href="#" className="disabled" onClick={(e) => e.preventDefault()}>
                      {ICONS[item.icon]}
                      {item.label}
                      <span className="soon">Soon</span>
                    </a>
                  );
                }
                return (
                  <a key={item.label} href={item.href} className={active ? 'active' : ''}>
                    {ICONS[item.icon]}
                    {item.label}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <div className="admin-user">
            <div className="admin-user-avatar">{(user.email || '?')[0].toUpperCase()}</div>
            <div>
              <b>{user.email}</b>
              <span>Administrator</span>
            </div>
          </div>
          <button className="admin-signout" onClick={() => signOut()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="admin-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div>
              <h1>{pageTitle}</h1>
              <p>Ridgeline Roofing Co.</p>
            </div>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline admin-btn-sm">
            View Site ↗
          </a>
        </div>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
