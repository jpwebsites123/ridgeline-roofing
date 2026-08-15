export type Project = {
  id: number;
  cat: string;
  city: string;
  type: string;
  material: string;
  img: string;
  img2: string;
  overview: string;
  problem: string;
  solution: string;
  duration: string;
  review: string;
  /** When true, `img` is a single composite before/after graphic and the
   *  modal should show it full-width instead of img/img2 side by side. */
  composite?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    cat: 'metal',
    city: 'Oakville, Ontario',
    type: 'Metal Re-Roof',
    material: 'Standing Seam Steel',
    img: '/images/project-5.jpg',
    img2: '/images/project-5.jpg',
    composite: true,
    overview:
      'An aging, rust-streaked metal roof was upgraded to a modern standing-seam system.',
    problem: 'Original metal roofing had faded and developed visible rust streaking over time.',
    solution:
      'Full upgrade to a modern standing-seam metal system for enhanced durability, weather resistance, and a sleek, long-lasting finish.',
    duration: '3 days',
    review: '"The new metal roof looks incredible and the whole process was painless." \u2014 R. Alvarez',
  },
  {
    id: 2,
    cat: 'commercial flat',
    city: 'Brantford, Ontario',
    type: 'Commercial Re-Roof',
    material: 'TPO Membrane System',
    img: '/images/project-4.jpg',
    img2: '/images/project-4.jpg',
    composite: true,
    overview:
      'A commercial flat roof with cracking, ponding water, and failing membrane was fully upgraded.',
    problem: 'Aging membrane had cracked and was holding standing water across multiple sections.',
    solution:
      'Full upgrade to a high-performance TPO membrane system for superior waterproofing, energy efficiency, and long-term durability.',
    duration: '4 days (phased)',
    review: '"Zero disruption to customers during the whole project." \u2014 T. Nguyen',
  },
  {
    id: 3,
    cat: 'repair replacement shingle',
    city: 'Burlington, Ontario',
    type: 'Storm Damage Replacement',
    material: 'Architectural Asphalt Shingles',
    img: '/images/project-3.jpg',
    img2: '/images/project-3.jpg',
    composite: true,
    overview: 'A severely damaged roof with widespread missing and torn shingles was fully replaced.',
    problem: 'Storm damage left large sections of the roof stripped down to bare decking.',
    solution:
      'Complete replacement with high-performance architectural shingles for a strong, weather-tight finish.',
    duration: '2 days',
    review: '"They had someone out within a day. Fixed it right the first time." \u2014 D. Chen',
  },
  {
    id: 4,
    cat: 'replacement shingle',
    city: 'Hamilton, Ontario',
    type: 'Full Roof Replacement',
    material: 'Architectural Asphalt Shingles',
    img: '/images/project-1.jpg',
    img2: '/images/project-1.jpg',
    composite: true,
    overview:
      'A complete tear-off and replacement after years of wear left the roof faded and worn.',
    problem: 'Original shingles had faded significantly and were nearing the end of their service life.',
    solution: 'Full replacement with high-quality architectural shingles for durability and curb appeal.',
    duration: '2 days',
    review: '"Communication was excellent the whole way through." \u2014 J. Mitchell',
  },
  {
    id: 5,
    cat: 'replacement shingle',
    city: 'Ancaster, Ontario',
    type: 'Full Roof Replacement',
    material: 'Architectural Asphalt Shingles',
    img: '/images/project-2.jpg',
    img2: '/images/project-2.jpg',
    composite: true,
    overview: 'Damaged and missing shingles were fully replaced ahead of a home sale.',
    problem: 'Large patches of missing and deteriorated shingles were flagged in a pre-sale inspection.',
    solution:
      'Full replacement with premium architectural shingles for long-lasting protection and a clean look.',
    duration: '2 days',
    review: '"They caught a ventilation issue that would have caused real problems later." \u2014 S. Bergeron',
  },
  {
    id: 6,
    cat: 'replacement shingle',
    city: 'Mississauga, Ontario',
    type: 'Full Roof Replacement',
    material: 'Architectural Asphalt Shingles',
    img: '/images/project-6.jpg',
    img2: '/images/project-6.jpg',
    composite: true,
    overview: 'A worn, moss-covered roof was replaced to restore protection and curb appeal.',
    problem: 'Years of moss and algae growth had left the roof worn, discolored, and aging fast.',
    solution:
      'Full replacement with high-quality architectural shingles to improve protection, boost curb appeal, and add long-term value.',
    duration: '1 day',
    review: '"Small job but they treated it like it mattered." \u2014 M. Osei',
  },
];
