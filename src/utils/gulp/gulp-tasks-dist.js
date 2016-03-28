var runSequence = require('run-sequence');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var deepAssign = require('deep-assign');

module.exports = function(gulp, options, webpackConfig, dist) {

  gulp.task('dist-preprocess', function(callback) {
    var argv = require('yargs').argv;
    if (argv.skipPreprocess) {
      callback();
    } else if (options.distPreprocess) {
      if (process.env.CI) {
        runSequence('preprocess', options.distPreprocess, 'copy', callback);
      } else {
        runSequence('preprocess', options.distPreprocess, 'copy', 'test', callback);
      }
    } else {
      if (process.env.CI) {
        runSequence('preprocess', callback);
      } else {
        runSequence('preprocess', 'test', callback);
      }
    }
  });

  gulp.task('dist', ['dist-preprocess'], function() {
    var env = deepAssign({
      __DEV_MODE__: false,
      NODE_ENV: "\"production\"",
      'process.env.NODE_ENV': '"production"'
    }, options.env);

    var plugins = [
      new webpack.DefinePlugin(env),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ];

    var argv = require('yargs').argv;

    if (!argv.skipMinify) {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }));
    }

    var config = deepAssign({
      plugins: plugins
    }, webpackConfig, options.webpack || {});

    if (!config.resolve) {
      config.resolve = {};
    }

    if (!config.resolveLoader) {
      config.resolveLoader = {};
    }

    if (options.webpack.module && options.webpack.module.loaders) {
      webpackConfig.module.loaders.forEach(function(loader) {
        config.module.loaders.push(loader);
      });
    }

    config.resolve.extensions = deepAssign(config.resolve.extensions || [],
      ['', '.js', '.json', '.htm', '.html', '.scss', '.md', '.svg']);

    config.resolve.modulesDirectories = deepAssign(config.resolve.modulesDirectories || [],
      ['node_modules/grommet/node_modules', 'node_modules']);

    config.resolveLoader.modulesDirectories = deepAssign(config.resolveLoader.modulesDirectories || [],
      ['node_modules/grommet/node_modules', 'node_modules']);

    return gulp.src(options.mainJs)
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest(dist));
  });

};
