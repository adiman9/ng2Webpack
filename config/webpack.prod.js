const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].chunk.js'
  },

  htmlLoader: {
    minimize: false // workaround for ng2
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      // Don't beautify output (enable for neater output)
      beautify: false,
      // Eliminate comments
      comments: false,
      // Compression specific options
      compress: {
        warnings: false,
        // Drop `console` statements
        drop_console: true
      },
      mangle: {
        except: ['$', 'webpackJsonp'],
        screw_ie8 : true,
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new PurifyCSSPlugin({
        basePath: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
