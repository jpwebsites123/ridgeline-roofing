'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_AREAS, subscribeAreas } from '@/lib/firestore-areas';

export default function ServiceAreaList() {
  const [areas, setAreas] = useState<string[]>(DEFAULT_AREAS);
  useEffect(() => subscribeAreas(setAreas), []);
  return (
    <div className="area-list">
      {areas.map((area) => (
        <a href="/contact" key={area}>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {area}
        </a>
      ))}
    </div>
  );
}
