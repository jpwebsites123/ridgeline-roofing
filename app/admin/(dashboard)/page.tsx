'use client';

import { useEffect, useMemo, useState } from 'react';
import { firebaseConfigured } from '@/lib/firebase';
import { subscribeLeads, Lead } from '@/lib/firestore-leads';
import { subscribeReviews, Review } from '@/lib/firestore-reviews';

function timeAgo(ts: Lead['createdAt']) {
  if (!ts) return 'just now';
  const diffMs = Date.now() - ts.toMillis();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdminOverviewPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const unsub1 = subscribeLeads(setLeads);
    const unsub2 = subscribeReviews(setReviews);
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const newLeads = leads.filter((l) => l.status === 'new').length;
    const thisWeek = leads.filter((l) => l.createdAt && l.createdAt.toMillis() > weekAgo).length;
    return {
      total: leads.length,
      newLeads,
      thisWeek,
      reviews: reviews.length,
    };
  }, [leads, reviews]);

  return (
    <>
      {!firebaseConfigured && (
        <div className="admin-setup-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          <div>
            <h3>Connect Firebase to go live</h3>
            <p>
              This dashboard is fully wired to Firebase Authentication and Firestore — it just
              needs a real project connected. Add your Firebase config as environment variables
              (<code>NEXT_PUBLIC_FIREBASE_*</code>) and create an admin user in the Firebase
              Console. Full steps are in <code>README.md</code>. Once connected, estimate
              requests submitted on the public site will appear here in real time.
            </p>
          </div>
        </div>
      )}

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="lbl">
            Total Leads
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M22 12h-6l-2 3h-4l-2-3H2" />
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
          </div>
          <div className="num">{stats.total}</div>
          <div className="delta">All-time estimate requests</div>
        </div>
        <div className="admin-stat-card">
          <div className="lbl">
            New
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div className="num">{stats.newLeads}</div>
          <div className="delta up">Awaiting first contact</div>
        </div>
        <div className="admin-stat-card">
          <div className="lbl">
            This Week
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div className="num">{stats.thisWeek}</div>
          <div className="delta">Last 7 days</div>
        </div>
        <div className="admin-stat-card">
          <div className="lbl">
            Reviews
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="num">{stats.reviews}</div>
          <div className="delta">Managed in this panel</div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Recent Leads</h2>
          <a href="/admin/leads" className="admin-btn admin-btn-outline admin-btn-sm">
            View All
          </a>
        </div>
        <div className="admin-panel-body">
          {leads.length === 0 ? (
            <div className="admin-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
              <p>
                {firebaseConfigured
                  ? 'No estimate requests yet — they\u2019ll show up here the moment someone submits the form on the public site.'
                  : 'Once Firebase is connected, real estimate requests from the public site will appear here.'}
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>City</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 6).map((l) => (
                  <tr key={l.id}>
                    <td>
                      {l.firstName} {l.lastName}
                      <div className="muted">{l.email}</div>
                    </td>
                    <td>{l.service}</td>
                    <td>{l.city}</td>
                    <td className="muted">{timeAgo(l.createdAt)}</td>
                    <td>
                      <span className={`admin-pill${l.status === 'new' ? ' new' : ''}`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
