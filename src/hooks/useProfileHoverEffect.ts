import { useState, useCallback, useRef, useEffect } from 'react';

interface ProfileHoverEffectOptions {
    exitDelay?: number;
    scaleAmount?: number;
}

const useProfileHoverEffect = ({
    exitDelay = 2000,
    scaleAmount = 1.05
}: ProfileHoverEffectOptions = {}) => {
    const [showBubble, setShowBubble] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [scale, setScale] = useState(1);
    const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isHoveredRef = useRef(false);
    
    // Cleanup function for timeouts
    useEffect(() => {
        return () => {
            if (exitTimeoutRef.current) {
                clearTimeout(exitTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = useCallback(() => {
        // Cancel any pending exit timeout
        if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
            exitTimeoutRef.current = null;
        }
        
        isHoveredRef.current = true;
        setIsExiting(false);
        
        // Add a short delay before showing the bubble to ensure proper animation
        setTimeout(() => {
            if (isHoveredRef.current) {
                setShowBubble(true);
                setScale(scaleAmount);
            }
        }, 50);
    }, [scaleAmount]);

    const handleMouseLeave = useCallback(() => {
        isHoveredRef.current = false;
        setIsExiting(true);
        
        // Delay hiding to allow exit animation
        if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current);
        }
        
        exitTimeoutRef.current = setTimeout(() => {
            setShowBubble(false);
            exitTimeoutRef.current = null;
        }, exitDelay);
        
        setScale(1);
    }, [exitDelay]);

    return {
        showBubble,
        isExiting,
        scale,
        handleMouseEnter,
        handleMouseLeave
    };
};

export default useProfileHoverEffect; 