import { DEFAULT_PORTFOLIO_VALUES } from '../constants/portfolioConstants';
import React, { CSSProperties } from 'react';

// CSS utility to hide scrollbars across browsers
export const HIDE_SCROLLBAR_STYLE: CSSProperties = {
  msOverflowStyle: 'none',  // IE and Edge
  scrollbarWidth: 'none',   // Firefox
  WebkitOverflowScrolling: 'touch',
};

// For WebKit browsers (need to apply this separately with CSS)
export const WEBKIT_SCROLLBAR_STYLE = `
  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * Generate container classes based on detail view state
 */
export const getContainerClasses = (showDetails: boolean, isLink: boolean): string => {
  const baseClasses = `
    relative bg-white shadow-md rounded-lg overflow-hidden 
    transform transition-all duration-500 ease-out
    mx-auto no-scrollbar
  `;

  // Size based on showDetails
  const sizeClasses = showDetails
    ? `w-full max-w-[${DEFAULT_PORTFOLIO_VALUES.EXPANDED_MAX_WIDTH}] grid grid-cols-1 md:grid-cols-2 z-20 hover:shadow-xl`
    : `w-full max-w-[${DEFAULT_PORTFOLIO_VALUES.COLLAPSED_MAX_WIDTH}] hover:scale-105 hover:shadow-xl active:scale-95 z-0`;

  // Cursor style if it's a link and not expanded
  const cursorClasses = isLink && !showDetails ? 'cursor-pointer' : '';

  return `${baseClasses} ${sizeClasses} ${cursorClasses}`.trim();
};

/**
 * Generate container styles for portfolio item
 */
export const getPortfolioContainerStyles = (
  showDetails: boolean, 
  expandedHeight: number | null, 
  containerHeight: number | null, 
  imageHeight: number | null
): CSSProperties => {
  return {
    overflowY: 'hidden',
    overflowX: 'hidden',
    height: showDetails && expandedHeight 
      ? `${expandedHeight}px` 
      : containerHeight 
        ? `${containerHeight}px` 
        : 'auto',
    minHeight: imageHeight ? `${imageHeight + 80}px` : 'auto', // Add some padding for title
    transition: 'height 600ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease',
    boxShadow: showDetails 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };
};

/**
 * Generate classes for the main content area
 */
export const getMainContentClasses = (showDetails: boolean): string => {
  return `
    relative z-10 p-3 flex flex-col items-center no-scrollbar
    transition-all duration-500 ease-out
    ${showDetails ? 'h-full' : 'h-auto'}
  `.trim();
};

/**
 * Generate main content container styles
 */
export const getMainContentStyles = (): CSSProperties => {
  return {
    overflow: 'hidden',
    background: '#2d1b69',
    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(5px)'
  };
};

/**
 * Generate styles for the detail button container
 */
export const getDetailButtonContainerStyles = (showDetails: boolean): CSSProperties => {
  return {
    opacity: showDetails ? 0 : 1,
    visibility: showDetails ? 'hidden' : 'visible',
    transition: showDetails 
      ? 'opacity 300ms ease-out, visibility 0ms linear 300ms, transform 300ms ease-out' 
      : 'opacity 500ms ease-in 100ms, visibility 0ms linear, transform 500ms ease-in 100ms',
    height: showDetails ? 0 : 'auto',
    transform: showDetails ? 'translateY(-10px) scale(0.8)' : 'translateY(0) scale(1)',
    margin: showDetails ? 0 : undefined,
    padding: showDetails ? 0 : undefined
  };
};

/**
 * Generate styles for the details button
 */
export const getDetailsButtonStyles = (): CSSProperties => {
  return {
    background: 'linear-gradient(135deg, #ffb938 0%, #ff9800 100%)',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    letterSpacing: '1.5px',
    color: 'black',
    lineHeight: 1
  };
};

/**
 * Generate button hover effect handlers
 */
export const getButtonHoverHandlers = () => {
  return {
    onMouseOver: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = '0 25px 30px -12px rgba(0, 0, 0, 0.25), 0 18px 20px -15px rgba(0, 0, 0, 0.2)';
    },
    onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    },
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'scale(0.95)';
    },
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  };
};

/**
 * Generate styles for the details section
 */
export const getDetailsSectionStyles = (showDetails: boolean): CSSProperties => {
  return {
    opacity: showDetails ? 1 : 0,
    transition: 'opacity 500ms ease-in-out',
    transitionDelay: showDetails ? '100ms' : '0ms',
    position: 'relative',
    zIndex: 30,
    overflow: 'hidden'
  };
};

/**
 * Generate classes for the toggle button
 */
export const getToggleButtonClasses = (showDetails: boolean): string => {
  const baseClasses = `
    inline-flex items-center text-sm font-medium 
    bg-transparent border-none outline-none cursor-pointer
    px-3 py-1 rounded-full transition-all duration-300 ease-out
  `;

  const colors = showDetails
    ? `${DEFAULT_PORTFOLIO_VALUES.BUTTON_COLORS.HIDE.BG} ${DEFAULT_PORTFOLIO_VALUES.BUTTON_COLORS.HIDE.TEXT} ${DEFAULT_PORTFOLIO_VALUES.BUTTON_COLORS.HIDE.HOVER}`
    : `${DEFAULT_PORTFOLIO_VALUES.BUTTON_COLORS.SHOW.BG} ${DEFAULT_PORTFOLIO_VALUES.BUTTON_COLORS.SHOW.TEXT} ${DEFAULT_PORTFOLIO_VALUES.BUTTON_COLORS.SHOW.HOVER}`;

  return `${baseClasses} ${colors}`.trim();
};

/**
 * Generate classes for the animated dividing line
 */
export const getDividingLineClasses = (showDetails: boolean): string => {
  return `
    absolute md:block hidden top-0 bottom-0 left-1/2
    w-[2px] bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-500
    transition-all duration-500 ease-out
    ${showDetails ? 'opacity-100' : 'opacity-0'}
  `.trim();
};

/**
 * Generate styles for the animated dividing line
 */
export const getDividingLineStyles = (showDetails: boolean): React.CSSProperties => {
  return {
    height: '100%',
    boxShadow: '0 0 8px rgba(129, 140, 248, 0.6)',
    transformOrigin: 'center',
    transform: showDetails ? 'scaleY(1)' : 'scaleY(0)',
    transition: 'transform 500ms ease-out, opacity 500ms ease-out'
  };
};

/**
 * Generate classes for the details content
 */
export const getDetailsContentClasses = (showDetails: boolean): string => {
  return `
    relative p-5 z-10 
    transition-all duration-500 ease-out
    overflow-y-auto no-scrollbar
    ${showDetails ? 'opacity-100 md:border-l-0 max-h-full' : 'opacity-0 pointer-events-none absolute right-0 max-h-0 invisible'}
  `.trim();
};

/**
 * Generate classes for the content transition
 */
export const getContentTransitionClasses = (showDetails: boolean): string => {
  return `transition-all duration-500 ease-out delay-${DEFAULT_PORTFOLIO_VALUES.ANIMATION_DELAY} ${
    showDetails ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
  }`;
}; 