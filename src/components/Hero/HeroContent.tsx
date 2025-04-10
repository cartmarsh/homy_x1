import React from 'react';
import { motion } from 'framer-motion';
import TextBox3D from './TextBox3D';
import useTextAnimation from '../../hooks/useTextAnimation';
import { useScrollObserver } from '../../hooks/useScrollObserver';
import { SECTIONS } from '../../constants/sections';

interface HeroContentProps {
    offsetX: number;
    offsetY: number;
    className?: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
    offsetX,
    offsetY,
    className = ''
}) => {
    const { containerAnimation, buttonAnimation } = useTextAnimation();
    const { scrollToSection } = useScrollObserver(
        SECTIONS,
        () => {}, // We don't need to track active section here
        { threshold: [0.2] } // Slightly different threshold for better trigger timing
    );

    return (
        <motion.div 
            {...containerAnimation}
            className={`w-full flex flex-col items-start justify-start gap-2 sm:gap-4 md:gap-6 z-20 relative px-1 sm:px-2 md:px-4 hero-stacking-fix bg-transparent ${className}`}
        >
            <div className="w-full space-y-2 sm:space-y-4 md:space-y-8">
                <div className="space-y-2 sm:space-y-3 md:space-y-5">
                    <TextBox3D 
                        offsetX={offsetX} 
                        offsetY={offsetY} 
                        intensity={1}
                        className="text-box-width max-w-[90vw] md:max-w-none mx-0"
                    >
                        <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl text-white tracking-tight relative whitespace-normal sm:whitespace-nowrap font-mono">
                            Dominik Hauger
                        </h1>
                    </TextBox3D>

                    <TextBox3D 
                        offsetX={offsetX} 
                        offsetY={offsetY} 
                        intensity={1}
                        glassEffect={{
                            background: 'rgba(255, 255, 255, 0.4)',
                            borderOpacity: 0.5,
                            blur: 5
                        }}
                        className="max-w-[90vw] md:max-w-none mx-0"
                    >
                        <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-4xl text-white whitespace-normal sm:whitespace-nowrap font-mono">
                            Crafting Interactive Experiences
                        </h3>
                    </TextBox3D>

                    <TextBox3D 
                        offsetX={offsetX} 
                        offsetY={offsetY} 
                        intensity={1}
                        glassEffect={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderOpacity: 0.3,
                            blur: 5
                        }}
                        className="max-w-[90vw] md:max-w-none mx-0"
                    >
                        <h2 className="text-base xs:text-lg sm:text-xl lg:text-3xl text-gray-300 tracking-wide whitespace-normal sm:whitespace-nowrap font-mono">
                            Web Developer & Designer
                        </h2>
                    </TextBox3D>
                </div>
                
                <motion.div 
                    {...buttonAnimation}
                    className="w-full flex justify-start items-start pt-2 sm:pt-4 md:pt-2"
                >
                    <div 
                        className="relative inline-block px-2 py-2 rounded-lg backdrop-blur-sm bg-transparent button-container"
                        style={{ 
                            transform: `perspective(1000px) rotateX(${offsetY * -0.05}deg) rotateY(${offsetX * 0.05}deg) translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <button
                            className="retro-button group"
                            onClick={() => {
                                //triggerClickEffect();
                                scrollToSection('contact');
                            }}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="transition-transform group-hover:rotate-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <p
                             style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#2e2b2a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontFamily: 'monospace',
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                textAlign: 'center',
                                lineHeight: '1.2',
                                marginTop: '0.5em',
                                
                             }}
                            >Get in Touch</p>
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroContent; 