import { motion } from 'framer-motion';

interface TextAnimationConfig {
    delay?: number;
    duration?: number;
}

const useTextAnimation = ({ delay = 0, duration = 0.2 }: TextAnimationConfig = {}) => {
    const containerAnimation = {
        initial: { opacity: 1, y: 0 },
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
        initial: { opacity: 1, scale: 1 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration, 
                delay, 
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