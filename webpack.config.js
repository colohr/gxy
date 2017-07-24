const path = require('path')
const webpack = require('webpack')
//const OfflinePlugin = require('offline-plugin')
const output_path = path.resolve(__dirname, 'logic')
const public_path = '/modules/wwi/os/library/graph/'
module.exports = {
	entry: './source/index.js',
	output: {
		path: output_path,
		publicPath: public_path,
		filename: 'Interface.es6'
	},
	// resolveLoader: {
	// root: path.join(__dirname, 'node_modules'),
	// },
	module: {
		loaders: [
			// {
			// test: /\.js$/,
			// loader: 'babel-loader',
			// exclude: /node_modules/
			// },
			//{
			//  test: /\.(png|jpg|gif|svg)$/,
			//  loader: 'file-loader',
			//  query: {
			//    name: '[name].[ext]?[hash]'
			//  }
			//},
			//{
			//  test: /\.html$/,
			//  loader: 'wc-loader?minify=true',
			//},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	//plugins: [
	//	new OfflinePlugin()
	//],
	//devServer: {
	//	noInfo: true,
	//	proxy: {
	//		'/graphql': {
	//			target: 'http://localhost:3010',
	//			ws: true,
	//		},
	//		"/graphiql": {
	//			"target": "http://localhost:3010",
	//			"secure": false
	//		},
	//		"/login": {
	//			"target": "http://localhost:3010",
	//			"secure": false
	//		},
	//		"/logout": {
	//			"target": "http://localhost:3010",
	//			"secure": false
	//		}
	//	},
	//	// serve index.html in place of 404 responses to allow HTML5 history
	//	historyApiFallback: true,
	//},
	devtool: 'eval-source-map'
};

