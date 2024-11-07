import React, { useEffect, useRef } from 'react';

interface AnimatedArrowProps {
    startPosition: { x: number; y: number };
    onComplete: () => void;
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ startPosition, onComplete }) => {
    const figureRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (figureRef.current) {
            // Jump up first, then fall
            const animation = figureRef.current.animate([
                { 
                    transform: `translate(${startPosition.x}px, ${startPosition.y}px) rotate(0deg) scale(1)`,
                    opacity: 1 
                },
                { 
                    transform: `translate(${startPosition.x - 50}px, ${startPosition.y - 100}px) rotate(-15deg) scale(2)`,
                    opacity: 1,
                    offset: 0.3
                },
                { 
                    transform: `translate(${startPosition.x - 100}px, ${window.innerHeight}px) rotate(-90deg) scale(4)`,
                    opacity: 0 
                }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0.4, 0, 1, 1)',
                fill: 'forwards'
            });

            animation.onfinish = onComplete;
        }
    }, [startPosition, onComplete]);

    return (
        <svg className="fixed inset-0 pointer-events-none z-50" style={{ width: '100vw', height: '100vh' }}>
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g ref={figureRef}>
                {/* Head */}
                <circle cx="12" cy="6" r="2.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
                
                {/* Body */}
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
                
                {/* Arms - Right arm raised with flower */}
                <line x1="12" y1="10" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" /> {/* Left arm */}
                <line x1="12" y1="10" x2="15" y2="7" stroke="currentColor" strokeWidth="1.5" /> {/* Right arm */}
                
                {/* Legs */}
                <line x1="12" y1="16" x2="9" y2="20" stroke="currentColor" strokeWidth="1.5" /> {/* Left leg */}
                <line x1="12" y1="16" x2="15" y2="20" stroke="currentColor" strokeWidth="1.5" /> {/* Right leg */}
                
                {/* Flower */}
                <circle cx="16" cy="6" r="1" stroke="currentColor" fill="none" strokeWidth="1.5" />
                <path d="
                    M 16 5 L 16 7
                    M 15 6 L 17 6
                    M 15.4 5.4 L 16.6 6.6
                    M 15.4 6.6 L 16.6 5.4
                " stroke="currentColor" strokeWidth="1.5" />
            </g>
        </svg>
    );
};

export default AnimatedArrow; 