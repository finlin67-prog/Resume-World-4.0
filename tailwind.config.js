/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Career World Theme Colors
        'zone-abm': '#7c3aed',
        'zone-revops': '#475569',
        'zone-martech': '#0d9488',
        'zone-demandgen': '#16a34a',
        'zone-onboarding': '#0ea5e9',
        'zone-gtmstack': '#eab308',
      },
    },
  },
  plugins: [],
}
