import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Contact</div>
          <h1>Get in touch</h1>
          <p>Reach out for a free estimate, a roof inspection, or urgent repair &mdash; we respond fast.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap contact-grid">
          <div className="reveal">
            <div className="contact-info-card">
              <h5>Phone</h5>
              <div className="big">
                <a href="tel:+15550180192">(555) 018-0192</a>
              </div>
              <p>Emergency roofing calls answered directly.</p>
            </div>
            <div className="contact-info-card">
              <h5>Email</h5>
              <div className="big" style={{ fontSize: '19px' }}>
                <a href="mailto:hello@ridgelineroofingco.com">hello@ridgelineroofingco.com</a>
              </div>
              <p>We reply within one business day.</p>
            </div>
            <div className="contact-info-card">
              <h5>Business Hours</h5>
              <p style={{ marginTop: '4px', color: 'var(--ink)' }}>
                Mon&ndash;Fri: 7:00 AM &ndash; 6:00 PM
                <br />
                Saturday: 8:00 AM &ndash; 2:00 PM
                <br />
                Sunday: Emergency calls only
              </p>
            </div>
            <div className="contact-info-card">
              <h5>Service Area</h5>
              <p style={{ marginTop: '4px', color: 'var(--ink)' }}>
                Hamilton, Burlington, Oakville, Ancaster, Stoney Creek, Grimsby, Brantford &amp;
                Mississauga.
              </p>
            </div>
          </div>

          <div className="est-form reveal" style={{ alignSelf: 'start' }}>
            <h3
              style={{
                fontSize: '26px',
                textTransform: 'none',
                letterSpacing: '0',
                marginBottom: '6px',
              }}
            >
              Send us a message
            </h3>
            <p style={{ color: 'var(--steel)', fontSize: '14.5px', marginBottom: '22px' }}>
              For a full project estimate, use the Free Estimate form below instead.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
