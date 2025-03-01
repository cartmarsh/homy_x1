import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

const NavBar: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

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
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto" aria-label="Main navigation">
            <div 
                className="retro-nav-card px-6 py-2 backdrop-blur-sm bg-gradient-to-r from-[#2d1b69]/90 to-[#e05f20]/90 rounded-lg transition-transform duration-300 ease-out"
                onMouseMove={handleMouseMove}
                style={{
                    transform: `translate(${shiftX}px, ${shiftY}px)`,
                }}
            >
                <ul className="flex items-center justify-between gap-10 relative z-10">
                    <li className="nav-item">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => `
                                retro-nav-link relative
                                font-['Space_Grotesk'] text-sm tracking-wider
                                ${isActive ? 'text-white font-semibold scale-110' : 'text-neutral-200'}
                            `}
                        >
                            HOME
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => `
                                retro-nav-link relative
                                font-['Space_Grotesk'] text-sm tracking-wider
                                ${isActive ? 'text-white font-semibold scale-110' : 'text-neutral-200'}
                            `}
                        >
                            ABOUT ME
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="/portfolio" 
                            className={({ isActive }) => `
                                retro-nav-link relative
                                font-['Space_Grotesk'] text-sm tracking-wider
                                ${isActive ? 'text-white font-semibold scale-110' : 'text-neutral-200'}
                            `}
                        >
                            PORTFOLIO
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => `
                                retro-nav-link relative
                                font-['Space_Grotesk'] text-sm tracking-wider
                                ${isActive ? 'text-white font-semibold scale-110' : 'text-neutral-200'}
                            `}
                        >
                            CONTACT
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

