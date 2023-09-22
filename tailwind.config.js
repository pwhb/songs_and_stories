/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	safelist: [
		{
			pattern: /rotate-\[[1-8][0-9]deg\]/,
		},
	],
};
