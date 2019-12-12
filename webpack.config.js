const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    demo: ['./demo/index.js'],
  },
  mode: 'development',
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: './demo/index.html',
    })
  ],
  devServer: {
    disableHostCheck: true,
    host: 'react-recurly-demo.lvh.me'
  },
  devtool: 'inline-source-map'
};
