import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, firebaseConfigured } from '@/lib/firebase';

export const DEFAULT_AREAS = ['Hamilton','Burlington','Oakville','Ancaster','Stoney Creek','Grimsby','Brantford','Mississauga'];
const ref = () => (db ? doc(db, 'site', 'areas') : null);

export async function getAreas(): Promise<string[]> {
  if (!firebaseConfigured || !db) return DEFAULT_AREAS;
  const r = ref();
  if (!r) return DEFAULT_AREAS;
  const snap = await getDoc(r);
  const areas = snap.exists() ? (snap.data().areas as string[] | undefined) : undefined;
  return areas?.length ? areas : DEFAULT_AREAS;
}

export function subscribeAreas(cb: (areas: string[]) => void) {
  if (!firebaseConfigured || !db) {
    cb(DEFAULT_AREAS);
    return () => {};
  }
  const r = ref();
  if (!r) return () => {};
  return onSnapshot(r, (snap) => {
    const areas = snap.exists() ? (snap.data().areas as string[] | undefined) : undefined;
    cb(areas?.length ? areas : DEFAULT_AREAS);
  });
}

export async function saveAreas(areas: string[]) {
  if (!firebaseConfigured || !db) throw new Error('Firebase is not configured.');
  const r = ref();
  if (!r) throw new Error('Firebase is not configured.');
  await setDoc(r, { areas, updatedAt: new Date().toISOString() }, { merge: true });
}
