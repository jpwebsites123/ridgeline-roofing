'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu automatically on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header id="siteHeader" className={solid ? 'solid' : ''}>
        <div className="wrap header-inner">
          <a className="logo" href="/">
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
            <span>
              Ridgeline
              <small>Roofing Co.</small>
            </span>
          </a>
          <nav className="mainnav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/projects">Projects</a>
            <a href="/roofing-systems">Roofing Systems</a>
            <a href="/financing">Financing</a>
            <a href="/reviews">Reviews</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="header-right">
            <a className="header-phone" href="tel:+15550180192">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (555) 018-0192
            </a>
            <a className="btn btn-primary btn-sm" href="/contact#estimate">
              Get My Free Estimate
            </a>
            <button
              aria-label="Open menu"
              className="hamburger"
              onClick={() => setMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        <div className="close-row">
          <a className="logo" href="/">
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
            <span>Ridgeline</span>
          </a>
          <button
            aria-label="Close menu"
            className="icon-btn"
            onClick={() => setMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <a className="mnav" href="/">Home</a>
        <a className="mnav" href="/about">About</a>
        <a className="mnav" href="/services">Services</a>
        <a className="mnav" href="/projects">Projects</a>
        <a className="mnav" href="/roofing-systems">Roofing Systems</a>
        <a className="mnav" href="/financing">Financing</a>
        <a className="mnav" href="/reviews">Reviews</a>
        <a className="mnav" href="/contact">Contact</a>
        <div className="mobile-menu-cta">
          <a className="btn btn-outline-light" href="tel:+15550180192">
            Call (555) 018-0192
          </a>
          <a className="btn btn-primary" href="/contact#estimate">
            Get My Free Estimate
          </a>
        </div>
      </div>
    </>
  );
}
