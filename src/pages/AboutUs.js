import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function useRevealAll() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.12 }
    );
    elements.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const timeline = [
  { year: '2014', title: 'Founded', desc: 'Started with 10 machines and a dream. 500 sq ft, zero excuses.' },
  { year: '2016', title: 'First Expansion', desc: 'Doubled in size. Added yoga studio and personal training wing.' },
  { year: '2018', title: 'Award Winning', desc: 'Named Mumbai\'s Best Gym by FitLife Magazine.' },
  { year: '2020', title: 'Going Digital', desc: 'Launched online classes during lockdown. Never stopped.' },
  { year: '2023', title: '2000 Members', desc: 'Crossed the milestone that seemed impossible in year one.' },
  { year: '2024', title: 'New Facility', desc: 'Opened 10,000 sq ft flagship location with spa & recovery zone.' },
];

const trainers = [
  { name: 'Raj Sharma', role: 'Head Trainer & Co-founder', emoji: '🧑‍💼', exp: '12 Years', specialty: 'Strength & Conditioning', certs: ['NASM-CPT', 'CSCS'] },
  { name: 'Priya Verma', role: 'Yoga & Wellness Director', emoji: '👩', exp: '8 Years', specialty: 'Yoga & Mindfulness', certs: ['RYT-500', 'Pranayama'] },
  { name: 'Arjun Singh', role: 'Combat Sports Coach', emoji: '🥊', exp: '10 Years', specialty: 'Boxing & MMA', certs: ['AIBA Certified', 'BJJ Purple Belt'] },
  { name: 'Neha Gupta', role: 'Sports Nutritionist', emoji: '👩‍⚕️', exp: '7 Years', specialty: 'Sports Nutrition', certs: ['ISSN-SNS', 'NPC Judge'] },
];

function AboutUs() {
  useRevealAll();

  return (
    <div className="about-page">

      {/* ── Page Hero ─────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="about-hero-content">
          <p className="section-label">Our Story</p>
          <h1 className="about-hero-title">We Don't Just Build<br /><span>Bodies.</span><br />We Build <span>Character.</span></h1>
          <p>Since 2014, PowerFit has been the place where ordinary people do extraordinary things.</p>
        </div>
        <div className="about-hero-cut" />
      </section>

      {/* ── Mission Strip ─────────────────── */}
      <div className="mission-strip">
        {['Discipline', 'Dedication', 'Determination', 'Results'].map((w, i) => (
          <div className="mission-word" key={i}>
            <span className="word-num">0{i + 1}</span>
            <span>{w}</span>
          </div>
        ))}
      </div>

      {/* ── Story ─────────────────────────── */}
      <section className="story-section">
        <div className="about-container">
          <div className="story-text" data-reveal>
            <p className="section-label">The Beginning</p>
            <h2 className="section-title">From a Small Studio<br />to <span>Mumbai's Best</span></h2>
            <p>
              PowerFit was born from a simple idea: fitness should be accessible, personal, and transformative.
              Our founders, Raj Sharma and Priya Verma, started with ₹2 lakh, a rented 500 sq ft room,
              and an unshakeable belief that the right environment changes everything.
            </p>
            <p>
              A decade later, we're 2,000 members strong — doctors, students, athletes, and first-timers all
              under one roof. Every person who walks in carries a goal. Our job is to help them exceed it.
            </p>
            <p>
              We don't measure success in memberships. We measure it in the moment someone lifts more than
              they thought possible, runs further than they imagined, or simply looks in the mirror and smiles.
            </p>
            <Link to="/register" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Be Part of the Story
            </Link>
          </div>

          {/* Timeline */}
          <div className="timeline" data-reveal>
            {timeline.map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────── */}
      <section className="values-section">
        <div className="values-bg-text">VALUES</div>
        <div className="about-container">
          <div className="section-header-centered" data-reveal>
            <p className="section-label">What Drives Us</p>
            <h2 className="section-title">Built on <span>Principles</span></h2>
          </div>
          <div className="values-grid">
            {[
              { icon: '🎯', title: 'Purpose Over Performance', desc: 'We train for life, not just looks. Every rep has a reason beyond aesthetics.' },
              { icon: '🔬', title: 'Science-Backed', desc: 'No broscience. Every program is built on proven exercise physiology and nutrition research.' },
              { icon: '🌍', title: 'Inclusive by Design', desc: 'Age 16 or 65, beginner or elite — PowerFit was built for everyone.' },
              { icon: '🔁', title: 'Continuous Growth', desc: 'We invest in our trainers and equipment constantly. Good enough is never enough.' },
              { icon: '🤝', title: 'Accountability Culture', desc: 'We show up for you. We expect you to show up for yourself. That\'s the deal.' },
              { icon: '💡', title: 'Innovation First', desc: 'From AI-driven progress tracking to recovery science — we stay ahead so you can too.' },
            ].map((v, i) => (
              <div className="value-card" key={i} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trainers ──────────────────────── */}
      <section className="trainers-section">
        <div className="about-container">
          <div className="section-header-centered" data-reveal>
            <p className="section-label">The Team</p>
            <h2 className="section-title">Meet Your <span>Coaches</span></h2>
            <p className="section-desc">Certified. Passionate. Relentless in their commitment to your progress.</p>
          </div>
          <div className="trainers-grid">
            {trainers.map((t, i) => (
              <div className="trainer-card" key={i} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="trainer-avatar-wrap">
                  <div className="trainer-avatar">{t.emoji}</div>
                  <div className="trainer-avatar-ring" />
                </div>
                <div className="trainer-info">
                  <h3>{t.name}</h3>
                  <p className="trainer-role">{t.role}</p>
                  <div className="trainer-meta">
                    <span>⚡ {t.specialty}</span>
                    <span>🏅 {t.exp}</span>
                  </div>
                  <div className="trainer-certs">
                    {t.certs.map((c, j) => <span key={j} className="cert-badge">{c}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────── */}
      <section className="about-cta">
        <h2>Ready to Meet the Team<br />in <span>Person?</span></h2>
        <p>Book a free tour of our facility and get a complimentary fitness assessment.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary">Book Free Tour</Link>
          <Link to="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;
