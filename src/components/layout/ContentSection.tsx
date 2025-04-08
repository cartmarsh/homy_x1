import React, { useState, useRef, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
    isHero?: boolean;
    bgColor?: 'bg-cream' | 'bg-peach' | 'bg-gray-100' | 'bg-mint' | 'bg-sky' | 'bg-lemon' | 'bg-coral' | 'bg-lilac' | 'bg-transparent';
}

// Maximum distance the card can shift on mouse movement in px
const MAX_SHIFT = 8;

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id,
    isHero = false,
    bgColor = 'bg-cream'
}) => {
    const [shiftX, setShiftX] = useState(0);
    const [shiftY, setShiftY] = useState(0);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [isClient, setIsClient] = useState(false);
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

    return (
        <section 
            id={id}
            ref={sectionRef}
            className={`
                relative
                w-full
                flex justify-center items-center
                snap-start
                ${className}
            `}
            style={{ 
                height: isClient ? `calc(100vh - ${navbarHeight / 16}rem)` : '100vh',
                marginTop: isClient ? `${navbarHeight / 16}rem` : '0',
                scrollMarginTop: `${navbarHeight}px`,
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            <div 
                className={`
                    w-[98%] sm:w-[96%] md:w-[94%]
                    min-h-[440px] xs:min-h-[484px] sm:min-h-[528px]
                    ${bgColor} retro-card
                    flex justify-center items-center
                    rounded-lg
                    transition-all duration-300 ease-out
                    max-w-[1800px]
                    relative
                    my-6
                `}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
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
                        overflow-x-hidden overflow-y-auto
                        bg-transparent
                    `}
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
                                backgroundSize: '40px 40px',
                                opacity: 0.4,
                                borderRadius: 'inherit'
                            }}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default ContentSection; 