const pkg = require('./package')
require('dotenv').config()

module.exports = {
	mode: 'universal',

	/*
  ** Headers of the page
  */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },

	/*
  ** Global CSS
  */
	css: [
		'@/assets/css/salesforce-lightning-design-system.min.css',
		'@/assets/css/main.scss'
	],

	/*
  ** Plugins to load before mounting the App
  */
	plugins: ['~plugins/filters.js', '~plugins/axios-injector.js'],

	/*
  ** Nuxt.js modules
  */
	modules: ['@nuxtjs/axios'],

	axios: {
		withCredentials: true
	},

	env: {
		API_URL: process.env.API_URL || 'http://localhost:8080',
		API_URL_BROWSER: process.env.API_URL_BROWSER || 'http://localhost:8080'
	},

	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	}
}
