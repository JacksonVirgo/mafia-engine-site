/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				roboto: 'Roboto, "Open Sans", Helvetica, sans-serif',
			},
			backgroundImage: {
				survival: "url('/../headerimage.png')",
				polygon: "url('/../polygon.png')",
				'polygon-reverse': "url('/../polygon-reverse.png')",

				dmIcon: 'url(/../icon_dm.png)',
				msIcon: 'url(/../icon_ms.png)',
				betrayalIcon: 'url(/../icon_betrayal.png)',
			},
			width: {
				centermodal: '550px',
			},
			height: {
				centermodal: '550px',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
