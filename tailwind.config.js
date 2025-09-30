/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4500',
        secondary: '#0079D3',
        success: '#46D160',
        warning: '#FFB000',
        danger: '#EA0027',
        dark: '#1A1A1B',
        light: '#FFFFFF',
        reddit: {
          orange: '#FF4500',
          blue: '#0079D3',
          background: '#DAE0E6',
          card: '#FFFFFF',
          border: '#EDEFF1'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
