import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CinematicHero from '../CinematicHero/CinematicHero';
import GoldTunnel from '../Common/GoldTunnel';
import SystemsMatrix from '../Common/SystemsMatrix';
import LayerHeader from '../Common/LayerHeader';
import About from '../About/About';
import Services from '../Services/Services';
import Technology from '../Technology/Technology';
import WhyDominova from '../WhyDominova/WhyDominova';
import Internship from '../Internship/Internship';
import Stats from '../Stats/Stats';
import Process from '../Process/Process';
import Work from '../Work/Work';
import FAQ from '../FAQ/FAQ';
import CTA from '../CTA/CTA';
import Contact from '../Contact/Contact';

interface HomePageProps {
  onOpenInternshipModal: (domain?: string) => void;
  selectedDomain: string;
  currentLayer: string | null;
  onNavigateLayer: (layer: string | null) => void;
}

export default function HomePage({
  onOpenInternshipModal,
  selectedDomain,
  currentLayer,
  onNavigateLayer,
}: HomePageProps) {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [currentLayer]);

  // Level 1: Services Explorer
  if (currentLayer === 'services') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Enterprise Services"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <Services />
        <GoldTunnel label="TECH CAPABILITIES ECOSYSTEM" />
        <Technology />
        <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />
      </main>
    );
  }

  // Level 1: Internship Academy
  if (currentLayer === 'internship') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Internship Academy"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <Internship onApplyDomain={(domain) => onOpenInternshipModal(domain)} />
        <Process />
        <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />
      </main>
    );
  }

  // Level 1: Spatial Portfolio & Work
  if (currentLayer === 'portfolio' || currentLayer === 'work') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Spatial Portfolio"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <Work />
        <Stats />
        <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />
      </main>
    );
  }

  // Level 1: Engineering Core / About
  if (currentLayer === 'about') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Engineering Core"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <About />
        <WhyDominova />
        <Stats />
        <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />
      </main>
    );
  }

  // Level 1: Tech Architecture
  if (currentLayer === 'technology') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Tech Architecture"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <Technology />
        <Process />
        <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />
      </main>
    );
  }

  // Level 1: Inquiry Portal / Contact
  if (currentLayer === 'contact') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Inquiry Portal"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <Contact initialDomain={selectedDomain} />
        <FAQ />
      </main>
    );
  }

  // Level 1: FAQ
  if (currentLayer === 'faq') {
    return (
      <main id="main-content" className="layer-view">
        <LayerHeader
          level={1}
          sectionTitle="Frequently Asked Questions"
          onBack={() => onNavigateLayer(null)}
          onHome={() => onNavigateLayer(null)}
        />
        <FAQ />
        <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />
      </main>
    );
  }

  // Level 0: Main Hub
  return (
    <main id="main-content">
      {/* 1. Cinematic Hero */}
      <CinematicHero 
        onOpenInternshipModal={() => onOpenInternshipModal()} 
        onNavigateLayer={onNavigateLayer}
      />

      {/* Spatial Tunnel Video Transition */}
      <GoldTunnel videoSrc="/videos/now_create_a_video.mp4" />

      {/* 2. Interactive Systems Matrix (Level 0 Exploration Hub) */}
      <SystemsMatrix onSelectLayer={onNavigateLayer} />

      {/* 3. Numerical Metrics Highlights */}
      <Stats />

      {/* 4. Trust & Standards */}
      <WhyDominova />

      {/* 5. Frequently Asked Questions */}
      <FAQ />

      {/* 6. Action Call to Action */}
      <CTA onOpenInternshipModal={() => onOpenInternshipModal()} onNavigateLayer={onNavigateLayer} />

      {/* 7. Direct Contact Form */}
      <Contact initialDomain={selectedDomain} />
    </main>
  );
}
