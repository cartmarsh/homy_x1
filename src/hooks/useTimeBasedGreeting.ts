import { useMemo } from 'react';

interface TimeBasedGreetingOptions {
    morningMessage?: string;
    afternoonMessage?: string;
    eveningMessage?: string;
    nightMessage?: string;
    customMessage?: string;
}

/**
 * A hook that returns a greeting message based on the time of day,
 * or a custom message if provided.
 */
const useTimeBasedGreeting = ({
    morningMessage = "Good morning!",
    afternoonMessage = "Good afternoon!",
    eveningMessage = "Good evening!",
    nightMessage = "Hello night owl!",
    customMessage
}: TimeBasedGreetingOptions = {}) => {
    
    const greeting = useMemo(() => {
        // If a custom message is provided, use that instead
        if (customMessage) {
            return customMessage;
        }
        
        // Otherwise, determine greeting based on time of day
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return morningMessage;
        } else if (hour >= 12 && hour < 18) {
            return afternoonMessage;
        } else if (hour >= 18 && hour < 22) {
            return eveningMessage;
        } else {
            return nightMessage;
        }
    }, [morningMessage, afternoonMessage, eveningMessage, nightMessage, customMessage]);
    
    return greeting;
};

export default useTimeBasedGreeting; 