import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  service: string;
  roofAge?: string;
  preferredContact?: string;
  details?: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Timestamp | null;
};

export type NewLeadInput = Omit<Lead, 'id' | 'createdAt' | 'status'>;

/** Called from the public Free Estimate form. Fails silently (returns
 *  false) if Firebase isn't configured, so the public site never breaks
 *  for visitors even before a Firebase project is connected. */
export async function submitLead(input: NewLeadInput): Promise<boolean> {
  if (!db) return false;
  try {
    await addDoc(collection(db, 'leads'), {
      ...input,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch {
    return false;
  }
}

/** Real-time subscription used by the admin Leads page. */
export function subscribeLeads(cb: (leads: Lead[]) => void): () => void {
  if (!db) return () => {};
  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, 'id'>) })));
  });
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
  if (!db) return;
  await updateDoc(doc(db, 'leads', id), { status });
}

export async function deleteLead(id: string) {
  if (!db) return;
  await deleteDoc(doc(db, 'leads', id));
}
