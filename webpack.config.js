// Webpack
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// PostCSS
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');
var cssFor = require('postcss-for');
var mathjs = require('postcss-mathjs');
var mixins = require('postcss-mixins');
var nested = require('postcss-nested');
var vars = require('postcss-advanced-variables');

module.exports = {

  entry: './src/main.js',

  output: {
    path: './dist',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015'
          ]
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1&limit=500000',
          'postcss-loader'
        ]
      }
    ]
  },

  postcss: function () {
    return [
      atImport({ from: 'css/style.css' }),
      mixins,
      vars,
      nested,
      cssFor,
      mathjs,
      autoprefixer({ browsers: ['last 2 versions', '> 5%'] })
    ];
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]

}
