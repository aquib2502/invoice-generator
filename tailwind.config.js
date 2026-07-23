/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tpf: {
          blue: '#1E40AF',
          lightBlue: '#EFF6FF',
          darkBlue: '#1E3A8A',
          accent: '#2563EB',
          gray: '#374151',
          lightGray: '#F9FAFB',
          border: '#E5E7EB',
          dark: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
