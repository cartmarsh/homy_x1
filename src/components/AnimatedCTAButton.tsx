import React, { forwardRef } from 'react';

interface AnimatedCTAButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const AnimatedCTAButton = forwardRef<HTMLButtonElement, AnimatedCTAButtonProps>((props, ref) => {
    return (
        <div className="relative">
            {/* Extended border line */}
            <div className="absolute -top-2 -right-2 w-24 h-24">
                <div className="absolute top-0 right-0 w-[2px] h-12 bg-gradient-to-b from-rose-400/50 to-transparent" />
                <div className="absolute top-0 right-0 h-[2px] w-12 bg-gradient-to-r from-transparent to-rose-400/50" />
            </div>

            <button
                ref={ref}
                onClick={props.onClick}
                className={`
                    group
                    relative
                    overflow-hidden
                    bg-gradient-to-r from-rose-500 to-rose-700
                    text-neutralGray-100 text-2xl font-medium
                    h-[5rem]
                    px-16
                    rounded-lg
                    transition-all duration-300
                    hover:shadow-[0_4px_12px_rgba(251,146,60,0.4)]
                    hover:scale-[1.01]
                    active:scale-[0.98]
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-orange-400 
                    focus:ring-offset-2
                    ${props.className}
                `}
                style={{
                    ...props.style,
                    '--mouse-x': '0px',
                    '--mouse-y': '0px',
                } as React.CSSProperties}
            >
                {/* Rest of the button content remains the same */}
                {/* ... */}
            </button>
        </div>
    );
});

export default AnimatedCTAButton; 