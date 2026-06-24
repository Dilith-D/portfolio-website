import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#F4F0E8',
        surface:    '#EAE5DA',
        border:     '#E8E3D9',
        primary:    '#1C1814',
        secondary:  '#7A7268',
        blue:       '#2D5BE3',
        electric:   '#0066FF',
        red:        '#FF2D2D',
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
      typography: () => ({
        DEFAULT: {
          css: {
            color: '#1C1814',
            fontFamily: 'Lora, serif',
            fontSize: '1.125rem',
            lineHeight: '1.8',
            maxWidth: '740px',
            'h2, h3, h4': {
              fontFamily: 'Cabinet Grotesk, sans-serif',
              color: '#1C1814',
              fontWeight: '500',
            },
            a: {
              color: '#1C1814',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            },
            'a:hover': {
              color: '#2D5BE3',
            },
            strong: {
              color: '#1C1814',
              fontWeight: '600',
            },
            blockquote: {
              borderLeftColor: '#1C1814',
              borderLeftWidth: '3px',
              fontStyle: 'italic',
              color: '#1C1814',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
