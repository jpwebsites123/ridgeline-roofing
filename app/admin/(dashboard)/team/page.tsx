'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { DEFAULT_TEAM, getTeam, saveTeam, TeamMember } from '@/lib/firestore-team';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

function newMember(): TeamMember {
  return { id: `team-${Date.now()}`, name: '', role: 'Team Member', bio: '', image: '/images/team-1.jpg', visible: true };
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => { getTeam().then(setMembers); }, []);

  function patch(id: string, values: Partial<TeamMember>) {
    setMembers((all) => all.map((m) => m.id === id ? { ...m, ...values } : m));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= members.length) return;
    const copy = [...members];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setMembers(copy);
  }

  async function upload(member: TeamMember, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setMessage('Please choose an image file.');
    if (file.size > 12 * 1024 * 1024) return setMessage('Images must be 12 MB or smaller.');
    if (!cloudName || !uploadPreset) return setMessage('Cloudinary is not configured.');
    setBusy(member.id);
    setMessage('');
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', uploadPreset);
      data.append('folder', 'ridgeline-roofing/team');
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: data });
      if (!res.ok) throw new Error('Upload failed.');
      const json = await res.json();
      patch(member.id, { image: json.secure_url });
      setMessage('Photo uploaded. Click Save Team to publish it.');
    } catch (err: any) {
      setMessage(err?.message || 'Could not upload image.');
    } finally {
      setBusy(null);
      e.target.value = '';
    }
  }

  async function save() {
    setSaving(true); setMessage('');
    try { await saveTeam(members); setMessage('Team saved — the About page updates automatically.'); }
    catch (err: any) { setMessage(err?.message || 'Could not save team.'); }
    finally { setSaving(false); }
  }

  return (
    <>
      <div className="admin-panel">
        <div className="admin-panel-head">
          <div><h2>Team Manager</h2><p className="admin-head-sub">Add as many people as the company needs. Changes publish to the About page.</p></div>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setMembers([...members, newMember()])}>+ Add Member</button>
        </div>
        <div className="admin-team-list">
          {members.map((member, index) => (
            <div className="admin-team-row" key={member.id}>
              <div className="admin-team-photo"><img src={member.image} alt="" /></div>
              <div className="admin-team-fields">
                <input placeholder="Name (optional)" value={member.name} onChange={(e) => patch(member.id,{name:e.target.value})}/>
                <input placeholder="Role / title" value={member.role} onChange={(e) => patch(member.id,{role:e.target.value})}/>
                <input placeholder="Short bio / department" value={member.bio} onChange={(e) => patch(member.id,{bio:e.target.value})}/>
              </div>
              <div className="admin-team-actions">
                <label className={`admin-btn admin-btn-outline admin-btn-sm${busy===member.id?' disabled':''}`}>
                  {busy===member.id?'Uploading…':'Photo'}<input hidden type="file" accept="image/*" disabled={busy===member.id} onChange={(e)=>upload(member,e)}/>
                </label>
                <button className="admin-icon-btn" onClick={()=>move(index,-1)} disabled={index===0} title="Move up">↑</button>
                <button className="admin-icon-btn" onClick={()=>move(index,1)} disabled={index===members.length-1} title="Move down">↓</button>
                <button className={`admin-btn admin-btn-sm ${member.visible?'admin-btn-outline':'admin-btn-ghost'}`} onClick={()=>patch(member.id,{visible:!member.visible})}>{member.visible?'Visible':'Hidden'}</button>
                <button className="admin-icon-btn danger" onClick={()=>setMembers(members.filter((m)=>m.id!==member.id))} title="Delete">×</button>
              </div>
            </div>
          ))}
        </div>
        <div className="admin-form-actions">
          {message && <span className="admin-inline-message">{message}</span>}
          <button className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>{saving?'Saving…':'Save Team'}</button>
        </div>
      </div>
    </>
  );
}
