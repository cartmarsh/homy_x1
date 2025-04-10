import React, { useState } from 'react';
import { useScrollObserver } from '../../hooks/useScrollObserver';
import { SECTIONS } from '../../constants/sections';
import "./NavBar.css";

const NavBar: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const { scrollToSection } = useScrollObserver(SECTIONS, setActiveSection);

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

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto md:w-auto bg-transparent">
            <div 
                className="nav-card px-4 sm:px-6 md:px-8 py-3 sm:py-4 backdrop-blur-sm transition-transform duration-300 ease-out"
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
                        {SECTIONS.map(section => (
                            <NavItem 
                                key={section.id}
                                id={section.id} 
                                label={section.label} 
                                isActive={activeSection === section.id}
                                onClick={() => {
                                    scrollToSection(section.id);
                                    isMenuOpen && toggleMenu();
                                }}
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
    return (
        <li className="nav-item w-full md:w-auto py-2 md:py-0">
            <a 
                href={`#${id}`}
                className={`
                    relative
                    font-mono text-sm sm:text-base tracking-wider font-medium
                    block w-full md:w-auto text-center
                    px-1.5 py-0.75
                    ${isActive ? 'text-white font-bold scale-110' : 'text-neutral-200'}
                    hover:text-white transition-all duration-200
                    after:content-[''] after:absolute after:w-full after:h-[0.125rem] 
                    after:bg-white after:left-0 after:bottom-[-0.25rem]
                    after:scale-x-0 hover:after:scale-x-100
                    after:transition-transform after:duration-200 after:origin-center
                    ${isActive ? 'after:scale-x-100' : ''}
                `}
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >
                {label}
            </a>
        </li>
    );
};

export default NavBar;

