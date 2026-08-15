import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type SiteSettings = {
  companyName: string;
  phone: string;
  email: string;
  serviceArea: string;
};

const DEFAULTS: SiteSettings = {
  companyName: 'Ridgeline Roofing Co.',
  phone: '(555) 018-0192',
  email: 'hello@ridgelineroofingco.com',
  serviceArea: 'Hamilton, Burlington, Oakville, Ancaster, Stoney Creek, Grimsby, Brantford & Mississauga',
};

export async function getSettings(): Promise<SiteSettings> {
  if (!db) return DEFAULTS;
  const snap = await getDoc(doc(db, 'settings', 'general'));
  return snap.exists() ? { ...DEFAULTS, ...(snap.data() as Partial<SiteSettings>) } : DEFAULTS;
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!db) throw new Error('Firebase is not configured.');
  await setDoc(doc(db, 'settings', 'general'), settings, { merge: true });
}
