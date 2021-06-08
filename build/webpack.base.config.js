'use strict';

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist/main'),
    filename: '[name].js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin(
      [
        'assets'
      ],
    ),
  ],
};
