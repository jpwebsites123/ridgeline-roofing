export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="logo" href="/" style={{ fontSize: '22px' }}>
              <span className="mark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 11L12 4l9 7M5 10v9h14v-9"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Ridgeline Roofing Co.
            </a>
            <p>
              Professional roof replacement, repair, and inspection serving Hamilton and the
              surrounding communities. Licensed, insured, and warranty backed.
            </p>
            <div className="foot-social">
              <a aria-label="Facebook" href="#">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a aria-label="Instagram" href="#">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a aria-label="Google" href="#">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/reviews">Reviews</a>
          </div>
          <div className="foot-col">
            <h5>Services</h5>
            <a href="/services#svc-replacement">Roof Replacement</a>
            <a href="/services#svc-repair">Roof Repair</a>
            <a href="/services#svc-metal">Metal Roofing</a>
            <a href="/services#svc-commercial">Commercial Roofing</a>
          </div>
          <div className="foot-col">
            <h5>Contact</h5>
            <p>(555) 018-0192</p>
            <p>hello@ridgelineroofingco.com</p>
            <a href="/contact#estimate">Get My Free Estimate</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Ridgeline Roofing Co. All rights reserved. Demo site — for presentation purposes.</span>
          <span>Licensed &amp; Insured · Serving Hamilton, ON &amp; Surrounding Areas · <a href="/admin" style={{ textDecoration: 'underline' }}>Admin</a></span>
        </div>
      </div>
    </footer>
  );
}
