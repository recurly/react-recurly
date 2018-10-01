var path = require('path');

module.exports = {
  entry: './index',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js')
  }
};
