import { useEffect, useState } from 'react';
import './RetroLoader.css';

interface RetroLoaderProps {
  duration?: number; // Duration in milliseconds
  primaryText?: string; // Text to display as the main loading text
  accentText?: string; // Text to display as the secondary loading text
  logoSrc?: string; // Optional logo to display above the loading text
}

export function RetroLoader({ 
  duration = 1500,
  primaryText = "LOADING",
  accentText = "INITIALIZING SYSTEM...",
  logoSrc
}: RetroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="retro-loader-container">
      <div className="retro-loader-content">
        {logoSrc && (
          <div className="retro-loader-logo">
            <img src={logoSrc} alt="Logo" />
          </div>
        )}
        <div className="retro-loading-text">{primaryText}</div>
        <div className="retro-progress-bar">
          <div className="retro-progress-fill"></div>
        </div>
        <div className="retro-loading-bytes">{accentText}</div>
      </div>
    </div>
  );
}

export default RetroLoader; 