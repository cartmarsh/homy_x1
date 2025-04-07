import { useCallback } from 'react';

// Custom hook for scroll effect
const useGlitchEffect = () => {
    const triggerClickEffect = useCallback(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Return minimal interface since we're only handling scrolling now
    return { 
        glitchIntensity: 0, 
        isClicked: false, 
        lightningClass: '', 
        triggerClickEffect 
    };
};

export default useGlitchEffect; 