import { throttle } from "lodash";
import { useEffect } from "react";

const useScrollSnapping = () => {
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            
            const viewportHeight = window.innerHeight - navbarHeight;
            
            const scrollPosition = window.scrollY;
            let targetSection = null;
            let minDistance = Infinity;
            
            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
                const distance = Math.abs(scrollPosition - sectionTop);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    targetSection = section;
                }
            });
            
            if (targetSection && minDistance < viewportHeight / 3) {
                const element = targetSection as HTMLElement;
                const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                if (!document.body.classList.contains('scrolling')) {
                    document.body.classList.add('scrolling');
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        document.body.classList.remove('scrolling');
                    }, 800);
                }
            }
        };
        
        const throttledScrollHandler = throttle(handleScroll, 200);
        
        window.addEventListener('scroll', throttledScrollHandler);
        
        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
        };
    }, []);
};


export default useScrollSnapping;