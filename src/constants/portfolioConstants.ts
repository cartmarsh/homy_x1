/**
 * Default values for PortfolioItem component
 */
export const DEFAULT_PORTFOLIO_VALUES = {
  // Default functionality if none provided
  DEFAULT_FUNCTIONALITY: [
    "Download WAV files",
    "Use built-in synthesizer",
    "Adjust BPM and time signature",
    "Apply audio effects"
  ],
  
  // Animation durations
  ANIMATION_DURATION: 500, // in ms
  ANIMATION_DELAY: 50, // in ms (was 100) - Reduced for smoother transitions
  
  // Layout values
  COLLAPSED_MAX_WIDTH: '30rem',
  EXPANDED_MAX_WIDTH: '64rem',
  
  // Button states
  BUTTON_COLORS: {
    SHOW: {
      BG: 'bg-blue-100',
      TEXT: 'text-blue-600',
      HOVER: 'hover:bg-blue-200'
    },
    HIDE: {
      BG: 'bg-purple-100',
      TEXT: 'text-purple-700',
      HOVER: 'hover:bg-purple-200'
    }
  }
}; 