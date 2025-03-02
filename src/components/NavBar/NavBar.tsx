import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

const NavBar: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto md:w-auto bg-transparent z-50">
            <div 
                className="retro-nav-card px-6 py-2 backdrop-blur-sm transition-transform duration-300 ease-out"
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <div className="flex items-center justify-between md:justify-center">
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

                    {/* Navigation Links */}
                    <ul className={`
                        flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10
                        ${isMenuOpen ? 'flex' : 'hidden md:flex'}
                        ${isMenuOpen ? 'absolute top-full left-0 w-full bg-gradient-to-r from-[#2d1b69]/90 to-[#e05f20]/90 mt-2 p-4' : ''}
                    `}>
                        <NavItem to="/" label="HOME" />
                        <NavItem to="/about" label="ABOUT ME" />
                        <NavItem to="/portfolio" label="PORTFOLIO" />
                        <NavItem to="/contact" label="CONTACT" />
                    </ul>
                </div>
            </div>
        </div>
    );
};

interface NavItemProps {
    to: string;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => (
    <li className="nav-item w-full md:w-auto">
        <NavLink 
            to={to} 
            className={({ isActive }) => `
                retro-nav-link relative
                font-['Space_Grotesk'] text-sm tracking-wider
                block w-full md:w-auto text-center
                ${isActive ? 'text-white font-semibold scale-110' : 'text-neutral-200'}
            `}
            onClick={() => {
                const windowWidth = window.innerWidth;
                if (windowWidth < 768) {
                    setTimeout(() => {
                        const button = document.querySelector('button[aria-label="Toggle menu"]') as HTMLElement;
                        button?.click();
                    }, 150);
                }
            }}
        >
            {label}
        </NavLink>
    </li>
);

export default NavBar;

