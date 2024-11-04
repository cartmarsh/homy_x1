import React from 'react';
import { NavLink } from 'react-router-dom';
import  useScrollDirection  from '../../hooks/useScrollDirection';
import "./NavBar.css"; // Pfad anpassen

const NavBar: React.FC = () => {
    const isVisible = useScrollDirection();

    return (
        <nav className={`bg-skyBlue text-white p-4 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} aria-label="Main navigation">
            <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `hover:text-darkGray focus:text-darkGray focus:outline-none ${isActive ? 'text-neutralGray' : ''}`
                        } 
                        aria-current="page"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            `hover:text-darkGray focus:text-darkGray focus:outline-none ${isActive ? 'text-neutralGray' : ''}`
                        }
                    >
                        About Me
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/portfolio" 
                        className={({ isActive }) => 
                            `hover:text-darkGray focus:text-darkGray focus:outline-none ${isActive ? 'text-neutralGray' : ''}`
                        }
                    >
                        Portfolio
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => 
                            `hover:text-darkGray focus:text-darkGray focus:outline-none ${isActive ? 'text-neutralGray' : ''}`
                        }
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;

