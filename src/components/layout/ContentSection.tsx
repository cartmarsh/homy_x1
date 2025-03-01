import React, { useState, useEffect } from 'react';

interface ContentSectionProps {
    className?: string;
    children: React.ReactNode;
    id?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ 
    className = '', 
    children,
    id 
}) => {
    const [navbarHeight, setNavbarHeight] = useState(0);

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
                height: `calc(100vh - ${navbarHeight}px)`,
                marginTop: `${navbarHeight}px`,
            }}
        >
            <div className={`
                w-[90%] h-[90%]
                retro-card
                overflow-hidden
            `}>
                <div className="
                    w-full h-full
                    flex flex-col
                    px-[5%]
                    mx-auto
                    max-w-[1920px]
                    overflow-y-auto
                    retro-scroll
                ">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default ContentSection; 