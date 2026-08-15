import SiteImg from '@/components/SiteImg';
export default function RoofingSystemsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Roofing Systems</div>
          <h1>Roofing systems we install</h1>
          <p>
            Every material has its place. Here&rsquo;s an honest breakdown of what each
            system does well, what it costs to own long-term, and which homes and buildings
            it fits best.
          </p>
        </div>
      </section>

      <section className="section-pad" id="rs-shingles">
        <div className="wrap intro-grid">
          <div className="intro-media reveal">
            <SiteImg alt="Architectural asphalt shingles" slot="category-replacement" fallback="/images/category-replacement.jpg" fill sizes="(max-width: 1080px) 100vw, 50vw"/>
          </div>
          <div className="intro-copy reveal">
            <div className="eyebrow">01 / Asphalt Shingles</div>
            <h2>Architectural shingles</h2>
            <p>
              Layered, dimensional shingles that remain the most common residential roofing
              system in North America &mdash; a proven, cost-effective choice available in
              dozens of colors and styles.
            </p>
            <p>
              <b>Benefits:</b> strong wind resistance, wide style and color selection,
              straightforward manufacturer warranties.
            </p>
            <p>
              <b>Style options:</b> three-tab, architectural/dimensional, and designer
              shingle profiles in a wide color range.
            </p>
            <p>
              <b>Best for:</b> most residential homes looking for the best balance of cost,
              appearance, and durability.
            </p>
            <div className="mat-meta" style={{ marginBottom: '16px' }}>
              25&ndash;30 Year Lifespan
            </div>
            <a className="btn btn-outline" href="/contact#estimate">
              Get a Free Estimate
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad" id="rs-metal" style={{ background: 'var(--cream)' }}>
        <div className="wrap intro-grid">
          <div className="intro-copy reveal">
            <div className="eyebrow">02 / Metal Roofing</div>
            <h2>Standing-seam metal</h2>
            <p>
              Standing-seam steel panels engineered for exceptional durability, energy
              efficiency, and a distinctive modern look that lasts decades longer than
              asphalt.
            </p>
            <p>
              <b>Benefits:</b> 40&ndash;60 year lifespan, strong wind and fire resistance,
              reflects heat to reduce cooling costs.
            </p>
            <p>
              <b>Style options:</b> a range of panel profiles and factory-finished colors,
              including matte and textured finishes.
            </p>
            <p>
              <b>Best for:</b> homeowners planning to stay long-term, or anyone prioritizing
              energy efficiency and minimal future maintenance.
            </p>
            <div className="mat-meta" style={{ marginBottom: '16px' }}>
              40&ndash;60 Year Lifespan
            </div>
            <a className="btn btn-outline" href="/contact#estimate">
              Get a Free Estimate
            </a>
          </div>
          <div className="intro-media reveal">
            <SiteImg alt="Standing seam metal roofing" slot="category-metal" fallback="/images/category-metal.jpg" fill sizes="(max-width: 1080px) 100vw, 50vw"/>
          </div>
        </div>
      </section>

      <section className="section-pad" id="rs-flat">
        <div className="wrap intro-grid">
          <div className="intro-media reveal">
            <SiteImg alt="Flat roofing membrane system" slot="category-flat" fallback="/images/category-flat.jpg" fill sizes="(max-width: 1080px) 100vw, 50vw"/>
          </div>
          <div className="intro-copy reveal">
            <div className="eyebrow">03 / Flat Roofing</div>
            <h2>Flat &amp; low-slope systems</h2>
            <p>
              TPO, EPDM, and modified bitumen membranes engineered for additions, garages,
              and any roof without enough pitch for shingles.
            </p>
            <p>
              <b>Benefits:</b> reliable waterproofing, energy-efficient reflective membrane
              options, straightforward repairs when needed.
            </p>
            <p>
              <b>Style options:</b> white/reflective TPO, black EPDM rubber, or torch-down
              modified bitumen, depending on the roof and budget.
            </p>
            <p>
              <b>Best for:</b> additions, garages, and any low-slope section of a home or
              small commercial building.
            </p>
            <div className="mat-meta" style={{ marginBottom: '16px' }}>
              15&ndash;25 Year Lifespan
            </div>
            <a className="btn btn-outline" href="/contact#estimate">
              Get a Free Estimate
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad" id="rs-commercial" style={{ background: 'var(--cream)' }}>
        <div className="wrap intro-grid">
          <div className="intro-copy reveal">
            <div className="eyebrow">04 / Commercial Systems</div>
            <h2>Commercial roofing systems</h2>
            <p>
              Scalable, code-compliant systems designed to protect the building while
              minimizing disruption to the business operating underneath it.
            </p>
            <p>
              <b>Benefits:</b> flexible scheduling around business hours, preventive
              maintenance plans, systems built for large flat or low-slope roof areas.
            </p>
            <p>
              <b>Style options:</b> TPO, EPDM, and built-up systems sized and specified to
              the building.
            </p>
            <p>
              <b>Best for:</b> retail, office, and industrial properties needing a
              durable, low-maintenance roof.
            </p>
            <div className="mat-meta" style={{ marginBottom: '16px' }}>
              20&ndash;30 Year Lifespan
            </div>
            <a className="btn btn-outline" href="/contact#estimate">
              Request a Commercial Quote
            </a>
          </div>
          <div className="intro-media reveal">
            <SiteImg alt="Commercial roofing system" slot="category-commercial" fallback="/images/category-commercial.jpg" fill sizes="(max-width: 1080px) 100vw, 50vw"/>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap section-pad reveal">
          <h2>Not sure which system fits your roof?</h2>
          <p>Start with a free inspection &mdash; we&rsquo;ll recommend the right system honestly.</p>
          <div className="ctas">
            <a className="btn btn-primary" href="/contact#estimate">
              Get My Free Estimate
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
