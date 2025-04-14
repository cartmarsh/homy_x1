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
            className={`relative flex flex-col items-center justify-center min-h-[70vh] p-4 sm:p-6 md:p-8 overflow-visible ${className}`}
            style={{ transformStyle: 'preserve-3d', overflow: 'visible' }}
        >
            {/* Title above image */}
            <motion.h1
                {...titleAnimation}
                className="w-[85vw] sm:w-[80vw] md:w-[75vw] text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 sm:mb-12 text-center font-primary tracking-wide"
                style={{
                    transform: 'translateZ(40px)',
                    textShadow: '0.225rem 0.225rem 0.35rem rgba(0, 0, 0, 0.7)'
                }}
            >
                {title}
            </motion.h1>

            {/* Profile Image - Centered */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-8 sm:mb-12 overflow-visible">
                <ProfileImage 
                    imageSrc={profileImage}
                    alt="Profile Picture"
                    className="transform-none"
                    
                />
            </div>

            {/* Subtitle below image */}
            <motion.p
                {...subtitleAnimation}
                className="w-[57vw] sm:w-[90vw] md:w-[90vw] text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] lg:w-[57vw] text-white/90 mb-8 sm:mb-10 text-center font-secondary"
                
                style={{
                    transform: 'translateZ(20px)',
                    textShadow: '0.225rem 0.225rem 0.35rem rgba(0, 0, 0, 0.7)'
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
                    className="text-3xl sm:text-4xl px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 
                             hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full 
                             transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-secondary"
                >
                    {buttonText}
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default HeroContent; 