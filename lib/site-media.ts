'use client';

import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, firebaseConfigured } from './firebase';

export type SiteMediaMap = Record<string, string>;

export const MEDIA_SLOTS = [
  { key: 'hero', label: 'Homepage Hero', fallback: '/images/hero.jpg', group: 'Homepage' },
  { key: 'category-replacement', label: 'Roof Replacement', fallback: '/images/category-replacement.jpg', group: 'Roofing / Services' },
  { key: 'category-aftercrew', label: 'Finished Roof / Crew', fallback: '/images/category-aftercrew.jpg', group: 'Roofing / Services' },
  { key: 'category-repair', label: 'Roof Repair', fallback: '/images/category-repair.jpg', group: 'Roofing / Services' },
  { key: 'category-emergency', label: 'Emergency / Storm Damage', fallback: '/images/category-emergency.jpg', group: 'Roofing / Services' },
  { key: 'category-inspection', label: 'Roof Inspection', fallback: '/images/category-inspection.jpg', group: 'Roofing / Services' },
  { key: 'category-metal', label: 'Metal Roofing', fallback: '/images/category-metal.jpg', group: 'Roofing / Services' },
  { key: 'category-flat', label: 'Flat / Membrane Roofing', fallback: '/images/category-flat.jpg', group: 'Roofing / Services' },
  { key: 'category-commercial', label: 'Commercial Roofing', fallback: '/images/category-commercial.jpg', group: 'Roofing / Services' },
  { key: 'category-gutters', label: 'Gutters & Eavestroughs', fallback: '/images/category-gutters.jpg', group: 'Roofing / Services' },
  { key: 'team-1', label: 'Founder & Owner', fallback: '/images/team-1.jpg', group: 'Team' },
  { key: 'team-2', label: 'Operations Manager', fallback: '/images/team-2.jpg', group: 'Team' },
  { key: 'team-3', label: 'Lead Foreman', fallback: '/images/team-3.jpg', group: 'Team' },
  { key: 'team-4', label: 'Customer Care Lead', fallback: '/images/team-4.jpg', group: 'Team' },
  { key: 'project-1', label: 'Project 1', fallback: '/images/project-1.jpg', group: 'Projects' },
  { key: 'project-2', label: 'Project 2', fallback: '/images/project-2.jpg', group: 'Projects' },
  { key: 'project-3', label: 'Project 3', fallback: '/images/project-3.jpg', group: 'Projects' },
  { key: 'project-4', label: 'Project 4', fallback: '/images/project-4.jpg', group: 'Projects' },
  { key: 'project-5', label: 'Project 5', fallback: '/images/project-5.jpg', group: 'Projects' },
  { key: 'project-6', label: 'Project 6', fallback: '/images/project-6.jpg', group: 'Projects' },
] as const;

const REF = () => (db ? doc(db, 'site', 'media') : null);

export async function getSiteMedia(): Promise<SiteMediaMap> {
  if (!firebaseConfigured || !db) return {};
  const ref = REF();
  if (!ref) return {};
  const snap = await getDoc(ref);
  return snap.exists() ? ((snap.data().images || {}) as SiteMediaMap) : {};
}

export function watchSiteMedia(callback: (media: SiteMediaMap) => void) {
  if (!firebaseConfigured || !db) {
    callback({});
    return () => {};
  }
  const ref = REF();
  if (!ref) return () => {};
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? ((snap.data().images || {}) as SiteMediaMap) : {});
  });
}

export async function saveMediaSlot(key: string, url: string) {
  if (!firebaseConfigured || !db) throw new Error('Firebase is not configured.');
  const ref = REF();
  if (!ref) throw new Error('Firebase is not configured.');
  const existing = await getDoc(ref);
  const images = existing.exists() ? ((existing.data().images || {}) as SiteMediaMap) : {};
  await setDoc(ref, { images: { ...images, [key]: url }, updatedAt: new Date().toISOString() }, { merge: true });
}

export async function resetMediaSlot(key: string) {
  if (!firebaseConfigured || !db) throw new Error('Firebase is not configured.');
  const ref = REF();
  if (!ref) throw new Error('Firebase is not configured.');
  const existing = await getDoc(ref);
  const images = existing.exists() ? { ...((existing.data().images || {}) as SiteMediaMap) } : {};
  delete images[key];
  await setDoc(ref, { images, updatedAt: new Date().toISOString() }, { merge: true });
}

export function mediaSlotForPath(path: string) {
  const match = path.match(/\/images\/([^/.]+)\.(?:jpg|jpeg|png|webp)$/i);
  return match ? match[1] : '';
}

export function resolveMediaUrl(media: SiteMediaMap, fallback: string) {
  const slot = mediaSlotForPath(fallback);
  return (slot && media[slot]) || fallback;
}
