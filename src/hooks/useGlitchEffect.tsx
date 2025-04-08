import { useCallback } from 'react';

// Custom hook for scroll effect
const useGlitchEffect = () => {
    const triggerClickEffect = useCallback(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Return minimal interface with glitchIntensity always set to 0 to remove glitch effects
    return { 
        glitchIntensity: 0, 
        isClicked: false, 
        lightningClass: '', 
        triggerClickEffect 
    };
};

export default useGlitchEffect; 