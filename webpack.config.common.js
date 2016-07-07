const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client/main.js'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'rename_me.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: '/node_modules/'
      }
    ]
  }
};
