import { motion } from 'framer-motion';

interface TextAnimationConfig {
    delay?: number;
    duration?: number;
}

const useTextAnimation = ({ delay = 0.1, duration = 0.4 }: TextAnimationConfig = {}) => {
    const containerAnimation = {
        initial: { opacity: 0, y: 10 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration, 
                ease: "easeOut",
                delay
            }
        }
    };

    const buttonAnimation = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration, 
                delay: delay + 0.1, 
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return {
        containerAnimation,
        buttonAnimation
    };
};

export default useTextAnimation; 