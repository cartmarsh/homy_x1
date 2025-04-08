import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileImage from '../ProfileImage';

// Mock the hooks used in the component
jest.mock('../../../hooks/useProfileAnimation', () => ({
  __esModule: true,
  default: () => ({ containerAnimation: {} }),
}));

jest.mock('../../../hooks/useProfileHoverEffect', () => ({
  __esModule: true,
  default: () => ({
    showBubble: false,
    isExiting: false,
    scale: 1,
    handleMouseEnter: jest.fn(),
    handleMouseLeave: jest.fn(),
  }),
}));

jest.mock('../../../hooks/useTimeBasedGreeting', () => ({
  __esModule: true,
  default: () => 'Hello!',
}));

jest.mock('../../../hooks/useImageLoad', () => {
  return {
    __esModule: true,
    default: ({ src }: { src: string }) => {
      // Return different states that we can control in the tests
      if (src === 'loading.jpg') {
        return {
          isLoading: true,
          hasError: false,
          handleImageLoad: jest.fn(),
          handleImageError: jest.fn(),
        };
      } else if (src === 'error.jpg') {
        return {
          isLoading: false,
          hasError: true,
          handleImageLoad: jest.fn(),
          handleImageError: jest.fn(),
        };
      } else {
        return {
          isLoading: false,
          hasError: false,
          handleImageLoad: jest.fn(),
          handleImageError: jest.fn(),
        };
      }
    },
  };
});

// Mock framer-motion to avoid issues in tests
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock the SpeechBubble component
jest.mock('../SpeechBubble', () => ({
  __esModule: true,
  default: () => <div data-testid="speech-bubble">Speech Bubble</div>,
}));

describe('ProfileImage', () => {
  it('should show loading spinner when image is loading', () => {
    render(<ProfileImage imageSrc="loading.jpg" alt="Test" />);
    
    // Check if loading spinner is visible
    expect(screen.getByRole('img')).toHaveClass('opacity-0'); // Image should be transparent
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should show error state when image fails to load', () => {
    render(<ProfileImage imageSrc="error.jpg" alt="Test" />);
    
    // Check if error message is visible
    expect(screen.getByRole('img')).toHaveClass('opacity-100'); // Image should be visible
    expect(document.querySelector('svg')).toBeInTheDocument(); // Error icon
  });

  it('should display image properly when loaded successfully', () => {
    render(<ProfileImage imageSrc="success.jpg" alt="Test" />);
    
    // Image should be visible and loading/error states should not
    expect(screen.getByRole('img')).toHaveClass('opacity-100');
    expect(screen.getByRole('img').getAttribute('src')).toBe('success.jpg');
    expect(document.querySelector('.animate-spin')).not.toBeInTheDocument();
    expect(document.querySelector('svg')).not.toBeInTheDocument();
  });
}); 