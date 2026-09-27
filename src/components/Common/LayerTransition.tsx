import React from 'react';
import './LayerTransition.css';

interface LayerTransitionProps {
  isActive: boolean;
  label?: string;
}

export const LayerTransition: React.FC<LayerTransitionProps> = ({ isActive, label = 'INITIALIZING SYSTEM LAYER' }) => {
  if (!isActive) return null;

  return (
    <div className="layer-transition" role="status" aria-live="polite" aria-label={label}>
      <div className="layer-transition__glow" />
      <div className="layer-transition__content">
        <div className="layer-transition__emblem">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="transGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF3B0" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
              <linearGradient id="transGold2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE29F" />
                <stop offset="50%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#8A5A00" />
              </linearGradient>
              <linearGradient id="transGold3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFF7D6" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#B38728" />
              </linearGradient>
            </defs>
            <path d="M200 15 L248 42.7 L248 98.3 L200 126 L152 98.3 L152 42.7 Z" fill="url(#transGold1)" stroke="#FFE699" strokeWidth="1.5" />
            <path d="M135 128 L183 155.7 L183 211.3 L135 239 L87 211.3 L87 155.7 Z" fill="url(#transGold2)" stroke="#FFE699" strokeWidth="1.5" />
            <path d="M265 128 L313 155.7 L313 211.3 L265 239 L217 211.3 L217 155.7 Z" fill="url(#transGold3)" stroke="#FFE699" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="layer-transition__bar">
          <div className="layer-transition__progress" />
        </div>
        <span className="layer-transition__label">{label}</span>
      </div>
    </div>
  );
};

export default LayerTransition;
