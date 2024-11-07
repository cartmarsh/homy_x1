import { useState, useEffect, RefObject } from 'react';

const useStringCoords = (buttonRef: RefObject<HTMLButtonElement>, h2Id: string, pId: string) => {
    const [stringCoords, setStringCoords] = useState<Array<{
        startX: number;
        startY: number;
        endX: number;
        endY: number;
        controlPoint1X: number;
        controlPoint1Y: number;
        controlPoint2X: number;
        controlPoint2Y: number;
        buttonX: number;
        buttonY: number;
        delay: number;
        amplitude: number;
    }>>([]);

    useEffect(() => {
        const updateStringCoords = () => {
            const h2Element = document.getElementById(h2Id);
            const pElement = document.getElementById(pId);
            const buttonElement = buttonRef.current;

            if (!h2Element || !buttonElement || !pElement) return;

            const h2Rect = h2Element.getBoundingClientRect();
            const pRect = pElement.getBoundingClientRect();
            const buttonRect = buttonElement.getBoundingClientRect();

            const newStrings = Array.from({ length: 24 }, (_, index) => {
                const startElement = pRect;
                const verticalOffset = index * 30;
                const horizontalOffset = -(Math.random() * 100 + 50);
                const startX = startElement.right + 20 + horizontalOffset;
                const startY = startElement.top + (startElement.height / 2) + verticalOffset;
                const endX = buttonRect.left + (buttonRect.width / 10);
                const endY = buttonRect.bottom + (buttonRect.height / 10);
                const cp1x = startX + (endX - startX) * 0.2;
                const cp1y = startY - 100 - (index * 15);
                const cp2x = startX + (endX - startX) * 0.8;
                const cp2y = startY - 50 - (index * 15);

                return {
                    startX,
                    startY,
                    endX,
                    endY,
                    controlPoint1X: cp1x,
                    controlPoint1Y: cp1y,
                    controlPoint2X: cp2x,
                    controlPoint2Y: cp2y,
                    buttonX: buttonRect.left + buttonRect.width / 2,
                    buttonY: buttonRect.top + buttonRect.height / 2,
                    delay: index * 0.2,
                    amplitude: 15 + Math.random() * 10
                };
            });

            setStringCoords(newStrings);
        };

        updateStringCoords();
        window.addEventListener('resize', updateStringCoords);
        return () => window.removeEventListener('resize', updateStringCoords);
    }, [buttonRef, h2Id, pId]);

    return stringCoords;
};

export default useStringCoords; 