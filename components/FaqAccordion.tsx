'use client';

import { useState } from 'react';

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How do I know if I need a new roof?',
    a: 'Common signs include curling or missing shingles, granules collecting in gutters, visible sagging, daylight through the attic boards, or leaks after heavy rain. A free inspection can give you a clear answer either way.',
  },
  {
    q: 'How long does a roof replacement take?',
    a: 'Most residential replacements are completed in one to three days, depending on the size and pitch of the roof, material chosen, and weather conditions.',
  },
  {
    q: 'How much does a new roof cost?',
    a: 'Cost depends on roof size, pitch, material, and the scope of any repairs needed underneath. We provide a clear, itemized estimate after a free in-person inspection.',
  },
  {
    q: 'Do you provide free estimates?',
    a: 'Yes. Every estimate starts with a free, no-obligation roof inspection and a written quote.',
  },
  {
    q: 'What roofing materials do you install?',
    a: 'We install architectural asphalt shingles, standing-seam metal roofing, and flat roofing systems including TPO, EPDM, and modified bitumen.',
  },
  {
    q: 'What warranties do you offer?',
    a: 'Every project includes manufacturer material warranties plus our own workmanship warranty covering installation labor.',
  },
  {
    q: 'Can you repair storm damage?',
    a: 'Yes, including emergency tarping and rapid-response repairs for wind, hail, and fallen-debris damage.',
  },
  {
    q: 'Do I need to leave my home during installation?',
    a: 'No. Most homeowners stay home comfortably during a roof replacement, though pets may prefer a quieter space during the noisiest hours.',
  },
  {
    q: 'How long should my roof last?',
    a: 'Asphalt shingle roofs typically last 20\u201330 years, and metal roofing can last 40\u201360 years, depending on material, installation quality, and climate.',
  },
];

export default function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="faq section-pad" id="faq-home">
      <div className="wrap" style={{ maxWidth: '840px' }}>
        <div className="section-head center reveal">
          <div className="eyebrow">Questions</div>
          <h2>Frequently asked questions</h2>
        </div>
        <div id="faqList">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div className={`faq-item reveal${isOpen ? ' open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="plus"></span>
                </button>
                <div
                  className="faq-a"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
