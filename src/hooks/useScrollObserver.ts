import { useEffect, useCallback } from 'react';

export interface Section {
    id: string;
    label: string;
}

export const useScrollObserver = (
    sections: Section[],
    onSectionChange: (sectionId: string) => void,
    options?: {
        rootMargin?: string;
        threshold?: number[];
    }
) => {
    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        } else {
            // For lazy-loaded sections, wait for them to appear
            const observer = new MutationObserver((_, obs) => {
                const newElement = document.getElementById(sectionId);
                if (newElement) {
                    obs.disconnect();
                    // Small delay to ensure the element is fully rendered
                    setTimeout(() => {
                        newElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }, 100);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => observer.disconnect(), 5000);
        }
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: options?.rootMargin || '-10% 0px -70% 0px',
            threshold: options?.threshold || [0.1, 0.5]
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            
            if (visibleEntries.length > 0) {
                const mostVisible = visibleEntries.reduce((prev, current) => {
                    return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
                });
                
                onSectionChange(mostVisible.target.id);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        // Set up mutation observer for dynamically added sections
        const mutationObserver = new MutationObserver(() => {
            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element && !observer.takeRecords().some(r => r.target === element)) {
                    observer.observe(element);
                }
            });
        });

        // Start observing for dynamic sections
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Initial observation
        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, [sections, onSectionChange, options]);

    return { scrollToSection };
}; 