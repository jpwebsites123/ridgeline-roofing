import SiteImg from '@/components/SiteImg';
export default function ProjectsTeaser() {
  return (
<section className="projects section-pad" id="projects-home">
<div className="wrap">
<div className="section-head reveal">
<div className="eyebrow">Featured Work</div>
<h2>Recent roofing projects</h2>
</div>
<div className="proj-grid">
<a className="proj-card reveal" href="/projects">
<SiteImg alt="Full roof replacement, Hamilton Ontario" slot="category-replacement" fallback="/images/category-replacement.jpg" fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw"/>
<div className="proj-overlay"><div className="ptag">Full Replacement</div><h4>Hamilton, Ontario</h4><p>Architectural Asphalt Shingles</p><span className="view-case">View Case Study <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div>
</a>
<a className="proj-card reveal" href="/projects">
<SiteImg alt="Standing seam metal roof, Oakville Ontario" slot="category-metal" fallback="/images/category-metal.jpg" fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw"/>
<div className="proj-overlay"><div className="ptag">Metal Roofing</div><h4>Oakville, Ontario</h4><p>Standing Seam Steel</p><span className="view-case">View Case Study <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div>
</a>
<a className="proj-card reveal" href="/projects">
<SiteImg alt="Commercial flat roof, Brantford Ontario" slot="category-flat" fallback="/images/category-flat.jpg" fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 33vw"/>
<div className="proj-overlay"><div className="ptag">Commercial</div><h4>Brantford, Ontario</h4><p>TPO Membrane System</p><span className="view-case">View Case Study <svg fill="none" height="12" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" width="12"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div>
</a>
</div>
<div style={{textAlign: 'center', marginTop: '48px'}}>
<a className="btn btn-outline" href="/projects">Explore Our Projects</a>
</div>
</div>
</section>
  );
}
