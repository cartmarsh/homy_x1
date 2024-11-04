import { useState, useEffect } from 'react';

const useScrollDirection = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
            if (currentPosition > lastScrollTop) {
                // downscroll
                setIsVisible(false);
            } else {
                // upscroll
                setIsVisible(true);
            }
            setLastScrollTop(currentPosition <= 0 ? 0 : currentPosition);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [lastScrollTop]);

    return isVisible;
};


export default useScrollDirection;

