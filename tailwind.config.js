/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo-matched palette: warm peach → terracotta → caramel → dark brown
        cream: {
          50:  '#FFFDFA',
          100: '#FEFAF5',
          200: '#FEF5EB',
          300: '#FDEDD6',
          400: '#FBE0BA',
          500: '#F8D1A0',
        },
        peach: {
          100: '#FEF5EB',
          200: '#FBE0BA',
          300: '#F8C89B',  // logo dominant peach #e0a080 area
          400: '#F0A878',  // logo terracotta-peach #e08060
          500: '#E08860',  // logo terracotta #e08060
          600: '#C07050',  // logo deep terracotta #c08060
          700: '#A05840',  // logo brown #a06040
          800: '#804028',  // logo deep brown #804020
          900: '#602818',  // logo darkest #602000
        },
        caramel: {
          100: '#F5E6D3',
          200: '#E0C0A0',  // logo beige #e0c0a0
          300: '#C0A080',  // logo tan #c0a080
          400: '#A08060',  // logo warm brown #a08060
          500: '#806040',  // logo mid brown #806040
          600: '#604020',  // logo dark brown #604020
          700: '#402818',  // logo deep #402000
          800: '#281008',
          900: '#180800',
        },
        honey: {
          100: '#FFF5E0',
          200: '#FFE8B8',
          300: '#F8D898',  // #e0c080 logo gold
          400: '#F0C870',
          500: '#E0B050',  // #e0a060 logo honey
          600: '#C89838',
          700: '#A07828',
        },
        rose: {
          100: '#FFF0EE',
          200: '#FFD8D4',
          300: '#F8B8B0',
          400: '#F09088',
          500: '#E07068',  // logo rose-terracotta #c06060
          600: '#C05048',
          700: '#A03830',
        },
        sage: {
          100: '#EEF5EE',
          200: '#D4E8D4',
          300: '#B0D4B0',
          400: '#88C088',
          500: '#60A060',
        },
        warm: {
          white: '#FFFDFA',
          cream: '#FEFAF5',
          peach: '#FDEDD6',
          pink: '#FFE8E0',
          orange: '#F0A878',
          brown: '#804028',
        },
        // Disney-style outline color from logo
        outline: {
          DEFAULT: '#200800',
          soft: '#402818',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(128, 64, 40, 0.06)',
        'soft-lg': '0 8px 40px rgba(128, 64, 40, 0.10)',
        'glow': '0 0 30px rgba(240, 168, 120, 0.25)',
        'glow-peach': '0 0 40px rgba(248, 200, 155, 0.30)',
        'inner-soft': 'inset 0 2px 8px rgba(128, 64, 40, 0.04)',
        'card': '0 4px 24px rgba(128, 64, 40, 0.05), 0 1px 4px rgba(128, 64, 40, 0.03)',
        'card-hover': '0 12px 40px rgba(128, 64, 40, 0.10), 0 4px 12px rgba(128, 64, 40, 0.05)',
        'disney': '0 4px 0 rgba(32, 8, 0, 0.15)',  // Disney-style cartoon shadow
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'draw': 'draw 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.95)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        draw: {
          '0%, 100%': { strokeDashoffset: '1000' },
          '50%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
