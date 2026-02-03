/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                'serif': ['Mastercard Mark', 'Inter', 'system-ui', 'sans-serif'],
                'sans': ['Mastercard Mark', 'Inter', 'system-ui', 'sans-serif'],
            }
        }
    },
    plugins: []
};