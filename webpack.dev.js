const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require(‘workbox-webpack-plugin’)
// const path = require('path');
module.exports = merge(common, {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [new Dotenv(),new WorkboxPlugin.generateSW()],

});
