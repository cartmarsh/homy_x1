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
    relative bg-white shadow-md rounded-lg
    transform transition-all duration-500 ease-out
    mx-auto
  `;

  // Size based on showDetails
  const sizeClasses = showDetails
    ? `w-full max-w-[${DEFAULT_PORTFOLIO_VALUES.EXPANDED_MAX_WIDTH}] grid grid-cols-1 md:grid-cols-2 z-20 hover:shadow-2xl`
    : `w-full max-w-[${DEFAULT_PORTFOLIO_VALUES.COLLAPSED_MAX_WIDTH}] hover:scale-105 hover:shadow-2xl active:scale-95 z-0`;

  // Cursor style if it's a link and not expanded
  const cursorClasses = isLink && !showDetails ? 'cursor-pointer' : '';

  return `${baseClasses} ${sizeClasses} ${cursorClasses}`.trim();
};

/**
 * Generate container styles for portfolio item
 */
export const getPortfolioContainerStyles = (
  showDetails: boolean
): CSSProperties => {
  return {
    height: 'auto',
    transition: 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    boxShadow: showDetails 
      ? '0 1.25rem 2.1875rem -0.625rem rgba(0, 0, 0, 0.3), 0 0.9375rem 1.25rem -0.625rem rgba(0, 0, 0, 0.2)' 
      : '0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.2), 0 0.25rem 0.5rem -0.125rem rgba(0, 0, 0, 0.15)'
  };
};

/**
 * Generate classes for the main content area
 */
export const getMainContentClasses = (showDetails: boolean): string => {
  return `
    relative z-10 p-3 flex flex-col items-center
    transition-all duration-500 ease-out
    ${showDetails ? 'h-full' : 'h-auto'}
  `.trim();
};

/**
 * Generate main content container styles
 */
export const getMainContentStyles = (showDetails: boolean = false): CSSProperties => {
  return {
    background: showDetails ? 'rgba(45, 27, 105, 0.9)' : 'transparent',
    boxShadow: showDetails ? 'inset 0 0 1.875rem rgba(0, 0, 0, 0.35)' : 'none',
    backdropFilter: showDetails ? 'blur(0.3125rem)' : 'none',
    transition: 'background 600ms ease-in-out, box-shadow 600ms ease-in-out, backdrop-filter 600ms ease-in-out'
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
    transform: showDetails ? 'translateY(-0.625rem) scale(0.8)' : 'translateY(0) scale(1)',
    background: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(0.125rem)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
};

/**
 * Generate styles for the details button
 */
export const getDetailsButtonStyles = (): CSSProperties => {
  return {
    background: 'linear-gradient(135deg, #ffb938 0%, #ff9800 100%)',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 0.5rem 1.25rem rgba(0, 0, 0, 0.25), 0 0.625rem 0.9375rem rgba(255, 152, 0, 0.4)',
    letterSpacing: '0.09375rem',
    color: 'black',
    lineHeight: 1,
    transform: 'translateY(0)',
    border: '0.125rem solid rgba(255, 255, 255, 0.3)'
  };
};

/**
 * Generate button hover effect handlers
 */
export const getButtonHoverHandlers = () => {
  return {
    onMouseOver: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = '0 0.75rem 1.875rem rgba(0, 0, 0, 0.4), 0 0.9375rem 1.5625rem rgba(255, 152, 0, 0.5)';
      e.currentTarget.style.transform = 'translateY(-0.125rem)';
    },
    onMouseOut: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = '0 0.5rem 1.25rem rgba(0, 0, 0, 0.25), 0 0.625rem 0.9375rem rgba(255, 152, 0, 0.4)';
      e.currentTarget.style.transform = 'translateY(0)';
    },
    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(0.0625rem)';
      e.currentTarget.style.boxShadow = '0 0.25rem 0.75rem rgba(0, 0, 0, 0.25), 0 0.3125rem 0.625rem rgba(255, 152, 0, 0.3)';
    },
    onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(-0.125rem)';
      e.currentTarget.style.boxShadow = '0 0.75rem 1.875rem rgba(0, 0, 0, 0.4), 0 0.9375rem 1.5625rem rgba(255, 152, 0, 0.5)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 0.5rem 1.25rem rgba(0, 0, 0, 0.25), 0 0.625rem 0.9375rem rgba(255, 152, 0, 0.4)';
    }
  };
};

/**
 * Generate styles for the details section
 */
export const getDetailsSectionStyles = (showDetails: boolean): CSSProperties => {
  return {
    opacity: showDetails ? 1 : 0,
    maxHeight: showDetails ? '37.5rem' : '0',
    transition: 'opacity 500ms ease-in-out, max-height 500ms ease-in-out',
    transitionDelay: showDetails ? '100ms' : '0ms',
    overflow: showDetails ? 'auto' : 'hidden',
    transform: showDetails ? 'translateY(0)' : 'translateY(-1.25rem)',
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
    w-[0.125rem] bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-500
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
    boxShadow: '0 0 0.9375rem rgba(129, 140, 248, 0.8)',
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
    overflow-y-auto
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