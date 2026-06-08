import React, { useState, useEffect } from 'react';
import './Gallery.css';

const categories = ['All', 'Equipment', 'Classes', 'Trainers', 'Facilities', 'Events'];

const galleryItems = [
  { id: 1, category: 'Equipment', emoji: '🏋️', label: 'Free Weights Zone', desc: 'Dumbbells 2.5kg to 60kg with rubber flooring and mirrors', size: 'large' },
  { id: 2, category: 'Classes', emoji: '🧘', label: 'Yoga Studio', desc: 'Serene 40-person studio with mood lighting and zen decor', size: 'normal' },
  { id: 3, category: 'Equipment', emoji: '🚴', label: 'Cardio Machines', desc: '35+ treadmills, cycles, stair climbers with personal TVs', size: 'normal' },
  { id: 4, category: 'Trainers', emoji: '👨‍🏫', label: 'Personal Training', desc: 'Expert one-on-one coaching tailored to your goals', size: 'normal' },
  { id: 5, category: 'Facilities', emoji: '🚿', label: 'Locker Rooms', desc: 'Premium lockers, showers, and vanity stations', size: 'large' },
  { id: 6, category: 'Classes', emoji: '🥊', label: 'Boxing Arena', desc: 'Professional-grade ring with heavy bags and speedballs', size: 'normal' },
  { id: 7, category: 'Events', emoji: '🏆', label: 'Annual Championship', desc: 'Our biggest intra-gym fitness competition of the year', size: 'normal' },
  { id: 8, category: 'Trainers', emoji: '💪', label: 'Team PowerFit', desc: '15+ certified coaches, each a specialist in their domain', size: 'normal' },
  { id: 9, category: 'Facilities', emoji: '♨️', label: 'Sauna & Spa', desc: 'Finnish sauna, steam room, and cold plunge pool', size: 'normal' },
  { id: 10, category: 'Classes', emoji: '💃', label: 'Zumba Class', desc: 'High-energy group sessions — fitness feels like a party', size: 'large' },
  { id: 11, category: 'Equipment', emoji: '🔩', label: 'Power Rack Section', desc: 'Olympic barbells, hex bars, trap bars, and cable machines', size: 'normal' },
  { id: 12, category: 'Facilities', emoji: '🥤', label: 'Nutrition Bar', desc: 'Post-workout shakes, smoothies, and healthy snacks', size: 'normal' },
  { id: 13, category: 'Events', emoji: '🎉', label: 'Member Milestones', desc: 'Celebrating our members who hit major fitness goals', size: 'normal' },
  { id: 14, category: 'Equipment', emoji: '🏃', label: 'Sprint Track', desc: '30m indoor turf sprint lane for speed and agility work', size: 'normal' },
  { id: 15, category: 'Classes', emoji: '🤸', label: 'HIIT Studio', desc: 'Intense group classes with battle ropes, kettlebells and TRX', size: 'normal' },
];

function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`gallery-card ${item.size === 'large' ? 'card-large' : ''}`}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.label}`}
      onKeyDown={e => e.key === 'Enter' && onClick(item)}
    >
      <div className={`gallery-card-inner ${hovered ? 'hovered' : ''}`}>
        <div className="gallery-emoji-wrap">
          <span className="gallery-emoji">{item.emoji}</span>
        </div>
        <div className="gallery-card-overlay">
          <span className="gallery-cat-tag">{item.category}</span>
          <h3>{item.label}</h3>
          <p>{item.desc}</p>
          <div className="gallery-view-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            View
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [animating, setAnimating] = useState(false);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const changeCategory = (cat) => {
    if (cat === activeCategory) return;
    setAnimating(true);
    setTimeout(() => { setActiveCategory(cat); setAnimating(false); }, 200);
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightboxItem(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxItem ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxItem]);

  const currentIndex = lightboxItem ? filtered.findIndex(i => i.id === lightboxItem.id) : -1;
  const prev = () => currentIndex > 0 && setLightboxItem(filtered[currentIndex - 1]);
  const next = () => currentIndex < filtered.length - 1 && setLightboxItem(filtered[currentIndex + 1]);

  return (
    <div className="gallery-page">

      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg" />
        <div className="gallery-hero-content">
          <p className="section-label">Visual Tour</p>
          <h1>Inside <span>PowerFit</span></h1>
          <p>World-class facilities captured in every frame. See what awaits you.</p>
        </div>
        <div className="gallery-hero-cut" />
      </section>

      {/* Filter Bar */}
      <div className="gallery-filter-bar">
        <div className="filter-inner">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => changeCategory(cat)}
            >
              {cat}
              {activeCategory === cat && (
                <span className="filter-count">
                  {cat === 'All' ? galleryItems.length : galleryItems.filter(i => i.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className={`gallery-masonry ${animating ? 'animating' : ''}`}>
        {filtered.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            onClick={setLightboxItem}
            style={{ animationDelay: `${i * 50}ms` }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-modal" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightboxItem(null)} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="lb-emoji">{lightboxItem.emoji}</div>
            <span className="gallery-cat-tag" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {lightboxItem.category}
            </span>
            <h2>{lightboxItem.label}</h2>
            <p>{lightboxItem.desc}</p>

            <div className="lb-nav">
              <button className="lb-nav-btn" onClick={prev} disabled={currentIndex === 0} aria-label="Previous">
                ← Prev
              </button>
              <span className="lb-counter">{currentIndex + 1} / {filtered.length}</span>
              <button className="lb-nav-btn" onClick={next} disabled={currentIndex === filtered.length - 1} aria-label="Next">
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
