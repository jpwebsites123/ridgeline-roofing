'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_SERVICES, getServices, RoofingService, saveServices } from '@/lib/firestore-services';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `service-${Date.now()}`;
}

function newService(): RoofingService {
  const id = `service-${Date.now()}`;
  return {
    id,
    anchor: `svc-${id}`,
    name: 'New Roofing Service',
    shortDescription: 'Short description shown on the homepage service card.',
    description: 'Describe what this service includes and how it helps the customer.',
    commonProblems: '',
    benefits: '',
    ctaLabel: 'Get a Free Estimate',
    tag: '',
    imageSlot: '',
    imageFallback: '/images/category-repair.jpg',
    imageUrl: '',
    visible: true,
  };
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<RoofingService[]>(DEFAULT_SERVICES);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => { getServices().then(setServices).catch(() => setServices(DEFAULT_SERVICES)); }, []);

  function patch(id: string, values: Partial<RoofingService>) {
    setServices((all) => all.map((service) => service.id === id ? { ...service, ...values } : service));
  }

  function rename(service: RoofingService, name: string) {
    const shouldUpdateAnchor = service.anchor === `svc-${service.id}` || service.anchor === `svc-${slugify(service.name)}`;
    patch(service.id, { name, ...(shouldUpdateAnchor ? { anchor: `svc-${slugify(name)}` } : {}) });
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= services.length) return;
    const copy = [...services];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setServices(copy);
  }

  async function upload(service: RoofingService, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setMessage('Please choose an image file.');
    if (file.size > 12 * 1024 * 1024) return setMessage('Images must be 12 MB or smaller.');
    if (!cloudName || !uploadPreset) return setMessage('Cloudinary is not configured.');

    setBusy(service.id);
    setMessage('');
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', uploadPreset);
      data.append('folder', 'ridgeline-roofing/services');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: data });
      if (!res.ok) throw new Error('Upload failed.');
      const json = await res.json();
      patch(service.id, { imageUrl: json.secure_url });
      setMessage('Service image uploaded. Click Save Services to publish it.');
    } catch (err: any) {
      setMessage(err?.message || 'Could not upload image.');
    } finally {
      setBusy(null);
      e.target.value = '';
    }
  }

  async function save() {
    setSaving(true);
    setMessage('');
    try {
      await saveServices(services);
      setMessage('Services saved — homepage and Services page update automatically.');
    } catch (err: any) {
      setMessage(err?.message || 'Could not save services.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <h2>Services Manager</h2>
          <p className="admin-head-sub">Add, edit, hide, reorder, and publish roofing services without touching the code.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="admin-pill">{services.filter((s) => s.visible).length} live</span>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => { const item = newService(); setServices([...services, item]); setExpanded(item.id); }}>+ Add Service</button>
        </div>
      </div>

      <div className="admin-services-list">
        {services.map((service, index) => {
          const open = expanded === service.id;
          return (
            <div className={`admin-service-row${open ? ' open' : ''}`} key={service.id}>
              <div className="admin-service-summary">
                <div className="admin-service-thumb"><img src={service.imageUrl || service.imageFallback} alt="" /></div>
                <div className="admin-service-main">
                  <div className="admin-service-titleline">
                    <strong>{service.name}</strong>
                    {service.tag && <span className="admin-pill">{service.tag}</span>}
                    {!service.visible && <span className="admin-pill">Hidden</span>}
                  </div>
                  <span>{service.shortDescription}</span>
                </div>
                <div className="admin-service-actions">
                  <button className="admin-icon-btn" onClick={() => move(index, -1)} disabled={index === 0} title="Move up">↑</button>
                  <button className="admin-icon-btn" onClick={() => move(index, 1)} disabled={index === services.length - 1} title="Move down">↓</button>
                  <button className={`admin-btn admin-btn-sm ${service.visible ? 'admin-btn-outline' : 'admin-btn-ghost'}`} onClick={() => patch(service.id, { visible: !service.visible })}>{service.visible ? 'Visible' : 'Hidden'}</button>
                  <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setExpanded(open ? null : service.id)}>{open ? 'Close' : 'Edit'}</button>
                  <button className="admin-icon-btn danger" onClick={() => setServices(services.filter((item) => item.id !== service.id))} title="Delete">×</button>
                </div>
              </div>

              {open && (
                <div className="admin-service-editor">
                  <div className="admin-service-fields">
                    <label><span>Service name</span><input value={service.name} onChange={(e) => rename(service, e.target.value)} /></label>
                    <label><span>Badge / tag (optional)</span><input value={service.tag} placeholder="Most Requested" onChange={(e) => patch(service.id, { tag: e.target.value })} /></label>
                    <label className="wide"><span>Homepage card description</span><textarea rows={2} value={service.shortDescription} onChange={(e) => patch(service.id, { shortDescription: e.target.value })} /></label>
                    <label className="wide"><span>Full service description</span><textarea rows={3} value={service.description} onChange={(e) => patch(service.id, { description: e.target.value })} /></label>
                    <label className="wide"><span>Common problems</span><textarea rows={2} value={service.commonProblems} onChange={(e) => patch(service.id, { commonProblems: e.target.value })} /></label>
                    <label className="wide"><span>Benefits</span><textarea rows={2} value={service.benefits} onChange={(e) => patch(service.id, { benefits: e.target.value })} /></label>
                    <label><span>CTA button text</span><input value={service.ctaLabel} onChange={(e) => patch(service.id, { ctaLabel: e.target.value })} /></label>
                    <label><span>Page anchor</span><input value={service.anchor} onChange={(e) => patch(service.id, { anchor: `svc-${slugify(e.target.value.startsWith('svc-') ? e.target.value.slice(4) : e.target.value)}` })} /></label>
                  </div>
                  <div className="admin-service-image-edit">
                    <img src={service.imageUrl || service.imageFallback} alt="" />
                    <div>
                      <b>Service photo</b>
                      <p>Upload a custom photo here, or leave it alone to keep using the image from Admin → Images.</p>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <label className={`admin-btn admin-btn-primary admin-btn-sm${busy === service.id ? ' disabled' : ''}`}>
                          {busy === service.id ? 'Uploading…' : 'Upload Photo'}
                          <input hidden type="file" accept="image/*" disabled={busy === service.id} onChange={(e) => upload(service, e)} />
                        </label>
                        {service.imageUrl && <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => patch(service.id, { imageUrl: '' })}>Use Site Image</button>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="admin-form-actions">
        {message && <span className="admin-inline-message">{message}</span>}
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save Services'}</button>
      </div>
    </div>
  );
}
