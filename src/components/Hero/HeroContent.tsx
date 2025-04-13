import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import ProfileImage from './ProfileImage';

interface HeroContentProps {
    title: string;
    subtitle: string;
    buttonText: string;
    onButtonClick: () => void;
    className?: string;
    profileImage: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
    title,
    subtitle,
    buttonText,
    onButtonClick,
    className = '',
    profileImage
}) => {
    const { ref, containerAnimation, titleAnimation, subtitleAnimation, buttonAnimation } = useHeroAnimation();

    return (
        <motion.div
            ref={ref}
            {...containerAnimation}
            className={`relative flex flex-col items-center justify-center min-h-[70vh] p-8 ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Title above image */}
            <motion.h1
                {...titleAnimation}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 text-center"
                style={{
                    transform: 'translateZ(40px)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
            >
                {title}
            </motion.h1>

            {/* Profile Image - Centered */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-8 sm:mb-12">
                <ProfileImage 
                    imageSrc={profileImage}
                    alt="Profile Picture"
                    className="transform-none"
                />
            </div>

            {/* Subtitle below image */}
            <motion.p
                {...subtitleAnimation}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 sm:mb-8 text-center max-w-2xl px-4"
                style={{
                    transform: 'translateZ(20px)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                }}
            >
                {subtitle}
            </motion.p>

            {/* Button at bottom */}
            <motion.div 
                {...buttonAnimation} 
                style={{ transform: 'translateZ(60px)' }}
            >
                <Button
                    onClick={onButtonClick}
                    className="text-lg sm:text-xl px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 
                             hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full 
                             transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    {buttonText}
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default HeroContent; 