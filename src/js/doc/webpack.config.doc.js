// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var webpack = require('webpack');

var config = {

  output: {
    library: "ligo-doc",
    libraryTarget: "umd"
  },

  externals: [
    {
      "react": "umd react",
      "react-router": "umd react-router",
      "react-time": "umd react-time",
      "react-gravatar": "umd react-gravatar",
      "flux": "umd flux",
      "lodash": "umd lodash",
      "superagent": "umd superagent",
      "mirrorkey": "umd mirrorkey",
      "cookies-js": "umd cookies-js",
      "events": "umd events"
    }
  ],

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
