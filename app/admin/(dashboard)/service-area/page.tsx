'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_AREAS, getAreas, saveAreas } from '@/lib/firestore-areas';

export default function AdminServiceAreaPage() {
  const [areas, setAreas] = useState<string[]>(DEFAULT_AREAS);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => { getAreas().then(setAreas); }, []);

  function add() {
    const city = draft.trim();
    if (!city || areas.some((a)=>a.toLowerCase()===city.toLowerCase())) return;
    setAreas([...areas, city]); setDraft('');
  }
  function move(index:number, dir:-1|1){ const t=index+dir; if(t<0||t>=areas.length)return; const c=[...areas]; [c[index],c[t]]=[c[t],c[index]]; setAreas(c); }
  async function save(){ setSaving(true);setMessage(''); try{await saveAreas(areas);setMessage('Service area saved — the homepage updates automatically.');}catch(e:any){setMessage(e?.message||'Could not save service area.');}finally{setSaving(false);} }

  return <div className="admin-panel">
    <div className="admin-panel-head"><div><h2>Service Area</h2><p className="admin-head-sub">Control the cities shown in the homepage service-area section.</p></div><span className="admin-pill">{areas.length} areas</span></div>
    <div className="admin-panel-body padded">
      <div className="admin-area-add"><input value={draft} placeholder="Add a city or region" onChange={(e)=>setDraft(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();add();}}}/><button className="admin-btn admin-btn-primary admin-btn-sm" onClick={add}>Add Area</button></div>
      <div className="admin-chip-list">
        {areas.map((area,index)=><div className="admin-area-chip" key={`${area}-${index}`}><span>{area}</span><div><button onClick={()=>move(index,-1)} disabled={index===0}>↑</button><button onClick={()=>move(index,1)} disabled={index===areas.length-1}>↓</button><button className="remove" onClick={()=>setAreas(areas.filter((_,i)=>i!==index))}>×</button></div></div>)}
      </div>
    </div>
    <div className="admin-form-actions">{message&&<span className="admin-inline-message">{message}</span>}<button className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>{saving?'Saving…':'Save Service Area'}</button></div>
  </div>;
}
