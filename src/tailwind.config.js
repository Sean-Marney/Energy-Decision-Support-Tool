/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#2B344D',
        },
        'cardiff-blue': '#2B344D',
      },
      fontSize : {
        xxs: ['15px', '15px'],
      }
    },
  },
    plugins: [
        require('flowbite/plugin')
    ],
};
