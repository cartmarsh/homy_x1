import React, { useState, useRef, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
    isHero?: boolean;
    isPortfolio?: boolean;
    bgColor?: 'bg-cream' | 'bg-peach' | 'bg-gray-100' | 'bg-mint' | 'bg-sky' | 'bg-lemon' | 'bg-coral' | 'bg-lilac' | 'bg-transparent';
    isLastSection?: boolean;
}

// Maximum distance the card can shift on mouse movement in px
const MAX_SHIFT = 8;
// Duration of scroll animation in ms
const SCROLL_DURATION = 800;

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id,
    isHero = false,
    isPortfolio = false,
    bgColor = 'bg-cream',
    isLastSection = false
}) => {
    const [shiftX, setShiftX] = useState(0);
    const [shiftY, setShiftY] = useState(0);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Set isClient to true when component mounts on client
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Calculate navbar height on mount and window resize
        const calculateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setNavbarHeight(navbar.getBoundingClientRect().height);
            }
        };

        // Only run on client-side
        if (isClient) {
            // Use requestAnimationFrame to ensure DOM is fully rendered
            requestAnimationFrame(() => {
                calculateNavbarHeight();
            });
            
            window.addEventListener('resize', calculateNavbarHeight);
            
            return () => {
                window.removeEventListener('resize', calculateNavbarHeight);
            };
        }
    }, [isClient]);

    // Prevent scrolling in portfolio sections - enhanced version
    useEffect(() => {
        if (isPortfolio) {
            if (sectionRef.current) {
                // Disable wheel scrolling
                const handleWheel = (e: WheelEvent) => {
                    // Prevent scrolling within the portfolio section
                    if (e.target && sectionRef.current?.contains(e.target as Node)) {
                        e.preventDefault();
                    }
                };
                
                // Disable touch scrolling
                const handleTouchMove = (e: TouchEvent) => {
                    if (e.target && sectionRef.current?.contains(e.target as Node)) {
                        e.preventDefault();
                    }
                };
                
                // Add event listeners with passive: false to allow preventDefault
                window.addEventListener('wheel', handleWheel, { passive: false });
                window.addEventListener('touchmove', handleTouchMove, { passive: false });
                
                // Apply CSS to hide scrollbars on all child elements
                if (contentRef.current) {
                    const allScrollableElements = contentRef.current.querySelectorAll('*');
                    allScrollableElements.forEach((element) => {
                        if (element instanceof HTMLElement) {
                            element.style.overflow = 'hidden';
                            // Use proper TypeScript property access
                            element.style.setProperty('scrollbar-width', 'none');  // Firefox
                            element.style.setProperty('-ms-overflow-style', 'none'); // IE/Edge
                        }
                    });
                }
                
                return () => {
                    window.removeEventListener('wheel', handleWheel);
                    window.removeEventListener('touchmove', handleTouchMove);
                };
            }
        }
    }, [isPortfolio, isClient]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sectionRef.current) return;
        
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distanceX = (e.clientX - centerX) / (rect.width / 2);
        const distanceY = (e.clientY - centerY) / (rect.height / 2);
        
        // Apply shift with a maximum limit
        setShiftX(distanceX * MAX_SHIFT);
        setShiftY(distanceY * MAX_SHIFT);
    };

    // Enhanced smooth scrolling with easing
    const scrollToElement = (element: Element) => {
        if (!element || isScrolling) return;
        
        setIsScrolling(true);
        
        const startPosition = window.pageYOffset;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;
        
        // Easing function for smooth acceleration and deceleration
        const easeInOutCubic = (t: number) => 
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        const animateScroll = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / SCROLL_DURATION, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (timeElapsed < SCROLL_DURATION) {
                requestAnimationFrame(animateScroll);
            } else {
                setIsScrolling(false);
            }
        };
        
        requestAnimationFrame(animateScroll);
    };

    const handleScrollClick = () => {
        const nextSection = document.getElementById(id || '')?.nextElementSibling;
        if (nextSection) {
            scrollToElement(nextSection);
        }
    };

    // Generate no-scrollbar CSS styles as a string
    const noScrollbarStyles = `
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    `;

    return (
        <section 
            id={id}
            ref={sectionRef}
            className={`
                relative
                w-full
                flex justify-center
                scroll-mt-[${navbarHeight}px]
                snap-start
                ${className}
            `}
            style={{ 
                minHeight: isClient ? `calc(100vh - ${navbarHeight / 16}rem)` : '100vh', 
                marginTop: isClient ? `${navbarHeight / 16}rem` : '0',
            }}
        >
            <div 
                className={`
                    w-[98%] sm:w-[96%] md:w-[94%]
                    min-h-[440px] xs:min-h-[484px] sm:min-h-[528px]
                    ${bgColor} retro-card
                    top-[5%]
                    flex justify-center items-center
                    rounded-lg
                    transition-transform duration-300 ease-out
                    max-w-[1800px]
                    max-h-[80vh]
                    relative
                    my-6
                    overflow-hidden
                `}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <div 
                    ref={contentRef}
                    className={`
                        w-full
                        h-full
                        flex flex-col
                        mx-auto
                        retro-scroll
                        rounded-lg
                        ${isHero 
                          ? 'p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16' 
                          : 'p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16'}
                        max-w-[1800px]
                        ${isPortfolio ? 'overflow-hidden no-scrollbar' : 'overflow-x-hidden overflow-y-auto'}
                        bg-transparent
                    `}
                    style={isPortfolio ? {
                        WebkitOverflowScrolling: 'touch',
                    } : {}}
                >
                    {children}
                </div>
                
                {/* Background gradient that covers entire card */}
                {isHero && (
                    <>
                        <div className="absolute inset-0 z-0" style={{
                            background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1b69 50%, #1a0f3c 100%)',
                            borderRadius: 'inherit'
                        }}></div>
                        
                        {/* Grid pattern overlay - subtle version that doesn't compete with P5 animation */}
                        <div 
                            className="absolute inset-0 z-0 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(rgba(30, 30, 80, 0.2) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(30, 30, 80, 0.2) 1px, transparent 1px)
                                `,
                                backgroundSize: '30px 30px',
                                opacity: 0.3,
                                borderRadius: 'inherit'
                            }}
                        ></div>
                        
                        {/* Vignette effect */}
                        <div className="absolute inset-0 z-0 pointer-events-none" style={{ 
                            background: 'radial-gradient(circle at center, transparent 30%, rgba(26, 15, 60, 0.6) 100%)',
                            borderRadius: 'inherit'
                        }}></div>
                    </>
                )}
            </div>

            {!isLastSection && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10">
                    <button 
                        onClick={handleScrollClick}
                        className="p-2 transition-all duration-300 hover:translate-y-1 bg-white/30 hover:bg-white/40 rounded-full shadow-lg hover:shadow-xl"
                        aria-label="Scroll to next section"
                        disabled={isScrolling}
                    >
                        <svg 
                            width="40" 
                            height="40" 
                            viewBox="2 2 20 20" 
                            className="fill-current text-gray-600 hover:text-gray-800 transition-colors duration-300"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Add styles to hide scrollbars in portfolio sections */}
            {isPortfolio && isClient && (
                <style dangerouslySetInnerHTML={{ __html: noScrollbarStyles }} />
            )}
        </section>
    );
};

export default ContentSection; 