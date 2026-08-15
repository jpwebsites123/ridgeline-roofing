import ServiceAreaList from '@/components/ServiceAreaList';

export default function ServiceArea() {
  return (
<section className="area section-pad" id="area">
<div className="wrap area-grid">
<div className="reveal">
<div className="eyebrow">Service Area</div>
<h2>Proudly roofing our community</h2>
<p className="sub" style={{marginBottom: '26px'}}>Serving homeowners and businesses across the following areas. Not seeing your city? Reach out — we may still be able to help.</p>
<ServiceAreaList />
<div className="demo-note" style={{marginTop: '22px'}}>Demo content — service area cities are placeholders and should be confirmed for the real company.</div>
</div>
<div className="area-map reveal">
<svg viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
<rect fill="#EDE8DB" height="420" width="500"></rect>
<path d="M20 340 Q120 300 180 320 T340 280 T480 260" fill="none" stroke="#dcd5c2" strokeWidth="14"></path>
<path d="M60 40 Q140 120 120 220 T180 380" fill="none" stroke="#dcd5c2" strokeWidth="10"></path>
<circle cx="250" cy="210" fill="#c1571f" r="7"></circle>
<circle cx="250" cy="210" fill="#c1571f" opacity="0.18" r="16"></circle>
<circle cx="170" cy="150" fill="#6b655d" r="4.5"></circle>
<circle cx="330" cy="170" fill="#6b655d" r="4.5"></circle>
<circle cx="300" cy="260" fill="#6b655d" r="4.5"></circle>
<circle cx="190" cy="280" fill="#6b655d" r="4.5"></circle>
<circle cx="360" cy="120" fill="#6b655d" r="4.5"></circle>
<circle cx="140" cy="230" fill="#6b655d" r="4.5"></circle>
<text fill="#1a1815" fontFamily="IBM Plex Mono" fontSize="11" fontWeight="600" textAnchor="middle" x="250" y="190">HQ</text>
</svg>
</div>
</div>
</section>
  );
}
