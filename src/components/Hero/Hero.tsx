import React, { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/Profilbild.jpg';
import './Hero.css';
import { throttle } from 'lodash';

// Import p5 dynamically using React.lazy
const Sketch = React.lazy(() => import('react-p5'));

interface HeroProps {
    className?: string;
    id?: string;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const p5InstanceRef = useRef<any>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicked, setIsClicked] = useState(false);
    const [lightningClass, setLightningClass] = useState('');
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [glitchIntensity, setGlitchIntensity] = useState(0);
    const resizeTimeoutRef = useRef<NodeJS.Timeout>();
    const [isClient, setIsClient] = useState(false);

    // Set isClient to true when component mounts on client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Update dimensions on resize and visibility change
    useEffect(() => {
        const updateDimensions = () => {
            if (divRef.current) {
                const newWidth = divRef.current.offsetWidth;
                const newHeight = divRef.current.offsetHeight;
                setDimensions({
                    width: newWidth,
                    height: newHeight,
                });
            }
        };

        const handleResize = () => {
            // Clear the previous timeout
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            
            // Set a new timeout to update dimensions after resize ends
            resizeTimeoutRef.current = setTimeout(() => {
                updateDimensions();
            }, 100);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                updateDimensions();
            }
        };

        // Initial update - only run when in client environment
        if (isClient) {
            // Use requestAnimationFrame to ensure the DOM is fully rendered
            requestAnimationFrame(() => {
                updateDimensions();
            });
        }

        // Add event listeners
        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Cleanup
        return () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
            }
        };
    }, [isClient]); // Run when isClient changes

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
        p5InstanceRef.current = p5;
        // Use a more reliable approach to set initial canvas dimensions
        const width = dimensions.width || (divRef.current?.offsetWidth || window.innerWidth);
        const height = dimensions.height || (divRef.current?.offsetHeight || window.innerHeight);
        const canvas = p5.createCanvas(width, height);
        canvas.parent(canvasParentRef);
        p5.pixelDensity(window.devicePixelRatio);
        canvas.style('display', 'block');
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('left', '0');
    };

    // p5.js draw function
    const draw = (p5: any) => {
        p5.clear();
        
        // Check if canvas needs resizing and parent dimensions have changed
        if (divRef.current && (p5.width !== dimensions.width || p5.height !== dimensions.height)) {
            const newWidth = dimensions.width || divRef.current.offsetWidth;
            const newHeight = dimensions.height || divRef.current.offsetHeight;
            
            if (newWidth > 0 && newHeight > 0) {
                p5.resizeCanvas(newWidth, newHeight, true);
            }
        }
        
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
                const element = targetSection as HTMLElement;
                const targetPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
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
        <ContentSection id={id} bgColor='bg-lemon' className={`${className} overflow-hidden`}>
            <div 
                ref={divRef}
                className="w-full h-full flex items-center justify-center relative overflow-hidden"
                onMouseMove={handleMouseMove}
                style={{ position: 'relative', minHeight: '100%' }}
            >
                {/* P5 Canvas - Ensure pointer-events-none is applied */}
                <div 
                    ref={canvasRef} 
                    className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                    style={{ 
                        pointerEvents: 'none',
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {isClient && dimensions.width > 0 && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Sketch setup={setup} draw={draw} />
                        </Suspense>
                    )}
                </div>
                
                {/* Ensure content has higher z-index */}
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 z-20 relative px-4 hero-stacking-fix">
                    {/* Text content - make it take up more space */}
                    <div className="w-full md:w-2/3 lg:w-1/2 space-y-6 md:space-y-8 text-center md:text-left">
                        <div className="space-y-4 md:space-y-5">
                            {/* Name with glass effect - reduced width */}
                            <div 
                                className="glass-box relative mx-auto md:mx-0 inline-block px-4 py-3 backdrop-blur-sm bg-white/20 shadow-lg border border-white/30 text-box-width"
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
                                className="glass-box relative mx-auto md:mx-0 inline-block px-4 py-1 backdrop-blur-sm bg-white/15 shadow-md border border-white/25"
                                style={{ 
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.1}deg) rotateY(${offsetX * -0.1}deg) translate3d(${offsetX * 0.6}px, ${offsetY * 0.6}px, 0px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <h2 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-gray-700 tracking-wide retro-subtitle ${glitchIntensity > 0 ? 'glitch-subtle' : ''}`}>
                                    Web Developer & Designer
                                </h2>
                            </div>

                            {/* Subtitle with glass effect */}
                            <div 
                                className="glass-box relative mx-auto md:mx-0 inline-block px-4 py-1 backdrop-blur-sm bg-white/10 shadow-sm border border-white/20"
                                style={{ 
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.05}deg) rotateY(${offsetX * -0.05}deg) translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0px)`,
                                    transformStyle: 'preserve-3d',
                                    display: 'block',
                                    width: 'fit-content'
                                }}
                            >
                                <p className="text-xl xs:text-2xl sm:text-3xl text-gray-500 retro-text-small">
                                    Crafting Interactive Experiences
                                </p>
                            </div>
                        </div>
                        
                        {/* Move button to be part of the left content side */}
                        <div className="w-full flex justify-center md:justify-start items-center pt-6 md:pt-2">
                            <div 
                                className="relative inline-block px-2 py-2 rounded-lg backdrop-blur-sm bg-transparent button-container"
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
                                        text-base xs:text-lg
                                        relative
                                        group
                                        transition-transform
                                        hover:scale-105
                                        active:scale-95
                                        flex items-center gap-2
                                        pointer-events-auto
                                        px-6 py-3
                                    `}
                                    onClick={handleClick}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <span className="retro-button-glow absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-5 w-5 xs:h-6 xs:w-6 transition-transform group-hover:rotate-12 pointer-events-none" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="pointer-events-none">GET IN TOUCH</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile image - positioned on the right side */}
                    <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center md:justify-end relative order-1 md:order-none profile-positioning">
                        <div className="relative retro-image-container mt-12 md:mt-0">
                            <img
                                src={profilePic}
                                alt="Dominik's Profile"
                                className={`w-24 h-24 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg shadow-xl object-cover ${glitchIntensity > 2 ? 'profile-glitch' : ''}`}
                                style={{
                                    transform: `perspective(1000px) rotateX(${offsetY * 0.08}deg) rotateY(${offsetX * -0.08}deg) translate3d(${offsetX * 0.5}px, ${offsetY * 0.5}px, 0px)`
                                }}
                            />
                            <div className="absolute inset-0 crt-overlay rounded-lg pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;