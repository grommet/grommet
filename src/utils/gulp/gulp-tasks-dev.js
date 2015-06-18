var assign = require('object-assign');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function(gulp, options, webpackConfig, dist) {
  gulp.task('dev', ['preprocess'], function() {

    var env = assign({}, options.env, {
      __DEV_MODE__: true
    });

    var devWebpackConfig = assign({}, webpackConfig, options.webpack || {}, {
      entry: {
        app: ['webpack/hot/dev-server', './' + options.mainJs]
      },

      output: {
        filename: 'index.js',
        path: dist,
        publicPath: '/'
      },

      devtool: 'inline-source-map',

      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(env)
      ]

    });

    if (!devWebpackConfig.resolve) {
      devWebpackConfig.resolve = {};
    }

    if (options.webpack.module && options.webpack.module.loaders) {
      webpackConfig.module.loaders.forEach(function(loader) {
        devWebpackConfig.module.loaders.push(loader);
      });
    }

    devWebpackConfig.resolve.extensions = ['', '.js', '.json', '.htm', '.html', '.scss'];

    var devServerConfig = {
      contentBase: dist,
      hot: true,
      inline: true,
      stats: {
        colors: true
      },
      publicPath: devWebpackConfig.output.publicPath,
      historyApiFallback: true
    };

    if (options.devServerProxy) {
      devServerConfig.proxy = options.devServerProxy;
    }

    var server = new WebpackDevServer(webpack(devWebpackConfig), devServerConfig);
    server.use('/', function(req, res, next) {

      if (req.url.match(/.+index.js$/)) {
        res.redirect(301, '/index.js');
      } else if (req.url.match(/.+\/img\//)) { // img
        res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, '/$1'));
      } else if (req.url.match(/\/img\//)) { // img
        next();
      } else if (req.url.match(/.+\/font\//)) { // font
        res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, '/$1'));
      } else if (req.url.match(/\/font\//)) { // font
        next();
      } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
        res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, '/$1'));
      } else {
        next();
      }
    });

    var host = options.devServerHost || 'localhost';

    server.listen(options.devServerPort || 8080, host, function(err) {
      if (err) {
        console.error('[webpack-dev-server] failed to start:', err);
      } else {
        console.log('[webpack-dev-server] started:', 'Browse to http://' + host + ':' +
          options.devServerPort + '/webpack-dev-server/');
      }
    });

  });
};
