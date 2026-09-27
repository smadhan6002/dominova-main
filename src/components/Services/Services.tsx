import { useState, useEffect } from 'react';
import { services as servicesDb } from '../../lib/data/db';
import type { Service } from '../../lib/data/types';
import { useLayerTransition } from '../../context/LayerTransitionContext';
import { openWhatsApp, getServiceInquiryMessage } from '../../lib/whatsapp';
import './Services.css';

// Static fallback data with all 11 official Dominova services from dominova.tech
const staticServicesData = [
  { 
    id: 'web', 
    num: '01', 
    title: 'WEB DEVELOPMENT', 
    sub: 'Custom websites and web applications built with modern frameworks like React, Next.js, and Node.js. Responsive, fast, and SEO-optimized solutions.', 
    image: '/images/showcase/web_dev.png', 
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    details: 'From single-page web applications to complex enterprise portals, we engineer web solutions focused on speed, responsive accessibility, search optimization, and secure API integrations.',
    capabilities: [
      'Single-Page & SSR Applications (React, Next.js)',
      'High-Performance REST & GraphQL API Integration',
      'E-Commerce & Payment Gateway Integration',
      'SEO Optimization & Core Web Vitals Compliance',
      'Custom Content Management Systems (CMS)'
    ]
  },
  { 
    id: 'app', 
    num: '02', 
    title: 'MOBILE APP DEVELOPMENT', 
    sub: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter for seamless mobile experiences.', 
    image: '/images/showcase/app_dev.png', 
    tags: ['Flutter', 'React Native', 'iOS', 'Android', 'Firebase', 'SQLite'],
    details: 'Delivering fluid mobile apps with native UI performance, offline-first persistence, real-time push notifications, and end-to-end App Store / Google Play publishing.',
    capabilities: [
      'Cross-Platform iOS & Android Apps',
      'Offline-First Data Storage & Sync',
      'Push Notifications & Background Services',
      'Biometric & Social Authentication',
      'App Store & Play Store Deployment'
    ]
  },
  { 
    id: 'software', 
    num: '03', 
    title: 'CUSTOM SOFTWARE SOLUTIONS', 
    sub: 'Tailored software solutions designed to automate processes, improve efficiency, and solve unique business challenges.', 
    image: '/images/showcase/portfolio.png', 
    tags: ['Microservices', 'Python', 'Go', 'Java Spring Boot', 'Docker', 'PostgreSQL'],
    details: 'Bespoke enterprise backend systems, relational database architecture, automated workflow pipelines, and custom business management portals.',
    capabilities: [
      'Internal Operations & Workflow Portals',
      'Automated Business Logic & Data Processing',
      'Distributed Microservices Architecture',
      'Database Migration, Indexing & Scaling',
      'Custom ERP & CRM Integration Modules'
    ]
  },
  { 
    id: 'uiux', 
    num: '04', 
    title: 'UI / UX DESIGN', 
    sub: 'User-centered design that creates intuitive, engaging, and accessible digital experiences from wireframes to high-fidelity prototypes.', 
    image: '/images/showcase/ui_ux.png', 
    tags: ['Design Systems', 'Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    details: 'Human-centered design workflows from preliminary user journeys and low-fidelity wireframing to production-ready design tokens and interactive Figma prototypes.',
    capabilities: [
      'Comprehensive Design Systems & Tokens',
      'Interactive High-Fidelity Prototyping',
      'User Journey & Empathy Mapping',
      'Usability Auditing & Accessibility (WCAG)',
      'Pixel-Perfect Developer Handoff Specs'
    ]
  },
  { 
    id: 'data', 
    num: '05', 
    title: 'DATA ANALYTICS & DATA SCIENCE', 
    sub: 'Transform raw data into actionable insights with data analysis, visualization, and machine learning solutions.', 
    image: '/images/showcase/ai_data.png', 
    tags: ['Python', 'Pandas', 'SQL', 'Power BI', 'Tableau', 'Machine Learning'],
    details: 'Applied business intelligence, automated text and document parsing pipelines, data cleansing, statistical modeling, and interactive Power BI / Tableau dashboards.',
    capabilities: [
      'Interactive Power BI & Tableau Dashboards',
      'Predictive Machine Learning & Statistical Models',
      'Automated Data Ingestion & ETL Pipelines',
      'FastAPI Analytics Microservice Endpoints',
      'Executive KPI & Performance Reporting'
    ]
  },
  { 
    id: 'cloud', 
    num: '06', 
    title: 'CLOUD & DEPLOYMENT SERVICES', 
    sub: 'Scalable cloud solutions using AWS, Azure, and Google Cloud with deployment, hosting, and infrastructure management.', 
    image: '/images/showcase/cybersecurity.png', 
    tags: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
    details: 'Containerized infrastructure on AWS, Azure, and GCP, automated CI/CD deployment pipelines, load balancing, and high-availability server configurations.',
    capabilities: [
      'Automated Multi-Stage CI/CD Pipelines',
      'Docker Containerization & Kubernetes Setup',
      'Cloud Architecture on AWS (EC2, S3, Lambda)',
      'Server Monitoring, Logging & Auto-Scaling',
      'Zero-Downtime Blue/Green Deployments'
    ]
  },
  { 
    id: 'cyber', 
    num: '07', 
    title: 'CYBERSECURITY SOLUTIONS', 
    sub: 'Protect your digital assets with comprehensive security solutions, audits, security measures, and ongoing monitoring.', 
    image: '/images/showcase/cybersecurity.png', 
    tags: ['OWASP Top 10', 'Penetration Testing', 'Network Security', 'SIEM', 'SSL/TLS'],
    details: 'Proactive vulnerability assessments, application penetration testing, network traffic auditing, SSL hardening, and security compliance roadmaps.',
    capabilities: [
      'OWASP Top 10 Application Security Audits',
      'Vulnerability Scanning & Penetration Testing',
      'SSL/TLS Hardening & Data Encryption',
      'Threat Monitoring & SIEM Strategy',
      'Security Compliance & Risk Mitigation'
    ]
  },
  { 
    id: 'consulting', 
    num: '08', 
    title: 'TECHNOLOGY CONSULTING', 
    sub: 'Strategic technology consulting to help you make informed decisions. We assess, plan, and guide your digital transformation journey.', 
    image: '/images/showcase/portfolio.png', 
    tags: ['Tech Stack Strategy', 'Architecture Review', 'Digital Transformation', 'Audits'],
    details: 'Independent technical assessments, stack recommendations, software modernization planning, and engineering leadership consulting.',
    capabilities: [
      'Software Architecture & Codebase Audits',
      'Technology Stack Selection & Due Diligence',
      'Digital Transformation Roadmaps',
      'Scalability & Performance Bottleneck Analysis',
      'Cost Optimization for Cloud Infrastructure'
    ]
  },
  { 
    id: 'marketing', 
    num: '09', 
    title: 'DIGITAL MARKETING SERVICES', 
    sub: 'Boost your online presence with comprehensive digital marketing strategies including SEO, social media marketing, and brand growth.', 
    image: '/images/showcase/web_dev.png', 
    tags: ['Technical SEO', 'Conversion Rate Optimization', 'Social Media', 'Analytics'],
    details: 'Data-driven growth strategies combining technical search engine optimization, content strategy, brand positioning, and conversion funnel improvements.',
    capabilities: [
      'Technical On-Page & Off-Page SEO',
      'Conversion Rate Optimization (CRO)',
      'Social Media Marketing & Brand Strategy',
      'Analytics & User Funnel Tracking',
      'Content Marketing & Keyword Strategy'
    ]
  },
  { 
    id: 'startup', 
    num: '10', 
    title: 'STARTUP GUIDANCE & CONSULTING', 
    sub: 'End-to-end support for startups including registration guidance, technical roadmap planning, and compliance support.', 
    image: '/images/showcase/about.png', 
    tags: ['MVP Scoping', 'Technical Roadmaps', 'Pitch Decks', 'Compliance'],
    details: 'Empowering early-stage founders with MVP architecture scoping, investor tech deck preparation, compliance guidelines, and rapid go-to-market execution.',
    capabilities: [
      'Rapid MVP Scoping & Architecture Planning',
      'Technical Pitch Deck Formulation',
      'Startup Registration & Compliance Guidance',
      'Go-to-Market Technical Execution',
      'Product-Market Fit Validation Workflows'
    ]
  },
  { 
    id: 'workshops', 
    num: '11', 
    title: 'WORKSHOPS & TECHNICAL EVENTS', 
    sub: 'Engaging workshops and technical events for colleges and industry professionals including bootcamps and hands-on sessions.', 
    image: '/images/showcase/internship.png', 
    tags: ['Coding Bootcamps', 'College Hackathons', 'Hands-On Labs', 'Faculty Training'],
    details: 'Interactive technology bootcamps, college hackathon mentorship, faculty development programs, and hands-on developer training led by industry professionals.',
    capabilities: [
      'Hands-On Coding Bootcamps (Web, AI, Cloud)',
      'College Hackathon Organizing & Mentoring',
      'Faculty Development Programs (FDP)',
      'Corporate Developer Upskilling Workshops',
      'Practical Lab-Based Technical Sessions'
    ]
  },
];

interface DisplayService {
  id: string;
  num: string;
  title: string;
  sub: string;
  image: string;
  tags: string[];
  details?: string;
  capabilities?: string[];
}

function toDisplay(s: Service): DisplayService {
  return { 
    id: s.id, 
    num: s.num, 
    title: s.title, 
    sub: s.sub, 
    image: s.image || '/images/showcase/services.png', 
    tags: s.tags || [],
    details: s.description,
    capabilities: s.features || []
  };
}

export default function Services() {
  const { triggerTransition } = useLayerTransition();
  const [servicesData, setServicesData] = useState<DisplayService[]>(staticServicesData);
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalService, setModalService] = useState<DisplayService | null>(null);

  useEffect(() => {
    // Try to load published services from admin CMS
    const published = servicesDb.findPublished();
    if (published.length > 0) {
      setServicesData(published.map(toDisplay));
    }
  }, []);

  const current = servicesData[activeIdx] ?? servicesData[0];
  if (!current) return null;

  const handleSelectService = (idx: number) => {
    if (idx === activeIdx) return;
    const target = servicesData[idx];
    if (target) {
      triggerTransition(`INITIALIZING ${target.title} SPECIFICATION`, () => {
        setActiveIdx(idx);
      });
    } else {
      setActiveIdx(idx);
    }
  };

  const handleOpenSpec = (item: DisplayService) => {
    triggerTransition(`ACCESSING ${item.title} SPECIFICATION LAYER`, () => {
      setModalService(item);
    });
  };

  const handleCloseSpec = () => {
    triggerTransition('RETURNING TO ENTERPRISE SERVICES', () => {
      setModalService(null);
    });
  };

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-label">WHAT WE BUILD</div>
        <h2 className="display-sm services__title">Capabilities & Digital Solutions</h2>

        {/* Purpose-Built Visual Showcase Deck */}
        <div className="services__showcase">
          <div className="services__visual-pane">
            <img src={current.image} alt={`Dominova ${current.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} – ${current.sub.split('.')[0]}`} className="services__visual-img" loading="lazy" />
            <div className="services__visual-gradient" />

            <div className="services__visual-overlay">
              <span className="services__visual-num">{current.num}</span>
              <h3 className="display-sm services__visual-title">{current.title}</h3>
              <p className="body-md services__visual-sub">{current.sub}</p>

              <div className="services__visual-tags">
                {current.tags.map((tag) => (
                  <span key={tag} className="services__tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="services__actions-row">
                <button
                  onClick={() => handleOpenSpec(current)}
                  className="btn-gold services__visual-btn"
                >
                  <span>Explore Specifications</span>
                </button>
                <button
                  onClick={() => openWhatsApp(getServiceInquiryMessage(current.title))}
                  className="btn-white services__visual-btn"
                >
                  <span>Inquire Project 💬</span>
                </button>
              </div>
            </div>
          </div>

          {/* Selector Tabs */}
          <div className="services__tabs">
            {servicesData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectService(idx)}
                className={`services__tab-btn ${idx === activeIdx ? 'is-active' : ''}`}
              >
                <span className="services__tab-num">{item.num}</span>
                <span className="services__tab-title">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Inner-Layer Service Specification Modal */}
        {modalService && (
          <div className="service-modal" role="dialog" aria-modal="true">
            <div className="service-modal__backdrop" onClick={handleCloseSpec} />
            <div className="service-modal__card">
              <button
                onClick={handleCloseSpec}
                className="service-modal__close"
                aria-label="Close specifications"
              >
                &times;
              </button>

              <div className="service-modal__header">
                <span className="services__tag">{modalService.num} &bull; SERVICE SPECIFICATION</span>
                <h3 className="display-sm gold" style={{ marginTop: '8px' }}>{modalService.title}</h3>
                <p className="body-md text-secondary" style={{ marginTop: '12px' }}>
                  {modalService.details || modalService.sub}
                </p>
              </div>

              <div className="service-modal__body">
                {modalService.capabilities && modalService.capabilities.length > 0 && (
                  <div className="service-modal__section">
                    <h4 className="heading-sm gold" style={{ marginBottom: '12px' }}>Core Capabilities</h4>
                    <ul className="service-modal__list">
                      {modalService.capabilities.map((cap, i) => (
                        <li key={i} className="service-modal__list-item">
                          <span className="service-modal__bullet">&bull;</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="service-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '12px' }}>Technologies</h4>
                  <div className="services__visual-tags">
                    {modalService.tags.map((t) => (
                      <span key={t} className="services__tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="service-modal__footer">
                <button
                  onClick={() => {
                    handleCloseSpec();
                    openWhatsApp(getServiceInquiryMessage(modalService.title));
                  }}
                  className="btn-gold"
                >
                  <span>Request Proposal / Consultation 💬</span>
                </button>
                <button
                  onClick={handleCloseSpec}
                  className="btn-white"
                >
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
