/* eslint-disable no-undef */
// BASIC
const path = require('path');
const webpack = require('webpack');

// Store ABSOLUTE path into a variable
const dir = path.resolve(__dirname, '.');

// Dashboard
const webpackDashboard = require('webpack-dashboard/plugin');

// Analyze our bundles
// https://github.com/webpack-contrib/webpack-bundle-analyzer
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// MOTD
console.log('\x1b[36m%s\x1b[0m', 'FE CORE BUILD\nBy DoggeHill\n\n');

const config = {
  entry: './src/js/index.js',
  output: {
    path: dir + '/dist',
    // content hash adds hash to the end to ensure the file name changes everytime we compile
    filename: '[name].[contenthash:4].js',
    // delete old files on build
    clean: true

    // when something generate url path, defines, specified in prod/ dev
    // where it starts https://webpack.js.org/guides/public-path/
  },

  //! MODULES (specified in prod/dev)
  module: {
    rules: [
      // File loader
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: './images/[name].[contenthash:4][ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name].[contenthash:4].[ext]'
        }
      },
      {
        test: /\.svg$/,
        // Since previous rule reads SVG files we exclude this dir
        exclude: dir + '/fonts',
        // We read scg files with this:
        use: ['@svgr/webpack']
      }
    ]
  },

  //! PLUGINS
  plugins: [
    new webpackDashboard(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],

  //! OPTIMALIZATION
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = config;
