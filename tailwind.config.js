/** @type {import('tailwindcss').Config} */


// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Use Inter or replace with preferred font
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};


