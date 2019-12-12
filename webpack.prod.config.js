const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './lib',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
  },
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'react-recurly.js',
    library: 'ReactRecurly',
    libraryTarget: 'umd'
  }
};
