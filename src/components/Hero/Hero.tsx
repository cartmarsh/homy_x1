import React, { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StringAnimation from './StringAnimation';
import AnimatedCTAButton from './AnimatedGetintouchButton';
import AnimatedArrow from './AnimatedArrow';




// Import different image sizes
import profilePicSmall from './../../assets/Profilbild-small.jpg';  // 300w
import profilePicMedium from './../../assets/Profilbild-medium.jpg'; // 600w
import profilePicLarge from './../../assets/Profilbild.jpg';        // 900w

interface HeroProps {
    className?: string;
    children?: React.ReactNode;
}



const Hero: React.FC<HeroProps> = ({ className, children }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);// Add to existing state declarations
    const [showArrow, setShowArrow] = useState(false);
    const [arrowStart, setArrowStart] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [stringCoords, setStringCoords] = useState<Array<{
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        controlPoint1X: number;
        controlPoint1Y: number;
        controlPoint2X: number;
        controlPoint2Y: number;
        buttonX: number;
        buttonY: number;
        delay: number;
        amplitude: number;
    }>>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);

    // Add this handler for the button click
    const handleButtonClick = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setArrowStart({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
            setShowArrow(true);
        }
    };

    // Add this handler for arrow animation completion
    const handleArrowComplete = () => {
        setShowArrow(false);
        window.location.href = '#contact';
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const updateStringCoords = () => {
            const h2Element = document.getElementById('hero-subtitle');
            const pElement = document.getElementById('hero-description');
            const buttonElement = buttonRef.current;

            if (!h2Element || !buttonElement || !pElement) return;

            const h2Rect = h2Element.getBoundingClientRect();
            const pRect = pElement.getBoundingClientRect();
            const buttonRect = buttonElement.getBoundingClientRect();

            // Create strings with banana-like curves
            const newStrings = Array.from({ length: 24 }, (_, index) => {
                const startElement = pRect;
                const verticalOffset = index * 30;

                // Add random horizontal offset (negative values push left)
                const horizontalOffset = -(Math.random() * 100 + 50); // Random value between -50 and -150

                // Start point at element's right border with random offset
                const startX = startElement.right + 20 + horizontalOffset;
                const startY = startElement.top + (startElement.height / 2) + verticalOffset;

                // End point at button
                const endX = buttonRect.left + (buttonRect.width / 10);
                const endY = buttonRect.bottom + (buttonRect.height / 10);

                // Control points for banana curve
                const cp1x = startX + (endX - startX) * 0.2;
                const cp1y = startY - 100 - (index * 15);

                const cp2x = startX + (endX - startX) * 0.8;
                const cp2y = startY - 50 - (index * 15);

                return {
                    startX,
                    startY,
                    endX,
                    endY,
                    controlPoint1X: cp1x,
                    controlPoint1Y: cp1y,
                    controlPoint2X: cp2x,
                    controlPoint2Y: cp2y,
                    buttonX: buttonRect.left + buttonRect.width / 2,
                    buttonY: buttonRect.top + buttonRect.height / 2,
                    delay: index * 0.2,
                    amplitude: 15 + Math.random() * 10
                };
            });

            setStringCoords(newStrings);
        };

        updateStringCoords();
        window.addEventListener('resize', updateStringCoords);
        return () => window.removeEventListener('resize', updateStringCoords);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (isMobile) {
                const position = window.scrollY;
                setScrollPosition(position);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);
        window.addEventListener('scroll', updateNavbarHeight);

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
            window.removeEventListener('scroll', updateNavbarHeight);
        };
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (divRef.current && !isMobile) {
            const rect = divRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMousePosition({ x, y });
        }
    };

    // Calculate parallax offsets
    const offsetX = isMobile ? 0 : (mousePosition.x - (divRef.current?.clientWidth ?? 0) / 1.3) / 20;
    const offsetY = isMobile
        ? scrollPosition / 20  // Scroll-based offset for mobile
        : (mousePosition.y - (divRef.current?.clientHeight ?? 0) / 2) / 20;

    return (
        <section
            ref={divRef}
            className={`
                ${className} 
                relative flex flex-col items-start justify-center 
                min-h-screen h-screen 
                p-8 sm:p-12
                bg-gradient-to-br from-cream via-cream/90 to-cream/50 
                rounded-lg shadow-md sm:shadow-lg 
                mx-auto scroll-snap-start overflow-hidden
            `}
            onMouseMove={!isMobile ? handleMouseMove : undefined}
            style={{
                perspective: '1000px',
                paddingTop: `${navbarHeight}px`,
                marginTop: `${navbarHeight}px`
            }}
            role="region"
            aria-label="Introduction section"
        >
            <div className="pl-[8vw] flex flex-col items-start justify-center relative w-full" style={{ zIndex: 2 }}>
                {/* Portrait Photo Container */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-16"> {/* Reduced margin-bottom */}
                    {!imageLoaded && (
                        <div
                            className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
                            aria-hidden="true"
                        />
                    )}
                    <LazyLoadImage
                        src={profilePicLarge}
                        srcSet={`
                            ${profilePicSmall} 300w,
                            ${profilePicMedium} 600w,
                            ${profilePicLarge} 900w
                        `}
                        sizes="(max-width: 640px) 14rem, 16rem"
                        alt="Dominik - Web Developer and Designer specializing in interactive experiences"
                        className={`
                            rounded-lg w-full h-full object-cover 
                            transition-all duration-500 ease-out
                            ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                        `}
                        style={{
                            transform: `translate3d(${offsetX}px, ${offsetY}px, 0px)`,
                        }}
                        onLoad={() => setImageLoaded(true)}
                        effect="blur"
                        loading="eager"
                        wrapperClassName="w-full h-full"
                    />
                </div>

                {/* Text Content Container */}
                <div className="relative w-full">
                    <h1 id="hero-title"
                        className={`
                            text-8xl sm:text-6xl md:text-6xl font-bold 
                            text-gray-800 mb-4 
                            opacity-80 animate-fadeIn
                            text-left
                            -webkit-text-stroke: 1px black;  // stroke width and color
                            text-shadow: 
                                1px 1px 0 #000, 
                                -1px -1px 0 #000, 
                                1px -1px 0 #000, 
                                -1px 1px 0 #000;  // offset shadows for stroke effect
                        `}
                    >
                        Dominik
                    </h1>

                    <h2 id="hero-subtitle"
                        className={`
                            text-3xl sm:text-4xl text-gray-700 
                            mb-4 opacity-80 animate-slideIn
                            text-left
                        `}
                    >
                        Web Developer & Designer
                    </h2>

                    <p id="hero-description"
                        ref={textRef}
                        className={`
                            text-lg sm:text-xl text-gray-500 
                            mb-8 opacity-80 animate-fadeIn
                            max-w-md leading-relaxed
                            text-left w-full
                        `}
                    >
                        Crafting Interactive Experiences
                    </p>
                </div>

                {/* Mobile button */}
                <div className="block sm:hidden">
                    <AnimatedCTAButton
                        onClick={() => window.location.href = '#contact'}
                        className="
                            [-webkit-text-stroke:_1px_#000]  // offset stroke
                            font-bold
                        "
                        style={{
                            transform: `translate3d(${offsetX * -0.4}px, ${offsetY * -0.4}px, 0px)`
                        }}
                    >
                        Get in Touch
                    </AnimatedCTAButton>
                </div>

                {/* Desktop button */}
                <div className="hidden sm:block">
                    <AnimatedCTAButton
                        ref={buttonRef}
                        onClick={handleButtonClick}
                        className="
                            absolute
                            [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]
                            [-webkit-text-stroke:_1px_#000]  // offset stroke
                            font-bold
                        "
                        style={{
                            right: '-50vw',
                            top: '-40vh',
                            transform: `translate3d(${offsetX * -0.2}px, ${offsetY * -0.2}px, 0px)`,
                            zIndex: 2
                        }}
                    >
                        Get in Touch
                    </AnimatedCTAButton>
                </div>
            </div>
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
                {!isMobile && <StringAnimation strings={stringCoords} />}
            </div>
            {children}
            {showArrow && (
                <AnimatedArrow
                    startPosition={arrowStart}
                    onComplete={handleArrowComplete}
                />
            )}
        </section>
    );
};

export default Hero;