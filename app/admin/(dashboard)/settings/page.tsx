'use client';

import { FormEvent, useEffect, useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { firebaseConfigured } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';
import { getSettings, saveSettings, SiteSettings } from '@/lib/firestore-settings';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [pwStatus, setPwStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    try {
      await saveSettings(settings);
      setSaved(true);
    } catch {
      // firebaseConfigured banner already communicates the setup requirement
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordChange(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setPwStatus('saving');
    setPwError('');
    try {
      await updatePassword(user, newPassword);
      setPwStatus('done');
      setNewPassword('');
    } catch (err: any) {
      setPwStatus('error');
      setPwError(
        err?.code === 'auth/requires-recent-login'
          ? 'For security, please sign out and sign back in before changing your password.'
          : err?.message || 'Could not update password.'
      );
    }
  }

  if (!settings) return null;

  return (
    <>
      {!firebaseConfigured && (
        <div className="admin-setup-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          <div>
            <h3>Showing default values</h3>
            <p>Connect Firebase to save real changes here — see README.md.</p>
          </div>
        </div>
      )}

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Company Information</h2>
        </div>
        <form onSubmit={handleSave}>
          <div className="admin-form-grid">
            <div className="full">
              <label>Company Name</label>
              <input
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div className="full">
              <label>Service Area</label>
              <textarea
                rows={2}
                value={settings.serviceArea}
                onChange={(e) => setSettings({ ...settings, serviceArea: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-form-actions">
            {saved && (
              <span style={{ fontSize: 13, color: 'var(--steel)', marginRight: 'auto', alignSelf: 'center' }}>
                Saved.
              </span>
            )}
            <button type="submit" className="admin-btn admin-btn-primary admin-btn-sm" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2>Account Security</h2>
        </div>
        <form onSubmit={handlePasswordChange}>
          <div className="admin-form-grid">
            <div>
              <label>Signed in as</label>
              <input value={user?.email || ''} disabled />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                minLength={6}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          {pwStatus === 'error' && (
            <div style={{ padding: '0 24px 16px' }}>
              <div className="admin-error">{pwError}</div>
            </div>
          )}
          {pwStatus === 'done' && (
            <div style={{ padding: '0 24px 16px', fontSize: 13, color: 'var(--steel)' }}>
              Password updated.
            </div>
          )}
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-outline admin-btn-sm" disabled={pwStatus === 'saving'}>
              {pwStatus === 'saving' ? 'Updating…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
