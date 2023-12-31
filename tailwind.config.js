/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			colors: {
				custom: {
					teal: { DEFAULT: '#628681', dark: '#3f726b' }
				}
			},
			backdropBlur: {
				xs: '2px'
			}
		}
	},
	plugins: [
		require('tailwind-children'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('tailwind-scrollbar')({ nocompatible: true })
	]
};
