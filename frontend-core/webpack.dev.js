/* eslint-disable no-undef */
//! dev setup
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const dir = path.resolve(__dirname, '.');

// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          //STYLESHEETS processing
          //https://webpack.js.org/loaders/sass-loader/
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Resolve CSS URL paths
          'resolve-url-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      // Output
      filename: path.join(dir, 'dist/index.html'),
      // Template
      template: path.join(dir, 'src/index.html')
    })
  ],
  devServer: {
    // https://webpack.js.org/configuration/dev-server/
    static: {
      directory: path.join(dir, 'dist')
    },

    // Specifying a host to use
    host: 'localhost',
    // Specifying a port number
    //? If not available free to change
    port: 8080,

    // Enable gzip compression for everything served:
    //compress: true,

    // Enables HMR
    hot: 'only',
    liveReload: false,
    devMiddleware: {
      writeToDisk: true
    }
  }
});
