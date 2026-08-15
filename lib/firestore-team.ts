import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, firebaseConfigured } from '@/lib/firebase';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  visible: boolean;
};

export const DEFAULT_TEAM: TeamMember[] = [
  { id: 'team-1', name: '', role: 'Founder & Owner', bio: 'Est. 2014', image: '/images/team-1.jpg', visible: true },
  { id: 'team-2', name: '', role: 'Operations Manager', bio: 'Project Scheduling', image: '/images/team-2.jpg', visible: true },
  { id: 'team-3', name: '', role: 'Lead Foreman', bio: 'Installation Crew', image: '/images/team-3.jpg', visible: true },
  { id: 'team-4', name: '', role: 'Customer Care Lead', bio: 'Estimates & Support', image: '/images/team-4.jpg', visible: true },
];

const ref = () => (db ? doc(db, 'site', 'team') : null);

export async function getTeam(): Promise<TeamMember[]> {
  if (!firebaseConfigured || !db) return DEFAULT_TEAM;
  const r = ref();
  if (!r) return DEFAULT_TEAM;
  const snap = await getDoc(r);
  const members = snap.exists() ? (snap.data().members as TeamMember[] | undefined) : undefined;
  return members?.length ? members : DEFAULT_TEAM;
}

export function subscribeTeam(cb: (members: TeamMember[]) => void) {
  if (!firebaseConfigured || !db) {
    cb(DEFAULT_TEAM);
    return () => {};
  }
  const r = ref();
  if (!r) return () => {};
  return onSnapshot(r, (snap) => {
    const members = snap.exists() ? (snap.data().members as TeamMember[] | undefined) : undefined;
    cb(members?.length ? members : DEFAULT_TEAM);
  });
}

export async function saveTeam(members: TeamMember[]) {
  if (!firebaseConfigured || !db) throw new Error('Firebase is not configured.');
  const r = ref();
  if (!r) throw new Error('Firebase is not configured.');
  await setDoc(r, { members, updatedAt: new Date().toISOString() }, { merge: true });
}
