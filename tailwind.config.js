import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/assets/**/*.svg',
        './resources/css/**/*.css',
        'node_modules/preline/dist/*.js',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        'node_modules/@headlessui/react/**/*.{js,jsx,ts,tsx}',
        'node_modules/@headlessui/tailwindcss/**/*.{js,jsx,ts,tsx}'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            brightness: {
                25: '.25',
                35: '.35',
                40: '.40',
            },
        },
        colors: {
            container: 'var(--container_background)',
            light_container: 'var(--light_container)'
        }
    },

    plugins: [
        forms,
        require('preline/plugin'),
        require('flowbite/plugin')
    ],
};
