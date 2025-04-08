import { useCallback } from 'react';

interface GlitchEffectResult {
  isActive: boolean;
  glitchStyle: React.CSSProperties;
  triggerClickEffect: () => void;
  glitchIntensity: number;
  isClicked: boolean;
  lightningClass: string;
}

// Custom hook for scroll effect
const useGlitchEffect = (): GlitchEffectResult => {
    const triggerClickEffect = useCallback(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Return minimal interface with glitchIntensity always set to 0 to remove glitch effects
    return { 
        glitchIntensity: 0, 
        isClicked: false, 
        lightningClass: '', 
        triggerClickEffect,
        isActive: false,
        glitchStyle: {}
    };
};

export default useGlitchEffect; 