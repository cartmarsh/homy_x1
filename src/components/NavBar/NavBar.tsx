import React, { useState, useEffect } from 'react';
import "./NavBar.css";

interface Section {
  id: string;
  label: string;
}

const NavBar: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const sections: Section[] = [
        { id: "home", label: "HOME" },
        { id: "portfolio", label: "PORTFOLIO" },
        { id: "about", label: "ABOUT ME" },
        { id: "contact", label: "CONTACT" }
    ];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    // Calculate subtle shift based on mouse position
    const shiftX = (mousePosition.x - 0.5) * 4; // Max 2px shift
    const shiftY = (mousePosition.y - 0.5) * 4; // Max 2px shift

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Observer to update active section based on scroll position
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -70% 0px',
            threshold: [0.1, 0.5]
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            
            if (visibleEntries.length > 0) {
                const mostVisible = visibleEntries.reduce((prev, current) => {
                    return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
                });
                
                setActiveSection(mostVisible.target.id);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        
        sections.forEach(section => {
            let element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            } else {
                console.warn(`Section with id "${section.id}" not found in the DOM`);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto md:w-auto bg-transparent">
            <div 
                className="retro-nav-card px-3 sm:px-4 md:px-6 py-1 sm:py-2 backdrop-blur-sm transition-transform duration-300 ease-out"
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <div className="flex items-center justify-between md:justify-center">
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-[#e05f20] hover:text-[#f06c2e] transition-colors 
                                  bg-white/30 p-2 rounded-md w-10 h-10 flex items-center justify-center text-xl"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

                    {/* Navigation Links */}
                    <ul className={`
                        flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-10 relative z-10
                        ${isMenuOpen ? 'flex' : 'hidden md:flex'}
                        ${isMenuOpen ? 'absolute top-full left-0 w-full bg-gradient-to-r from-[#2d1b69]/95 to-[#e05f20]/95 mt-2 p-3 rounded-md shadow-lg border border-white/10' : ''}
                    `}>
                        {sections.map(section => (
                            <NavItem 
                                key={section.id}
                                id={section.id} 
                                label={section.label} 
                                isActive={activeSection === section.id}
                                onClick={() => isMenuOpen && toggleMenu()}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

interface NavItemProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, isActive, onClick }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        
        if (element) {
            // Use the more direct scrollIntoView approach
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Call onClick after a short delay to close mobile menu if needed
            setTimeout(onClick, 150);
        } else {
            console.warn(`Cannot scroll to #${id}: Element not found`);
        }
    };

    return (
        <li className="nav-item w-full md:w-auto py-2 md:py-0">
            <a 
                href={`#${id}`}
                className={`
                    retro-nav-link relative
                    font-['Space_Grotesk'] text-xs sm:text-sm tracking-wider
                    block w-full md:w-auto text-center
                    ${isActive ? 'text-white font-semibold scale-110' : 'text-neutral-200'}
                `}
                onClick={handleClick}
            >
                {label}
            </a>
        </li>
    );
};

export default NavBar;

