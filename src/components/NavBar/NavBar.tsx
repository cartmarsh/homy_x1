import React, { useState, useEffect } from 'react';
import { useScrollObserver } from '../../hooks/useScrollObserver';
import { SECTIONS } from '../../constants/sections';
import "./NavBar.css";

const NavBar: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [greeting, setGreeting] = useState<string>("");

    const { scrollToSection } = useScrollObserver(SECTIONS, setActiveSection);

    useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                setGreeting("Good Morning");
            } else if (hour >= 12 && hour < 17) {
                setGreeting("Good Afternoon");
            } else if (hour >= 17 && hour < 22) {
                setGreeting("Good Evening");
            } else {
                setGreeting("Hello Night Owl");
            }
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    // Calculate subtle shift based on mouse position
    const shiftX = (mousePosition.x - 0.5) * 4; // Max 2px shift
    const shiftY = (mousePosition.y - 0.5) * 4; // Max 2px shift

    return (
        <div className={`fixed top-0 left-0 w-full z-50 ${isMenuOpen ? 'h-full' : ''}`}>
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center w-full">
                <div 
                    className={`nav-card px-8 py-4 w-[70%] max-w-5xl backdrop-blur-sm transition-all duration-300 ease-out mt-4
                        ${isMenuOpen ? 'md:bg-gradient-to-r md:from-[rgba(45,27,105,0.95)] md:to-[rgba(224,95,32,0.95)]' : ''}
                    `}
                    onMouseMove={handleMouseMove}
                    style={{
                        transform: `translate(${shiftX}px, ${shiftY}px)`,
                    }}
                >
                    <div className="flex items-center justify-center">
                        <ul className="flex items-center gap-0 lg:gap-6">
                            {SECTIONS.map(section => (
                                <NavItem 
                                    key={section.id}
                                    id={section.id} 
                                    label={section.label} 
                                    isActive={activeSection === section.id}
                                    onClick={() => {
                                        scrollToSection(section.id);
                                        setIsMenuOpen(false);
                                    }}
                                    isLastItem={section.id === 'contact'}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile Header */}
                <div className="flex items-center px-4 py-3">
                    <button 
                        className="text-[#e05f20] hover:text-[#f06c2e] transition-colors 
                                  bg-white/30 p-2 rounded-md w-10 h-10 flex items-center justify-center text-xl mr-3"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                    <span className="text-white/90 text-sm font-secondary">
                        {greeting}
                    </span>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-md z-40">
                        <div className="flex flex-col h-full relative">
                            <div className="flex justify-end p-4 relative z-50">
                                <button 
                                    className="text-[#e05f20] hover:text-[#f06c2e] transition-colors 
                                              bg-white/30 p-2 rounded-md w-10 h-10 flex items-center justify-center text-xl"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        console.log('Close button clicked, setting isMenuOpen to false');
                                    }}
                                    aria-label="Close menu"
                                >
                                    ✕
                                </button>
                            </div>
                            <ul className="flex flex-col items-center justify-center flex-1 gap-6 -mt-20">
                                {SECTIONS.map(section => (
                                    <NavItem 
                                        key={section.id}
                                        id={section.id} 
                                        label={section.label} 
                                        isActive={activeSection === section.id}
                                        onClick={() => {
                                            scrollToSection(section.id);
                                            setIsMenuOpen(false);
                                        }}
                                        isLastItem={section.id === 'contact'}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

interface NavItemProps {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
    isLastItem?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, isActive, onClick, isLastItem }) => {
    return (
        <li className={`nav-item ${isLastItem ? 'md:ml-0' : ''}`}>
            <a 
                href={`#${id}`}
                className={`
                    relative
                    font-primary text-base sm:text-lg md:text-base tracking-wider font-medium
                    block text-center
                    px-4 py-2 md:px-4 md:py-2
                    ${isActive ? 'text-white font-bold scale-105' : 'text-neutral-200'}
                    hover:text-white transition-all duration-200
                    after:content-[''] after:absolute after:w-full after:h-[0.125rem] 
                    after:bg-white after:left-0 after:bottom-[-0.25rem]
                    after:scale-x-0 hover:after:scale-x-100
                    after:transition-transform after:duration-200 after:origin-center
                    ${isActive ? 'after:scale-x-100' : ''}
                    ${isLastItem ? 'md:bg-[#e05f20] md:rounded-full md:hover:bg-[#f06c2e] md:transition-colors' : ''}
                `}
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                <span style={{ fontFamily: "var(--font-primary)", fontWeight: 500 }}>{label}</span>
            </a>
        </li>
    );
};

export default NavBar;

