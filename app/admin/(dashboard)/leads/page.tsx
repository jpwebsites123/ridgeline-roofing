'use client';

import { Fragment, useEffect, useState } from 'react';
import { firebaseConfigured } from '@/lib/firebase';
import { deleteLead, Lead, subscribeLeads, updateLeadStatus } from '@/lib/firestore-leads';

function formatDate(ts: Lead['createdAt']) {
  if (!ts) return '—';
  return ts.toDate().toLocaleString('en-CA', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => subscribeLeads(setLeads), []);

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>All Leads</h2>
        <span className="admin-pill">{leads.length} total</span>
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
                ? "No estimate requests yet. Submit the Free Estimate form on the public site to see it land here instantly."
                : 'Connect Firebase to start receiving real leads from the public site.'}
            </p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Address</th>
                <th>Received</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <Fragment key={l.id}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                  >
                    <td>
                      {l.firstName} {l.lastName}
                    </td>
                    <td>
                      {l.phone}
                      <div className="muted">{l.email}</div>
                    </td>
                    <td>{l.service}</td>
                    <td>
                      {l.address}
                      <div className="muted">{l.city}</div>
                    </td>
                    <td className="muted">{formatDate(l.createdAt)}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        value={l.status}
                        onChange={(e) => updateLeadStatus(l.id, e.target.value as Lead['status'])}
                        style={{
                          fontFamily: 'var(--font-plex-mono)',
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          border: '1px solid var(--line)',
                          borderRadius: '4px',
                          padding: '5px 8px',
                          background: 'var(--white)',
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        className="admin-icon-btn"
                        onClick={() => {
                          if (confirm('Delete this lead?')) deleteLead(l.id);
                        }}
                        aria-label="Delete lead"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {expanded === l.id && (
                    <tr>
                      <td colSpan={7} style={{ background: 'var(--cream)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13.5px' }}>
                          <div>
                            <b>Roof Age:</b> {l.roofAge || '—'}
                          </div>
                          <div>
                            <b>Preferred Contact:</b> {l.preferredContact || '—'}
                          </div>
                          <div style={{ gridColumn: '1/-1' }}>
                            <b>Project Details:</b> {l.details || '—'}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
