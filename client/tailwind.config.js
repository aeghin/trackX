/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx,tsx}',
];

// export const theme = {
//   colors: {
//     'slate': '#94a3b8',
//   }
// };
export const plugins = [require("tailwindcss-animate")];