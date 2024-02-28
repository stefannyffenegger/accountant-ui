import type { Config } from "tailwindcss"

const config = {
  darkMode: "media",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/preline/preline.js',
	],
  // https://preline.co/docs/theme.html
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
} satisfies Config

export default config