import React, { useState, useRef, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
    isHero?: boolean;
    bgColor?: 'bg-cream' | 'bg-peach' | 'bg-gray-100' | 'bg-mint' | 'bg-sky' | 'bg-lemon' | 'bg-coral' | 'bg-lilac';
    isLastSection?: boolean;
}

// Maximum distance the card can shift on mouse movement in px
const MAX_SHIFT = 8;

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id,
    isHero = false,
    bgColor = 'bg-cream',
    isLastSection = false
}) => {
    const [shiftX, setShiftX] = useState(0);
    const [shiftY, setShiftY] = useState(0);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Calculate navbar height on mount and window resize
        const calculateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setNavbarHeight(navbar.getBoundingClientRect().height);
            }
        };

        calculateNavbarHeight();
        window.addEventListener('resize', calculateNavbarHeight);

        return () => {
            window.removeEventListener('resize', calculateNavbarHeight);
        };
    }, []);

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

    const handleScrollClick = () => {
        const nextSection = document.getElementById(id || '')?.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section 
            id={id}
            className={`
                relative
                w-full
                flex justify-center
                ${className}
            `}
            style={{ 
                minHeight: `calc(100vh - ${navbarHeight / 16}rem)`, /* Convert to rem by dividing by 16 */
                marginTop: `${navbarHeight / 16}rem`, /* Convert to rem by dividing by 16 */
            }}
        >
            <div 
                className={`
                    w-[95%] sm:w-[92%] md:w-[90%]
                    min-h-[500px] xs:min-h-[550px] sm:min-h-[600px]
                    ${bgColor} retro-card
                    top-[5%]
                    flex justify-center items-center
                    rounded-lg
                    transition-transform duration-300 ease-out
                    max-w-[1800px]
                    max-h-[85vh]
                    relative
                    my-8
                `}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <div className={`
                    w-[95%] sm:w-[92%] md:w-[90%]
                    h-full
                    flex flex-col
                    mx-auto
                    retro-scroll
                    rounded-lg
                    ${isHero 
                      ? 'p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12' 
                      : 'p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10'}
                    max-w-[1600px]
                    overflow-x-hidden
                    overflow-y-auto
                `}>
                    {children}
                </div>
            </div>

            {!isLastSection && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer">
                    <button 
                        onClick={handleScrollClick}
                        className="p-2 transition-transform hover:translate-y-1 bg-white/30 rounded-full"
                        aria-label="Scroll to next section"
                    >
                        <svg 
                            width="40" 
                            height="40" 
                            viewBox="2 2 20 20" 
                            className="fill-current text-gray-600 hover:text-gray-800 transition-colors"
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
        </section>
    );
};

export default ContentSection; 