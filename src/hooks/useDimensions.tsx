import { RefObject, useRef, useState, useEffect } from 'react';

// Custom hook for managing dimensions
const useDimensions = (ref: RefObject<HTMLDivElement>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const resizeTimeoutRef = useRef<NodeJS.Timeout>();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            if (ref.current) {
                const newWidth = ref.current.offsetWidth;
                const newHeight = ref.current.offsetHeight;
                setDimensions({
                    width: newWidth,
                    height: newHeight,
                });
            }
        };

        const handleResize = () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            
            resizeTimeoutRef.current = setTimeout(() => {
                updateDimensions();
            }, 100);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateDimensions();
            }
        };

        if (isClient) {
            requestAnimationFrame(() => {
                updateDimensions();
            });
        }

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isClient, ref]);

    return { dimensions, isClient };
};

export default useDimensions; 