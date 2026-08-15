import SiteImg from '@/components/SiteImg';
import TeamGrid from '@/components/TeamGrid';
export default function AboutPage() {
  return (
    <>
<section className="page-hero">
<div className="wrap">
<div className="crumb">Home / About</div>
<h1>Built on quality. Backed by trust.</h1>
<p>Ridgeline Roofing was founded on a simple idea: homeowners deserve a roofing company that shows up, communicates honestly, and does the work right the first time.</p>
</div>
</section>
<section className="about-stat-strip">
<div className="wrap">
<div className="astat"><b>10+</b><span>Years Experience</span></div>
<div className="astat"><b>500+</b><span>Roofs Completed</span></div>
<div className="astat"><b>5.0</b><span>Customer Rating*</span></div>
<div className="astat"><b>100%</b><span>Licensed & Insured</span></div>
</div>
<div className="wrap" style={{padding: '0 32px 34px'}}><p style={{fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'rgba(255,255,255,.75)'}}>*Placeholder figures for this demo — to be replaced with the company&apos;s verified numbers.</p></div>
</section>
<section className="section-pad">
<div className="wrap intro-grid">
<div className="intro-media reveal"><SiteImg alt="Ridgeline Roofing crew on site" slot="category-inspection" fallback="/images/category-inspection.jpg" fill sizes="(max-width: 1080px) 100vw, 50vw"/></div>
<div className="intro-copy reveal">
<div className="eyebrow">Our Story</div>
<h2>Started local. Stayed local.</h2>
<p>Ridgeline Roofing began as a two-person crew taking on repair jobs around Hamilton. Word of mouth — and a refusal to cut corners — grew that into a full-service roofing company serving homeowners and businesses across the region.</p>
<p>We&apos;re still a local, owner-operated company. That means the person who quotes your project is invested in how it turns out, not just closing the sale.</p>
<div className="eyebrow" style={{marginTop: '30px'}}>Our Mission</div>
<p>To give every homeowner a roof they can trust and an experience free of pressure tactics, vague pricing, or disappearing contractors.</p>
</div>
</div>
</section>
<section className="section-pad" style={{background: 'var(--cream)'}}>
<div className="wrap">
<div className="section-head reveal"><div className="eyebrow">What We Value</div><h2>Our values on every job site</h2></div>
<div className="values-grid">
<div className="value-card reveal"><h4>Quality Standards</h4><p>Manufacturer-certified installation practices on every roof, every time.</p></div>
<div className="value-card reveal"><h4>Safety First</h4><p>OSHA-aligned safety protocols to protect our crews and your property.</p></div>
<div className="value-card reveal"><h4>Community Involvement</h4><p>We sponsor local youth sports and support neighborhood storm-relief efforts.</p></div>
<div className="value-card reveal"><h4>Warranty Philosophy</h4><p>We warranty our own labor, not just the shingles — that&apos;s the part most companies skip.</p></div>
</div>
</div>
</section>
<section className="section-pad">
<div className="wrap">
<div className="section-head reveal"><div className="eyebrow">Leadership</div><h2>Meet the team</h2></div>
<TeamGrid />
<div className="demo-note" style={{marginTop: '30px'}}>Demo content — team photos and names are placeholders for the real company roster.</div>
</div>
</section>
<section className="final-cta"><div className="wrap section-pad reveal"><h2>Ready to meet your roofing team?</h2><p>Get a free, no-pressure estimate from the crew that will actually be on your roof.</p><div className="ctas"><a className="btn btn-primary" href="/contact#estimate">Get My Free Estimate</a></div></div></section>
    </>
  );
}
