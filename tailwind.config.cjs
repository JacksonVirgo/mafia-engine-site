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

				dmIcon: 'url(/../icon_dm.png)',
				msIcon: 'url(/../icon_ms.png)',
				betrayalIcon: 'url(/../icon_betrayal.png)',
			},
			width: {
				centermodal: '425px',
			},
			height: {
				centermodal: '425px',
			},
		},
	},
	plugins: [],
};
