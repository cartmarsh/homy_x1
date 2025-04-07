import React from 'react';
import { motion } from 'framer-motion';
import TextBox3D from './TextBox3D';
import useTextAnimation from '../../hooks/useTextAnimation';

interface HeroContentProps {
    offsetX: number;
    offsetY: number;
    glitchIntensity: number;
    triggerClickEffect: () => void;
    className?: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
    offsetX,
    offsetY,
    glitchIntensity,
    triggerClickEffect,
    className = ''
}) => {
    const { containerAnimation, buttonAnimation } = useTextAnimation();

    return (
        <motion.div 
            {...containerAnimation}
            className={`w-full flex flex-col items-start justify-start gap-4 md:gap-6 z-20 relative px-2 md:px-4 hero-stacking-fix bg-transparent ${className}`}
        >
            <div className="w-full space-y-4 md:space-y-8">
                <div className="space-y-3 md:space-y-5">
                    <TextBox3D 
                        offsetX={offsetX} 
                        offsetY={offsetY} 
                        intensity={1}
                        className="text-box-width max-w-[95vw] md:max-w-none mx-0"
                    >
                        <h1 className={`text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight relative retro-text whitespace-nowrap ${glitchIntensity > 0 ? 'glitch' : ''}`}>
                            Dominik Hauger
                        </h1>
                    </TextBox3D>

                    <TextBox3D 
                        offsetX={offsetX} 
                        offsetY={offsetY} 
                        intensity={0.67}
                        glassEffect={{
                            background: 'rgba(255, 255, 255, 0.12)',
                            borderOpacity: 0.25,
                            blur: 5
                        }}
                        className="max-w-[95vw] md:max-w-none mx-0"
                    >
                        <h2 className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl text-white tracking-wide retro-subtitle whitespace-nowrap ${glitchIntensity > 0 ? 'glitch-subtle' : ''}`}>
                            Web Developer & Designer
                        </h2>
                    </TextBox3D>

                    <TextBox3D 
                        offsetX={offsetX} 
                        offsetY={offsetY} 
                        intensity={0.33}
                        glassEffect={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            borderOpacity: 0.2,
                            blur: 5
                        }}
                        className="max-w-[95vw] md:max-w-none mx-0"
                    >
                        <p className="text-lg xs:text-xl sm:text-2xl text-gray-300 retro-text-small whitespace-nowrap">
                            Crafting Interactive Experiences
                        </p>
                    </TextBox3D>
                </div>
                
                <motion.div 
                    {...buttonAnimation}
                    className="w-full flex justify-start items-start pt-4 md:pt-2"
                >
                    <div 
                        className="relative inline-block px-2 py-2 rounded-lg backdrop-blur-sm bg-transparent button-container"
                        style={{ 
                            transform: `perspective(1000px) rotateX(${offsetY * -0.05}deg) rotateY(${offsetX * 0.05}deg) translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <button
                            className="
                                retro-button
                                whitespace-nowrap
                                text-base xs:text-lg
                                relative
                                group
                                transition-transform
                                hover:scale-105
                                active:scale-95
                                flex items-center justify-center gap-2
                                pointer-events-auto
                                px-6 py-3
                            "
                            onClick={triggerClickEffect}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5 xs:h-6 xs:w-6 transition-transform group-hover:rotate-12 pointer-events-none flex-shrink-0 self-center -mt-3" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="pointer-events-none self-center leading-none">GET IN TOUCH</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-200 pointer-events-none"></span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroContent; 