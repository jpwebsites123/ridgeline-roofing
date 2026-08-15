'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { firebaseConfigured } from '@/lib/firebase';
import { getSiteMedia, MEDIA_SLOTS, resetMediaSlot, saveMediaSlot, SiteMediaMap } from '@/lib/site-media';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

export default function AdminImagesPage() {
  const [media, setMedia] = useState<SiteMediaMap>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSiteMedia().then(setMedia);
  }, []);

  const groups = useMemo(() => {
    const result: Record<string, Array<(typeof MEDIA_SLOTS)[number]>> = {};
    MEDIA_SLOTS.forEach((slot) => {
      (result[slot.group] ||= []).push(slot);
    });
    return result;
  }, []);

  async function handleUpload(key: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage('');
    if (!cloudName || !uploadPreset) {
      setMessage('Cloudinary is not configured yet. Add the Cloudinary values to .env.local and restart the dev server.');
      e.target.value = '';
      return;
    }
    if (!firebaseConfigured) {
      setMessage('Firebase is not configured, so the new image cannot be saved to the website.');
      e.target.value = '';
      return;
    }

    setBusy(key);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', uploadPreset);
      form.append('folder', 'ridgeline-roofing');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok || !data.secure_url) throw new Error(data?.error?.message || 'Upload failed.');
      await saveMediaSlot(key, data.secure_url);
      setMedia((prev) => ({ ...prev, [key]: data.secure_url }));
      setMessage('Image updated. The public website will use it automatically.');
    } catch (err: any) {
      setMessage(err?.message || 'Could not upload image.');
    } finally {
      setBusy(null);
      e.target.value = '';
    }
  }

  async function handleReset(key: string) {
    setBusy(key);
    setMessage('');
    try {
      await resetMediaSlot(key);
      setMedia((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setMessage('Image reset to the original website image.');
    } catch (err: any) {
      setMessage(err?.message || 'Could not reset image.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      {(!cloudName || !uploadPreset) && (
        <div className="admin-setup-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
          <div>
            <h3>Cloudinary setup needed</h3>
            <p>Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local.</p>
          </div>
        </div>
      )}

      {message && <div className="admin-setup-banner"><div><p>{message}</p></div></div>}

      {Object.entries(groups).map(([group, slots]) => (
        <div className="admin-panel" key={group} style={{ marginBottom: 24 }}>
          <div className="admin-panel-head">
            <h2>{group}</h2>
            <span className="admin-pill">{slots.length} images</span>
          </div>
          <div className="admin-media-grid">
            {slots.map((slot) => {
              const current = media[slot.key] || slot.fallback;
              const changed = Boolean(media[slot.key]);
              return (
                <div className="admin-media-card" key={slot.key}>
                  <div className="admin-media-preview">
                    <img src={current} alt={slot.label} />
                    {changed && <span className="admin-media-live">Custom</span>}
                  </div>
                  <div className="admin-media-card-body">
                    <div>
                      <b>{slot.label}</b>
                      <span>{changed ? 'Using uploaded image' : 'Using original image'}</span>
                    </div>
                    <div className="admin-media-actions">
                      <label className={`admin-btn admin-btn-primary admin-btn-sm${busy === slot.key ? ' disabled' : ''}`}>
                        {busy === slot.key ? 'Uploading…' : 'Replace Image'}
                        <input type="file" accept="image/*" hidden disabled={busy === slot.key} onChange={(e) => handleUpload(slot.key, e)} />
                      </label>
                      {changed && (
                        <button className="admin-btn admin-btn-outline admin-btn-sm" disabled={busy === slot.key} onClick={() => handleReset(slot.key)}>
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
