'use client';

import { useState } from 'react';

const SWATCHES = [
  { name: 'Charcoal', color: '#4a4038' },
  { name: 'Black', color: '#1b1815' },
  { name: 'Brown', color: '#5a3d29' },
  { name: 'Weathered Wood', color: '#6d5a3e' },
  { name: 'Slate', color: '#4b5259' },
  { name: 'Gray', color: '#7c7770' },
];

export default function RoofVisualizer() {
  const [selected, setSelected] = useState(SWATCHES[0]);

  return (
    <section className="visualizer section-pad">
      <div className="wrap viz-grid">
        <div className="viz-house reveal">
          <svg viewBox="0 0 500 360" width="100%" height="auto">
            <rect x="0" y="0" width="500" height="360" fill="#1f1d19" />
            <rect x="100" y="180" width="300" height="150" fill="#3a352e" />
            <rect x="130" y="220" width="55" height="55" fill="#141310" />
            <rect x="315" y="220" width="55" height="55" fill="#141310" />
            <rect x="225" y="235" width="50" height="95" fill="#141310" />
            <polygon
              id="roofShape"
              points="80,190 250,80 420,190"
              fill={selected.color}
            />
            <polygon
              points="80,190 250,80 420,190"
              fill="none"
              stroke="#100f0d"
              strokeWidth={3}
            />
            <rect x="238" y="95" width="24" height="55" fill="#2a261f" />
          </svg>
          <div className="viz-swatches" id="vizSwatches">
            {SWATCHES.map((s) => (
              <button
                key={s.name}
                type="button"
                className={`swatch${selected.name === s.name ? ' active' : ''}`}
                style={{ background: s.color }}
                data-name={s.name}
                onClick={() => setSelected(s)}
                aria-label={s.name}
              />
            ))}
          </div>
        </div>
        <div className="viz-copy reveal">
          <div className="eyebrow">Roof Visualizer</div>
          <h2 style={{ fontSize: 'clamp(30px,4.2vw,48px)', color: 'var(--white)' }}>
            Imagine your new roof
          </h2>
          <p>
            Not sure which shade fits your home? Tap a swatch to preview how different roofing
            colors change the look of a home &mdash; then bring your favorite to your free
            estimate appointment.
          </p>
          <div className="viz-label">
            Selected: <span id="vizSelected" style={{ color: 'var(--white)' }}>{selected.name}</span>
          </div>
          <a className="btn btn-primary" href="/contact#estimate">
            Get My Free Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
