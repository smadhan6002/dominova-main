import React from 'react';
import './SystemsMatrix.css';

interface SystemsMatrixProps {
  onSelectLayer: (layer: string, subId?: string) => void;
}

const portals = [
  {
    id: 'services',
    code: 'SYS-01',
    title: 'Enterprise Services',
    subtitle: 'Custom Software, Web, Mobile, Cloud & AI Solutions',
    desc: 'Scalable engineering platforms, microservices, cloud deployments, and AI-driven workflow automations engineered for high-concurrency enterprise workloads.',
    metrics: '11 Technical Domains',
    tag: 'Production Services',
  },
  {
    id: 'internship',
    code: 'SYS-02',
    title: 'Internship Academy',
    subtitle: '100% Real Production Code Mentorship in Chennai',
    desc: 'Direct hands-on engineering tracks across full-stack web, mobile apps, Java, Python, data analytics, data science, cybersecurity, and cloud computing.',
    metrics: '8 Engineering Tracks',
    tag: 'Industry Mentorship',
  },
  {
    id: 'portfolio',
    code: 'SYS-03',
    title: 'Spatial Portfolio',
    subtitle: 'Architectural Blueprints & Deployed Systems',
    desc: 'Explore real-world case studies spanning fintech payment gateways, AI diagnostics, enterprise resource planning, and logistics.',
    metrics: '6 Featured Blueprints',
    tag: 'Case Studies',
  },
  {
    id: 'about',
    code: 'SYS-04',
    title: 'Engineering Core',
    subtitle: 'Mission, 4 Pillars & Chennai Headquarters',
    desc: 'Founded on dual excellence: delivering battle-tested technology solutions to enterprises while building India’s top software engineers.',
    metrics: 'Chennai, India',
    tag: 'Company Vision',
  },
  {
    id: 'technology',
    code: 'SYS-05',
    title: 'Tech Architecture',
    subtitle: 'Full-Stack Ecosystem & Infrastructure Stack',
    desc: 'Deep dive into React, Next.js, Flutter, Python, FastAPI, Docker, Kubernetes, AWS Cloud, and PostgreSQL database schemas.',
    metrics: 'Modern Stack 2026',
    tag: 'Ecosystem',
  },
  {
    id: 'contact',
    code: 'SYS-06',
    title: 'Inquiry Portal',
    subtitle: 'Direct Enterprise & Student Communication',
    desc: 'Connect directly with Dominova leadership for custom software proposals, consulting engagements, or program admissions.',
    metrics: 'Response < 24 Hours',
    tag: 'Get In Touch',
  },
];

export const SystemsMatrix: React.FC<SystemsMatrixProps> = ({ onSelectLayer }) => {
  return (
    <section className="section systems-matrix" id="systems-matrix">
      <div className="container">
        <div className="section-label">LEVEL 0 &bull; INTERACTIVE EXPLORATION HUB</div>
        <div className="systems-matrix__header">
          <h2 className="display-sm systems-matrix__title">
            Explore The Dominova <span className="gold">Technology Matrix</span>
          </h2>
          <p className="body-md text-secondary systems-matrix__desc">
            Select any domain portal below to enter deeper architectural layers, explore technical specifications, and interact with real engineering modules.
          </p>
        </div>

        <div className="systems-matrix__grid">
          {portals.map((portal) => (
            <div
              key={portal.id}
              className="matrix-card"
              onClick={() => onSelectLayer(portal.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectLayer(portal.id);
                }
              }}
              aria-label={`Enter ${portal.title} Layer`}
            >
              <div className="matrix-card__top">
                <span className="matrix-card__code">{portal.code}</span>
                <span className="matrix-card__tag">{portal.tag}</span>
              </div>

              <h3 className="heading-md matrix-card__title">{portal.title}</h3>
              <p className="matrix-card__sub">{portal.subtitle}</p>
              <p className="matrix-card__body">{portal.desc}</p>

              <div className="matrix-card__footer">
                <span className="matrix-card__metrics">{portal.metrics}</span>
                <div className="matrix-card__cta">
                  <span>Enter Layer</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemsMatrix;
