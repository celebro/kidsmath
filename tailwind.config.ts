import type { Config } from 'tailwindcss';

export default {
    content: ['./app/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class'],
    theme: {
        extend: {
            colors: {
                yellow: '#ffc600',
                blue: 'cornflowerblue',
                red: 'tomato',
                green: 'greenyellow'
            }
        }
    }
} satisfies Config;
