import { useState } from 'react';
import './About.css';

const coreValues = [
  { 
    num: '01', 
    title: 'INNOVATION', 
    desc: 'We constantly explore new technologies and methodologies to deliver cutting-edge solutions.' 
  },
  { 
    num: '02', 
    title: 'COLLABORATION', 
    desc: 'We believe in teamwork and partner closely with our clients to understand their unique needs.' 
  },
  { 
    num: '03', 
    title: 'EXCELLENCE', 
    desc: 'We are committed to delivering high-quality work that exceeds expectations every time.' 
  },
  { 
    num: '04', 
    title: 'INTEGRITY', 
    desc: 'We operate with transparency, honesty, and ethical practices in all our dealings.' 
  },
];

export default function About() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-label">WHO WE ARE</div>

        {/* Visual Showcase Card */}
        <div className="about__showcase-card">
          <div className="about__image-wrap">
            <img
              src="/images/showcase/about.png"
              alt="Dominova Technology Solutions – Chennai-based IT Company Headquarters"
              className="about__image"
              loading="lazy"
            />
            <div className="about__image-overlay" />
          </div>

          <div className="about__content-overlay">
            <span className="about__tag">HEADQUARTERED IN CHENNAI</span>
            <h2 className="display-sm about__heading">
              Building the Future of <br />
              <span className="gold">Technology in Chennai</span>
            </h2>

            <p className="body-md about__summary">
              Dominova is a Chennai-based IT company committed to delivering exceptional technology solutions and nurturing the next generation of tech talent.
            </p>

            <button onClick={() => setShowDetails(!showDetails)} className="btn-gold about__btn">
              <span>{showDetails ? 'Close Details' : 'Explore Story, Vision & Leadership'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Details Drawer */}
        {showDetails && (
          <div className="about__drawer">
            <div className="about__drawer-grid">
              <div>
                <span className="services__tag">OUR STORY</span>
                <h3 className="heading-lg gold" style={{ marginTop: '6px' }}>From Vision to Reality</h3>
                <p className="body-md text-secondary" style={{ marginTop: '8px', lineHeight: 1.6 }}>
                  Dominova was founded with a clear vision: to bridge the gap between cutting-edge technology and businesses that need it. Based in Chennai, we combine startup agility with enterprise-grade expertise.
                </p>
                <p className="body-md text-secondary" style={{ marginTop: '10px', lineHeight: 1.6 }}>
                  Our team collaborates with working professionals from top MNCs, bringing real-world industry experience to every project we undertake. Beyond client projects, we're passionate about nurturing talent through industry-oriented internships.
                </p>

                {/* Vision & Mission Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' }}>
                  <div style={{ background: 'var(--color-surface-2)', padding: '16px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}>
                    <h4 className="heading-sm gold">Our Vision</h4>
                    <p className="body-sm text-secondary" style={{ marginTop: '6px' }}>
                      To become a leading technology partner for businesses across India, known for innovation, quality, and our commitment to developing tech talent.
                    </p>
                  </div>
                  <div style={{ background: 'var(--color-surface-2)', padding: '16px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}>
                    <h4 className="heading-sm gold">Our Mission</h4>
                    <p className="body-sm text-secondary" style={{ marginTop: '6px' }}>
                      To deliver innovative, scalable, and reliable technology solutions that drive business growth, while fostering talent through industry-oriented training.
                    </p>
                  </div>
                </div>

                {/* Core Values */}
                <h4 className="heading-md gold" style={{ marginTop: '28px', marginBottom: '12px' }}>What Drives Us — Our Core Values</h4>
                <div className="about__pillars-grid">
                  {coreValues.map((p) => (
                    <div key={p.num} className="about__pillar-item">
                      <span className="about__pillar-num">{p.num}</span>
                      <div>
                        <h4 className="about__pillar-title">{p.title}</h4>
                        <p className="about__pillar-desc">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Founder Leadership Section */}
                <div style={{ marginTop: '28px', padding: '18px', background: 'var(--color-surface-2)', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}>
                  <span className="services__tag">LEADERSHIP</span>
                  <h4 className="heading-md gold" style={{ marginTop: '6px' }}>Meet Our Founder — B. Deepak</h4>
                  <p className="body-md text-secondary" style={{ marginTop: '8px' }}>
                    A passionate technologist with a vision to transform how businesses leverage technology. Deepak founded Dominova with the goal of creating impactful solutions while nurturing the next generation of tech professionals in Chennai.
                  </p>
                </div>
              </div>

              {/* Verified Metrics */}
              <div className="about__drawer-stats">
                <div className="about__drawer-stat">
                  <span className="gold display-sm">50+</span>
                  <span className="text-muted label">Projects Completed</span>
                </div>
                <div className="about__drawer-stat">
                  <span className="gold display-sm">500+</span>
                  <span className="text-muted label">Students Trained</span>
                </div>
                <div className="about__drawer-stat">
                  <span className="gold display-sm">8+</span>
                  <span className="text-muted label">Tech Domains</span>
                </div>
                <div className="about__drawer-stat">
                  <span className="gold display-sm">Chennai</span>
                  <span className="text-muted label">Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

