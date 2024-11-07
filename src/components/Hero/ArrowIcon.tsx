import React from 'react';

const ArrowIcon: React.FC = () => {
    return (
        <svg
            className="w-[1.25em] h-[1.25em] transform group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
        </svg>
    );
};

export default ArrowIcon; 