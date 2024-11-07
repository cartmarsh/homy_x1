import React from 'react';

const StickFigure: React.FC = () => {
    return (
        <svg
            className="w-[1.25em] h-[1.25em] transform group-hover:translate-y-0.5 transition-transform duration-200"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Head */}
            <circle cx="12" cy="6" r="2.5" />
            
            {/* Body */}
            <line x1="12" y1="8" x2="12" y2="16" />
            
            {/* Arms - Right arm raised with flower */}
            <line x1="12" y1="10" x2="8" y2="13" /> {/* Left arm down */}
            <line x1="12" y1="10" x2="15" y2="7" /> {/* Right arm up */}
            
            {/* Legs */}
            <line x1="12" y1="16" x2="9" y2="20" /> {/* Left leg */}
            <line x1="12" y1="16" x2="15" y2="20" /> {/* Right leg */}
            
            {/* Flower in raised hand */}
            <circle cx="16" cy="6" r="1" /> {/* Flower center */}
            <path d="
                M 16 5 L 16 7
                M 15 6 L 17 6
                M 15.4 5.4 L 16.6 6.6
                M 15.4 6.6 L 16.6 5.4
            " /> {/* Flower petals */}
            <line x1="16" y1="7" x2="16" y2="8" /> {/* Flower stem */}
        </svg>
    );
};

export default StickFigure; 