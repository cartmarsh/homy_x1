import React, { useRef, useState, useCallback } from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/Profilbild.jpg';

interface HeroProps {
    className?: string;
    id?: string;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [lightningClass, setLightningClass] = useState('');

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMousePosition({ x, y });
        }
    };

    const offsetX = (mousePosition.x - (divRef.current?.clientWidth ?? 0) / 1.3) / 20;
    const offsetY = (mousePosition.y - (divRef.current?.clientHeight ?? 0) / 2) / 20;

    const handleClick = useCallback(() => {
        const directions = ['lightning-1', 'lightning-2', 'lightning-3', 'lightning-4'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        
        setIsClicked(true);
        setLightningClass(randomDirection);
        
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        
        // Reset animation classes
        setTimeout(() => {
            setIsClicked(false);
            setLightningClass('');
        }, 600);
    }, []);

    return (
        <ContentSection id={id} bgColor='bg-lemon' className={className}>
            <div 
                ref={divRef}
                className="w-full h-full flex items-center justify-center"
                onMouseMove={handleMouseMove}
            >
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    {/* Left Side - Text and Image */}
                    <div className="w-full md:w-2/3 space-y-6 md:space-y-8 text-center">
                        <div className="space-y-2 md:space-y-3">
                            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight"
                                style={{ transform: `translate3d(${offsetX * 0.8}px, ${offsetY * 0.8}px, 0px)` }}>
                                Dominik Hauger
                            </h1>

                            <h2 className="text-xl xs:text-2xl sm:text-3xl text-gray-700 tracking-wide"
                                style={{ transform: `translate3d(${offsetX * 0.6}px, ${offsetY * 0.6}px, 0px)` }}>
                                Web Developer & Designer
                            </h2>

                            <p className="text-base xs:text-lg sm:text-xl text-gray-500"
                                style={{ transform: `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0px)` }}>
                                Crafting Interactive Experiences
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <img
                                src={profilePic}
                                alt="Dominik's Profile"
                                className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full shadow-xl"
                                style={{
                                    transform: `translate3d(${offsetX}px, ${offsetY}px, 0px)`
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Side - Button */}
                    <div className="w-full md:w-1/3 flex justify-end items-center md:items-start pt-4 md:pt-0">
                        <button
                            className={`
                                retro-button
                                ${isClicked ? 'clicked' : ''}
                                ${lightningClass}
                                whitespace-nowrap
                                text-sm xs:text-base
                                relative
                                overflow-hidden
                                group
                                transition-all
                                hover:scale-105
                                active:scale-95
                                flex items-center gap-2
                            `}
                            style={{ 
                                transform: `translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)`,
                            }}
                            onClick={handleClick}
                        >
                            <span className="retro-button-glow absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"></span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 xs:h-5 xs:w-5 transition-transform group-hover:rotate-12" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Get in Touch
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
                        </button>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;