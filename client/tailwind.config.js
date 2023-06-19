/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#8fd3f4',
				secondary: '#b9d6a8',
				tertiary: '#d3d3d3',
				accent: '#365a8c',
				background: '#f8f8f8',
				text: '#333333',
				button_active: '#81bedc',
			},
		},
	},
	plugins: [],
};
