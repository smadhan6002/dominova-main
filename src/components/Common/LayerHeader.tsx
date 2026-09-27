import React from 'react';
import './LayerHeader.css';

interface LayerHeaderProps {
  level: 1 | 2;
  sectionTitle: string;
  subTitle?: string;
  onBack: () => void;
  onHome: () => void;
}

export const LayerHeader: React.FC<LayerHeaderProps> = ({
  level,
  sectionTitle,
  subTitle,
  onBack,
  onHome,
}) => {
  return (
    <div className="layer-header-bar">
      <div className="container layer-header-bar__inner">
        {/* Breadcrumb Navigation */}
        <nav className="layer-breadcrumb" aria-label="Layer Breadcrumb">
          <button onClick={onHome} className="layer-breadcrumb__item layer-breadcrumb__home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>HUB</span>
          </button>

          <span className="layer-breadcrumb__separator">/</span>

          <span className={`layer-breadcrumb__item ${level === 1 ? 'is-active' : ''}`}>
            {sectionTitle}
          </span>

          {level === 2 && subTitle && (
            <>
              <span className="layer-breadcrumb__separator">/</span>
              <span className="layer-breadcrumb__item is-active">{subTitle}</span>
            </>
          )}
        </nav>

        {/* Back Control Button */}
        <div className="layer-header-bar__actions">
          <button onClick={onBack} className="layer-back-btn" aria-label="Go back to previous layer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>{level === 2 ? `Back to ${sectionTitle}` : 'Back to Hub'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayerHeader;
