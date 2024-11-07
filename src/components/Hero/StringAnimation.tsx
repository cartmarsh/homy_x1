import React, { useEffect, useRef, useState } from 'react';

interface StringPoint {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    buttonX: number;
    buttonY: number;
    delay: number;
    amplitude: number;
    controlPoint1X: number;
    controlPoint1Y: number;
    controlPoint2X: number;
    controlPoint2Y: number;
}

interface StringAnimationProps {
    strings: StringPoint[];
}

const stringColors = [
    'rgb(13, 124, 102)',  // tealGreen
    'rgb(65, 179, 162)',  // lightTeal
    'rgb(189, 232, 202)', // paleTurquoise
    'rgb(215, 195, 241)'  // lavenderMist
];

const stringColors2 = [
    'rgb(253, 138, 138)', // coral pink
    'rgb(241, 247, 181)', // light yellow
    'rgb(168, 209, 209)', // soft turquoise
    'rgb(158, 161, 212)'  // periwinkle
];

const StringAnimation: React.FC<StringAnimationProps> = ({ strings }) => {
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const containerRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const container = containerRef.current.parentElement;
                if (container) {
                    setDimensions({
                        width: container.clientWidth,
                        height: container.clientHeight
                    });
                }
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const animate = () => {
            const time = Date.now() / 1000;
            
            strings.forEach((string, index) => {
                const path = pathRefs.current[index];
                if (!path) return;

                // Create the cubic bezier curve path
                const pathD = `
                    M ${string.startX} ${string.startY}
                    C ${string.controlPoint1X} ${string.controlPoint1Y}
                      ${string.controlPoint2X} ${string.controlPoint2Y}
                      ${string.endX} ${string.endY}
                `;
                
                path.setAttribute('d', pathD);

                // Dynamic stroke width animation
                const baseStrokeWidth = 3;
                const strokeWidthVariation = 2;
                const strokeWidth = baseStrokeWidth + 
                    Math.sin(time * 2 + index * 0.5) * strokeWidthVariation;
                
                path.setAttribute('stroke-width', strokeWidth.toString());
            });

            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [strings]);

    return (
        <svg 
            ref={containerRef}
            className="absolute pointer-events-none" 
            style={{ 
                width: '100%', 
                height: '100%',
                top: 0,
                left: 0,
                zIndex: 100,
                overflow: 'visible',
            }}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
            {strings.map((_, index) => (
                <path
                    key={index}
                    ref={el => pathRefs.current[index] = el}
                    stroke={stringColors2[index % stringColors2.length]}
                    fill="none"
                    strokeLinecap="round"
                    style={{
                        opacity: 0.9,
                        transition: 'opacity 0.3s ease',
                        filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))'
                    }}
                />
            ))}
        </svg>
    );
};

export default StringAnimation; 