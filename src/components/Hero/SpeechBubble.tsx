import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { 
    LuSunrise, LuCoffee, LuEgg, LuSoup, LuBriefcase, LuBookOpen,
    LuSun, LuUtensils, LuLaptop, LuPen, LuMail, LuUsers,
    LuSunset, LuTv, LuGamepad, LuGlasses, LuWine, LuMusic,
    LuMoon, LuBed, LuBook, LuMonitor, LuHeadphones, LuPizza,
    LuSmile
} from "react-icons/lu";
import useSpeechBubbleAnimation from '../../hooks/useSpeechBubbleAnimation';

const getRandomItems = (array: any[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const getTimeBasedMessage = () => {
    const hour = new Date().getHours();
    
    const morningIcons = [<LuSunrise />, <LuCoffee />, <LuEgg />, <LuSoup />, <LuBriefcase />, <LuBookOpen />];
    const afternoonIcons = [<LuSun />, <LuUtensils />, <LuLaptop />, <LuPen />, <LuMail />, <LuUsers />];
    const eveningIcons = [<LuSunset />, <LuTv />, <LuGamepad />, <LuGlasses />, <LuWine />, <LuMusic />];
    const nightIcons = [<LuMoon />, <LuBed />, <LuBook />, <LuMonitor />, <LuHeadphones />, <LuPizza />];
    
    const getIconsWithSmile = (icons: JSX.Element[]) => {
        const randomIcons = getRandomItems(icons, 2);
        return [...randomIcons, <LuSmile />];
    };
    
    if (hour >= 5 && hour < 12) {
        return {
            text: "Good morning",
            textColor: "text-amber-400",
            icons: getIconsWithSmile(morningIcons).map((icon, index) => (
                <span key={index} className="inline-block ml-2 text-orange-300">{React.cloneElement(icon, { size: "1.2em" })}</span>
            ))
        };
    } else if (hour >= 12 && hour < 17) {
        return {
            text: "Good afternoon",
            textColor: "text-rose-400",
            icons: getIconsWithSmile(afternoonIcons).map((icon, index) => (
                <span key={index} className="inline-block ml-2 text-amber-300">{React.cloneElement(icon, { size: "1.2em" })}</span>
            ))
        };
    } else if (hour >= 17 && hour < 22) {
        return {
            text: "Good evening",
            textColor: "text-fuchsia-400",
            icons: getIconsWithSmile(eveningIcons).map((icon, index) => (
                <span key={index} className="inline-block ml-2 text-violet-300">{React.cloneElement(icon, { size: "1.2em" })}</span>
            ))
        };
    } else {
        return {
            text: "Hello night owl",
            textColor: "text-cyan-400",
            icons: getIconsWithSmile(nightIcons).map((icon, index) => (
                <span key={index} className="inline-block ml-2 text-blue-300">{React.cloneElement(icon, { size: "1.2em" })}</span>
            ))
        };
    }
};

// Speech bubble component using Three.js
const SpeechBubble: React.FC<{isExiting: boolean, message?: string}> = ({ isExiting = false, message }) => {
    const timeBasedMessage = useMemo(() => getTimeBasedMessage(), []);
    
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
        <group ref={groupRef} position={[0, 0.2, 0]} scale={[1, 1, 1]}>
            {/* Main speech bubble outline - appears fourth */}
            <mesh ref={mainBubbleRef} position={[2.5, 0, 0]}>
                <sphereGeometry args={[3.0, 8, 8, 8, Math.PI * 2, Math.PI * 0.7, Math.PI * 0.7]} />
                <meshBasicMaterial 
                    color="#d946ef" 
                    wireframe={true}
                    transparent={true}
                    opacity={mainBubbleOpacity}
                    wireframeLinewidth={2}
                />
            </mesh>
            
            {/* Third bubble (largest) - appears third */}
            <mesh ref={largeBubbleRef} position={[-1.2, -0.5, 0]}>
                <sphereGeometry args={[0.5, 12, 12]} />
                <meshBasicMaterial 
                    color="#e879f9" 
                    wireframe={true}
                    transparent={true}
                    opacity={largeBubbleOpacity}
                />
            </mesh>
            
            {/* Second bubble (medium) - appears second */}
            <mesh ref={mediumBubbleRef} position={[-2.3, -1.4, 0]}>
                <sphereGeometry args={[0.3, 10, 10]} />
                <meshBasicMaterial 
                    color="#f0abfc" 
                    wireframe={true}
                    transparent={true}
                    opacity={mediumBubbleOpacity}
                />
            </mesh>
            
            {/* First bubble (smallest) - appears first */}
            <mesh ref={smallBubbleRef} position={[-3, -2.4, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial 
                    color="#f5d0fe" 
                    wireframe={true}
                    transparent={true}
                    opacity={smallBubbleOpacity}
                />
            </mesh>
            
            {/* Text content - appears last */}
            <group ref={textRef} position={[1.4, 2.8, 0]}>
                <Html transform position={[0, 0, 0]} center style={{ 
                    color: '#ff9a50',
                    fontSize: 'clamp(.9rem, 2vw, 1.5rem)',
                    fontWeight: 100,
                    fontFamily: "'IBM Plex Mono', monospace",
                    textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                    width: 'clamp(220px, 25vw, 400px)',
                    textAlign: 'center',
                    overflow: 'visible',
                    whiteSpace: 'normal',
                    opacity: textOpacity,
                    transition: 'opacity 0.5s ease-in-out',
                    pointerEvents: 'none'
                }}>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className={`text-[1.4em] font-medium ${timeBasedMessage.textColor}`}>{message || timeBasedMessage.text}</p>
                        <p className="flex items-center justify-center gap-4">{timeBasedMessage.icons}</p>
                    </div>
                </Html>
            </group>
            
            {/* Light to make text and outline visible */}
            <pointLight position={[0.7, 0.5, 2]} intensity={0.8} color="#ffffff" />
        </group>
    );
};

interface SpeechBubbleSceneProps {
    isExiting?: boolean;
    message?: string;
}

const SpeechBubbleScene: React.FC<SpeechBubbleSceneProps> = ({ isExiting = false }) => {
    return (
        <div 
            className="speech-bubble-container"
            style={{
                position: 'absolute',
                left: 'var(--bubble-left, 65%)',
                top: 'var(--bubble-top, 30%)',
                transform: 'translate(var(--bubble-translate-x, 0), var(--bubble-translate-y, -50%))',
                width: 'clamp(300px, 50vw, 700px)',
                height: 'clamp(200px, 35vw, 450px)',
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'visible'
            }}
        >
            <style>
                {`
                    .speech-bubble-container {
                        --bubble-left: calc(70%);
                        --bubble-top: 10%;
                        --bubble-translate-x: 0;
                        --bubble-translate-y: -50%;
                    }
                    
                    @media (min-width: 769px) and (max-width: 1280px) {
                        .speech-bubble-container {
                            --bubble-left: 65% !important;
                            --bubble-top: -5% !important;
                            --bubble-translate-x: -30% !important;
                            --bubble-translate-y: 0 !important;
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .speech-bubble-container {
                            --bubble-left: 60% !important;
                            --bubble-top: -12rem !important;
                            --bubble-translate-x: -40% !important;
                            --bubble-translate-y: 0 !important;
                            width: clamp(250px, 90vw, 400px) !important;
                            height: clamp(150px, 60vw, 300px) !important;
                        }
                    }
                `}
            </style>
            <Canvas
                style={{ 
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    overflow: 'visible'
                }}
                camera={{ position: [0, 0, 9], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={0.5} />
                <SpeechBubble isExiting={isExiting} message={getTimeBasedMessage().text} />
            </Canvas>
        </div>
    );
};

export default SpeechBubbleScene; 