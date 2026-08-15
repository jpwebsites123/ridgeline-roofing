import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, firebaseConfigured } from '@/lib/firebase';

export type RoofingService = {
  id: string;
  anchor: string;
  name: string;
  shortDescription: string;
  description: string;
  commonProblems: string;
  benefits: string;
  ctaLabel: string;
  tag: string;
  imageSlot: string;
  imageFallback: string;
  imageUrl: string;
  visible: boolean;
};

const DEFAULT_SERVICES_RAW: RoofingService[] = [
  {
    id: 'roof-replacement',
    anchor: 'svc-replacement',
    name: 'Roof Replacement',
    shortDescription: 'A full tear-off and re-roof — deck inspection, underlayment, flashing, and ventilation done right.',
    description: 'A complete tear-off and re-roof, including deck inspection, underlayment, flashing, and ventilation — not just new shingles over old problems.',
    commonProblems: 'Curling shingles, granule loss, sagging decking, chronic leaks, roof past its expected lifespan.',
    benefits: 'Full warranty coverage, corrected ventilation, improved curb appeal and resale value.',
    ctaLabel: 'Get a Free Estimate',
    tag: '',
    imageSlot: 'category-replacement',
    imageFallback: '/images/category-replacement.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'roof-repair',
    anchor: 'svc-repair',
    name: 'Roof Repair',
    shortDescription: 'Targeted fixes for leaks, damaged flashing, and worn shingles before they spread.',
    description: 'Targeted repairs for leaks, damaged flashing, missing shingles, punctures, and isolated roof damage — focused on fixing the problem without selling work you do not need.',
    commonProblems: 'Active leaks, lifted or missing shingles, damaged flashing, small punctures, localized storm damage.',
    benefits: 'Stops damage from spreading, extends roof life, protects insulation and interior finishes.',
    ctaLabel: 'Get a Free Estimate',
    tag: 'Most Requested',
    imageSlot: 'category-repair',
    imageFallback: '/images/category-repair.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'emergency-roof-repair',
    anchor: 'svc-emergency',
    name: 'Emergency Roof Repair',
    shortDescription: 'Rapid response for storm damage, active leaks, and urgent structural concerns.',
    description: 'Fast-response temporary protection and repair for storm damage, sudden leaks, missing roofing material, and other urgent problems that cannot wait.',
    commonProblems: 'Storm damage, active water entry, fallen branches, missing shingles, exposed decking.',
    benefits: 'Quick damage control, temporary weather protection when needed, clear next-step repair plan.',
    ctaLabel: 'Request Emergency Service',
    tag: '',
    imageSlot: 'category-emergency',
    imageFallback: '/images/category-emergency.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'roof-inspections',
    anchor: 'svc-inspection',
    name: 'Roof Inspections',
    shortDescription: 'A thorough, honest assessment of your roof’s condition — no pressure, no upsell.',
    description: 'A detailed inspection of shingles, flashing, penetrations, ventilation, drainage, and visible roof-deck conditions to identify current and developing problems.',
    commonProblems: 'Unknown roof age, suspected leaks, post-storm concerns, buying or selling a property, recurring moisture issues.',
    benefits: 'Clear condition report, early problem detection, better repair or replacement planning.',
    ctaLabel: 'Request an Inspection',
    tag: '',
    imageSlot: 'category-inspection',
    imageFallback: '/images/category-inspection.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'asphalt-shingles',
    anchor: 'svc-asphalt',
    name: 'Asphalt Shingle Roofing',
    shortDescription: 'The proven, cost-effective standard — installed with precision and care.',
    description: 'Architectural asphalt shingles remain one of the most versatile and cost-effective roofing choices for residential properties.',
    commonProblems: 'Aging three-tab shingles, color fading, granule loss, brittle or curling shingles.',
    benefits: 'Strong value, wide style selection, straightforward manufacturer warranties, typical 20–30 year lifespan.',
    ctaLabel: 'Get a Free Estimate',
    tag: '',
    imageSlot: 'category-aftercrew',
    imageFallback: '/images/category-aftercrew.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'metal-roofing',
    anchor: 'svc-metal',
    name: 'Metal Roofing',
    shortDescription: 'Durable, energy-efficient standing-seam systems built for the long haul.',
    description: 'Standing-seam steel systems that offer exceptional durability, energy efficiency, and a distinctive modern look.',
    commonProblems: 'Frequent shingle replacement, high wind exposure, heat gain, desire for a longer-life roofing system.',
    benefits: '40–60 year lifespan, strong wind/fire resistance, reflects heat to reduce cooling costs.',
    ctaLabel: 'Get a Free Estimate',
    tag: '',
    imageSlot: 'category-metal',
    imageFallback: '/images/category-metal.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'flat-roofing',
    anchor: 'svc-flat',
    name: 'Flat Roofing',
    shortDescription: 'TPO, EPDM, and modified bitumen systems for low-slope applications.',
    description: 'TPO, EPDM, and modified bitumen systems engineered for low-slope roofs, additions, garages, and commercial applications.',
    commonProblems: 'Ponding water, membrane splits, seam failure, punctures, aging low-slope roof systems.',
    benefits: 'Reliable waterproofing, energy-efficient membrane options, ideal for additions and flat-roofed structures.',
    ctaLabel: 'Get a Free Estimate',
    tag: '',
    imageSlot: 'category-flat',
    imageFallback: '/images/category-flat.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'commercial-roofing',
    anchor: 'svc-commercial',
    name: 'Commercial Roofing',
    shortDescription: 'Minimally disruptive installation and maintenance for business properties.',
    description: 'Scheduled, minimally disruptive installation, repair, and maintenance solutions for retail, office, industrial, and multi-unit properties.',
    commonProblems: 'Membrane wear, drainage issues, roof penetrations, aging commercial systems, recurring maintenance needs.',
    benefits: 'Flexible scheduling around business hours, preventive maintenance options, scalable roofing systems.',
    ctaLabel: 'Request a Commercial Quote',
    tag: '',
    imageSlot: 'category-commercial',
    imageFallback: '/images/category-commercial.jpg',
    imageUrl: '',
    visible: true,
  },
  {
    id: 'gutters-eavestroughs',
    anchor: 'svc-gutters',
    name: 'Gutters & Eavestroughs',
    shortDescription: 'Properly sized systems that move water away from your roof and foundation.',
    description: 'Properly sized and sloped gutter systems that direct water away from your roofline, siding, landscaping, and foundation.',
    commonProblems: 'Overflowing gutters, sagging sections, leaking joints, poor drainage, damaged downspouts.',
    benefits: 'Helps prevent fascia and foundation damage, reduces basement water intrusion risk, low-maintenance materials available.',
    ctaLabel: 'Get a Free Estimate',
    tag: '',
    imageSlot: 'category-gutters',
    imageFallback: '/images/category-gutters.jpg',
    imageUrl: '',
    visible: true,
  },

];

const DEFAULT_SERVICE_ORDER = [
  'roof-repair',
  'emergency-roof-repair',
  'roof-inspections',
  'asphalt-shingles',
  'metal-roofing',
  'flat-roofing',
  'commercial-roofing',
  'gutters-eavestroughs',
  'roof-replacement',
];

export const DEFAULT_SERVICES: RoofingService[] = DEFAULT_SERVICE_ORDER
  .map((id) => DEFAULT_SERVICES_RAW.find((service) => service.id === id))
  .filter((service): service is RoofingService => Boolean(service));

const ref = () => (db ? doc(db, 'site', 'services') : null);

function normalize(raw?: RoofingService[]) {
  if (!raw?.length) return DEFAULT_SERVICES;
  return raw.map((service, index) => ({
    ...service,
    id: service.id || `service-${index + 1}`,
    anchor: service.anchor || `svc-${service.id || index + 1}`,
    ctaLabel: service.ctaLabel || 'Get a Free Estimate',
    tag: service.tag || '',
    imageSlot: service.imageSlot || '',
    imageFallback: service.imageFallback || '/images/category-repair.jpg',
    imageUrl: service.imageUrl || '',
    visible: service.visible !== false,
  }));
}

export async function getServices(): Promise<RoofingService[]> {
  if (!firebaseConfigured || !db) return DEFAULT_SERVICES;
  const r = ref();
  if (!r) return DEFAULT_SERVICES;
  const snap = await getDoc(r);
  return normalize(snap.exists() ? (snap.data().services as RoofingService[] | undefined) : undefined);
}

export function subscribeServices(cb: (services: RoofingService[]) => void) {
  if (!firebaseConfigured || !db) {
    cb(DEFAULT_SERVICES);
    return () => {};
  }
  const r = ref();
  if (!r) return () => {};
  return onSnapshot(
    r,
    (snap) => cb(normalize(snap.exists() ? (snap.data().services as RoofingService[] | undefined) : undefined)),
    () => cb(DEFAULT_SERVICES),
  );
}

export async function saveServices(services: RoofingService[]) {
  if (!firebaseConfigured || !db) throw new Error('Firebase is not configured.');
  const r = ref();
  if (!r) throw new Error('Firebase is not configured.');
  await setDoc(r, { services, updatedAt: new Date().toISOString() }, { merge: true });
}
