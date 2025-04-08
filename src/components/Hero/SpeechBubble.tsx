import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import useSpeechBubbleAnimation from '../../hooks/useSpeechBubbleAnimation';

// Speech bubble component using Three.js
const SpeechBubble: React.FC<{message: string, isExiting: boolean}> = ({ message = "Hello", isExiting = false }) => {
    const { 
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
    } = useSpeechBubbleAnimation({
        wobbleSpeed: 0.001,
        wobbleIntensity: 0.08,
        floatSpeed: 1.5,
        floatAmount: 0.05,
        isExiting
    });
    
    return (
        <group ref={groupRef} position={[1.8, 0.2, 0]} scale={[1, 1, 1]}>
            {/* Main speech bubble outline - appears fourth */}
            <mesh ref={mainBubbleRef} position={[0, 2.5, 0]}>
                <sphereGeometry args={[3.0, 8, 8, 8, Math.PI * 2, Math.PI * 0.7, Math.PI * 0.7]} />
                <meshBasicMaterial 
                    color="#ffffff" 
                    wireframe={true}
                    transparent={true}
                    opacity={mainBubbleOpacity}
                    wireframeLinewidth={2}
                />
            </mesh>
            
            {/* Third bubble (largest) - appears third */}
            <mesh ref={largeBubbleRef} position={[-0.5, -1.2, 0]}>
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshBasicMaterial 
                    color="#ffffff" 
                    wireframe={true}
                    transparent={true}
                    opacity={largeBubbleOpacity}
                />
            </mesh>
            
            {/* Second bubble (medium) - appears second */}
            <mesh ref={mediumBubbleRef} position={[-1.4, -2.3, 0]}>
                <sphereGeometry args={[0.3, 10, 10]} />
                <meshBasicMaterial 
                    color="#ffffff" 
                    wireframe={true}
                    transparent={true}
                    opacity={mediumBubbleOpacity}
                />
            </mesh>
            
            {/* First bubble (smallest) - appears first */}
            <mesh ref={smallBubbleRef} position={[-2.4, -3, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial 
                    color="#ffffff" 
                    wireframe={true}
                    transparent={true}
                    opacity={smallBubbleOpacity}
                />
            </mesh>
            
            {/* Text content - appears last */}
            <group ref={textRef} position={[0, 1, 0]}>
                <Html transform position={[0, 0, 0]} center style={{ 
                    color: '#ff9a50',
                    fontSize: '1.6em', 
                    fontWeight: 'bold',
                    fontFamily: '"Courier New", Courier, monospace',
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                    width: '260px',
                    textAlign: 'center',
                    overflow: 'visible',
                    whiteSpace: 'normal',
                    opacity: textOpacity,
                    transition: 'opacity 0.5s ease-in-out',
                    pointerEvents: 'none'
                }}>
                    {message}
                </Html>
            </group>
            
            {/* Light to make text and outline visible */}
            <pointLight position={[0.7, 0.5, 2]} intensity={0.8} color="#ffffff" />
        </group>
    );
};

interface SpeechBubbleSceneProps {
    message: string;
    isExiting?: boolean;
}

const SpeechBubbleScene: React.FC<SpeechBubbleSceneProps> = ({ message, isExiting = false }) => {
    return (
        <Canvas
            style={{ 
                position: 'absolute', 
                top: '-400px', 
                right: '-290px', 
                width: '700px', 
                height: '450px', 
                pointerEvents: 'none',
                zIndex: 30,
                overflow: 'visible'
            }}
            camera={{ position: [0, 0, 9], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={0.5} />
            <SpeechBubble message={message} isExiting={isExiting} />
        </Canvas>
    );
};

export default SpeechBubbleScene; 