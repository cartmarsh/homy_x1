import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useProfileAnimation from '../../hooks/useProfileAnimation';
import useProfileHoverEffect from '../../hooks/useProfileHoverEffect';
import useTimeBasedGreeting from '../../hooks/useTimeBasedGreeting';
import SpeechBubbleScene from '../../components/Hero/SpeechBubble';
import useImageLoad from '../../hooks/useImageLoad';

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

    // Use image loading hook
    const { isLoading, hasError, handleImageLoad, handleImageError } = useImageLoad({
        src: imageSrc,
        preload: true
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
                {/* Loading state */}
                {isLoading && (
                    <div className="w-36 h-36 xs:w-48 xs:h-48 sm:w-54 sm:h-54 md:w-60 md:h-60 lg:w-66 lg:h-66 rounded-lg flex items-center justify-center bg-purple-900/20 backdrop-blur-sm animate-pulse">
                        <div className="text-center">
                            <div className="inline-block w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}
                
                {/* Error state */}
                {hasError && (
                    <div className="w-36 h-36 xs:w-48 xs:h-48 sm:w-54 sm:h-54 md:w-60 md:h-60 lg:w-66 lg:h-66 rounded-lg flex items-center justify-center bg-purple-900/40 backdrop-blur-sm">
                        <div className="text-center text-white p-4">
                            <svg className="w-10 h-10 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                )}
                
                <motion.img
                    src={imageSrc}
                    alt={alt}
                    className={`w-36 h-36 xs:w-48 xs:h-48 sm:w-54 sm:h-54 md:w-60 md:h-60 lg:w-66 lg:h-66 rounded-lg shadow-xl object-cover transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    animate={{ scale }}
                    transition={{ duration: 0.3 }}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
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