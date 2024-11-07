import React from 'react';
import { NavLink } from 'react-router-dom';
import  useScrollDirection  from '../../hooks/useScrollDirection';
import "./NavBar.css"; // Pfad anpassen

const NavBar: React.FC = () => {
    const isVisible = useScrollDirection();

    return (
        <nav 
            className={`
                fixed top-0 left-0 right-0 z-50
                bg-skyBlue/90 backdrop-blur-sm
                py-6 px-8 md:px-12
                transition-transform duration-500
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            `} 
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto">
                <ul className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-8">
                    <li className="flex flex-col items-start">
                        <span className="text-3xl font-montserrat font-semibold tracking-wide text-neutralGray-800">
                            Dominik Hauger
                        </span>
                        <span className="text-sm font-montserrat font-light tracking-widest text-neutralGray-600 uppercase">
                            Web Developer
                        </span>
                    </li>
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8">
                        {['Home', 'About Me', 'Portfolio', 'Contact'].map((item) => (
                            <li key={item}>
                                <NavLink 
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                                    className={({ isActive }) => `
                                        text-lg font-montserrat font-medium
                                        ${isActive ? 'text-neutralGray-900' : 'text-neutralGray-400'}
                                        hover:text-accentBlue
                                        transition-all duration-300
                                        relative group
                                    `}
                                >
                                    <span className="relative">
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accentBlue group-hover:w-full transition-all duration-300"></span>
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;

