import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif']
      },
      colors: {
        ink: '#181716',
        muted: '#6f6a63',
        paper: '#fbfaf8',
        line: '#e7e2dc',
        accent: '#2f6f68',
        ember: '#9d4f35'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(24, 23, 22, 0.08)'
      }
    }
  },
  plugins: [typography]
}
