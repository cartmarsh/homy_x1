import React, { useRef, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/Profilbild.jpg';
import './Hero.css';
import { throttle } from 'lodash';

// Import p5 dynamically to avoid SSR issues
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

interface HeroProps {
    className?: string;
    id?: string;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [lightningClass, setLightningClass] = useState('');
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [glitchIntensity, setGlitchIntensity] = useState(0);

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (divRef.current) {
                setDimensions({
                    width: divRef.current.offsetWidth,
                    height: divRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Throttled glitch effect
    useEffect(() => {
        const triggerGlitch = throttle(() => {
            if (Math.random() > 0.75) {
                setGlitchIntensity(Math.random() * 15);
                setTimeout(() => setGlitchIntensity(0), 200);
            }
        }, 400);

        const glitchInterval = setInterval(triggerGlitch, 400);
        return () => {
            clearInterval(glitchInterval);
            triggerGlitch.cancel();
        };
    }, []);

    // Throttled mouse move handler
    const handleMouseMove = useCallback(
        throttle((event: React.MouseEvent<HTMLDivElement>) => {
            if (divRef.current) {
                const rect = divRef.current.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                setMousePosition({ x, y });
            }
        }, 16), // ~60fps
        []
    );

    const offsetX = (mousePosition.x - (divRef.current?.clientWidth ?? 0) / 1.3) / 20;
    const offsetY = (mousePosition.y - (divRef.current?.clientHeight ?? 0) / 2) / 20;

    const handleClick = useCallback(() => {
        const directions = ['lightning-1', 'lightning-2', 'lightning-3', 'lightning-4'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        
        setIsClicked(true);
        setLightningClass(randomDirection);
        setGlitchIntensity(8); // Increase glitch on click
        
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        
        // Reset animation classes
        setTimeout(() => {
            setIsClicked(false);
            setLightningClass('');
            setGlitchIntensity(0);
        }, 600);
    }, []);

    // p5.js sketch setup
    const setup = (p5: any, canvasParentRef: Element) => {
        p5.createCanvas(dimensions.width || 300, dimensions.height || 200).parent(canvasParentRef);
        p5.pixelDensity(1);
    };

    // p5.js draw function
    const draw = (p5: any) => {
        p5.clear();
        
        // Retro grid background
        drawRetroGrid(p5);
        
        // Scanlines effect
        drawScanlines(p5);
        
        // Random noise/static effect
        if (glitchIntensity > 0) {
            drawNoise(p5, glitchIntensity);
        }
    };

    // Draw retro grid
    const drawRetroGrid = (p5: any) => {
        p5.push();
        
        // Background grid color
        p5.stroke(30, 30, 80, 40);
        p5.strokeWeight(1);
        
        // Perspective vanishing point
        const vanishX = p5.width / 2;
        const vanishY = p5.height / 2;
        
        // Horizontal lines with perspective
        const gridSizeY = 30;
        for (let y = 0; y < p5.height * 2; y += gridSizeY) {
            const y1 = p5.height / 2 - y;
            const y2 = p5.height / 2 + y;
            
            // Lines above horizon
            if (y > 0) {
                const perspectiveX1 = p5.map(y, 0, p5.height, vanishX, 0);
                const perspectiveX2 = p5.map(y, 0, p5.height, vanishX, p5.width);
                p5.line(perspectiveX1, y1, perspectiveX2, y1);
            }
            
            // Lines below horizon
            if (y > 0) {
                const perspectiveX1 = p5.map(y, 0, p5.height, vanishX, 0);
                const perspectiveX2 = p5.map(y, 0, p5.height, vanishX, p5.width);
                p5.line(perspectiveX1, y2, perspectiveX2, y2);
            }
        }
        
        // Vertical lines with perspective
        const gridSizeX = 60;
        for (let x = 0; x < p5.width * 2; x += gridSizeX) {
            // Lines to the left of vanishing point
            if (x > 0) {
                const x1 = vanishX - x;
                const perspectiveY1 = p5.map(x, 0, p5.width, vanishY, 0);
                const perspectiveY2 = p5.map(x, 0, p5.width, vanishY, p5.height);
                p5.line(x1, perspectiveY1, x1, perspectiveY2);
            }
            
            // Lines to the right of vanishing point
            if (x > 0) {
                const x2 = vanishX + x;
                const perspectiveY1 = p5.map(x, 0, p5.width, vanishY, 0);
                const perspectiveY2 = p5.map(x, 0, p5.width, vanishY, p5.height);
                p5.line(x2, perspectiveY1, x2, perspectiveY2);
            }
        }
        
        // Draw horizon line
        p5.stroke(60, 20, 120, 60);
        p5.strokeWeight(2);
        p5.line(0, vanishY, p5.width, vanishY);
        
        p5.pop();
    };

    // Draw scanlines effect
    const drawScanlines = (p5: any) => {
        p5.push();
        p5.noStroke();
        
        for (let y = 0; y < p5.height; y += 4) {
            p5.fill(0, 0, 0, 5);
            p5.rect(0, y, p5.width, 1);
        }
        
        p5.pop();
    };

    // Draw noise/static effect
    const drawNoise = (p5: any, intensity: number) => {
        p5.push();
        p5.noStroke();
        
        for (let i = 0; i < intensity * 60; i++) {
            const x = p5.random(p5.width);
            const y = p5.random(p5.height);
            const size = p5.random(1, 3);
            p5.fill(255, 255, 255, p5.random(10, 60));
            p5.rect(x, y, size, size);
        }
        
        p5.pop();
    };

    // Replace the current preventOverscroll with a more comprehensive solution
    useEffect(() => {
        // Function to handle scroll events and enforce proper snapping
        const handleScroll = () => {
            // Get all sections
            const sections = document.querySelectorAll('section');
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            
            // Calculate viewport height minus navbar
            const viewportHeight = window.innerHeight - navbarHeight;
            
            // Find which section should be in view based on scroll position
            const scrollPosition = window.scrollY;
            let targetSection = null;
            let minDistance = Infinity;
            
            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
                const distance = Math.abs(scrollPosition - sectionTop);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    targetSection = section;
                }
            });
            
            // If we're close to a section but not exactly on it, snap to it
            if (targetSection && minDistance < viewportHeight / 3) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                // Only snap if we're not already in a smooth scroll operation
                if (!document.body.classList.contains('scrolling')) {
                    document.body.classList.add('scrolling');
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Remove the scrolling class after animation completes
                    setTimeout(() => {
                        document.body.classList.remove('scrolling');
                    }, 500);
                }
            }
        };
        
        // Throttle the scroll handler to improve performance
        const throttledScrollHandler = throttle(handleScroll, 200);
        
        window.addEventListener('scroll', throttledScrollHandler);
        
        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
        };
    }, []);

    return (
        <ContentSection id={id} bgColor='bg-lemon' className={className}>
            <div 
                ref={divRef}
                className="w-full h-full flex items-center justify-center relative"
                onMouseMove={handleMouseMove}
            >
                {/* P5 Canvas - Ensure pointer-events-none is applied */}
                <div 
                    ref={canvasRef} 
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ pointerEvents: 'none' }}
                >
                    {dimensions.width > 0 && (
                        <Sketch setup={setup} draw={draw} />
                    )}
                </div>
                
                {/* Ensure content has higher z-index */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 z-20 relative px-4">
                    {/* Text content */}
                    <div className="w-full md:w-1/2 lg:w-2/5 space-y-6 md:space-y-8 text-center md:text-left">
                        <div className="space-y-4 md:space-y-5">
                            {/* Name with glass effect */}
                            <div 
                                className="glass-box relative mx-auto md:mx-0 inline-block px-6 py-3 backdrop-blur-sm bg-white/20 shadow-lg border border-white/30"
                                style={{ 
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.15}deg) rotateY(${offsetX * -0.15}deg) translate3d(${offsetX * 0.8}px, ${offsetY * 0.8}px, 0px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <h1 className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-gray-800 tracking-tight relative retro-text ${glitchIntensity > 0 ? 'glitch' : ''}`}>
                                    Dominik Hauger
                                </h1>
                            </div>

                            {/* Title with glass effect */}
                            <div 
                                className="glass-box relative mx-auto md:mx-0 inline-block px-5 py-1 backdrop-blur-sm bg-white/15 shadow-md border border-white/25"
                                style={{ 
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.1}deg) rotateY(${offsetX * -0.1}deg) translate3d(${offsetX * 0.6}px, ${offsetY * 0.6}px, 0px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <h2 className={`text-xl xs:text-2xl sm:text-3xl text-gray-700 tracking-wide retro-subtitle ${glitchIntensity > 0 ? 'glitch-subtle' : ''}`}>
                                    Web Developer & Designer
                                </h2>
                            </div>

                            {/* Subtitle with glass effect */}
                            <div 
                                className="glass-box relative mx-auto md:mx-0 inline-block px-4 py-1 backdrop-blur-sm bg-white/10 shadow-sm border border-white/20"
                                style={{ 
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.05}deg) rotateY(${offsetX * -0.05}deg) translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <p className="text-base xs:text-lg sm:text-xl text-gray-500 retro-text-small">
                                    Crafting Interactive Experiences
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile image - positioned at ~20% from left on desktop */}
                    <div className="w-full flex justify-center md:justify-start md:absolute md:left-[110%] md:top-[90%] md:transform md:-translate-x-1/2 md:-translate-y-1/2 relative">
                        <div className="relative retro-image-container mt-12 md:mt-0">
                            <img
                                src={profilePic}
                                alt="Dominik's Profile"
                                className={`w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-lg shadow-xl object-cover ${glitchIntensity > 2 ? 'profile-glitch' : ''}`}
                                style={{
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.08}deg) rotateY(${offsetX * -0.08}deg) translate3d(${offsetX * 0.5}px, ${offsetY * 0.5}px, 0px)`
                                }}
                            />
                            <div className="absolute inset-0 crt-overlay rounded-lg pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right Side - Button */}
                    <div className="w-full md:w-auto flex justify-center md:justify-end items-center pt-16 md:pt-0 md:absolute md:right-6 md:top-8 z-20">
                        <div 
                            className="relative inline-block px-2 py-2 rounded-lg backdrop-blur-sm bg-transparent"
                            style={{ 
                                transform: `perspective(1000px) rotateX(${offsetY * -0.05}deg) rotateY(${offsetX * 0.05}deg) translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
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
            </div>
        </ContentSection>
    );
};

export default Hero;