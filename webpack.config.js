const path = require('path')
const output_path = path.resolve(__dirname, 'logic')
const public_path = '/components/struct/logic/'
module.exports = {
	entry: './source/index.js',
	output: {
		path: output_path,
		publicPath: public_path,
		filename: 'Interface.es6'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	devtool: 'eval-source-map'
}

