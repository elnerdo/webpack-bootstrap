const webpack = require('webpack');
const common = require('./webpack.config.common.js');

const prodConfig = Object.assign({}, common, {
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process_env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
});

module.exports = prodConfig;
