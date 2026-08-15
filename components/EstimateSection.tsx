'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { submitLead } from '@/lib/firestore-leads';

export default function EstimateSection() {
  const [submitted, setSubmitted] = useState(false);
  const [fileLabel, setFileLabel] = useState('Click to upload, or drag photos here');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Native HTML5 validation already blocks this handler from firing
    // until all `required` fields are filled — see the <input required> /
    // <select required> attributes below.
    const data = new FormData(e.currentTarget);
    // Fire-and-forget: if Firebase isn't connected yet, submitLead()
    // resolves to false and the visitor still sees the same success
    // state — the public form never breaks for lack of a backend.
    submitLead({
      firstName: String(data.get('firstName') || ''),
      lastName: String(data.get('lastName') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      address: String(data.get('address') || ''),
      city: String(data.get('city') || ''),
      service: String(data.get('service') || ''),
      roofAge: String(data.get('roofAge') || ''),
      preferredContact: String(data.get('preferredContact') || ''),
      details: String(data.get('details') || ''),
    });
    setSubmitted(true);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const count = e.target.files?.length ?? 0;
    if (count > 0) {
      setFileLabel(`${count} photo(s) selected`);
    }
  }

  return (
    <section className="estimate" id="estimate">
      <div className="wrap section-pad">
        <div className="est-layout">
          <div className="est-side reveal">
            <div className="eyebrow">Free Estimate</div>
            <h2>Request my free roofing estimate</h2>
            <p>
              Tell us a bit about your project and we&rsquo;ll follow up to schedule a free,
              no-obligation inspection.
            </p>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />
                </svg>
                No-obligation, no-pressure estimate
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />
                </svg>
                Response from a real team member, not a bot
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 12l2 2 4-4M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />
                </svg>
                Clear, itemized pricing in writing
              </li>
            </ul>
          </div>

          <div className="est-form reveal" id="estFormWrap">
            {!submitted && (
              <form id="estimateForm" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="field">
                    <label>First Name</label>
                    <input required type="text" name="firstName" />
                  </div>
                  <div className="field">
                    <label>Last Name</label>
                    <input required type="text" name="lastName" />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input required type="tel" name="phone" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input required type="email" name="email" />
                  </div>
                  <div className="field full">
                    <label>Property Address</label>
                    <input required type="text" name="address" />
                  </div>
                  <div className="field">
                    <label>City</label>
                    <input required type="text" name="city" />
                  </div>
                  <div className="field">
                    <label>Service Needed</label>
                    <select required name="service" defaultValue="">
                      <option value="">Select a service&hellip;</option>
                      <option>Roof Replacement</option>
                      <option>Roof Repair</option>
                      <option>Roof Inspection</option>
                      <option>Emergency Repair</option>
                      <option>Metal Roofing</option>
                      <option>Flat Roofing</option>
                      <option>Commercial Roofing</option>
                      <option>Gutters</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <details className="optional-toggle">
                    <summary>
                      Add project details (optional){' '}
                      <svg
                        className="chev"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="optional-body">
                      <div className="field">
                        <label>Approximate Roof Age</label>
                        <input placeholder="e.g. 15 years" type="text" name="roofAge" />
                      </div>
                      <div className="field">
                        <label>Preferred Contact Method</label>
                        <select name="preferredContact" defaultValue="Phone Call">
                          <option>Phone Call</option>
                          <option>Text Message</option>
                          <option>Email</option>
                        </select>
                      </div>
                      <div className="field full">
                        <label>Project Details</label>
                        <textarea
                          placeholder="Tell us about your roof or the issue you're experiencing"
                          name="details"
                        />
                      </div>
                      <div className="field full">
                        <label>Upload Photos of Your Roof</label>
                        <label className="upload-box" htmlFor="photoUpload">
                          {fileLabel}
                        </label>
                        <input
                          accept="image/*"
                          id="photoUpload"
                          multiple
                          style={{ display: 'none' }}
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </details>

                  <div className="form-note">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                    Takes about 60 seconds &mdash; we&rsquo;ll follow up to schedule your free
                    inspection.
                  </div>
                </div>
                <button className="btn btn-primary est-submit" type="submit">
                  Request My Free Estimate
                </button>
              </form>
            )}

            <div className={`form-success${submitted ? ' show' : ''}`} id="formSuccess">
              <div className="check-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </div>
              <h3>Thanks! We&rsquo;ve received your request.</h3>
              <p>A member of our team will contact you shortly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
