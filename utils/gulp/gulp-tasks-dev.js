var merge = require('lodash/object/merge');
var extend = require('lodash/object/extend');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var open = require('gulp-open');
var path = require('path');
var runSequence = require('run-sequence');

module.exports = function(gulp, options, webpackConfig, dist) {

  gulp.task('dev-preprocess', function(callback) {
    if (options.devPreprocess) {
      runSequence('preprocess', options.devPreprocess, callback);
    } else {
      runSequence('preprocess', callback);
    }
  });

  gulp.task('dev', ['dev-preprocess'], function() {

    var env = merge({}, options.env, {
      __DEV_MODE__: true
    });

    var devWebpackConfig = extend({}, webpackConfig, options.webpack || {}, {
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

    if (options.webpack.plugins) {
      options.webpack.plugins.forEach(function(plugin) {
        devWebpackConfig.plugins.push(plugin);
      });
    }

    devWebpackConfig.resolve.extensions = merge(devWebpackConfig.resolve.extensions || [],
      ['', '.js', '.json', '.htm', '.html', '.scss', '.md']);

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

      var acceptLanguageHeader = req.headers['accept-language'];

      if (acceptLanguageHeader) {
        var acceptedLanguages = acceptLanguageHeader.match(/[a-zA-z\-]{2,10}/g);
        if (acceptedLanguages) {
          res.cookie('languages', JSON.stringify(acceptedLanguages));
        }
      }

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

    // Always open on all ports unless overridden
    var host = options.devServerHost || '0.0.0.0';

    server.listen(options.devServerPort || 8080, host, function(err) {
      if (err) {
        console.error('[webpack-dev-server] failed to start:', err);
      } else {
        var openHost = (host === '0.0.0.0') ? 'localhost' : host;
        console.log('[webpack-dev-server] started: opening the app in your default browser...');
        gulp.src(path.join(dist, 'index.html'))
        .pipe(open({
          uri: 'http://' + openHost + ':' + options.devServerPort + '/webpack-dev-server/'
        }));
      }
    });

  });
};
