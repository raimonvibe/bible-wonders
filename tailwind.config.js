/** @type {import('tailwindcss').Config} */
module.exports = {
  // Both themes are dark; the toggle swaps a green mood for a blue one.
  // `dark:` is repurposed as "the ocean (blue) theme" so the two palettes stay
  // expressible as a base class plus one variant.
  darkMode: ['selector', 'html.theme-ocean'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'theme-pine':
          'linear-gradient(160deg, #1d4d3a 0%, #163d2f 55%, #0e2a20 100%)',
        'theme-ocean':
          'linear-gradient(160deg, #0a3d6b 0%, #062a4a 55%, #041d33 100%)',
        'card-pine':
          'linear-gradient(145deg, rgba(29,77,58,0.92) 0%, rgba(22,61,47,0.90) 50%, rgba(14,42,32,0.94) 100%)',
        'card-ocean':
          'linear-gradient(145deg, rgba(10,61,107,0.92) 0%, rgba(6,42,74,0.90) 50%, rgba(4,29,51,0.94) 100%)',
      },
      colors: {
        // Old Testament green. 50 is the lightest (reading text), 900 the
        // deepest (page ground) — normal Tailwind polarity on a dark surface.
        pine: {
          50: '#eaf6f0',
          100: '#cfe9dc',
          200: '#a9d6c1',
          300: '#7cbfa1',
          400: '#52a381',
          500: '#358566',
          600: '#2a6b52',
          700: '#1d4d3a',
          800: '#163d2f',
          900: '#0e2a20',
        },
        // New Testament blue, same polarity as pine.
        ocean: {
          50: '#eaf2fb',
          100: '#d0e3f6',
          200: '#a8caec',
          300: '#79ace0',
          400: '#4a8bd0',
          500: '#2a70b8',
          600: '#1a5a9e',
          700: '#0a3d6b',
          800: '#062a4a',
          900: '#041d33',
          950: '#02101f',
        },
        // Used sparingly for highlights and focus.
        accent: '#f4a261',
      },
    },
  },
  plugins: [],
}
