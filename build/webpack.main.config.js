const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge.smart(baseConfig, {
	target: 'electron-main',
	entry: {
		main: './main/index.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
    new CopyPlugin(
      [
        'assets'
      ],
    ),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
		}),
	],
	mode: 'development',
})
