var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gulpOpen = require('gulp-open');
var path = require('path');
var runSequence = require('run-sequence');

module.exports = function(gulp, options, webpackConfig, dist) {

  gulp.task('dev-preprocess', function(callback) {
    var argv = require('yargs').argv;
    if (argv.skipPreprocess) {
      callback();
    } else if (options.devPreprocess) {
      runSequence('preprocess', options.devPreprocess, callback);
    } else {
      runSequence('preprocess', callback);
    }
  });

  gulp.task('dev', ['dev-preprocess'], function() {

    var env = Object.assign({}, options.env, {
      __DEV_MODE__: true,
      NODE_ENV: "\"development\""
    });

    var devWebpackConfig = Object.assign({}, webpackConfig, {
      entry: {
        app: [
          'webpack-dev-server/client?http://' + (options.devServerHost || 'localhost')  + ':' + (options.devServerPort || '8080'),
          'webpack/hot/only-dev-server',
          './' + options.mainJs
        ]
      },

      output: {
        filename: 'index.js',
        path: dist,
        publicPath: '/'
      },

      devtool: 'eval'

    }, options.webpack || {});

    if (!devWebpackConfig.resolve) {
      devWebpackConfig.resolve = {};
    }

    if (!devWebpackConfig.resolveLoader) {
      devWebpackConfig.resolveLoader = {};
    }

    devWebpackConfig.module.loaders = webpackConfig.module.loaders;
    if (options.webpack.module && options.webpack.module.loaders) {
      options.webpack.module.loaders.forEach(function(loader) {
        devWebpackConfig.module.loaders.push(loader);
      });
    }

    devWebpackConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(env)
    ];

    if (options.webpack.plugins) {
      options.webpack.plugins.forEach(function(plugin) {
        devWebpackConfig.plugins.push(plugin);
      });
    }

    devWebpackConfig.resolve.extensions = Object.assign(devWebpackConfig.resolve.extensions || [],
      ['', '.js', '.json', '.htm', '.html', '.scss', '.md', '.svg']);

    devWebpackConfig.resolve.modulesDirectories = Object.assign(devWebpackConfig.resolve.modulesDirectories || [],
      ['node_modules/grommet/node_modules', 'node_modules']);

    devWebpackConfig.resolveLoader.modulesDirectories = Object.assign(devWebpackConfig.resolveLoader.modulesDirectories || [],
      ['node_modules/grommet/node_modules', 'node_modules']);

    var devServerConfig = {
      contentBase: dist,
      hot: options.devServerDisableHot ? false : true,
      inline: true,
      stats: {
        colors: true
      },
      publicPath: devWebpackConfig.output.publicPath,
      historyApiFallback: true
    };

    if (options.watchOptions) {
      devServerConfig.watchOptions = options.watchOptions;
    }

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

      if (req.url.match(/.+\/img\//)) { // img
        res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, '/$1'));
      } else if (req.url.match(/\/img\//)) { // img
        next();
      } else if (req.url.match(/.+\/video\//)) { // video
        res.redirect(301, req.url.replace(/.*\/(video\/.*)$/, '/$1'));
      } else if (req.url.match(/\/video\//)) { // video
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
        var suffix = options.publicPath ? options.publicPath + '/' : '';
        var openURL = 'http://' + openHost + ':' + options.devServerPort + '/webpack-dev-server/' + suffix;
        gulp.src(path.join(dist, 'index.html'))
        .pipe(gulpOpen({
          uri: openURL
        }));
      }
    });

    server.app.get('/reload', function(req, res) {
      // Tell connected browsers to reload.
      server.sockWrite(server.sockets, 'ok');
      res.sendStatus(200);
    });

    server.app.get('/invalid', function(req, res) {
      // Tell connected browsers some change is about to happen.
      server.sockWrite(server.sockets, 'invalid');
      res.sendStatus(200);
    });

  });
};
