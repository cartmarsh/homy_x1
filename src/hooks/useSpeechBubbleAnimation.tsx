import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

interface SpeechBubbleAnimationConfig {
    growSpeed?: number;
    wobbleSpeed?: number;
    wobbleIntensity?: number;
    floatSpeed?: number;
    floatAmount?: number;
    isExiting?: boolean;
}

const useSpeechBubbleAnimation = ({
    growSpeed = 0.05,
    wobbleSpeed = 0.001,
    wobbleIntensity = 0.04,
    floatSpeed = 0.8,
    floatAmount = 0.05,
    isExiting = false
}: SpeechBubbleAnimationConfig = {}) => {
    const groupRef = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Group>(null);
    const [scale, setScale] = useState(0);
    const initialY = useRef(0.2);
    const initialX = useRef(1.8);
    const elapsed = useRef(0);
    const prevIsExiting = useRef(isExiting);
    
    // Animation states for sequenced appearance/disappearance
    const [smallBubbleVisible, setSmallBubbleVisible] = useState(false);
    const [mediumBubbleVisible, setMediumBubbleVisible] = useState(false);
    const [largeBubbleVisible, setLargeBubbleVisible] = useState(false);
    const [mainBubbleVisible, setMainBubbleVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    
    // Swing factor for more natural movement
    const swingPhase = useRef(0);
    const smallBubbleSwing = useRef(0);
    const mediumBubbleSwing = useRef(0);
    const largeBubbleSwing = useRef(0);
    
    // Only trigger exit animation when isExiting changes from false to true
    useEffect(() => {
        if (isExiting && !prevIsExiting.current) {
            // Exit sequence (reverse order)
            setTextVisible(false);
            const timer1 = setTimeout(() => setMainBubbleVisible(false), 350);
            const timer2 = setTimeout(() => setLargeBubbleVisible(false), 700);
            const timer3 = setTimeout(() => setMediumBubbleVisible(false), 1050);
            const timer4 = setTimeout(() => setSmallBubbleVisible(false), 1400);
            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
            };
        } else if (!isExiting && (prevIsExiting.current || 
                  (!smallBubbleVisible && !mediumBubbleVisible && 
                   !largeBubbleVisible && !mainBubbleVisible))) {
            // Appear sequence - only start if previously exiting or nothing is visible
            setScale(0);
            elapsed.current = 0;
            swingPhase.current = 0;
            
            // Reset swing values for entrance animation
            smallBubbleSwing.current = Math.random() * Math.PI;
            mediumBubbleSwing.current = Math.random() * Math.PI;
            largeBubbleSwing.current = Math.random() * Math.PI;
            
            const startTimer = setTimeout(() => {
                setScale(0.01); // Start growing animation
                
                // Sequenced appearance
                const timer1 = setTimeout(() => setSmallBubbleVisible(true), 100);
                const timer2 = setTimeout(() => setMediumBubbleVisible(true), 300);
                const timer3 = setTimeout(() => setLargeBubbleVisible(true), 500);
                const timer4 = setTimeout(() => setMainBubbleVisible(true), 700);
                const timer5 = setTimeout(() => setTextVisible(true), 900);
                
                return () => {
                    clearTimeout(timer1);
                    clearTimeout(timer2);
                    clearTimeout(timer3);
                    clearTimeout(timer4);
                    clearTimeout(timer5);
                };
            }, 100);
            
            return () => clearTimeout(startTimer);
        }
        
        prevIsExiting.current = isExiting;
    }, [isExiting, smallBubbleVisible, mediumBubbleVisible, largeBubbleVisible, mainBubbleVisible]);
    
    // Animation frame updates
    useFrame((_, delta) => {
        elapsed.current += delta;
        swingPhase.current += delta;
        
        // Growing animation
        if (groupRef.current && scale < 1) {
            setScale(prev => Math.min(prev + growSpeed, 1));
            groupRef.current.scale.set(scale, scale, scale);
        }
        
        // Floating movement with swing effect
        if (groupRef.current && scale > 0.2) {
            const floatY = Math.sin(elapsed.current * floatSpeed) * floatAmount;
            const floatX = Math.cos(elapsed.current * floatSpeed * 0.7) * (floatAmount * 0.2);
            
            // Add swing to main group
            groupRef.current.position.y = initialY.current + floatY;
            groupRef.current.position.x = initialX.current + floatX;
            
            // Add subtle rotation swing for more natural movement
            if (!isExiting) {
                groupRef.current.rotation.z = Math.sin(elapsed.current * 0.8) * 0.03;
            }
        }
        
        // Apply swing animations to individual bubbles if they exist
        if (groupRef.current) {
            // Find and animate the bubble meshes with swing effects
            groupRef.current.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    const position = child.position;
                    
                    // Apply different swing patterns based on bubble position
                    if (position.y < -2.5) { // Small bubble
                        child.rotation.z = Math.sin(swingPhase.current * 1.2 + smallBubbleSwing.current) * 0.15;
                        if (smallBubbleVisible && !isExiting) {
                            child.position.x += Math.sin(swingPhase.current * 1.5) * 0.003;
                            child.position.y += Math.cos(swingPhase.current * 1.3) * 0.003;
                        }
                    } else if (position.y < -1.5) { // Medium bubble
                        child.rotation.z = Math.sin(swingPhase.current * 1.0 + mediumBubbleSwing.current) * 0.1;
                        if (mediumBubbleVisible && !isExiting) {
                            child.position.x += Math.sin(swingPhase.current * 1.2) * 0.004;
                            child.position.y += Math.cos(swingPhase.current) * 0.004;
                        }
                    } else if (position.y < 0) { // Large bubble
                        child.rotation.z = Math.sin(swingPhase.current * 0.9 + largeBubbleSwing.current) * 0.08;
                        if (largeBubbleVisible && !isExiting) {
                            child.position.x += Math.sin(swingPhase.current * 0.8) * 0.005;
                            child.position.y += Math.cos(swingPhase.current * 0.9) * 0.005;
                        }
                    }
                }
            });
        }
        
        // Slight wobbling effect for text
        if (textRef.current && textVisible) {
            textRef.current.rotation.y = Math.sin(elapsed.current * 2.5) * wobbleIntensity;
            
            // Small scale pulsing for the text
            const textPulse = 1 + Math.sin(elapsed.current * 1.5) * 0.01;
            textRef.current.scale.set(textPulse, textPulse, textPulse);
        }
    });

    return {
        groupRef,
        textRef,
        scale,
        elapsed,
        smallBubbleVisible,
        mediumBubbleVisible,
        largeBubbleVisible,
        mainBubbleVisible,
        textVisible
    };
};

export default useSpeechBubbleAnimation; 