// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var webpack = require("webpack");

var config = {
  resolve: {
    root: [__dirname + '/node_modules'],
    alias: {
      //"index.scss": "../scss/index.scss",
      "index.css": "../../dist/css/index.css"
    }
  },
  output: {
    path: "./dist",
    filename: "index.js"
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: "jsx-loader" },
      { test: /\.svg$/, loaders: ["raw-loader"]},
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.css$/, loader: "style!css" }
      /*
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: "style!css!sass?outputStyle=nested&" +
          "includePaths[]=" + __dirname + "/src/scss&" +
          __dirname + "/node_modules/ligo-core/src/scss&" +
          __dirname + "/node_modules/ligo-index/src/scss"
      }
      */
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};

//console.log('!!!', config);

module.exports = config;
