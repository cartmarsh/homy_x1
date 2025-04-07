import { RefObject, useState, useCallback } from 'react';
import { throttle } from 'lodash';

// Custom hook for mouse tracking
const useMouseTracking = (ref: RefObject<HTMLDivElement>) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = useCallback(
        throttle((event: React.MouseEvent<HTMLDivElement>) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                setMousePosition({ x, y });
            }
        }, 16),
        [ref]
    );

    const getOffsets = () => {
        const offsetX = (mousePosition.x - (ref.current?.clientWidth ?? 0) / 1.3) / 20;
        const offsetY = (mousePosition.y - (ref.current?.clientHeight ?? 0) / 2) / 20;
        return { offsetX, offsetY };
    };

    return { mousePosition, handleMouseMove, getOffsets };
};

export default useMouseTracking; 