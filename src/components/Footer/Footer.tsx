import { useState, useEffect } from 'react';
import DominovaLogo from '../Common/DominovaLogo';
import {
  DOMINOVA_PHONE,
  DOMINOVA_EMAIL,
  getWhatsAppUrl,
  getGeneralInquiryMessage,
} from '../../lib/whatsapp';
import './Footer.css';

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="container">
          {/* Main Footer Layout */}
          <div className="footer__grid">
            {/* Brand Col */}
            <div className="footer__brand">
              <DominovaLogo height={36} showText={true} />
              <p className="footer__desc">
                Building scalable technology solutions for businesses and institutions across India.
              </p>
              <div className="footer__contact-info">
                <p className="footer__contact-item">
                  <span className="footer__contact-label">📱 Call / WhatsApp:</span>
                  <a href={`tel:${DOMINOVA_PHONE.replace(/\s+/g, '')}`} className="footer__contact-val">
                    {DOMINOVA_PHONE}
                  </a>
                </p>
                <p className="footer__contact-item">
                  <span className="footer__contact-label">📧 Email:</span>
                  <a href={`mailto:${DOMINOVA_EMAIL}`} className="footer__contact-val">
                    {DOMINOVA_EMAIL}
                  </a>
                </p>
              </div>
              <p className="footer__founder">
                Headquarters: <strong className="gold">Chennai, Tamil Nadu, India</strong>
              </p>
            </div>

            {/* Core Services */}
            <div className="footer__col">
              <h4 className="footer__heading">Services</h4>
              <ul className="footer__links">
                <li><a href="#services" title="Web Development Services – Dominova">Web Development</a></li>
                <li><a href="#services" title="Mobile App Development – Dominova">Mobile Apps</a></li>
                <li><a href="#services" title="Custom Software Solutions – Dominova">Custom Software</a></li>
                <li><a href="#services" title="UI/UX Design Services – Dominova">UI/UX Design</a></li>
                <li><a href="#services" title="Data Analytics and Data Science – Dominova">Data Analytics</a></li>
                <li><a href="#services" title="Cloud and Deployment Services – Dominova">Cloud Services</a></li>
                <li><a href="#services" title="Cybersecurity Solutions – Dominova">Cybersecurity</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer__col">
              <h4 className="footer__heading">Company</h4>
              <ul className="footer__links">
                <li><a href="#about" title="About Dominova – Technology Company in Chennai">About Us</a></li>
                <li><a href="#internship" title="Software Engineering Internships – Dominova">Internships</a></li>
                <li><a href="/blog" title="Technology Blog – Internship Tips and Industry Insights">Blog</a></li>
                <li><a href="#contact" title="Contact Dominova – Start a Project or Apply for Internship">Contact</a></li>
                <li>
                  <a
                    href="https://dominova-portfolio-showcase.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Portfolio Showcase ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="footer__col">
              <h4 className="footer__heading">Connect</h4>
              <ul className="footer__links">
                <li>
                  <a
                    href={getWhatsAppUrl(getGeneralInquiryMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold font-display"
                  >
                    WhatsApp Chat 💬
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${DOMINOVA_EMAIL}`}
                  >
                    {DOMINOVA_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${DOMINOVA_PHONE.replace(/\s+/g, '')}`}
                  >
                    {DOMINOVA_PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/dominova.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram (@Dominova.tech)
                  </a>
                </li>
                <li>
                  <a
                    href="https://forms.gle/zhufuHYQkRFnJWEv7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold font-display"
                  >
                    Apply for Internship ↗
                  </a>
                </li>
                <li><a href="#contact">Free Consultation</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; 2026 Dominova. All rights reserved. Building the future of technology in Chennai.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Fixed Back to Top Button */}
      <button
        type="button"
        id="back-to-top-button"
        onClick={scrollToTop}
        className={`back-to-top-btn ${showTopBtn ? 'is-visible' : ''}`}
        aria-label="Back to top"
        title="Back to top"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}

