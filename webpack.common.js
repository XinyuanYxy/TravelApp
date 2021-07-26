const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	devtool: 'source-map',
	stats: 'verbose',
	module: {
		rules: [
			{
				test: '/.js$/',
				exclude: /node_modules/,
				loader: 'babel-loader',
			},

			{
				test: /\.html$/,
				use: ['html-loader'],
			},

			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[hash].[ext]',
						outputPath: 'imgs',
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/client/views/index.html',
			filename: './index.html',
		}),
	],
	output: {
		libraryTarget: 'var',
		library: 'Client',
	},
};
