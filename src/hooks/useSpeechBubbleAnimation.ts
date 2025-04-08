import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpeechBubbleAnimationOptions {
    wobbleSpeed?: number;
    wobbleIntensity?: number;
    floatSpeed?: number;
    floatAmount?: number;
    isExiting?: boolean;
}

/**
 * Hook to handle speech bubble animations using opacity-based fading and
 * independent movement for each bubble element
 */
const useSpeechBubbleAnimation = ({
    wobbleSpeed = 0.001,
    wobbleIntensity = 0.08,
    floatSpeed = 1.5,
    floatAmount = 0.05,
    isExiting = false
}: SpeechBubbleAnimationOptions = {}) => {
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Group>(null);
    const mainBubbleRef = useRef<THREE.Mesh>(null);
    const largeBubbleRef = useRef<THREE.Mesh>(null);
    const mediumBubbleRef = useRef<THREE.Mesh>(null);
    const smallBubbleRef = useRef<THREE.Mesh>(null);
    
    const initialPositionY = useRef(0);
    const thetaRef = useRef(0);
    
    // Independent movement parameters for each bubble
    const bubbleMovements = useRef({
        // Main bubble moves slowly in a more circular pattern
        main: { 
            theta: 0, 
            speed: 0.7, 
            amplitudeX: 0.06,
            amplitudeY: 0.04,
            frequencyMod: 0.8 
        },
        // Large bubble has a medium pace with different X/Y movement
        large: { 
            theta: Math.PI * 0.5, 
            speed: 1.1, 
            amplitudeX: 0.08,
            amplitudeY: 0.1,
            frequencyMod: 0.65 
        },
        // Medium bubble moves quickly with more vertical motion
        medium: { 
            theta: Math.PI * 0.25, 
            speed: 1.4, 
            amplitudeX: 0.07,
            amplitudeY: 0.12,
            frequencyMod: 0.9 
        },
        // Small bubble moves very quickly in an erratic pattern
        small: { 
            theta: Math.PI * 0.75, 
            speed: 1.8, 
            amplitudeX: 0.1,
            amplitudeY: 0.15,
            frequencyMod: 1.1 
        }
    });
    
    // Opacity values for each element
    const [smallBubbleOpacity, setSmallBubbleOpacity] = useState(0);
    const [mediumBubbleOpacity, setMediumBubbleOpacity] = useState(0);
    const [largeBubbleOpacity, setLargeBubbleOpacity] = useState(0);
    const [mainBubbleOpacity, setMainBubbleOpacity] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);
    
    // Animation timers
    const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
    
    // Initialize position
    useEffect(() => {
        if (groupRef.current) {
            initialPositionY.current = groupRef.current.position.y;
        }
        
        return () => {
            if (animationTimerRef.current) {
                clearTimeout(animationTimerRef.current);
            }
        };
    }, []);
    
    // Handle the fade in/out animation sequence
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        
        if (isExiting) {
            // Clear any existing animation timeouts
            if (animationTimerRef.current) {
                clearTimeout(animationTimerRef.current);
                animationTimerRef.current = null;
            }
            
            // Fade out in sequence (reverse order)
            timeoutId = setTimeout(() => {
                setTextOpacity(0);
                setTimeout(() => setMainBubbleOpacity(0), 150);
                setTimeout(() => setLargeBubbleOpacity(0), 300);
                setTimeout(() => setMediumBubbleOpacity(0), 450);
                setTimeout(() => setSmallBubbleOpacity(0), 600);
            }, 100);
            
        } else {
            // Reset opacities at the start
            setSmallBubbleOpacity(0);
            setMediumBubbleOpacity(0);
            setLargeBubbleOpacity(0);
            setMainBubbleOpacity(0);
            setTextOpacity(0);
            
            // Start the fade-in sequence after a short delay
            timeoutId = setTimeout(() => {
                // Smallest bubble appears first
                setSmallBubbleOpacity(0.7);
                
                // Medium bubble second
                setTimeout(() => {
                    setMediumBubbleOpacity(0.7);
                    
                    // Large bubble third
                    setTimeout(() => {
                        setLargeBubbleOpacity(0.7);
                        
                        // Main bubble fourth
                        setTimeout(() => {
                            setMainBubbleOpacity(0.7);
                            
                            // Text appears last
                            setTimeout(() => {
                                setTextOpacity(1);
                            }, 150);
                        }, 150);
                    }, 150);
                }, 150);
            }, 100);
        }
        
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isExiting]);
    
    // Handle floating and wobble behavior
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        
        // Main group floating animation
        thetaRef.current += delta * floatSpeed;
        const floatOffset = Math.sin(thetaRef.current) * floatAmount;
        groupRef.current.position.y = initialPositionY.current + floatOffset;
        
        // Wobble animation for the group
        if (!isExiting) {
            groupRef.current.rotation.z = Math.sin(thetaRef.current * wobbleSpeed) * wobbleIntensity;
        } else {
            // More dramatic wobble when exiting
            groupRef.current.rotation.z = Math.sin(thetaRef.current * wobbleSpeed * 3) * wobbleIntensity * 2;
        }
        
        // Independent animations for each bubble
        const movements = bubbleMovements.current;
        
        // Update movement parameters
        movements.main.theta += delta * movements.main.speed;
        movements.large.theta += delta * movements.large.speed;
        movements.medium.theta += delta * movements.medium.speed;
        movements.small.theta += delta * movements.small.speed;
        
        // Apply movement to main bubble - slow circular motion
        if (mainBubbleRef.current && mainBubbleOpacity > 0) {
            const mainOffset = {
                x: Math.sin(movements.main.theta) * movements.main.amplitudeX,
                y: Math.cos(movements.main.theta * movements.main.frequencyMod) * movements.main.amplitudeY
            };
            mainBubbleRef.current.position.x = 0 + mainOffset.x;
            mainBubbleRef.current.position.y = 2.5 + mainOffset.y;
        }
        
        // Apply movement to large bubble - medium pace figure-8 style motion
        if (largeBubbleRef.current && largeBubbleOpacity > 0) {
            const largeOffset = {
                x: Math.sin(movements.large.theta) * movements.large.amplitudeX,
                y: Math.sin(movements.large.theta * 2 * movements.large.frequencyMod) * movements.large.amplitudeY
            };
            largeBubbleRef.current.position.x = -0.5 + largeOffset.x;
            largeBubbleRef.current.position.y = -1.2 + largeOffset.y;
        }
        
        // Apply movement to medium bubble - quicker motion with horizontal bias
        if (mediumBubbleRef.current && mediumBubbleOpacity > 0) {
            const mediumOffset = {
                x: Math.sin(movements.medium.theta * 1.2) * movements.medium.amplitudeX,
                y: Math.cos(movements.medium.theta * movements.medium.frequencyMod) * movements.medium.amplitudeY
            };
            mediumBubbleRef.current.position.x = -1.4 + mediumOffset.x;
            mediumBubbleRef.current.position.y = -2.3 + mediumOffset.y;
        }
        
        // Apply movement to small bubble - fastest, most erratic motion
        if (smallBubbleRef.current && smallBubbleOpacity > 0) {
            const smallOffset = {
                x: Math.sin(movements.small.theta) * movements.small.amplitudeX,
                y: Math.cos(movements.small.theta * movements.small.frequencyMod) * movements.small.amplitudeY + 
                   Math.sin(movements.small.theta * 2.5) * (movements.small.amplitudeY * 0.3) // Add secondary wave
            };
            smallBubbleRef.current.position.x = -2.4 + smallOffset.x;
            smallBubbleRef.current.position.y = -3 + smallOffset.y;
        }
    });
    
    return {
        groupRef,
        textRef,
        mainBubbleRef,
        largeBubbleRef,
        mediumBubbleRef,
        smallBubbleRef,
        smallBubbleOpacity,
        mediumBubbleOpacity,
        largeBubbleOpacity,
        mainBubbleOpacity,
        textOpacity
    };
};

export default useSpeechBubbleAnimation; 