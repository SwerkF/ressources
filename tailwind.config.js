/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
		themes: [
			"light",
			"dark",
			"cupcake",
		  {
			mytheme: {
          
				"primary": "#292524",
						 
				"secondary": "#c4b5fd",
						 
				"accent": "#fecaca",
						 
				"neutral": "#111827",
						 
				"base-100": "#F5F5F5",
						 
				"info": "#7dd3fc",
						 
				"success": "#4ade80",
						 
				"warning": "#fde047",
						 
				"error": "#e90046",
			},
		  },
		],
  },
  plugins: [require("daisyui")],
}

