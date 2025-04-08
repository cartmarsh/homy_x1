import React from 'react';

interface SpeechBubbleSceneProps {
    message: string;
    isExiting?: boolean;
}

declare const SpeechBubbleScene: React.FC<SpeechBubbleSceneProps>;
export default SpeechBubbleScene; 