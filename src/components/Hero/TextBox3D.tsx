import React from 'react';

interface TextBox3DProps {
    className?: string;
    style?: React.CSSProperties;
    offsetX: number;
    offsetY: number;
    intensity?: number;
    children: React.ReactNode;
    glassEffect?: {
        background?: string;
        borderOpacity?: number;
        blur?: number;
    };
}

const TextBox3D: React.FC<TextBox3DProps> = ({
    className = '',
    style = {},
    offsetX,
    offsetY,
    intensity = 1,
    children,
    glassEffect = {
        background: 'rgba(255, 255, 255, 0.15)',
        borderOpacity: 0.3,
        blur: 5
    }
}) => {
    const transform = `perspective(1000px) rotateX(${offsetY * 0.15 * intensity}deg) rotateY(${offsetX * -0.15 * intensity}deg) translate3d(${offsetX * 0.8 * intensity}px, ${offsetY * 0.8 * intensity}px, 0px)`;

    return (
        <div 
            className={`glass-box relative mx-auto md:mx-0 inline-block px-4 py-3 backdrop-blur-sm shadow-lg border ${className}`}
            style={{ 
                transform,
                transformStyle: 'preserve-3d',
                background: glassEffect.background,
                borderColor: `rgba(255, 255, 255, ${glassEffect.borderOpacity})`,
                backdropFilter: `blur(${glassEffect.blur}px)`,
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default TextBox3D; 