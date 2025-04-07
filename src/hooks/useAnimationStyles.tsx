import { CSSProperties } from 'react';

// Animation constants for reusability
export const ANIMATION_TIMING = {
  DEFAULT: '500ms',
  SLOW: '700ms',
  TOGGLE: '400ms',
  FAST: '300ms',
  EXTRA_SLOW: '600ms'
};

export const ANIMATION_EASING = {
  SPRING: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  SMOOTH: 'ease-in-out',
  EASE_OUT: 'ease-out',
  EASE_IN: 'ease-in'
};

interface AnimationStylesResult {
  getTransitionStyles: (isVisible: boolean, delay?: number) => CSSProperties;
  getContainerStyles: (isVisible: boolean) => CSSProperties;
  getImageStyles: (isVisible: boolean, isTransitioning: boolean) => CSSProperties;
  getButtonContainerStyles: (isVisible: boolean) => CSSProperties;
  getDetailsSectionStyles: (isVisible: boolean) => CSSProperties;
}

const useAnimationStyles = (): AnimationStylesResult => {
  // Common transition styles
  const getTransitionStyles = (isVisible: boolean, delay: number = 0): CSSProperties => ({
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    opacity: isVisible ? 1 : 0,
    transition: `transform ${ANIMATION_TIMING.SLOW} ${ANIMATION_EASING.SPRING}, opacity ${ANIMATION_TIMING.DEFAULT} ${ANIMATION_EASING.SMOOTH}`,
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
  });

  // Container styles
  const getContainerStyles = (isVisible: boolean): CSSProperties => ({
    boxShadow: isVisible 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: `height ${ANIMATION_TIMING.SLOW} ${ANIMATION_EASING.SPRING}, box-shadow ${ANIMATION_TIMING.FAST} ${ANIMATION_EASING.SMOOTH}`,
  });

  // Image section styles
  const getImageStyles = (isVisible: boolean, isTransitioning: boolean): CSSProperties => ({
    transform: isVisible && !isTransitioning ? 'scale(0.95) translateY(-5px)' : 'scale(1) translateY(0)',
    transformOrigin: 'top center',
    transition: `transform ${ANIMATION_TIMING.TOGGLE} ${ANIMATION_EASING.SPRING}`,
    transitionDelay: isVisible ? '0ms' : '300ms',
    position: 'relative',
    zIndex: 2
  });

  // Button container animation styles
  const getButtonContainerStyles = (isVisible: boolean): CSSProperties => ({
    opacity: isVisible ? 0 : 1,
    visibility: isVisible ? 'hidden' : 'visible',
    transition: isVisible 
      ? `opacity ${ANIMATION_TIMING.FAST} ${ANIMATION_EASING.EASE_OUT}, visibility 0ms linear ${ANIMATION_TIMING.FAST}, transform ${ANIMATION_TIMING.FAST} ${ANIMATION_EASING.EASE_OUT}` 
      : `opacity ${ANIMATION_TIMING.DEFAULT} ${ANIMATION_EASING.EASE_IN} 100ms, visibility 0ms linear, transform ${ANIMATION_TIMING.DEFAULT} ${ANIMATION_EASING.EASE_IN} 100ms`,
    height: isVisible ? 0 : 'auto',
    transform: isVisible ? 'translateY(-10px) scale(0.8)' : 'translateY(0) scale(1)',
    margin: isVisible ? 0 : undefined,
    padding: isVisible ? 0 : undefined
  });

  // Details section animation styles
  const getDetailsSectionStyles = (isVisible: boolean): CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${ANIMATION_TIMING.DEFAULT} ${ANIMATION_EASING.SMOOTH}`,
    transitionDelay: isVisible ? '100ms' : '0ms',
    position: 'relative',
    zIndex: 30,
    overflow: 'hidden'
  });

  return {
    getTransitionStyles,
    getContainerStyles,
    getImageStyles,
    getButtonContainerStyles,
    getDetailsSectionStyles
  };
};

export default useAnimationStyles; 