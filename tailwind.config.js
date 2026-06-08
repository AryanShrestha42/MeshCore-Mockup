/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mc: {
          blue: '#0052CC',
          'blue-dark': '#0747A6',
          'blue-light': '#DEEBFF',
          navy: '#172B4D',
          dark: '#253858',
          medium: '#42526E',
          subtle: '#6B778C',
          border: '#DFE1E6',
          bg: '#F4F5F7',
          success: '#00875A',
          'success-light': '#E3FCEF',
          warning: '#FF8B00',
          'warning-light': '#FFFAE6',
          danger: '#DE350B',
          'danger-light': '#FFEBE6',
          amber: '#FF991F',
          'amber-light': '#FFF0B3',
          purple: '#6554C0',
          'purple-light': '#EAE6FF',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(9,30,66,0.13), 0 0 0 1px rgba(9,30,66,0.08)',
        'card-hover': '0 4px 8px rgba(9,30,66,0.2), 0 0 0 1px rgba(9,30,66,0.08)',
        overlay: '0 8px 16px rgba(9,30,66,0.3)',
      },
    },
  },
  plugins: [],
}
