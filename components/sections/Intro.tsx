import SiteImg from '@/components/SiteImg';
export default function Intro() {
  return (
<section className="intro section-pad">
<div className="wrap intro-grid">
<div className="intro-copy reveal">
<div className="eyebrow">Who We Are</div>
<h2>A roofing company you can count on.</h2>
<p>Ridgeline Roofing has spent over a decade helping homeowners across the region protect their properties with roofing systems built to last. We treat every home like it&apos;s our own — showing up on time, communicating clearly, and leaving the job site cleaner than we found it.</p>
<p>From a single storm-damaged shingle to a complete tear-off and replacement, our crews bring the same level of craftsmanship to every project, backed by a real workmanship warranty.</p>
<div className="stat-grid">
<div className="stat"><div className="num">10+</div><div className="lbl">Years Experience</div></div>
<div className="stat"><div className="num">500+</div><div className="lbl">Roofs Completed</div></div>
<div className="stat"><div className="num">5.0</div><div className="lbl">Customer Rating*</div></div>
<div className="stat"><div className="num">100%</div><div className="lbl">Commitment to Quality</div></div>
</div>
<p style={{fontFamily: 'IBM Plex Mono', fontSize: '11px', color: 'var(--steel-light)', marginTop: '14px', letterSpacing: '.02em'}}>*Placeholder figures for this demo — to be replaced with the company&apos;s verified numbers.</p>
<a className="btn btn-outline" href="/about" style={{marginTop: '22px'}}>About Our Company</a>
</div>
<div className="intro-media reveal">
<SiteImg alt="Roofing crew installing new shingles on a residential roof" slot="category-aftercrew" fallback="/images/category-aftercrew.jpg" fill sizes="(max-width: 1080px) 100vw, 50vw"/>
<div className="frame-tag">Est. 2014<b>Family Owned</b></div>
</div>
</div>
</section>
  );
}
