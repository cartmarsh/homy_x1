import { useEffect } from "react";

const useScrollSnapping = () => {
    useEffect(() => {
        // Set CSS variable for navbar height
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                const height = navbar.getBoundingClientRect().height;
                document.documentElement.style.setProperty('--navbar-height', `${height}px`);
            }
        };

        // Update immediately and on resize
        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);

        // Also update after a short delay to ensure all content is loaded
        const timeoutId = setTimeout(updateNavbarHeight, 500);

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
            clearTimeout(timeoutId);
        };
    }, []);
};

export default useScrollSnapping;