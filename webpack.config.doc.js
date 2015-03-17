// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var webpack = require('webpack');
var path = require('path');
var sass = require('gulp-ruby-sass');

var config = {

  output: {
    path: "./dist/doc",
    filename: 'index.js'
  },

  resolve: {
    root: path.resolve(__dirname, 'src/js/doc')
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader'
      }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

};

module.exports = config;
