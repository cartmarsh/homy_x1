import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SpeechBubbleAnimationConfig {
    growSpeed?: number;
    wobbleSpeed?: number;
    wobbleIntensity?: number;
    floatSpeed?: number;
    floatAmount?: number;
    isExiting?: boolean;
}

interface BubbleMovement {
    theta: number;
    speed: number;
    amplitudeX: number;
    amplitudeY: number;
    frequencyMod: number;
}

interface BubbleMovements {
    main: BubbleMovement;
    large: BubbleMovement;
    medium: BubbleMovement;
    small: BubbleMovement;
}

const useSpeechBubbleAnimation = ({
    growSpeed = 0.05,
    wobbleSpeed = 0.001,
    wobbleIntensity = 0.04,
    floatSpeed = 0.8,
    floatAmount = 0.05,
    isExiting = false
}: SpeechBubbleAnimationConfig = {}) => {
    // Refs for main elements
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Group>(null);
    const mainBubbleRef = useRef<THREE.Mesh>(null);
    const largeBubbleRef = useRef<THREE.Mesh>(null);
    const mediumBubbleRef = useRef<THREE.Mesh>(null);
    const smallBubbleRef = useRef<THREE.Mesh>(null);

    // Animation state
    const [scale, setScale] = useState(0);
    const initialY = useRef(0.2);
    const initialX = useRef(1.8);
    const elapsed = useRef(0);
    const prevIsExiting = useRef(isExiting);
    
    // Opacity states for smooth transitions
    const [smallBubbleOpacity, setSmallBubbleOpacity] = useState(0);
    const [mediumBubbleOpacity, setMediumBubbleOpacity] = useState(0);
    const [largeBubbleOpacity, setLargeBubbleOpacity] = useState(0);
    const [mainBubbleOpacity, setMainBubbleOpacity] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);

    // Movement parameters for each bubble
    const bubbleMovements = useRef<BubbleMovements>({
        main: {
            theta: 0,
            speed: 0.7,
            amplitudeX: 0.06,
            amplitudeY: 0.04,
            frequencyMod: 0.8
        },
        large: {
            theta: Math.PI * 0.5,
            speed: 1.1,
            amplitudeX: 0.08,
            amplitudeY: 0.1,
            frequencyMod: 0.65
        },
        medium: {
            theta: Math.PI * 0.25,
            speed: 1.4,
            amplitudeX: 0.07,
            amplitudeY: 0.12,
            frequencyMod: 0.9
        },
        small: {
            theta: Math.PI * 0.75,
            speed: 1.8,
            amplitudeX: 0.1,
            amplitudeY: 0.15,
            frequencyMod: 1.1
        }
    });

    // Handle appearance/disappearance animations
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isExiting && !prevIsExiting.current) {
            // Exit sequence (reverse order)
            setTextOpacity(0);
            timeoutId = setTimeout(() => {
                setMainBubbleOpacity(0);
                setTimeout(() => setLargeBubbleOpacity(0), 150);
                setTimeout(() => setMediumBubbleOpacity(0), 300);
                setTimeout(() => setSmallBubbleOpacity(0), 450);
            }, 100);
        } else if (!isExiting && (prevIsExiting.current || 
                  (smallBubbleOpacity === 0 && mediumBubbleOpacity === 0 && 
                   largeBubbleOpacity === 0 && mainBubbleOpacity === 0))) {
            // Reset animation state
            setScale(0);
            elapsed.current = 0;
            
            // Initialize random movement phases
            Object.values(bubbleMovements.current).forEach(movement => {
                movement.theta = Math.random() * Math.PI * 2;
            });

            // Start the fade-in sequence
            timeoutId = setTimeout(() => {
                setScale(0.01);
                setSmallBubbleOpacity(0.7);
                
                setTimeout(() => {
                    setMediumBubbleOpacity(0.7);
                    setTimeout(() => {
                        setLargeBubbleOpacity(0.7);
                        setTimeout(() => {
                            setMainBubbleOpacity(0.7);
                            setTimeout(() => {
                                setTextOpacity(1);
                            }, 150);
                        }, 150);
                    }, 150);
                }, 150);
            }, 100);
        }

        prevIsExiting.current = isExiting;
        return () => clearTimeout(timeoutId);
    }, [isExiting, smallBubbleOpacity, mediumBubbleOpacity, largeBubbleOpacity, mainBubbleOpacity]);

    // Handle animations in each frame
    useFrame((_, delta) => {
        if (!groupRef.current) return;

        elapsed.current += delta;
        
        // Update scale during growth animation
        if (scale < 1) {
            setScale(prev => Math.min(prev + growSpeed, 1));
            groupRef.current.scale.set(scale, scale, scale);
        }

        // Main group floating and wobble
        if (scale > 0.2) {
            const floatY = Math.sin(elapsed.current * floatSpeed) * floatAmount;
            const floatX = Math.cos(elapsed.current * floatSpeed * 0.7) * (floatAmount * 0.2);
            
            groupRef.current.position.y = initialY.current + floatY;
            groupRef.current.position.x = initialX.current + floatX;
            
            // Add natural wobble movement
            const wobbleAmount = isExiting ? wobbleIntensity * 2 : wobbleIntensity;
            groupRef.current.rotation.z = Math.sin(elapsed.current * wobbleSpeed * (isExiting ? 3 : 1)) * wobbleAmount;
        }

        // Update individual bubble movements
        const movements = bubbleMovements.current;
        
        // Update movement phases
        Object.values(movements).forEach(movement => {
            movement.theta += delta * movement.speed;
        });

        // Apply movements to bubbles
        if (mainBubbleRef.current && mainBubbleOpacity > 0) {
            const offset = getOffset(movements.main);
            mainBubbleRef.current.position.x = 0 + offset.x;
            mainBubbleRef.current.position.y = 2.5 + offset.y;
        }

        if (largeBubbleRef.current && largeBubbleOpacity > 0) {
            const offset = getOffset(movements.large);
            largeBubbleRef.current.position.x = -0.5 + offset.x;
            largeBubbleRef.current.position.y = -1.2 + offset.y;
        }

        if (mediumBubbleRef.current && mediumBubbleOpacity > 0) {
            const offset = getOffset(movements.medium);
            mediumBubbleRef.current.position.x = -1.4 + offset.x;
            mediumBubbleRef.current.position.y = -2.3 + offset.y;
        }

        if (smallBubbleRef.current && smallBubbleOpacity > 0) {
            const offset = getOffset(movements.small);
            smallBubbleRef.current.position.x = -2.4 + offset.x;
            smallBubbleRef.current.position.y = -3 + offset.y;
            // Add secondary wave for more erratic movement
            smallBubbleRef.current.position.y += Math.sin(movements.small.theta * 2.5) * (movements.small.amplitudeY * 0.3);
        }

        // Animate text if visible
        if (textRef.current && textOpacity > 0) {
            textRef.current.rotation.y = Math.sin(elapsed.current * 2.5) * wobbleIntensity;
            const textPulse = 1 + Math.sin(elapsed.current * 1.5) * 0.01;
            textRef.current.scale.set(textPulse, textPulse, textPulse);
        }
    });

    // Helper function to calculate movement offsets
    const getOffset = (movement: BubbleMovement) => ({
        x: Math.sin(movement.theta) * movement.amplitudeX,
        y: Math.cos(movement.theta * movement.frequencyMod) * movement.amplitudeY
    });

    return {
        groupRef,
        textRef,
        mainBubbleRef,
        largeBubbleRef,
        mediumBubbleRef,
        smallBubbleRef,
        scale,
        elapsed,
        smallBubbleOpacity,
        mediumBubbleOpacity,
        largeBubbleOpacity,
        mainBubbleOpacity,
        textOpacity
    };
};

export default useSpeechBubbleAnimation; 