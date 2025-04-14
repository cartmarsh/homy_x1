import { RefObject } from 'react';
import * as THREE from 'three';

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

interface SpeechBubbleAnimationResult {
    groupRef: RefObject<THREE.Group>;
    textRef: RefObject<THREE.Group>;
    mainBubbleRef: RefObject<THREE.Mesh>;
    largeBubbleRef: RefObject<THREE.Mesh>;
    mediumBubbleRef: RefObject<THREE.Mesh>;
    smallBubbleRef: RefObject<THREE.Mesh>;
    scale: number;
    elapsed: RefObject<number>;
    smallBubbleOpacity: number;
    mediumBubbleOpacity: number;
    largeBubbleOpacity: number;
    mainBubbleOpacity: number;
    textOpacity: number;
}

declare function useSpeechBubbleAnimation(
    options?: SpeechBubbleAnimationConfig
): SpeechBubbleAnimationResult;

export default useSpeechBubbleAnimation; 