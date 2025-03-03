import React, { useState, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
    isHero?: boolean;
    bgColor?: 'bg-cream' | 'bg-peach' | 'bg-gray-100' | 'bg-mint' | 'bg-sky' | 'bg-lemon' | 'bg-coral' | 'bg-lilac';
    noScroll?: boolean;
    isLastSection?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id,
    isHero = false,
    bgColor = 'bg-cream',
    noScroll = false,
    isLastSection = false
}) => {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        window.addEventListener('scroll', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('scroll', updateDimensions);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    // Calculate subtle shift based on mouse position
    const shiftX = (mousePosition.x - 0.5) * 5; // Max 2.5px shift
    const shiftY = (mousePosition.y - 0.5) * 5; // Max 2.5px shift

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
                minHeight: `calc(100vh - ${navbarHeight}px)`,
                marginTop: `${navbarHeight}px`,
            }}
        >
            <div 
                className={`
                    w-[90%] xs:w-[88%] sm:w-[90%] h-[85%] sm:h-[85%] md:h-[85%]
                    ${bgColor} retro-card
                    overflow-hidden
                    top-[5%]
                    flex justify-center items-center
                    rounded-lg
                    transition-transform duration-300 ease-out
                `}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <div className={`
                    w-[91%] xs:w-[89%] sm:w-[83%] h-[91%] xs:h-[89%] sm:h-[90%]
                    flex flex-col
                    mx-auto
                    max-w-[1600px]
                    overflow-hidden
                    retro-scroll
                    rounded-lg
                    ${isHero 
                      ? 'px-[0%] py-[6%] xs:px-[2%] xs:py-[8%] sm:px-[8%] sm:py-[12%] md:px-[10%] md:py-[15%]' 
                      : 'px-[0%] py-[2%] xs:px-[2%] xs:py-[3%] sm:px-[6%] sm:py-[4%] md:px-[8%] md:py-[5%]'}
                `}>
                    {children}
                </div>
            </div>

            {!isLastSection && (
                <button 
                    className="scroll-down-arrow"
                    onClick={handleScrollClick}
                    aria-label="Scroll to next section"
                />
            )}
        </section>
    );
};

export default ContentSection; 