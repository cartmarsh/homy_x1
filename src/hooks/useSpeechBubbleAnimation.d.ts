import { RefObject } from 'react';
import * as THREE from 'three';

interface SpeechBubbleAnimationOptions {
    wobbleSpeed?: number;
    wobbleIntensity?: number;
    floatSpeed?: number;
    floatAmount?: number;
    isExiting?: boolean;
}

interface SpeechBubbleAnimationResult {
    groupRef: RefObject<THREE.Group>;
    textRef: RefObject<THREE.Group>;
    mainBubbleRef: RefObject<THREE.Mesh>;
    largeBubbleRef: RefObject<THREE.Mesh>;
    mediumBubbleRef: RefObject<THREE.Mesh>;
    smallBubbleRef: RefObject<THREE.Mesh>;
    smallBubbleOpacity: number;
    mediumBubbleOpacity: number;
    largeBubbleOpacity: number;
    mainBubbleOpacity: number;
    textOpacity: number;
}

declare function useSpeechBubbleAnimation(
    options?: SpeechBubbleAnimationOptions
): SpeechBubbleAnimationResult;

export default useSpeechBubbleAnimation; 