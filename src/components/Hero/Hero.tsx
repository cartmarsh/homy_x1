import React, { useState, useEffect, useRef } from 'react';
import profilePic from './../../assets/Profilbild.jpg';

interface HeroProps {
    className?: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ className, children }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left; // x position within the element.
            const y = event.clientY - rect.top;  // y position within the element.
            setMousePosition({ x, y });
        }
    };

    // Calculate parallax offsets
    const offsetX = (mousePosition.x - (divRef.current?.clientWidth ?? 0) / 1.3) / 20;
    const offsetY = (mousePosition.y - (divRef.current?.clientHeight ?? 0) / 2) / 20;

    return (
        <div 
            ref={divRef} 
            className={`${className} flex flex-col items-center justify-center p-6 sm:p-8 bg-cream rounded-lg shadow-md sm:shadow-lg mx-auto`} 
            onMouseMove={handleMouseMove}
            style={{ perspective: '1000px' }} // Optional: Add perspective for more depth
        >
            <img
                src={profilePic}
                alt="Dominik's Profile"
                className="hero-image rounded-full w-34 h-34 sm:w-36 sm:h-36 mb-4"
                style={{
                    position: 'relative',
                    top: '60%',
                    left: '-30%',
                    transform: 'translateY(-50%) translate3d(${offsetX}px, ${offsetY}px, 0px)'
                }}
            />

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2" style={{ transform: `translate3d(${offsetX * 0.8}px, ${offsetY * 0.8}px, 0px)` }}>
                Dominik
            </h1>

            <h2 className="text-xl sm:text-2xl text-gray-700 mb-2" style={{ transform: `translate3d(${offsetX * 0.6}px, ${offsetY * 0.6}px, 0px)`, width: '50%' }}>
                Web Developer & Designer
            </h2>

            <p className="text-sm sm:text-md text-center text-gray-500 mb-4 sm:mb-6" style={{ transform: `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0px)`, width: '50%' }}>
                Crafting Interactive Experiences
            </p>
            <button
                className="bg-softRed text-white px-4 sm:px-6 py-2 rounded-md border-0 border-lightTeal hover:bg-lavenderMist hover:text-gray-800 transition-colors duration-200"
                style={{ position: 'absolute', right: '10%', top: '70%', transform: `translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)` }}
                onClick={() => window.location.href = '#contact'}
            >
                Get in Touch
            </button>
            {children}
        </div>
    )
}

export default Hero;