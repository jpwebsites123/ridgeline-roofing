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

export type Review = {
  id: string;
  name: string;
  city: string;
  projectType: string;
  rating: number;
  body: string;
  published: boolean;
  createdAt: Timestamp | null;
};

export type ReviewInput = Omit<Review, 'id' | 'createdAt'>;

export function subscribeReviews(cb: (reviews: Review[]) => void): () => void {
  if (!db) return () => {};
  const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, 'id'>) })));
  });
}

export async function addReview(input: ReviewInput) {
  if (!db) throw new Error('Firebase is not configured.');
  await addDoc(collection(db, 'reviews'), { ...input, createdAt: serverTimestamp() });
}

export async function updateReview(id: string, input: Partial<ReviewInput>) {
  if (!db) throw new Error('Firebase is not configured.');
  await updateDoc(doc(db, 'reviews', id), input);
}

export async function deleteReview(id: string) {
  if (!db) throw new Error('Firebase is not configured.');
  await deleteDoc(doc(db, 'reviews', id));
}
