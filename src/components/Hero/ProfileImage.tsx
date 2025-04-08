import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useProfileAnimation from '../../hooks/useProfileAnimation';
import useProfileHoverEffect from '../../hooks/useProfileHoverEffect';
import useTimeBasedGreeting from '../../hooks/useTimeBasedGreeting';
import SpeechBubbleScene from '../../components/Hero/SpeechBubble';

interface ProfileImageProps {
    imageSrc: string;
    alt: string;
    className?: string;
    message?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ 
    imageSrc, 
    alt, 
    className = '',
    message
}) => {
    const { containerAnimation } = useProfileAnimation();
    const { 
        showBubble, 
        isExiting, 
        scale, 
        handleMouseEnter, 
        handleMouseLeave 
    } = useProfileHoverEffect({
        exitDelay: 2500,
        scaleAmount: 1.05
    });
    
    // Get time-based greeting or use custom message
    const displayMessage = useTimeBasedGreeting({
        customMessage: message
    });

    return (
        <motion.div
            {...containerAnimation}
            className={`
                md:absolute md:top-1/2 md:right-[20%] md:transform md:-translate-y-1/2 md:z-20
                relative mt-8 md:mt-0
                flex justify-center
                ${className}
            `}
        >
            <div 
                className="relative retro-image-container"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ marginTop: '40px' }}
            >
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    className="w-36 h-36 xs:w-48 xs:h-48 sm:w-54 sm:h-54 md:w-60 md:h-60 lg:w-66 lg:h-66 rounded-lg shadow-xl object-cover"
                    animate={{ scale }}
                    transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 crt-overlay rounded-lg pointer-events-none"></div>
                
                <AnimatePresence mode="wait">
                    {showBubble && (
                        <motion.div
                            key="speech-bubble"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ 
                                overflow: 'visible',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none'
                            }}
                        >
                            <SpeechBubbleScene 
                                message={displayMessage} 
                                isExiting={isExiting} 
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProfileImage; 