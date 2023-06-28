const devConfig = {
	cors: {
		credentials: true,
		origin: ['http://localhost:3000', 'http://localhost:3001'],
		optionsSuccessStatus: 200,
	},
	errorMessage: (err) => JSON.stringify(err.message) || 'Internal Server Error',
	mongodbUri: 'mongodb://localhost/blog',
}

const prodConfig = {
	cors: {
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://www.blogs.m3rashid.in',
		],
		optionsSuccessStatus: 200,
	},
	errorMessage: 'Internal Server Error',
	mongodbUri: `mongodb://localhost/cubicle`,
}

const isProduction = process.env.NODE_ENV === 'production'
const startLog = (port) => `Ready on port:${port}, env:${process.env.NODE_ENV}`

const appConfig = isProduction ? prodConfig : devConfig

module.exports = {
	isProduction,
	startLog,
	appConfig,
}
