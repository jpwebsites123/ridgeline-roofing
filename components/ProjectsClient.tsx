'use client';

import { useState } from 'react';
import { useSiteMedia } from '@/components/SiteMediaProvider';
import { resolveMediaUrl } from '@/lib/site-media';
import { PROJECTS, Project } from '@/lib/projects-data';

const FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'replacement', label: 'Roof Replacement' },
  { key: 'repair', label: 'Repairs' },
  { key: 'metal', label: 'Metal Roofing' },
  { key: 'shingle', label: 'Shingle Roofing' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'flat', label: 'Flat Roofing' },
];

export default function ProjectsClient() {
  const media = useSiteMedia();
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const list = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cat.includes(filter));

  return (
    <>
      <div className="filter-row reveal" id="projFilters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="proj-grid" id="projGrid">
        {list.map((p) => (
          <a
            key={p.id}
            className="proj-card reveal in"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveProject(p);
            }}
          >
            <img loading="lazy" src={resolveMediaUrl(media, p.img)} alt={`${p.type} in ${p.city}`} />
            <div className="proj-overlay">
              <div className="ptag">{p.type}</div>
              <h4>{p.city}</h4>
              <p>{p.material}</p>
              <span className="view-case">
                View Case Study{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>

      <div
        className={`modal-overlay${activeProject ? ' open' : ''}`}
        id="projModal"
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveProject(null);
        }}
      >
        <div className="modal-box" id="modalBox">
          {activeProject && (
            <>
              <button
                className="modal-close"
                id="modalCloseBtn"
                onClick={() => setActiveProject(null)}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className={activeProject.composite ? 'modal-media modal-media-single' : 'modal-media'}>
                {activeProject.composite ? (
                  <img src={resolveMediaUrl(media, activeProject.img)} alt={`${activeProject.type} before and after`} />
                ) : (
                  <>
                    <img src={resolveMediaUrl(media, activeProject.img)} alt="Before" />
                    <img src={resolveMediaUrl(media, activeProject.img2)} alt="After" />
                  </>
                )}
              </div>
              <div className="modal-body">
                <div
                  style={{
                    fontFamily: 'var(--font-plex-mono)',
                    fontSize: '11px',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--steel)',
                    marginBottom: '10px',
                  }}
                >
                  Case Study
                </div>
                <h3>{activeProject.city}</h3>
                <div className="modal-meta">
                  {activeProject.type} &middot; {activeProject.material}
                </div>
                <p className="desc">{activeProject.overview}</p>
                <div className="modal-specs">
                  <div>
                    <span>Problem</span>
                    <b>{activeProject.problem}</b>
                  </div>
                  <div>
                    <span>Solution</span>
                    <b>{activeProject.solution}</b>
                  </div>
                  <div>
                    <span>Duration</span>
                    <b>{activeProject.duration}</b>
                  </div>
                </div>
                <p className="desc" style={{ fontStyle: 'italic' }}>
                  {activeProject.review}
                </p>
                <a
                  href="/contact#estimate"
                  className="btn btn-primary"
                  style={{ marginTop: '14px' }}
                >
                  Get My Free Estimate
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
