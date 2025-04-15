import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/Button/Button';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import ProfileImage from './ProfileImage';
import HeroBackground from './HeroBackground';

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
            className={`relative flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 ${className}`}
        >
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <HeroBackground />
            </div>

            <div className="flex flex-col items-center max-w-3xl mx-auto w-full">
                {/* Title */}
                <motion.h1
                    {...titleAnimation}
                    className="text-white text-center font-primary font-bold tracking-wide mb-6 sm:mb-8 md:mb-10"
                    style={{
                        textShadow: '0.225rem 0.225rem 0.35rem rgba(0, 0, 0, 0.7)',
                        fontSize: 'clamp(1.75rem, 4vw, 3.5rem)'
                    }}
                >
                    {title}
                </motion.h1>

                {/* Profile Image Container */}
                <div className="flex justify-center items-center w-full mb-8 sm:mb-12 md:mb-16">
                    <div className="relative w-32 h-32 xs:w-37 xs:h-37 sm:w-46 sm:h-46 md:w-64 md:h-64 lg:w-72 lg:h-72">
                        <ProfileImage 
                            imageSrc={profileImage}
                            alt="Profile Picture"
                        />
                    </div>
                </div>

                {/* Content below image */}
                <div className="flex flex-col items-center mt-0 sm:mt-8 md:mt-14 gap-6 sm:gap-8 md:gap-10">
                    {/* Subtitle */}
                    <motion.p
                        {...subtitleAnimation}
                        className="text-white/90 text-center font-primary max-w-2xl"
                        style={{
                            textShadow: '0.225rem 0.225rem 0.35rem rgba(0, 0, 0, 0.7)',
                            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)'
                        }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Button */}
                    <motion.div {...buttonAnimation}>
                        <Button
                            onClick={onButtonClick}
                            className="font-primary px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 font-semibold rounded-full 
                                     transition-all duration-300 hover:scale-105"
                            style={{
                                fontSize: 'clamp(0.875rem, 1.25vw, 1.25rem)',
                                background: 'linear-gradient(240deg, rgb(224, 134, 17), hsla(309, 79.80%, 57.30%, 0.70))',
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
                </div>
            </div>
        </motion.div>
    );
};

export default HeroContent; 