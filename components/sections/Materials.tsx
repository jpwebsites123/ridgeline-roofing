import SiteImg from '@/components/SiteImg';
export default function Materials() {
  return (
<section className="materials section-pad" id="materials">
<div className="wrap">
<div className="section-head reveal">
<div className="eyebrow">Roofing Systems</div>
<h2>Explore roofing materials</h2>
<p className="sub">Every material has its place. We&apos;ll help you choose the system that fits your home, budget, and climate.</p>
</div>
<div className="mat-grid">
<div className="mat-card reveal">
<div className="mat-media"><SiteImg alt="Architectural asphalt shingles" slot="category-aftercrew" fallback="/images/category-aftercrew.jpg" fill sizes="(max-width: 760px) 100vw, 50vw"/></div>
<div className="mat-body"><h3>Architectural Shingles</h3><div className="mat-meta">25–30 Year Lifespan</div><p className="desc">Layered dimensional shingles offering strong wind resistance and a wide range of colors.</p><div className="mat-tags"><span>Residential</span><span>Wide Color Range</span><span>Best Value</span></div></div>
</div>
<div className="mat-card reveal">
<div className="mat-media"><SiteImg alt="Standing seam metal roofing" slot="category-metal" fallback="/images/category-metal.jpg" fill sizes="(max-width: 760px) 100vw, 50vw"/></div>
<div className="mat-body"><h3>Metal Roofing</h3><div className="mat-meta">40–60 Year Lifespan</div><p className="desc">Standing-seam steel panels built for extreme durability and energy efficiency.</p><div className="mat-tags"><span>Residential</span><span>Commercial</span><span>Energy Efficient</span></div></div>
</div>
<div className="mat-card reveal">
<div className="mat-media"><SiteImg alt="Flat roofing membrane system" slot="category-flat" fallback="/images/category-flat.jpg" fill sizes="(max-width: 760px) 100vw, 50vw"/></div>
<div className="mat-body"><h3>Flat Roofing Systems</h3><div className="mat-meta">15–25 Year Lifespan</div><p className="desc">TPO, EPDM, and modified bitumen for additions, garages, and low-slope roofs.</p><div className="mat-tags"><span>Low-Slope</span><span>Additions</span><span>Waterproof</span></div></div>
</div>
<div className="mat-card reveal">
<div className="mat-media"><SiteImg alt="Commercial roofing system" slot="category-commercial" fallback="/images/category-commercial.jpg" fill sizes="(max-width: 760px) 100vw, 50vw"/></div>
<div className="mat-body"><h3>Commercial Roofing Systems</h3><div className="mat-meta">20–30 Year Lifespan</div><p className="desc">Scalable systems designed to minimize business disruption during installation.</p><div className="mat-tags"><span>Commercial</span><span>Low Disruption</span><span>Scheduled Work</span></div></div>
</div>
</div>
<div style={{textAlign: 'center', marginTop: '48px'}}>
<a className="btn btn-outline" href="/services">Explore Roofing Options</a>
</div>
</div>
</section>
  );
}
