import React, { useState } from 'react';
import logoImg from '../../assets/logo.png';

interface DominovaLogoProps {
  className?: string;
  height?: number | string;
  showText?: boolean;
  animated?: boolean;
}

export const DominovaLogo: React.FC<DominovaLogoProps> = ({
  className = '',
  height = 36,
}) => {
  const [imgError, setImgError] = useState(false);
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`dominova-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: heightStyle,
        lineHeight: 1,
      }}
    >
      {!imgError ? (
        <img
          src={logoImg}
          alt="DOMINOVA"
          className="dominova-logo-img"
          onError={() => setImgError(true)}
          width={120}
          height={36}
          fetchPriority="high"
          decoding="async"
          style={{
            height: '100%',
            width: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      ) : (
        <span
          className="dominova-wordmark"
          style={{
            fontSize: '1.25rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
          }}
        >
          DOMINOVA
        </span>
      )}
    </div>
  );
};

export default DominovaLogo;
