import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/* ─── Animated Counter Hook ─── */
function useCounter(target, duration = 2000, trigger) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ─── Intersection Observer Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Stat Counter Component ─── */
function StatCounter({ value, label, suffix = '+', trigger }) {
  const num = parseInt(value.replace(/\D/g, ''), 10);
  const count = useCounter(num, 2000, trigger);
  return (
    <div className="stat-card">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ icon, title, desc, delay }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`service-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="service-card-glow" />
      <div className="service-icon-wrap">
        <span className="service-icon">{icon}</span>
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="service-card-line" />
    </div>
  );
}

/* ─── Data ─── */
const services = [
  { icon: '🏋️', title: 'Strength Training', desc: 'Power racks, dumbbells up to 60kg, and guided programs for every level.' },
  { icon: '🧘', title: 'Yoga & Wellness', desc: 'Daily yoga flows, breathwork, and recovery sessions in a serene studio.' },
  { icon: '🚴', title: 'Cardio Zone', desc: '35+ treadmills, bikes, and rowers with personal TV screens.' },
  { icon: '🥊', title: 'Boxing & MMA', desc: 'Professional ring, heavy bags, and trained combat sports coaches.' },
  { icon: '🍎', title: 'Nutrition Coaching', desc: 'Personalized diet plans from certified sports nutritionists.' },
  { icon: '🤸', title: 'Functional Training', desc: 'Cross-training, HIIT, and mobility work to unlock peak performance.' },
];

const testimonials = [
  { name: 'Arjun Mehta', role: 'Lost 18kg in 4 months', quote: 'PowerFit completely changed my life. The trainers are world-class and the energy is unmatched.', rating: 5 },
  { name: 'Sneha Rao', role: 'Marathon runner', quote: 'The cardio zone and nutrition coaching helped me shave 12 minutes off my marathon time.', rating: 5 },
  { name: 'Ravi Kumar', role: 'Gained 8kg muscle', quote: 'Finally found a gym that actually cares about your progress, not just your membership fee.', rating: 5 },
];

/* ─── Home Component ─── */
function Home() {
  const [statsRef, statsVisible] = useReveal(0.3);
  const [titleVisible, setTitleVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Hero entrance animation
  useEffect(() => {
    const t1 = setTimeout(() => setHeroLoaded(true), 100);
    const t2 = setTimeout(() => setTitleVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(230, 57, 70, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="home-page">

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-bg-gradient" />

        <div className={`hero-content ${heroLoaded ? 'loaded' : ''}`}>
          <div className={`hero-label ${titleVisible ? 'visible' : ''}`}>
            <span className="label-dot" />
            Welcome to PowerFit Gym
            <span className="label-dot" />
          </div>

          <h1 className={`hero-title ${titleVisible ? 'visible' : ''}`}>
            <span className="line-1">FORGE YOUR</span>
            <span className="line-2">
              <span className="text-stroke">PERFECT</span>
              <span className="text-fill"> BODY</span>
            </span>
            <span className="line-3">BUILD YOUR LEGACY</span>
          </h1>

          <p className={`hero-sub ${titleVisible ? 'visible' : ''}`}>
            Elite training. Expert coaches. A community that doesn't quit.
            <br />Your transformation starts the moment you walk through our doors.
          </p>

          <div className={`hero-actions ${titleVisible ? 'visible' : ''}`}>
            <Link to="/register" className="btn btn-primary hero-btn-primary">
              Start Your Journey
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/gallery" className="btn btn-outline">
              View Gallery
            </Link>
          </div>

          <div className={`hero-quick-stats ${titleVisible ? 'visible' : ''}`}>
            <div className="qs-item"><strong>2,000+</strong> Members</div>
            <div className="qs-divider" />
            <div className="qs-item"><strong>15+</strong> Trainers</div>
            <div className="qs-divider" />
            <div className="qs-item"><strong>10</strong> Years</div>
          </div>
        </div>

        <div className="hero-scroll-cue">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>

        {/* Diagonal cut */}
        <div className="hero-cut" />
      </section>

      {/* ── STATS ────────────────────────────── */}
      <section ref={statsRef} className="stats-section">
        <div className="stats-inner">
          <StatCounter value="2000" label="Happy Members" suffix="+" trigger={statsVisible} />
          <StatCounter value="15" label="Expert Trainers" suffix="+" trigger={statsVisible} />
          <StatCounter value="50" label="Equipment Pieces" suffix="+" trigger={statsVisible} />
          <StatCounter value="10" label="Years of Excellence" suffix="+" trigger={statsVisible} />
          <StatCounter value="98" label="Success Rate" suffix="%" trigger={statsVisible} />
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────── */}
      <section className="services-section">
        <div className="section-container">
          <div className="section-header reveal" data-reveal>
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">World-Class <span>Services</span></h2>
            <p className="section-desc">
              Every program, every class, every machine — designed to push your limits and deliver results.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={i} {...s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US / SPLIT SECTION ───────────── */}
      <section className="why-section">
        <div className="why-visual">
          <div className="why-visual-inner">
            <div className="why-badge top">🏆 #1 Gym in Mumbai</div>
            <div className="why-emoji-stack">
              <span>💪</span>
              <span>🔥</span>
              <span>⚡</span>
            </div>
            <div className="why-badge bottom">✅ ISO Certified Facility</div>
            <div className="why-ring ring-1" />
            <div className="why-ring ring-2" />
            <div className="why-ring ring-3" />
          </div>
        </div>
        <div className="why-content">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Not Just a Gym.<br /><span>A Movement.</span></h2>
          <p className="why-desc">
            At PowerFit, we don't believe in one-size-fits-all. Every member gets a
            personalized experience backed by science, passion, and a community that
            shows up every single day.
          </p>
          <div className="why-points">
            {[
              { icon: '🎯', title: 'Goal-Based Programs', desc: 'Fat loss, muscle gain, endurance — custom programs for every goal.' },
              { icon: '🧬', title: 'Science-Backed Training', desc: 'Evidence-based methods that actually deliver measurable results.' },
              { icon: '🤝', title: 'Real Community', desc: 'A tribe of motivated people who push each other every single day.' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Monthly assessments and detailed reports to keep you on track.' },
            ].map((p, i) => (
              <div className="why-point" key={i}>
                <div className="why-point-icon">{p.icon}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="btn btn-outline" style={{ marginTop: '2rem' }}>
            Our Full Story →
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <p className="section-label">Success Stories</p>
            <h2 className="section-title">Real People, <span>Real Results</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────── */}
      <section className="cta-banner">
        <div className="cta-bg-text">POWERFIT</div>
        <div className="cta-content">
          <p className="section-label" style={{ justifyContent: 'center' }}>Limited Spots Available</p>
          <h2>Stop Waiting. <span>Start Winning.</span></h2>
          <p>Register today and our team will reach out to you within hours to get you started.</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary">
              Claim Your Spot
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-outline">Talk to Us</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
