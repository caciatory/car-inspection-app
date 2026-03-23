import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // mobile = base (sem prefixo) — relatório público do cliente
        'tablet': '768px',   // técnico em tablet portrait
        'desktop': '1280px', // admin em desktop
      },
      colors: {
        brand: {
          purple: '#5e17eb',
          green: '#108f52',
        },
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      fontSize: {
        'input': ['16px', { lineHeight: '24px' }],
      },
    },
  },
  plugins: [],
}

export default config
