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
            className={`relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-[calc(100%-6rem)] max-w-7xl mx-auto p-4 sm:p-6 md:p-8 overflow-visible ${className}`}
            style={{ transformStyle: 'preserve-3d', overflow: 'visible' }}
        >
            {/* Title above image */}
            <motion.h1
                {...titleAnimation}
                className="w-full px-4 font-bold text-white mb-8 sm:mb-12 text-center font-primary tracking-wide"
                style={{
                    transform: 'translateZ(40px)',
                    textShadow: '0.225rem 0.225rem 0.35rem rgba(0, 0, 0, 0.7)',
                    fontSize: 'clamp(2rem, 5vw, 4.5rem)'
                }}
            >
                {title}
            </motion.h1>

            {/* Profile Image - Centered */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mb-8 sm:mb-12 overflow-visible">
                <ProfileImage 
                    imageSrc={profileImage}
                    alt="Profile Picture"
                    className="transform-none"
                />
            </div>

            {/* Subtitle below image */}
            <motion.p
                {...subtitleAnimation}
                className="w-full px-4 text-white/90 mb-8 sm:mb-10 text-center font-primary"
                style={{
                    transform: 'translateZ(20px)',
                    textShadow: '0.225rem 0.225rem 0.35rem rgba(0, 0, 0, 0.7)',
                    fontSize: 'clamp(1.125rem, 2vw, 2rem)'
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
                    className="font-primary px-8 sm:px-12 py-3 sm:py-4 font-semibold rounded-full 
                             transition-all duration-300 hover:scale-105"
                    style={{
                        fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                        background: 'linear-gradient(240deg, rgba(199, 155, 98, 1), hsla(308, 30.00%, 47.60%, 0.7))',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: `
                            0 0.5rem 1.5rem rgba(0, 0, 0, 0.1),
                            inset 0 0.125rem 0.25rem rgba(255, 255, 255, 0.1),
                            inset 0 -0.125rem 0.25rem rgba(0, 0, 0, 0.1)
                        `,
                        color: '#34355e',
                        textShadow: '2px 2px 2px rgba(208, 179, 199, 0.4)'
                    }}
                >
                    {buttonText}
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default HeroContent; 