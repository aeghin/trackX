// /** @type {import('tailwindcss').Config} */
// export const content = [
//   './src/**/*.{js,jsx,tsx}',
// ];


// export const plugins = [require("tailwindcss-animate")];

// ES6 syntax for exporting configuration
/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx,tsx}',
];

export const plugins = [require('tailwindcss-animate')];

export const extend = {
  animation: {
    'swoop-in': 'swoopIn 1s ease-out forwards',
    'swoop-in-left': 'swoopInLeft 1s ease-out forwards',
    'swoop-in-right': 'swoopInRight 1s ease-out forwards',
  },
  keyframes: {
    swoopIn: {
      '0%': { opacity: '0', transform: 'translate3d(0, 100%, 0)' },
      '50%': { opacity: '0.5', transform: 'translate3d(0, -10%, 0)' },
      '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
    },
    swoopInLeft: {
      '0%': { opacity: '0', transform: 'translateX(-100%)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    swoopInRight: {
      '0%': { opacity: '0', transform: 'translateX(100%)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
  },
};


export default {
  content,
  plugins,
  theme: {
    extend,
  },
};
