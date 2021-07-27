const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			// Simulate the removal of files
			dry: true,
			// Write Logs to Console
			verbose: true,
			// Automatically remove all unused webpack assets on rebuild
			cleanStaleWebpackAssets: true,
			protectWebpackAssets: false,
		}),
		new MiniCssExtractPlugin({ filename: '[name].css' }),
		new WorkboxPlugin.GenerateSW(),
	],
	optimization: {
		minimizer: [new TerserPlugin({}), new CssMinimizerPlugin({})],
	},
});
