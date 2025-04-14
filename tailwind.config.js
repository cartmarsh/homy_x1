/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        body: ['var(--font-body)'],
        poetsen: ['Poetsen One', 'cursive'],
        josefin: ['Josefin Sans', 'sans-serif'],
        pixel: ['Press\\ Start\\ 2P', 'cursive'],
        mono: ['Space\\ Mono', 'monospace'],
      },
      colors: {
        background: {
          start: '#FFD700',  // yellow gradient start
          middle: '#FFE55C', // yellow gradient middle
          end: '#9370DB',    // purple gradient end
        },
        //2 red
        deepRed: 'rgb(116, 9, 56)', // new color
        brightRed: 'rgb(175, 23, 64)', // new color
        softRed: 'rgb(204, 43, 82)', // new color
        lightRed: 'rgb(222, 124, 125)', // new color

        //1 creamy
        skyBlue: 'rgb(183, 224, 255)',
        cream: 'rgb(255, 245, 205)',
        peach: 'rgb(255, 207, 179)',
        salmon: 'rgb(231, 143, 129)',
        // Custom Colors for "Cool Blues and Neutral Grays"
        primaryBlue: {
          50: "#E8F2FB",
          100: "#D0E5F7",
          200: "#A1CAF0",
          300: "#71AFEA",
          400: "#4193E3", // slightly muted blue
          500: "#1678DC", // primary blue shade
          600: "#1261B0",
          700: "#0D4985",
          800: "#093259",
          900: "#04192D",
        },
        neutralGray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF", // light gray for backgrounds or dividers
          500: "#6B7280", // default gray for text
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        // Additional accent colors (optional) for buttons or highlights
        accentBlue: "#5A9FED", // brighter accent blue for CTA or hover
        darkGray: "#333A47", // darker gray for contrast or text emphasis

        // New colors to add
        tealGreen: 'rgb(13, 124, 102)', // new color
        lightTeal: 'rgb(65, 179, 162)', // new color
        paleTurquoise: 'rgb(189, 232, 202)', // new color
        lavenderMist: 'rgb(215, 195, 241)', // new color
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      screens: {
        'xs': '480px',
      },
      // Adding rem-based configuration
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      borderWidth: {
        DEFAULT: '0.0625rem',
        '0': '0',
        '2': '0.125rem',
        '3': '0.1875rem',
        '4': '0.25rem',
        '8': '0.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        sm: '0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.1), 0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.06)',
        md: '0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)',
        lg: '0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1), 0 0.25rem 0.375rem -0.125rem rgba(0, 0, 0, 0.05)',
        xl: '0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1), 0 0.5rem 0.625rem -0.1875rem rgba(0, 0, 0, 0.04)',
        '2xl': '0 1.5625rem 3.125rem -0.625rem rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
    },
  },
  plugins: [],
}


