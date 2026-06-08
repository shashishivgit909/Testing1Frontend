import React, { useState } from 'react';
import './Register.css';

const steps = ['Personal Info', 'Membership', 'Your Goal'];

const initialState = {
  name: '', email: '', phone: '', age: '',
  membershipType: 'Basic', goal: '',
};

function Register() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const nextStep = () => {
    if (step === 0 && (!formData.name || !formData.email || !formData.phone || !formData.age)) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    setStatus({ type: '', message: '' });
    setStep(s => Math.min(s + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStatus({ type: '', message: '' });
    setStep(s => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/members/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, age: Number(formData.age) }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch {
      setStatus({ type: 'error', message: 'Connection failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="register-page">
        <div className="success-screen">
          <div className="success-icon">🎉</div>
          <h2>Welcome to <span>PowerFit!</span></h2>
          <p>
            You're officially on the list, <strong>{formData.name}</strong>.<br />
            Our team will call you at <strong>{formData.phone}</strong> within 24 hours
            to discuss your <strong>{formData.membershipType}</strong> plan preference and get you started.
          </p>
          <div className="success-card">
            <div className="success-detail">
              <span>Name</span>
              <strong>{formData.name}</strong>
            </div>
            <div className="success-detail">
              <span>Email</span>
              <strong>{formData.email}</strong>
            </div>
            <div className="success-detail">
              <span>Plan Preference</span>
              <strong>{formData.membershipType}</strong>
            </div>
          </div>
          <a href="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">

      {/* Hero */}
      <section className="register-hero">
        <div className="register-hero-bg" />
        <div className="register-hero-content">
          <p className="section-label">New Member</p>
          <h1>Join <span>PowerFit</span></h1>
          <p>3 simple steps. Our team contacts you. You start training.</p>
        </div>
        <div className="register-hero-cut" />
      </section>

      <div className="register-layout">

        {/* Left Panel */}
        <aside className="register-aside">
          <h3>What You Get</h3>
          <ul className="perks-list">
            {[
              { icon: '🏋️', text: '50+ modern machines' },
              { icon: '👨‍🏫', text: '15+ expert trainers' },
              { icon: '🍎', text: 'Free nutrition consult' },
              { icon: '📅', text: 'Open 5 AM to 10 PM' },
              { icon: '💊', text: 'Recovery lounge & sauna' },
              { icon: '📞', text: 'We personally call you' },
            ].map((p, i) => (
              <li key={i}>
                <span className="perk-icon">{p.icon}</span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>

          <div className="plan-cards">
            {[
              { name: 'Starter', price: '₹999', color: '#555' },
              { name: 'Elite', price: '₹1,799', color: 'var(--primary)', popular: true },
              { name: 'Champion', price: '₹2,999', color: 'var(--gold)' },
            ].map((p, i) => (
              <div
                key={i}
                className={`mini-plan ${formData.membershipType === p.name.replace('Starter', 'Basic') ? 'selected' : ''}`}
                style={{ borderColor: p.color }}
              >
                {p.popular && <span className="mini-popular">Popular</span>}
                <span style={{ color: p.color }}>{p.name}</span>
                <span className="mini-price">{p.price}/mo</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Form */}
        <div className="register-form-wrap">
          {/* Progress */}
          <div className="step-progress">
            {steps.map((s, i) => (
              <div key={i} className={`step-node ${i <= step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                <div className="step-circle">
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  ) : (i + 1)}
                </div>
                <span>{s}</span>
                {i < steps.length - 1 && <div className={`step-connector ${i < step ? 'filled' : ''}`} />}
              </div>
            ))}
          </div>

          {status.message && (
            <div className={`form-alert ${status.type}`}>
              {status.type === 'error' ? '❌' : '✅'} {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Step 0 — Personal Info */}
            {step === 0 && (
              <div className="form-step">
                <h3>Tell us about yourself</h3>
                <div className="form-grid-2">
                  <div className="field">
                    <label htmlFor="r-name">Full Name *</label>
                    <input
                      id="r-name" name="name" type="text"
                      value={formData.name} onChange={handleChange}
                      placeholder="Rahul Sharma" required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="r-age">Age *</label>
                    <input
                      id="r-age" name="age" type="number"
                      value={formData.age} onChange={handleChange}
                      placeholder="25" min="10" max="100" required
                    />
                  </div>
                </div>
                <div className="form-grid-2">
                  <div className="field">
                    <label htmlFor="r-email">Email Address *</label>
                    <input
                      id="r-email" name="email" type="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="rahul@email.com" required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="r-phone">Phone Number *</label>
                    <input
                      id="r-phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 98765 43210" required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1 — Plan Interest (informational only — no payment taken here) */}
            {step === 1 && (
              <div className="form-step">
                <h3>Which plan interests you?</h3>
                <p className="step-note">
                  📞 <strong>No payment required now.</strong> Our team will call you to walk through
                  the options and confirm your plan in person.
                </p>
                <div className="plan-selector">
                  {[
                    { value: 'Basic', label: 'Starter', price: '~₹999/mo', icon: '🔥', desc: 'Perfect for beginners', features: ['Gym access', '2 group classes/wk', 'Locker room'] },
                    { value: 'Standard', label: 'Elite', price: '~₹1,799/mo', icon: '⚡', desc: 'Most popular choice', popular: true, features: ['Everything in Starter', 'Unlimited classes', 'Personal trainer 1×/wk', 'Diet consult'] },
                    { value: 'Premium', label: 'Champion', price: '~₹2,999/mo', icon: '👑', desc: 'The ultimate experience', features: ['Everything in Elite', 'Daily personal training', 'Sauna & spa', 'Custom nutrition plan'] },
                  ].map(p => (
                    <label
                      key={p.value}
                      className={`plan-option ${formData.membershipType === p.value ? 'selected' : ''}`}
                    >
                      <input
                        type="radio" name="membershipType"
                        value={p.value} checked={formData.membershipType === p.value}
                        onChange={handleChange}
                      />
                      {p.popular && <span className="plan-popular-badge">Most Popular</span>}
                      <div className="plan-option-top">
                        <span className="plan-option-icon">{p.icon}</span>
                        <div>
                          <strong>{p.label}</strong>
                          <span className="plan-option-price">{p.price}</span>
                        </div>
                      </div>
                      <p className="plan-option-desc">{p.desc}</p>
                      <ul className="plan-option-features">
                        {p.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                      </ul>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Goal */}
            {step === 2 && (
              <div className="form-step">
                <h3>What's your fitness goal?</h3>
                <div className="goal-chips">
                  {['Lose Weight', 'Build Muscle', 'Increase Strength', 'Improve Cardio', 'Flexibility & Mobility', 'Sports Performance', 'Stress Relief', 'General Fitness'].map(g => (
                    <button
                      key={g} type="button"
                      className={`goal-chip ${formData.goal === g ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, goal: g }))}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div className="field" style={{ marginTop: '1.5rem' }}>
                  <label htmlFor="r-goal">Or describe your goal</label>
                  <textarea
                    id="r-goal" name="goal" rows={3}
                    value={formData.goal} onChange={handleChange}
                    placeholder="e.g. Lose 10kg in 3 months, run a 5K..."
                  />
                </div>

                {/* Summary */}
                <div className="registration-summary">
                  <h4>Registration Summary</h4>
                  <div className="summary-row"><span>Name</span><strong>{formData.name}</strong></div>
                  <div className="summary-row"><span>Email</span><strong>{formData.email}</strong></div>
                  <div className="summary-row"><span>Phone</span><strong>{formData.phone}</strong></div>
                  <div className="summary-row"><span>Plan Preference</span>
                    <strong style={{ color: 'var(--primary)' }}>{formData.membershipType}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="step-nav">
              {step > 0 && (
                <button type="button" className="btn btn-outline" onClick={prevStep}>
                  ← Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep} style={{ marginLeft: 'auto' }}>
                  Continue →
                </button>
              ) : (
                <button type="submit" className="btn btn-primary submit-reg" disabled={loading} style={{ marginLeft: 'auto' }}>
                  {loading ? <><span className="spinner" /> Registering...</> : '💪 Complete Registration'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
