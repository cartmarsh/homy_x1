/** @type {import('tailwindcss').Config} */


// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        drawLine: {
          '0%': {
            opacity: 0,
            pathLength: 0
          },
          '100%': {
            opacity: 0.9,
            pathLength: 1
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        sectionFade: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(2rem)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.5rem)' }
        }
      },
      animation: {
        drawLine: 'drawLine 12s ease-in-out forwards',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'section-entrance': 'sectionFade 0.8s ease-out forwards',
        'section-float': 'subtleFloat 6s ease-in-out infinite',
      },
      colors: {
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
        string: {
          pink: '#FFC0CB',
          blue: '#B0E0E6',
          purple: '#E6E6FA',
          rose: '#FFE4E1',
          sky: '#87CEEB'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ["Inter", "sans-serif"], // Use Inter or replace with preferred font
        cormorant: ['Cormorant Garamond', 'sans-serif'],
        
      },
      backgroundImage: {
        'section-gradient': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
      },
      extend: {
        '.section-base': {
          '@apply relative min-h-screen w-full': {},
          '@apply bg-gradient-to-br from-cream/90 to-peach/80': {},
          '@apply px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24': {},
          '@apply animate-section-entrance': {},
          
          // Container styling
          '& > .container': {
            '@apply max-w-7xl mx-auto relative': {},
            '@apply flex flex-col lg:flex-row items-center gap-8 lg:gap-16': {},
          },
          
          // Section headers
          '& h2': {
            '@apply text-3xl sm:text-4xl lg:text-5xl font-bold': {},
            '@apply text-gray-800 mb-6': {},
            '@apply font-montserrat': {},
          },
          
          // Content wrappers
          '& .content-wrapper': {
            '@apply bg-white/40 backdrop-blur-sm': {},
            '@apply rounded-2xl shadow-lg': {},
            '@apply p-6 sm:p-8 lg:p-10': {},
            '@apply transition-all duration-300': {},
            '@apply hover:shadow-xl hover:scale-[1.01]': {},
          }
        }
      },
      zIndex: {
        '300': '300', // Add custom z-index value
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.section-base': {
          '@apply relative min-h-screen w-full': {},
          '@apply bg-gradient-to-br from-cream/90 to-peach/80': {},
          '@apply px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24': {},
          '@apply animate-section-entrance': {},
          
          // Container styling
          '& > .container': {
            '@apply max-w-7xl mx-auto relative': {},
            '@apply flex flex-col lg:flex-row items-center gap-8 lg:gap-16': {},
          },
          
          // Section headers
          '& h2': {
            '@apply text-3xl sm:text-4xl lg:text-5xl font-bold': {},
            '@apply text-gray-800 mb-6': {},
            '@apply font-montserrat': {},
          },
          
          // Content wrappers
          '& .content-wrapper': {
            '@apply bg-white/40 backdrop-blur-sm': {},
            '@apply rounded-2xl shadow-lg': {},
            '@apply p-6 sm:p-8 lg:p-10': {},
            '@apply transition-all duration-300': {},
            '@apply hover:shadow-xl hover:scale-[1.01]': {},
          }
        }
      })
    }
  ],
};




