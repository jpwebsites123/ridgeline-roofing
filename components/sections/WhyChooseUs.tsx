import SiteImg from '@/components/SiteImg';
export default function WhyChooseUs() {
  return (
<section className="why section-pad">
<div className="wrap">
<div className="section-head reveal">
<div className="eyebrow">The Ridgeline Difference</div>
<h2>Why homeowners choose Ridgeline</h2>
</div>
<div className="why-layout reveal">
<div className="why-media">
<SiteImg alt="Roofing crew member securing shingles" slot="category-inspection" fallback="/images/category-inspection.jpg" fill sizes="(max-width: 1080px) 100vw, 45vw"/>
<div className="why-badge"><b>500+</b>Roofs<br/>Completed</div>
</div>
<div className="why-list">
<div className="why-row"><div className="wnum">01</div><div><h4>Licensed & Insured</h4><p>Full coverage on every job, so you&apos;re protected from start to finish.</p></div></div>
<div className="why-row"><div className="wnum">02</div><div><h4>Experienced Roofing Crews</h4><p>Trained installers who treat every roof like it&apos;s their own home.</p></div></div>
<div className="why-row"><div className="wnum">03</div><div><h4>Premium Roofing Materials</h4><p>We use manufacturer-backed products, not the cheapest option available.</p></div></div>
<div className="why-row"><div className="wnum">04</div><div><h4>Transparent Pricing</h4><p>Clear, itemized estimates — no surprise charges after the work begins.</p></div></div>
<div className="why-row"><div className="wnum">05</div><div><h4>Clean & Respectful Job Sites</h4><p>Magnetic sweeps and daily cleanup protect your property and landscaping.</p></div></div>
<div className="why-row"><div className="wnum">06</div><div><h4>Strong Workmanship Warranty</h4><p>We stand behind our labor, not just the materials manufacturer.</p></div></div>
<div className="why-row"><div className="wnum">07</div><div><h4>Fast Communication</h4><p>Real answers from real people — not an automated call center.</p></div></div>
</div>
</div>
</div>
</section>
  );
}
