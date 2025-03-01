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
        <ContentSection id={id} className={className} isHero={true}>
            <div 
                ref={divRef}
                className="w-full h-full flex items-center justify-center"
                onMouseMove={handleMouseMove}
            >
                {/* Center container with max width */}
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                    {/* Text content - centered on mobile, left-aligned on larger screens */}
                    <div className="w-full text-center md:text-left space-y-8 mb-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight"
                                style={{ transform: `translate3d(${offsetX * 0.8}px, ${offsetY * 0.8}px, 0px)` }}>
                                Dominik
                            </h1>

                            <h2 className="text-2xl sm:text-3xl text-gray-700 tracking-wide"
                                style={{ transform: `translate3d(${offsetX * 0.6}px, ${offsetY * 0.6}px, 0px)` }}>
                                Web Developer & Designer
                            </h2>

                            <p className="text-lg sm:text-xl text-gray-500"
                                style={{ transform: `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0px)` }}>
                                Crafting Interactive Experiences
                            </p>
                        </div>
                    </div>

                    {/* Profile image and button in a row */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex justify-center md:justify-start">
                            <img
                                src={profilePic}
                                alt="Dominik's Profile"
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full shadow-xl"
                                style={{
                                    transform: `translate3d(${offsetX}px, ${offsetY}px, 0px)`
                                }}
                            />
                        </div>

                        <div className="flex justify-center md:justify-end mt-8 md:mt-0">
                            <button
                                className={`
                                    retro-button
                                    ${isClicked ? 'clicked' : ''}
                                    ${lightningClass}
                                    whitespace-nowrap
                                    text-base sm:text-lg
                                `}
                                style={{ 
                                    transform: `translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)`,
                                }}
                                onClick={handleClick}
                            >
                                Get in Touch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;