import { CSSProperties } from 'react';

// CSS utility to hide scrollbars across browsers
export const HIDE_SCROLLBAR_STYLE: CSSProperties = {
  msOverflowStyle: 'none',  // IE and Edge
  scrollbarWidth: 'none',      // Firefox
};

// For WebKit browsers, need to use this style in conjunction with a CSS class
export const WEBKIT_SCROLLBAR_CSS = `
  &::-webkit-scrollbar {
    display: none;
  }
`;

// Color for details background (purple with 70% transparency)
export const DETAILS_BACKGROUND_COLOR = 'rgba(124, 58, 237, 0.7)';

// Button style for a large, centered, prominent "Get Details" button
export const getDetailsButtonStyle = (isHovered: boolean): CSSProperties => ({
  position: 'absolute',
  left: '50%',
  top: '70%', // Position in lower third
  transform: isHovered ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%)',
  padding: '0.75rem 2rem',
  fontSize: '1.25rem',
  fontFamily: "'Space Mono', monospace",
  fontWeight: 700,
  color: 'white',
  backgroundColor: 'rgba(147, 51, 234, 0.95)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '0.5rem',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  zIndex: 40,
  opacity: isHovered ? 1 : 0.95,
});

// Details section styles for slide up animation from bottom with opacity transition
export const getDetailsSectionStyles = (showDetails: boolean, isTransitioning: boolean): CSSProperties => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: DETAILS_BACKGROUND_COLOR,
  backdropFilter: 'blur(3px)',
  transform: showDetails ? 'translateY(0)' : 'translateY(100%)',
  opacity: showDetails ? 1 : 0,
  transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0), opacity 0.6s ease',
  maxHeight: '100%', 
  overflowY: 'auto',
  zIndex: 40, // Ensure details appear above the image
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  visibility: isTransitioning || showDetails ? 'visible' : 'hidden', // Ensure visibility during transition
  transformOrigin: 'bottom',
  boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.1)',
  pointerEvents: showDetails ? 'auto' : 'none', // Only allow interaction when visible
  willChange: 'transform, opacity', // Optimize for animation performance
  borderBottomLeftRadius: '0.5rem',
  borderBottomRightRadius: '0.5rem',
  paddingBottom: showDetails ? '4rem' : '0', // Add padding at the bottom when expanded
});

// Main content styles - constrained to fit inside card with no gap
export const getMainContentStyles = (): CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

// Image container styles with responsive height and no gap
export const getImageContainerStyles = (isHovered: boolean): CSSProperties => ({
  position: 'relative',
  zIndex: 10,
  overflow: 'hidden',
  boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
  height: 'min(70vh, 500px)', // Adjusted height to match red outlined area
  width: '100%',
  transform: 'none',
  borderRadius: '0.75rem', // Match container's border radius
  transition: 'all 0.3s ease',
});

// Title overlay styles
export const getTitleOverlayStyle = (): CSSProperties => ({
  fontFamily: "'Space Mono', monospace",
  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
  fontWeight: 700,
  color: 'white',
  textShadow: '0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.7)',
  letterSpacing: '0.32em',
  lineHeight: 1.7,
  marginTop: '7%', // Position in the upper part of the image where the red rectangle was
  opacity: 0.8,
  textTransform: 'uppercase',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(0.25rem)',
  borderRadius: '0.75rem',
  padding: '0.5rem 1rem',
  maxWidth: '50%',
  boxShadow: '0 0.125rem 0.625rem rgba(0, 0, 0, 0.2)',
}); 