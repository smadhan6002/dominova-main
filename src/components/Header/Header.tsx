import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DominovaLogo from '../Common/DominovaLogo';
import ThemeToggle from '../Common/ThemeToggle';
import { useLayerTransition } from '../../context/LayerTransitionContext';
import './Header.css';

const desktopPrimaryLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Internships', href: '#internship' },
  { label: 'About', href: '#about' },
];

const desktopMoreLinks = [
  { label: 'Blog', href: '/blog', badge: 'Articles' },
  { label: 'Contact', href: '#contact', badge: 'Inquiry' },
  { label: 'Portfolio', href: '#portfolio', badge: 'Projects' },
  { label: 'FAQ', href: '#faq', badge: 'Q&A' },
];

const mobileNavLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Internships', href: '#internship' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  onOpenInternshipModal?: () => void;
  onNavigateLayer?: (layer: string | null) => void;
  currentLayer?: string | null;
}

export default function Header({ onOpenInternshipModal, onNavigateLayer, currentLayer }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body & document scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close drawer and dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (moreOpen) setMoreOpen(false);
        if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, moreOpen]);

  // Close More dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };

    if (moreOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreOpen]);

  const { triggerTransition } = useLayerTransition();

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setMoreOpen(false);
    
    if (href.startsWith('#')) {
      const sectionKey = href.replace('#', '');
      if (location.pathname !== '/') {
        triggerTransition(
          sectionKey === 'home' ? 'RETURNING TO MAIN HUB' : 'ACCESSING SYSTEM LAYER',
          () => {
            navigate('/');
            setTimeout(() => {
              if (onNavigateLayer) {
                if (sectionKey === 'home') {
                  onNavigateLayer(null);
                } else {
                  onNavigateLayer(sectionKey);
                }
              }
            }, 50);
          }
        );
      } else {
        if (onNavigateLayer) {
          if (sectionKey === 'home') {
            onNavigateLayer(null);
          } else {
            onNavigateLayer(sectionKey);
          }
        } else {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      triggerTransition(
        href === '/blog' ? 'INITIALIZING ARTICLES DIRECTORY' : 'ACCESSING SYSTEM LAYER',
        () => {
          navigate(href);
        }
      );
    }
  };

  const isMoreActive = desktopMoreLinks.some((link) => 
    (currentLayer && link.href === `#${currentLayer}`) || 
    (link.href.startsWith('/') && location.pathname.startsWith(link.href))
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--menu-open' : ''}`}
        role="banner"
      >
        <div className="header__inner container">
          {/* Dominova Logo */}
          <a
            href="/"
            className="header__logo"
            aria-label="DOMINOVA — Home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <DominovaLogo height={55} className="header__logo-brand" />
          </a>

          {/* Desktop Navigation */}
          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            <ul className="header__nav-list">
              {desktopPrimaryLinks.map((link) => (
                <li key={link.href} className="header__nav-item">
                  <a
                    href={link.href}
                    className={`header__nav-link ${
                      (link.href === '#home' && currentLayer === null) ||
                      (currentLayer && link.href === `#${currentLayer}`) ||
                      (location.pathname === '/' && link.href === '#home' && !currentLayer)
                        ? 'is-active'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}

              {/* Desktop "More ▾" Dropdown */}
              <li className="header__nav-item header__more-container" ref={moreRef}>
                <button
                  type="button"
                  id="desktop-more-button"
                  className={`header__nav-link header__more-btn ${moreOpen || isMoreActive ? 'is-active' : ''}`}
                  onClick={() => setMoreOpen((prev) => !prev)}
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  aria-controls="desktop-more-dropdown"
                  aria-label="More navigation options"
                >
                  <span>More</span>
                  <svg
                    className={`header__more-chevron ${moreOpen ? 'is-open' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {moreOpen && (
                  <div
                    id="desktop-more-dropdown"
                    className="header__more-dropdown"
                    role="menu"
                    aria-label="More pages"
                  >
                    <div className="header__more-dropdown-inner">
                      {desktopMoreLinks.map((item) => {
                        const isActive =
                          (currentLayer && item.href === `#${currentLayer}`) ||
                          (item.href.startsWith('/') && location.pathname.startsWith(item.href));
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className={`header__more-item ${isActive ? 'is-active' : ''}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.href);
                            }}
                          >
                            <span className="header__more-item-label">{item.label}</span>
                            {item.badge && <span className="header__more-item-badge">{item.badge}</span>}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <a
              href="#contact"
              className="header__cta btn-gold"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              aria-label="Start a Project with Dominova"
            >
              <span>Start a Project</span>
            </a>

            <div className="header__theme-wrap">
              <ThemeToggle />
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`header__hamburger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Fixed Overlay Layer) */}
      <div
        id="mobile-menu"
        className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div
          className="header__mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu backdrop"
        />
        <nav className="header__mobile-nav" role="navigation" aria-label="Mobile navigation">
          {/* Drawer Top Header: Logo + Dedicated Close Button */}
          <div className="header__mobile-header">
            <div className="header__mobile-brand">
              <DominovaLogo height={42} className="header__drawer-logo-brand" />
            </div>
            <button
              className="header__mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Mobile Links List */}
          <ul className="header__mobile-list">
            {mobileNavLinks.map((link, i) => (
              <li key={link.href} className="header__mobile-item">
                <a
                  href={link.href}
                  className={`header__mobile-link ${
                    (link.href === '#home' && currentLayer === null) ||
                    (currentLayer && link.href === `#${currentLayer}`)
                      ? 'is-active'
                      : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="header__mobile-link-num">0{i + 1}</span>
                  <span className="header__mobile-link-text">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom Actions: Theme Toggle & CTAs */}
          <div className="header__mobile-actions">
            <ThemeToggle showLabel={true} className="theme-toggle--full" />

            <a
              href="#contact"
              className="btn-gold header__mobile-btn"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>Start a Project</span>
            </a>

            {onOpenInternshipModal && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenInternshipModal();
                }}
                className="btn-white header__mobile-btn"
                tabIndex={menuOpen ? 0 : -1}
              >
                Apply for Internship
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

