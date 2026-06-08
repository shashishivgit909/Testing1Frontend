import React, { useState } from 'react';
import './Contact.css';

const faqs = [
  { q: 'What are your working hours?', a: 'Mon–Sat: 5:00 AM to 10:00 PM. Sundays: 7:00 AM to 8:00 PM.' },
  { q: 'Is there a free trial available?', a: 'Yes! We offer a free 1-day trial pass for all new visitors. Just contact us to book.' },
  { q: 'Do you offer student discounts?', a: 'Absolutely. Students with a valid ID get 20% off on any plan.' },
  { q: 'Can I freeze my membership?', a: 'Yes, memberships can be frozen for up to 30 days per year at no extra charge.' },
];

function FAQ({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{question}</span>
        <span className="faq-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch {
      setStatus({ type: 'error', message: 'Connection failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-content">
          <p className="section-label">Get In Touch</p>
          <h1>Let's <span>Talk</span> Fitness</h1>
          <p>Questions, tours, partnerships — we're here every step of the way.</p>
        </div>
        <div className="contact-hero-cut" />
      </section>

      {/* Info + Form */}
      <section className="contact-main">
        <div className="contact-container">

          {/* Info Panel */}
          <div className="contact-info-panel">
            <h2>Find Us</h2>

            <div className="info-cards">
              {[
                { icon: '📍', title: 'Visit Us', lines: ['123 Fitness Avenue, Andheri West', 'Mumbai, Maharashtra 400053'] },
                { icon: '📞', title: 'Call Us', lines: ['+91 98765 43210', '+91 91234 56789'] },
                { icon: '✉️', title: 'Email Us', lines: ['info@powerfit.com', 'support@powerfit.com'] },
                { icon: '🕐', title: 'Working Hours', lines: ['Mon–Sat: 5:00 AM – 10:00 PM', 'Sunday: 7:00 AM – 8:00 PM'] },
              ].map((info, i) => (
                <div className="info-card" key={i}>
                  <div className="info-card-icon">{info.icon}</div>
                  <div>
                    <h4>{info.title}</h4>
                    {info.lines.map((l, j) => <p key={j}>{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-block">
              <h4>Follow Us</h4>
              <div className="social-links">
                {[
                  { label: 'Instagram', icon: '📸' },
                  { label: 'Facebook', icon: '👥' },
                  { label: 'YouTube', icon: '▶️' },
                  { label: 'WhatsApp', icon: '💬' },
                ].map((s, i) => (
                  <a href="#!" key={i} className="social-btn" aria-label={s.label}>
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <div className="form-header">
              <h2>Send a <span>Message</span></h2>
              <p>We respond to every message within 24 hours.</p>
            </div>

            {status.message && (
              <div className={`status-alert ${status.type}`}>
                <span className="alert-icon">{status.type === 'success' ? '✅' : '❌'}</span>
                <span>{status.message}</span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-field ${focused === 'name' || formData.name ? 'active' : ''}`}>
                  <label htmlFor="c-name">Full Name *</label>
                  <input
                    id="c-name" name="name" type="text"
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    placeholder="Your full name" required
                  />
                  <div className="field-line" />
                </div>
                <div className={`form-field ${focused === 'email' || formData.email ? 'active' : ''}`}>
                  <label htmlFor="c-email">Email Address *</label>
                  <input
                    id="c-email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    placeholder="your@email.com" required
                  />
                  <div className="field-line" />
                </div>
              </div>

              <div className={`form-field ${focused === 'subject' || formData.subject ? 'active' : ''}`}>
                <label htmlFor="c-subject">Subject *</label>
                <input
                  id="c-subject" name="subject" type="text"
                  value={formData.subject} onChange={handleChange}
                  onFocus={() => setFocused('subject')} onBlur={() => setFocused('')}
                  placeholder="What's this about?" required
                />
                <div className="field-line" />
              </div>

              <div className={`form-field ${focused === 'message' || formData.message ? 'active' : ''}`}>
                <label htmlFor="c-message">Message *</label>
                <textarea
                  id="c-message" name="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  placeholder="Tell us how we can help..." required
                />
                <div className="field-line" />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <><span className="spinner" />Sending...</>
                ) : (
                  <>Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <p className="section-label">FAQs</p>
            <h2 className="section-title">Quick <span>Answers</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => <FAQ key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
