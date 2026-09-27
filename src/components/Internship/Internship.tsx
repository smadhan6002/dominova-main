import { useState } from 'react';
import { useLayerTransition } from '../../context/LayerTransitionContext';
import { openWhatsApp, getInternshipEnrollMessage } from '../../lib/whatsapp';
import './Internship.css';

interface InternshipProgram {
  id: string;
  title: string;
  duration: string;
  mode: string;
  skills: string[];
  description: string;
  modules: string[];
  capstone: string;
  deliverables: string[];
}

const programsList: InternshipProgram[] = [
  {
    id: 'web',
    title: 'Web Development',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    description: 'Master frontend interfaces, backend RESTful APIs, database indexing, and cloud hosting through real software development cycles.',
    modules: [
      'HTML5, Modern CSS3 & Responsive UI Architecture',
      'JavaScript ES6+, DOM Manipulation & Async Programming',
      'React Components, State Management & Hooks',
      'Node.js, Express REST API Endpoints & Database Integration',
      'Git Collaboration, Code Review & Production Cloud Deployment'
    ],
    capstone: 'Full-Stack Scalable Web Application with Authentication & Live API Backend',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Production-Ready GitHub Repository for Portfolio',
      'Official Experience & Recommendation Letter',
      '1-on-1 Code Review with Working Developers'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Excel', 'Python', 'SQL', 'Power BI', 'Tableau', 'Data Cleaning'],
    description: 'Transform raw enterprise data into actionable visual insights, interactive KPI dashboards, and statistical reports.',
    modules: [
      'Advanced Excel: Pivot Tables, Formulas & Business Modeling',
      'Relational Database Querying & Aggregation with SQL',
      'Exploratory Data Analysis (EDA) with Python & Pandas',
      'Interactive Dashboard Engineering in Power BI & Tableau',
      'Business Storytelling & Executive Reporting'
    ],
    capstone: 'Comprehensive Business Intelligence Dashboard with Automated Data Ingestion',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Interactive Power BI / Tableau Portfolio Dashboard',
      'Official Experience & Recommendation Letter',
      'Industry Analytics Case Study Presentation'
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Python', 'NumPy', 'Pandas', 'Machine Learning', 'Scikit-Learn', 'Deep Learning'],
    description: 'Master predictive modeling, statistical learning, feature engineering, and neural network fundamentals in Python.',
    modules: [
      'Statistical Analysis & Feature Engineering with Pandas',
      'Supervised & Unsupervised Machine Learning Algorithms',
      'Model Hyperparameter Tuning, Cross-Validation & Metrics',
      'Deep Learning Fundamentals & Neural Networks (TensorFlow/PyTorch)',
      'Deploying Machine Learning Endpoints via FastAPI'
    ],
    capstone: 'End-to-End Predictive ML Pipeline with Live Web Inference Endpoint',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Complete ML Pipeline Codebase & Jupyter Research Notebooks',
      'Official Experience & Recommendation Letter',
      'Senior AI/ML Architecture Mentorship'
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Figma', 'Adobe XD', 'Design Systems', 'Wireframing', 'User Research'],
    description: 'Structure intuitive user journeys, component-driven Figma design systems, and clickable high-fidelity prototypes ready for engineering.',
    modules: [
      'User Research, Persona Development & Empathy Mapping',
      'Information Architecture & Low-Fidelity Wireframing',
      'Atomic Design Systems, Components & Design Tokens in Figma',
      'Interactive Micro-Animations & High-Fidelity Prototyping',
      'Usability Auditing (WCAG Accessibility) & Developer Handoff'
    ],
    capstone: 'Complete High-Fidelity SaaS Platform or Mobile App Design System & Prototype',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Comprehensive Figma Portfolio Case Study',
      'Official Experience & Recommendation Letter',
      'Design Critique & Feedback Sessions'
    ]
  },
  {
    id: 'java',
    title: 'Java Programming',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Core Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST APIs', 'Maven'],
    description: 'Develop robust, scalable enterprise backends and REST APIs using Core Java, Spring Boot, Hibernate, and MySQL.',
    modules: [
      'Core Java OOP, Collections Framework & Multithreading',
      'Database Modeling & ORM Persistence with Hibernate & JPA',
      'Building Scalable Microservices with Spring Boot & REST',
      'Authentication with Spring Security & JWT Tokens',
      'Unit Testing with JUnit & Automated Maven Builds'
    ],
    capstone: 'Enterprise Microservice Architecture with Spring Boot, Security & MySQL',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Production Spring Boot Backend Repository',
      'Official Experience & Recommendation Letter',
      'Enterprise Architecture Mentorship'
    ]
  },
  {
    id: 'python',
    title: 'Python Programming',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'Web Scraping'],
    description: 'Build backend APIs, web automation tools, database integrations, and dynamic web apps with Django, Flask, and FastAPI.',
    modules: [
      'Advanced Python 3: OOP, Generators, Decorators & Async',
      'Database Architecture & ORM with SQLAlchemy & PostgreSQL',
      'RESTful API Engineering with Flask & FastAPI',
      'Full-Stack Web Development with Django MVC',
      'Web Automation & Data Extraction Pipelines'
    ],
    capstone: 'High-Throughput Async REST API with FastAPI, PostgreSQL & Docker',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Clean Python Package & Deployable API Repository',
      'Official Experience & Recommendation Letter',
      'Code Quality & Best Practices Review'
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['Ethical Hacking', 'Network Security', 'Kali Linux', 'Wireshark', 'SIEM', 'OWASP'],
    description: 'Learn vulnerability analysis, web application security testing, network defense principles, and threat mitigation methodologies.',
    modules: [
      'Networking Fundamentals, OSI Layers & Packet Analysis (Wireshark)',
      'OWASP Top 10 Web Application Vulnerability Auditing',
      'Penetration Testing Tools & Virtual Lab Experiments in Kali Linux',
      'Network Defense, Firewalls & Security Information Event Management (SIEM)',
      'Vulnerability Assessment & Security Compliance Reporting'
    ],
    capstone: 'Comprehensive Penetration Testing Audit & Security Remediation Blueprint',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Hands-On Security Audit Portfolio Report',
      'Official Experience & Recommendation Letter',
      'Guided Lab & Practical Challenge Coaching'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    duration: '1 – 3 Months',
    mode: 'Hybrid / Remote (Chennai)',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux'],
    description: 'Master containerization, cloud infrastructure provisioning, and automated continuous integration/continuous deployment pipelines.',
    modules: [
      'Cloud Architecture Fundamentals on AWS (EC2, S3, VPC, IAM)',
      'Linux Server Administration & Bash Automation Scripts',
      'Docker Containerization & Multi-Container Docker Compose',
      'Automated CI/CD Workflows with GitHub Actions',
      'Kubernetes Deployment Basics, Nginx Ingress & Monitoring'
    ],
    capstone: 'Multi-Stage Automated CI/CD Cloud Pipeline on AWS with Docker Containerization',
    deliverables: [
      'Industry-Recognized Dominova Internship Certificate',
      'Infrastructure as Code (IaC) & CI/CD Pipeline Repository',
      'Official Experience & Recommendation Letter',
      'DevOps Engineering Mentorship'
    ]
  }
];

interface InternshipProps {
  onApplyDomain?: (domainTitle?: string) => void;
}

export default function Internship({ onApplyDomain }: InternshipProps) {
  const { triggerTransition } = useLayerTransition();
  const [selectedProgram, setSelectedProgram] = useState<InternshipProgram | null>(null);

  const handleOpenProgram = (prog: InternshipProgram) => {
    triggerTransition(`ACCESSING ${prog.title.toUpperCase()} CURRICULUM LAYER`, () => {
      setSelectedProgram(prog);
    });
  };

  const handleCloseProgram = () => {
    triggerTransition('RETURNING TO INTERNSHIP ACADEMY', () => {
      setSelectedProgram(null);
    });
  };

  const handleApply = (title: string) => {
    setSelectedProgram(null);
    openWhatsApp(getInternshipEnrollMessage(title));
    if (onApplyDomain) {
      onApplyDomain(title);
    }
  };

  return (
    <section id="internship" className="section internship">
      <div className="container">
        <div className="section-label">HOW PEOPLE GROW WITH US</div>

        {/* Hero Showcase Card */}
        <div className="internship__showcase-card">
          <div className="internship__image-wrap">
            <img
              src="/images/showcase/internship.png"
              alt="Dominova Software Engineering Internship Program – Real-World Projects in Chennai"
              className="internship__image"
              loading="lazy"
            />
            <div className="internship__image-overlay" />
          </div>

          <div className="internship__content-overlay">
            <span className="internship__tag">CAREER LAUNCHPAD &bull; CHENNAI</span>
            <h2 className="display-lg internship__heading">
              BUILD. LEARN. GROW.
            </h2>
            <p className="body-md internship__sub">
              Hands-on engineering internships in Web, Mobile, Data Science, Cybersecurity & Cloud with senior developer mentorship.
            </p>

            <button
              onClick={() => handleApply('Full-Stack Web Development')}
              className="btn-gold internship__btn"
            >
              <span>Enroll in Internship</span>
            </button>
          </div>
        </div>

        {/* 6 Core Programs Grid */}
        <div className="internship__programs-header">
          <h2 className="display-sm gold" style={{ marginTop: '48px', marginBottom: '12px' }}>
            Internship Engineering Tracks
          </h2>
          <p className="body-md text-muted">
            Select a specialized engineering track to view syllabus, deliverables, and apply.
          </p>
        </div>

        <div className="internship__grid">
          {programsList.map((prog) => (
            <div key={prog.id} className="internship__card">
              <div className="internship__card-meta">
                <span className="internship__card-duration">{prog.duration}</span>
                <span className="internship__card-mode">{prog.mode}</span>
              </div>

              <h4 className="heading-lg internship__card-title">{prog.title}</h4>
              <p className="body-md internship__card-desc">{prog.description}</p>

              <div className="internship__skills-row">
                {prog.skills.slice(0, 4).map((s) => (
                  <span key={s} className="internship__skill-pill">{s}</span>
                ))}
                {prog.skills.length > 4 && (
                  <span className="internship__skill-pill">+{prog.skills.length - 4}</span>
                )}
              </div>

              <div className="internship__card-actions">
                <button
                  onClick={() => handleOpenProgram(prog)}
                  className="btn-white internship__card-btn"
                >
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => handleApply(prog.title)}
                  className="btn-gold internship__card-btn"
                >
                  <span>Enroll</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Inner-Layer Program Details Modal */}
        {selectedProgram && (
          <div className="intern-detail-modal" role="dialog" aria-modal="true">
            <div className="intern-detail-modal__backdrop" onClick={handleCloseProgram} />
            <div className="intern-detail-modal__card">
              <button
                onClick={handleCloseProgram}
                className="intern-detail-modal__close"
                aria-label="Close details"
              >
                &times;
              </button>

              <div className="intern-detail-modal__header">
                <div className="intern-detail-modal__tags">
                  <span className="internship__skill-pill">{selectedProgram.duration}</span>
                  <span className="internship__skill-pill">{selectedProgram.mode}</span>
                </div>
                <h3 className="display-sm gold" style={{ marginTop: '12px' }}>{selectedProgram.title}</h3>
                <p className="body-md text-secondary" style={{ marginTop: '8px' }}>
                  {selectedProgram.description}
                </p>
              </div>

              <div className="intern-detail-modal__body">
                <div className="intern-detail-modal__section">
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Technologies & Tools</h4>
                  <div className="internship__skills-row">
                    {selectedProgram.skills.map((s) => (
                      <span key={s} className="internship__skill-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="intern-detail-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Development Modules</h4>
                  <ul className="intern-detail-modal__list">
                    {selectedProgram.modules.map((m, i) => (
                      <li key={i} className="intern-detail-modal__list-item">
                        <span className="gold font-display" style={{ fontWeight: 700 }}>0{i + 1}</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="intern-detail-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>Capstone Project Deliverable</h4>
                  <p className="body-md text-secondary" style={{ background: 'var(--color-surface-2)', padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border-light)' }}>
                    {selectedProgram.capstone}
                  </p>
                </div>

                <div className="intern-detail-modal__section" style={{ marginTop: '20px' }}>
                  <h4 className="heading-sm gold" style={{ marginBottom: '10px' }}>What You Will Receive</h4>
                  <ul className="intern-detail-modal__list">
                    {selectedProgram.deliverables.map((d, i) => (
                      <li key={i} className="intern-detail-modal__list-item">
                        <span className="gold">&check;</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="intern-detail-modal__footer">
                <button
                  onClick={() => handleApply(selectedProgram.title)}
                  className="btn-gold"
                >
                  <span>Apply for this Track</span>
                </button>
                <button
                  onClick={() => setSelectedProgram(null)}
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
