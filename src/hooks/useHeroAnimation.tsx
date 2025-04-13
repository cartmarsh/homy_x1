import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useHeroAnimation = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { 
        once: true,
        margin: "0px 0px -200px 0px" // Trigger animation earlier
    });

    const glassStyles = {
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(1px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "0.75rem"
    };

    const containerAnimation = {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: 1, ease: 'easeOut' },
        style: glassStyles
    };

    const titleAnimation = {
        initial: { opacity: 0, y: 30 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        transition: { duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }
    };

    const subtitleAnimation = {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }
    };

    const buttonAnimation = {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 },
        transition: { duration: 0.8, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] },
        whileHover: { scale: 1.05, transition: { duration: 0.2 } },
        whileTap: { scale: 0.98 }
    };

    return {
        ref,
        containerAnimation,
        titleAnimation,
        subtitleAnimation,
        buttonAnimation,
        glassStyles
    };
}; 