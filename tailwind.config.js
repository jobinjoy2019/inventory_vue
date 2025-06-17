export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Lato', 'sans-serif'],
        subtitle: ['IBM Plex Serif', 'serif'],
        title: ['Playfair Display', 'serif'],
      },
      colors: { primary: '#6F7CEF', secondary: '#60a5fa' },
          borderRadius: {
            'none': '0px',
            'sm': '4px',
            DEFAULT: '8px',
            'md': '12px',
            'lg': '16px',
            'xl': '20px',
            '2xl': '24px',
            '3xl': '32px',
            'full': '9999px',
            'button': '8px'
          },
    },
  plugins: [],
  }
}
