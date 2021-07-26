const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');
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
	plugins: [new Dotenv()],
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		port: 3000,
	},
});
