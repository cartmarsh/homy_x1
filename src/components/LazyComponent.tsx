import { Suspense, ComponentType, lazy, LazyExoticComponent, useState, useEffect } from 'react';
import RetroLoader from './animations/RetroLoader';

interface LazyComponentProps {
  component: LazyExoticComponent<ComponentType<any>>;
  loaderProps?: {
    duration?: number;
    primaryText?: string;
    accentText?: string;
  };
  [key: string]: any;
}

/**
 * LazyComponent - A wrapper for React.lazy with RetroLoader as fallback
 * 
 * @param component - The lazy-loaded component
 * @param loaderProps - Props for the RetroLoader component
 * @param props - Props to pass to the lazy-loaded component
 */
export function LazyComponent({ 
  component: Component, 
  loaderProps = {}, 
  ...props 
}: LazyComponentProps) {
  const {
    duration = 10000,
    primaryText = "LOADING",
    accentText = "PLEASE WAIT..."
  } = loaderProps;

  const [showFallback, setShowFallback] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const minDisplayTime = 10000; // 10 seconds
    const timer = setTimeout(() => {
      setShowFallback(false);
    }, minDisplayTime);

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <Suspense 
      fallback={
        showFallback && (
          <RetroLoader 
            duration={duration} 
            primaryText={primaryText} 
            accentText={accentText}
            progress={progress}
          />
        )
      }
    >
      <Component {...props} />
    </Suspense>
  );
}

/**
 * createLazyComponent - Factory function to create a lazy-loaded component with RetroLoader
 * 
 * @param importFn - The dynamic import function
 * @param defaultLoaderProps - Default props for the RetroLoader
 * @returns A component that can be used directly in JSX
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  defaultLoaderProps = {}
) {
  const LazyComp = lazy(importFn);
  
  return function WithLoader(props: any) {
    return (
      <LazyComponent 
        component={LazyComp} 
        loaderProps={defaultLoaderProps}
        {...props} 
      />
    );
  };
}

export default LazyComponent; 