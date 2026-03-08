import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#F9F7F4',
        surface:    '#F0EDE8',
        border:     '#E5E1DB',
        primary:    '#1A1A1A',
        secondary:  '#6B6B6B',
        accent:     '#1A1A2E',
        blue:       '#2D5BE3',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        prose:   ['Lora', 'serif'],
      },
      maxWidth: {
        reading: '740px',
        layout:  '1100px',
      },
      lineHeight: {
        reading: '1.8',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            fontFamily: theme('fontFamily.prose').join(', '),
            fontSize: '1.125rem',
            lineHeight: '1.8',
            maxWidth: '740px',
            'h2, h3, h4': {
              fontFamily: theme('fontFamily.display').join(', '),
              color: theme('colors.primary'),
              fontWeight: '500',
            },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },
            'a:hover': {
              color: theme('colors.blue'),
            },
            strong: {
              color: theme('colors.primary'),
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary'),
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              color: theme('colors.primary'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
