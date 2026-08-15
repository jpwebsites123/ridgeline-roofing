'use client';

import { FormEvent, useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 0' }}>
        <h3
          style={{
            fontSize: '22px',
            textTransform: 'none',
            letterSpacing: '0',
            marginBottom: '8px',
          }}
        >
          Message sent
        </h3>
        <p style={{ color: 'var(--steel)' }}>Thanks &mdash; we&rsquo;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field">
          <label>Name</label>
          <input required type="text" name="name" />
        </div>
        <div className="field">
          <label>Phone</label>
          <input required type="tel" name="phone" />
        </div>
        <div className="field full">
          <label>Email</label>
          <input required type="email" name="email" />
        </div>
        <div className="field full">
          <label>Message</label>
          <textarea required name="message" />
        </div>
      </div>
      <button className="btn btn-primary est-submit" type="submit">
        Send Message
      </button>
    </form>
  );
}
