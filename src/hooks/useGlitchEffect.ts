import { useState, useEffect, CSSProperties } from 'react';

interface GlitchEffectOptions {
  interval?: number;
  probability?: number; 
  duration?: number;
  intensity?: number;
}

/**
 * Custom hook for creating a glitch effect
 * @param options Configuration options for the glitch effect
 * @returns Current glitch state and style object
 */
export default function useGlitchEffect({
  interval = 2000,
  probability = 0.3,
  duration = 150,
  intensity = 2
}: GlitchEffectOptions = {}) {
  const [isActive, setIsActive] = useState(false);

  // Trigger random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > (1 - probability)) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), duration);
      }
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [interval, probability, duration]);

  // Generate random offsets for glitch effect
  const getGlitchStyle = (): CSSProperties => {
    if (!isActive) return {};
    
    return {
      transform: `translate(${Math.random() * intensity * 2 - intensity}px, ${Math.random() * intensity * 2 - intensity}px)`,
      textShadow: `
        ${Math.random() * intensity * 2 - intensity}px ${Math.random() * intensity * 2 - intensity}px 0 rgba(255,0,0,0.7),
        ${Math.random() * intensity * 2 - intensity}px ${Math.random() * intensity * 2 - intensity}px 0 rgba(0,255,255,0.7)
      `
    };
  };

  return {
    isActive,
    glitchStyle: getGlitchStyle()
  };
} 