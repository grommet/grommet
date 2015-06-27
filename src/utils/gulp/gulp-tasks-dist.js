var runSequence = require('run-sequence');
var gulpWebpack = require('webpack-stream');
var assign = require('object-assign');
var webpack = require('webpack');

module.exports = function(gulp, options, webpackConfig, dist) {

  gulp.task('dist-preprocess', function(callback) {
    var argv = require('yargs').argv;
    if (argv.skipPreprocess) {
      runSequence('copy', callback);
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
    var env = assign({}, options.env, {
      __DEV_MODE__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    });

    var plugins = [
      new webpack.DefinePlugin(env)
      //new webpack.optimize.DedupePlugin()
    ];

    var argv = require('yargs').argv;

    if (!argv.skipMinify) {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }));
    }

    var config = assign({}, webpackConfig, options.webpack || {}, {
      plugins: plugins
    });

    if (!config.resolve) {
      config.resolve = {};
    }

    if (options.webpack.module && options.webpack.module.loaders) {
      webpackConfig.module.loaders.forEach(function(loader) {
        config.module.loaders.push(loader);
      });
    }

    config.resolve.extensions = ['', '.js', '.json', '.htm', '.html', '.scss'];

    return gulp.src(options.mainJs)
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest(dist));
  });

};
