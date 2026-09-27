import React, { useState, useEffect } from 'react';
import { applications } from '../../lib/data/db';
import {
  DOMINOVA_PHONE,
  openWhatsApp,
  getInternshipEnrollMessage,
} from '../../lib/whatsapp';
import './InternshipModal.css';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export default function InternshipModal({ isOpen, onClose, defaultDomain = '' }: InternshipModalProps) {
  const [selectedDomain, setSelectedDomain] = useState(defaultDomain || 'Web Development');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('3rd Year');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultDomain) setSelectedDomain(defaultDomain);
  }, [defaultDomain]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save to admin applications inbox
      applications.create({
        applicantName: name,
        email,
        phone,
        college,
        yearOfStudy: year,
        internshipId: '',
        internshipTitle: selectedDomain + ' Internship',
        status: 'new',
        notes: '',
        appliedAt: new Date().toISOString(),
      });
    } catch {
      console.error('[Dominova] Failed to save application to admin inbox.');
    }
    setSubmitted(true);
    // Automatically trigger WhatsApp draft to Dominova Office (+91 87543 25192)
    openWhatsApp(getInternshipEnrollMessage(selectedDomain, { name, college, year }));
  };

  const handleQuickWhatsApp = () => {
    openWhatsApp(getInternshipEnrollMessage(selectedDomain, name ? { name, college, year } : undefined));
  };

  return (
    <div className="intern-modal" role="dialog" aria-modal="true">
      <div className="intern-modal__overlay" onClick={onClose} />
      <div className="intern-modal__content">
        <button className="intern-modal__close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {submitted ? (
          <div className="intern-modal__success">
            <div className="intern-modal__success-icon">✓</div>
            <h3 className="intern-modal__title">Application Submitted & WhatsApp Ready</h3>
            <p className="intern-modal__desc">
              Thank you <strong className="gold">{name}</strong>! Your application for the{' '}
              <strong className="gold">{selectedDomain} Internship</strong> at Dominova has been recorded. We have also opened your pre-filled WhatsApp enrollment message addressed to <strong className="gold">{DOMINOVA_PHONE}</strong>.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => openWhatsApp(getInternshipEnrollMessage(selectedDomain, { name, college, year }))}
                className="btn-gold"
                style={{ justifyContent: 'center' }}
              >
                <span>Send WhatsApp Enrollment Message 💬</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-white"
                style={{ justifyContent: 'center' }}
              >
                <span>Close Window</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="intern-modal__form">
            <span className="intern-modal__badge">DOMINOVA CAREERS</span>
            <h3 className="intern-modal__title">Enroll in Internship Program</h3>
            <p className="intern-modal__sub">Blended 1–3 Month Hands-on Program in Chennai, India &bull; Office: {DOMINOVA_PHONE}</p>

            <div className="intern-modal__field">
              <label>Select Preferred Domain *</label>
              <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
                <option value="Web Development">Web Development (React / Node)</option>
                <option value="Mobile App Development">Mobile App Development (Flutter / React Native)</option>
                <option value="Data Science & Analytics">Data Science & Machine Learning</option>
                <option value="Data Analytics">Data Analytics (SQL, Power BI, Python)</option>
                <option value="Cybersecurity">Cybersecurity & Ethical Hacking</option>
                <option value="UI/UX Design">UI/UX Design Strategy</option>
                <option value="Cloud Computing & DevOps">Cloud & DevOps Infrastructure</option>
                <option value="Java Programming">Java Programming (Spring Boot / MySQL)</option>
                <option value="Python Programming">Python Programming (FastAPI / Django)</option>
              </select>
            </div>

            <div className="intern-modal__row">
              <div className="intern-modal__field">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="intern-modal__field">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="intern-modal__row">
              <div className="intern-modal__field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 87543 25192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="intern-modal__field">
                <label>Year of Study *</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year / Final">4th Year / Final</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                </select>
              </div>
            </div>

            <div className="intern-modal__field">
              <label>College / Institution Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anna University / SRM / VIT"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <button type="submit" className="btn-gold intern-modal__submit" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Submit & Enroll via WhatsApp 💬</span>
              </button>
              <button
                type="button"
                onClick={handleQuickWhatsApp}
                className="btn-white"
                style={{ width: '100%', justifyContent: 'center', height: '44px' }}
              >
                <span>Direct WhatsApp Chat 💬</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
