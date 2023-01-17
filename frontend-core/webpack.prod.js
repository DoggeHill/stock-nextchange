/* eslint-disable no-undef */
//! prod setup
const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dir = path.resolve(__dirname, '.');

// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  // output: {
  //   publicPath: './'
  // },

  module: {
    rules: [
      // Transpile acoording to babel conf
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Stylesheets processing
      {
        test: /\.s[ac]ss$/,
        use: [
          // Minify css and add to separate file
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Autoprefixer
          'postcss-loader',
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
      filename: path.join(dir, 'dist/auction-house-list.html'),
      // Template
      template: path.join(dir, 'src/auction-house-list.html'),
      minify: false
    }),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      // Output
      filename: path.join(dir, 'dist/auction-house.html'),
      // Template
      template: path.join(dir, 'src/auction-house.html'),
      minify: false

    }),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      // Output
      filename: path.join(dir, 'dist/home.html'),
      // Template
      template: path.join(dir, 'src/home.html'),
      minify: false

    }),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      // Output
      filename: path.join(dir, 'dist/item.html'),
      // Template
      template: path.join(dir, 'src/item.html'),
      minify: false

    }),
    new HtmlWebpackPlugin({
      appMountId: 'app',
      // Output
      filename: path.join(dir, 'dist/user.html'),
      // Template
      template: path.join(dir, 'src/user.html'),
      minify: false

    }),

    // Optimalize stylesheets
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      // Code splitting
      chunkFilename: '[id].css'
    })
  ]
});
