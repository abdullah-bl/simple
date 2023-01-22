/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'media',
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
	],
}
