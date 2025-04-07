import { motion } from 'framer-motion';

interface ProfileAnimationConfig {
    delay?: number;
    duration?: number;
}

const useProfileAnimation = ({ delay = 0.3, duration = 0.4 }: ProfileAnimationConfig = {}) => {
    const containerAnimation = {
        initial: { opacity: 0, x: 20 },
        animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration, 
                delay, 
                ease: "easeOut" 
            }
        }
    };

    return {
        containerAnimation
    };
};

export default useProfileAnimation; 