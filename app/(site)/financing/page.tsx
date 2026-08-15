export default function FinancingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Financing</div>
          <h1>Don&rsquo;t let a damaged roof wait.</h1>
          <p>
            A new roof is a major investment, and a damaged one doesn&rsquo;t wait for a
            convenient time. Flexible financing options may be available to help spread the
            cost into manageable payments.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <div className="demo-note reveal">
            Demo content &mdash; the financing details on this page are placeholders and
            should be replaced with the company&rsquo;s actual financing programs, lenders,
            rates, and terms before this goes live.
          </div>

          <div className="section-head reveal" style={{ marginTop: '30px' }}>
            <div className="eyebrow">How It Works</div>
            <h2>Financing your roofing project</h2>
          </div>

          <div className="wcards" style={{ maxWidth: '760px' }}>
            <div className="wcard reveal">
              <h4>1. Get your free estimate</h4>
              <p>
                We inspect the roof and provide a clear, itemized estimate before any
                financing conversation happens.
              </p>
            </div>
            <div className="wcard reveal">
              <h4>2. Explore payment options</h4>
              <p>
                Ask our team about available plans &mdash; options may include fixed
                monthly payments, promotional low- or no-interest periods, or
                pay-over-time programs through a lending partner.
              </p>
            </div>
            <div className="wcard reveal">
              <h4>3. Get approved and schedule</h4>
              <p>
                Once financing is arranged, we schedule the work &mdash; most residential
                projects are completed within one to three days.
              </p>
            </div>
          </div>

          <div className="section-head reveal" style={{ marginTop: '64px' }}>
            <div className="eyebrow">Questions</div>
            <h2>Financing FAQ</h2>
          </div>

          <div style={{ maxWidth: '760px' }}>
            <div className="faq-item reveal">
              <div className="faq-q" style={{ cursor: 'default' }}>
                <span>Do I need good credit to qualify?</span>
              </div>
              <div className="faq-a" style={{ maxHeight: 'none' }}>
                <p>
                  Requirements vary by lender and program. Our team can walk you through
                  what&rsquo;s available once financing partners are confirmed.
                </p>
              </div>
            </div>
            <div className="faq-item reveal">
              <div className="faq-q" style={{ cursor: 'default' }}>
                <span>Is there a penalty for paying off early?</span>
              </div>
              <div className="faq-a" style={{ maxHeight: 'none' }}>
                <p>
                  This depends on the specific financing program selected &mdash; ask our
                  team for the terms of any plan before signing.
                </p>
              </div>
            </div>
            <div className="faq-item reveal">
              <div className="faq-q" style={{ cursor: 'default' }}>
                <span>Can financing cover emergency repairs too?</span>
              </div>
              <div className="faq-a" style={{ maxHeight: 'none' }}>
                <p>
                  In many cases, yes. Let us know if your project is time-sensitive when
                  you request your estimate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap section-pad reveal">
          <h2>Ready to talk financing options?</h2>
          <p>Get your free estimate first &mdash; we&rsquo;ll walk you through what&rsquo;s available.</p>
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
