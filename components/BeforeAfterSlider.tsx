'use client';

import { useRef, useState } from 'react';
import { useSiteMedia } from '@/components/SiteMediaProvider';
import { resolveMediaUrl } from '@/lib/site-media';

type BAProject = {
  label: string;
  before: string;
  after: string;
};

const PROJECTS: BAProject[] = [
  {
    label: 'Ancaster \u2014 Full Replacement',
    before:
      '/images/category-replacement.jpg',
    after:
      '/images/category-aftercrew.jpg',
  },
  {
    label: 'Burlington \u2014 Storm Damage',
    before:
      '/images/category-repair.jpg',
    after:
      '/images/category-emergency.jpg',
  },
  {
    label: 'Oakville \u2014 Metal Re-Roof',
    before:
      '/images/category-flat.jpg',
    after:
      '/images/category-metal.jpg',
  },
];

export default function BeforeAfterSlider() {
  const media = useSiteMedia();
  const [activeIdx, setActiveIdx] = useState(0);
  const [pct, setPct] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const active = PROJECTS[activeIdx];

  function setFromClientX(clientX: number) {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let next = ((clientX - rect.left) / rect.width) * 100;
    next = Math.max(2, Math.min(98, next));
    setPct(next);
  }

  return (
    <section className="ba section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Real Results</div>
          <h2>See the difference</h2>
          <p className="sub">Drag the slider to compare a real roof before and after replacement.</p>
        </div>

        <div
          className="ba-slider reveal"
          id="baSlider"
          ref={sliderRef}
          onPointerDown={(e) => {
            draggingRef.current = true;
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) setFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            draggingRef.current = false;
          }}
          onPointerLeave={() => {
            draggingRef.current = false;
          }}
          onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
          onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
        >
          <img alt="Worn roof before replacement" className="ba-before" src={resolveMediaUrl(media, active.before)} />
          <img
            alt="New roof after replacement"
            className="ba-after"
            id="baAfter"
            src={resolveMediaUrl(media, active.after)}
            style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          />
          <span className="ba-tag before">Before</span>
          <span className="ba-tag after">After</span>
          <div className="ba-handle" id="baHandle" style={{ left: `${pct}%` }}>
            <div className="bar"></div>
            <div className="knob">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="ba-tabs reveal">
          {PROJECTS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              className={`ba-tab${i === activeIdx ? ' active' : ''}`}
              onClick={() => {
                setActiveIdx(i);
                setPct(50);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
