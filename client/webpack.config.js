const path = require('path')
const webpack = require('webpack')
const output_path = path.resolve(__dirname, 'logic')
const public_path = '/modules/wwi/library/graph/'
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
};

