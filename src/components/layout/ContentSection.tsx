import React, { useState, useRef, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
    bgColor?: 'bg-cream' | 'bg-peach' | 'bg-gray-100' | 'bg-mint' | 'bg-sky' | 'bg-lemon' | 'bg-coral' | 'bg-lilac' | 'bg-transparent';
    backgroundElements?: React.ReactNode;
    padding?: 'default' | 'compact';
}

// Maximum distance the card can shift on mouse movement in rem
const MAX_SHIFT = 0.5;

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id,
    backgroundElements,
    padding = 'default'
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

    const getPaddingClasses = () => {
        if (padding === 'compact') {
            return 'p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12';
        }
        return 'p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14';
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
                text-white/90
                ${className}
            `}
            style={{ 
                height: isClient ? `calc(80vh - ${navbarHeight / 16}rem)` : '80vh',
                marginTop: isClient ? `${navbarHeight / 16}rem` : '0',
                scrollMarginTop: isClient ? `${navbarHeight / 16}rem` : '0',
                transition: 'opacity 0.5s ease-in-out',
            }}
        >
            <div 
                className={`
                    w-[99%] sm:w-[98%] md:w-[96%]
                    min-h-[25rem] xs:min-h-[27.5rem] sm:min-h-[30.25rem]
                    flex justify-center items-center
                    rounded-lg
                    transition-all duration-300 ease-out
                    max-w-[112.5rem]
                    relative
                    my-2 sm:my-4 md:my-6
                    bg-white/[0.08]
                    backdrop-blur-[0.125rem]
                    border border-white/20
                    shadow-lg
                `}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}rem, ${shiftY}rem)`,
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
                        rounded-lg
                        ${getPaddingClasses()}
                        max-w-[112.5rem]
                        overflow-x-hidden overflow-y-auto
                        relative z-10
                        text-white/90
                    `}
                >
                    {children}
                </div>
                
                {/* Injected background elements */}
                {backgroundElements}
            </div>
        </section>
    );
};

export default ContentSection; 