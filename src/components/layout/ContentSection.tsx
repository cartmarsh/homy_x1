import React, { useState, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
    isHero?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id,
    isHero = false
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

    return (
        <section 
            id={id}
            className={`
                relative
                w-full
                flex items-center justify-center
                ${className}
            `}
            style={{ 
                minHeight: `calc(100vh - ${navbarHeight}px)`,
                marginTop: `${navbarHeight}px`,
            }}
        >
            <div 
                className={`
                    w-[90%] h-[75%]
                    retro-card
                    overflow-hidden
                    top-[5%]
                    rounded-lg
                    transition-transform duration-300 ease-out
                `}
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <div className={`
                    w-full h-full
                    flex flex-col
                    mx-auto
                    max-w-[1920px]
                    overflow-y-auto
                    retro-scroll
                    rounded-lg
                    ${isHero ? 'px-[8%] py-[15%] md:py-[12%]' : 'px-[5%] py-[6%]'}
                `}>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default ContentSection; 