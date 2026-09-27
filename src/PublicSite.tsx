import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustomCursor } from './hooks/useCustomCursor';
import { LayerTransitionProvider, useLayerTransition } from './context/LayerTransitionContext';

import LogoIntro from './components/LogoIntro/LogoIntro';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import InternshipModal from './components/InternshipModal/InternshipModal';

// Pages
import HomePage from './components/HomePage/HomePage';
import BlogPage from './components/Blog/BlogPage';
import ArticlePage from './components/Blog/ArticlePage';

function PublicSiteContent() {
  useCustomCursor();
  const { triggerTransition } = useLayerTransition();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [currentLayer, setCurrentLayer] = useState<string | null>(null);

  const handleOpenInternshipModal = (domain?: string) => {
    if (domain) setSelectedDomain(domain);
    setModalOpen(true);
  };

  const handleNavigateLayer = (layer: string | null) => {
    if (layer === currentLayer) return;

    const labelMap: Record<string, string> = {
      services: 'ENTERING ENTERPRISE SERVICES LAYER',
      internship: 'ENTERING INTERNSHIP ACADEMY LAYER',
      portfolio: 'ENTERING SPATIAL PORTFOLIO LAYER',
      work: 'ENTERING SPATIAL PORTFOLIO LAYER',
      about: 'ENTERING ENGINEERING CORE LAYER',
      technology: 'ENTERING TECH ARCHITECTURE LAYER',
      contact: 'ENTERING INQUIRY PORTAL LAYER',
      faq: 'ENTERING FAQ KNOWLEDGE LAYER',
    };

    triggerTransition(
      layer ? (labelMap[layer] || 'ACCESSING SYSTEM LAYER') : 'RETURNING TO MAIN HUB',
      () => {
        setCurrentLayer(layer);
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    );
  };

  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="app" id="app">
      {/* 1. Page-Load Logo Intro */}
      <LogoIntro />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 2. Header */}
      <Header
        onOpenInternshipModal={() => handleOpenInternshipModal()}
        onNavigateLayer={handleNavigateLayer}
        currentLayer={currentLayer}
      />

      {/* 3. Nested Public Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              onOpenInternshipModal={handleOpenInternshipModal} 
              selectedDomain={selectedDomain}
              currentLayer={currentLayer}
              onNavigateLayer={handleNavigateLayer}
            />
          } 
        />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
      </Routes>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Internship Modal */}
      <InternshipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultDomain={selectedDomain}
      />
    </div>
  );
}

export default function PublicSite() {
  return (
    <LayerTransitionProvider>
      <PublicSiteContent />
    </LayerTransitionProvider>
  );
}

