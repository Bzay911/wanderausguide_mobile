/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./app/**/*.{js,jsx,ts,tsx}",    // ← Add this for Expo Router
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
   presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        'inter-bold': ['Inter-Bold'],
        'inter-medium': ['Inter-Medium'],
        'inter-regular': ['Inter-Regular']

      }
    },
  },
  plugins: [],
}

