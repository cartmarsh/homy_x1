import React, { useEffect, useRef, forwardRef, useState } from 'react';
import wolke1 from './cloudBubbles.svg';
import ArrowIcon from './ArrowIcon';

interface AnimatedCTAButtonProps {
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const AnimatedCTAButton = forwardRef<HTMLButtonElement, AnimatedCTAButtonProps>((props, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 418, height: 166, x: 0, y: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (svgRef.current && buttonRef.current) {
                const container = svgRef.current.parentElement;
                const buttonRect = buttonRef.current.getBoundingClientRect();
                
                if (container) {
                    const width = container.clientWidth;
                    const height = container.clientHeight;
                    
                    // Calculate position relative to the button
                    const x = buttonRect.right - width/2;  // Center horizontally above button
                    const y = buttonRect.top - height;     // Position above the button
                    
                    setDimensions({
                        width: width * 1,
                        height: height * 1,
                        x,
                        y
                    });
                }
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        };

        button.addEventListener('mousemove', handleMouseMove);
        return () => button.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative overflow-visible" >
            <img 
                src={wolke1}
                alt="Cloud decoration"
                className="absolute -top-[45vh] -right-[54vw] w-[30vw] min-w-[280px] max-w-[450px] pointer-events-none"
                style={{
                    transform: 'scale(2)',
                    zIndex: 151,
                }}
            />

            <button
                ref={ref}
                onClick={props.onClick}
                className={`
                    group
                    relative
                    bg-gradient-to-r from-rose-100 to-rose-700
                    text-neutralGray-100 
                    text-2xl md:text-3xl lg:text-4xl
                    font-medium
                    h-[min(5rem,15vh)]
                    px-[min(4rem,8vw)]
                    rounded-lg
                    transition-all duration-500
                    hover:scale-[0.95]
                    outline-none
                    border-none
                    ring-0
                    before:content-['']
                    before:absolute
                    before:-inset-4
                    before:rounded-lg
                    before:bg-gradient-to-r
                    before:from-rose-100
                    before:to-rose-700
                    before:-z-10
                    before:opacity-0
                    before:transition-opacity
                    before:duration-500
                    hover:before:opacity-100
                    ring-lavenderMist/70
                    ring-offset-8
                    ring-offset-transparent
                    hover:ring-4
                    focus:ring-4
                    focus:ring-lavenderMist/50
                    focus:outline-none
                    active:scale-[0.98]
                    z-[150]
                    ${props.className}
                `}
                style={{
                    ...props.style,
                    '--mouse-x': '0px',
                    '--mouse-y': '0px',
                } as React.CSSProperties}
            >
                {/* Rest of the button content */}
                <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-2000">
                    <div className="absolute inset-0"
                        style={{
                            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.35), transparent 50%)`
                        }}
                    />
                </div>
                <span className="w-full h-full text-neutralGray-100 relative z-[9999] flex items-center justify-center gap-4" style={{ fontSize: '2.5rem' }}>
                    {props.children}
                    <ArrowIcon />
                </span>
            </button>
        </div>
    );
});

export default AnimatedCTAButton;