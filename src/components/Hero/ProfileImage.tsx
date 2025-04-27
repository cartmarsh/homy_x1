import React from 'react';
import { motion } from 'framer-motion';
import useProfileAnimation from '../../hooks/useProfileAnimation';
import useProfileHoverEffect from '../../hooks/useProfileHoverEffect';
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
    className = ''
}) => {
    const { containerAnimation } = useProfileAnimation();
    const { 
        scale, 
        handleMouseEnter, 
        handleMouseLeave 
    } = useProfileHoverEffect({
        exitDelay: 2500,
        scaleAmount: 1.05
    });

    // Use image loading hook with higher resolution values
    const { isLoading, hasError, handleImageLoad, handleImageError, optimizedSrc } = useImageLoad({
        src: imageSrc,
        preload: true,
        maxWidth: 1200,
        maxHeight: 1200
    });

    return (
        <motion.div
            {...containerAnimation}
            className={`relative overflow-visible ${className}`}
        >
            <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Loading state */}
                {isLoading && (
                    <div className="absolute inset-0 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 border-3 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                    </div>
                )}
                
                {/* Error state */}
                {hasError && (
                    <div className="absolute inset-0 rounded-full flex items-center justify-center">
                        <div className="text-red-500">
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                )}
                
                <motion.div
                    className="relative rounded-xl overflow-visible"
                    animate={{ scale }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.img
                        src={optimizedSrc}
                        alt={alt}
                        className={`w-full h-full object-cover rounded-xl transition-all duration-300
                                  ${isLoading ? 'opacity-0' : 'opacity-100'}
                                  max-w-[80vw] sm:max-w-[50vw] md:max-w-none
                                  w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none rounded-xl"></div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ProfileImage; 