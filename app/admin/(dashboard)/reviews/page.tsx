'use client';

import { FormEvent, useEffect, useState } from 'react';
import { firebaseConfigured } from '@/lib/firebase';
import {
  addReview,
  deleteReview,
  Review,
  ReviewInput,
  subscribeReviews,
  updateReview,
} from '@/lib/firestore-reviews';

const BLANK: ReviewInput = {
  name: '',
  city: '',
  projectType: '',
  rating: 5,
  body: '',
  published: true,
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState<ReviewInput>(BLANK);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => subscribeReviews(setReviews), []);

  function openNew() {
    setEditing(null);
    setForm(BLANK);
    setShowForm(true);
    setError('');
  }

  function openEdit(r: Review) {
    setEditing(r);
    setForm({
      name: r.name,
      city: r.city,
      projectType: r.projectType,
      rating: r.rating,
      body: r.body,
      published: r.published,
    });
    setShowForm(true);
    setError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await updateReview(editing.id, form);
      } else {
        await addReview(form);
      }
      setShowForm(false);
    } catch (err: any) {
      setError(err?.message || 'Could not save. Is Firebase connected?');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {!firebaseConfigured && (
        <div className="admin-setup-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          <div>
            <h3>Connect Firebase to manage reviews</h3>
            <p>
              Adding, editing, and deleting reviews here writes directly to Firestore. Connect a
              Firebase project (see <code>README.md</code>) to start managing real reviews.
            </p>
          </div>
        </div>
      )}

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Customer Reviews</h2>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={openNew}>
            + Add Review
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ padding: '14px 24px 0' }}>
                <div className="admin-error">{error}</div>
              </div>
            )}
            <div className="admin-form-grid">
              <div>
                <label>Customer Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <label>Project Type</label>
                <input
                  required
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                />
              </div>
              <div>
                <label>Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="full">
                <label>Review Text</label>
                <textarea
                  required
                  rows={3}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
              </div>
              <div>
                <label>Status</label>
                <select
                  value={form.published ? 'published' : 'hidden'}
                  onChange={(e) => setForm({ ...form, published: e.target.value === 'published' })}
                >
                  <option value="published">Published</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>
            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-btn admin-btn-outline admin-btn-sm"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary admin-btn-sm" disabled={saving}>
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Review'}
              </button>
            </div>
          </form>
        )}

        <div className="admin-panel-body">
          {reviews.length === 0 ? (
            <div className="admin-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <p>No reviews yet. Click &ldquo;Add Review&rdquo; to create the first one.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Project</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id}>
                    <td>
                      {r.name}
                      <div className="muted">{r.city}</div>
                    </td>
                    <td>{r.projectType}</td>
                    <td>{'★'.repeat(r.rating)}</td>
                    <td style={{ maxWidth: 280, whiteSpace: 'normal' }}>{r.body}</td>
                    <td>
                      <span className={`admin-pill${r.published ? ' new' : ''}`}>
                        {r.published ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="admin-icon-btn" onClick={() => openEdit(r)} aria-label="Edit">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          className="admin-icon-btn"
                          onClick={() => {
                            if (confirm('Delete this review?')) deleteReview(r.id);
                          }}
                          aria-label="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
                          </svg>
                        </button>
                      </div>
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
