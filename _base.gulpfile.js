var gulp = require('gulp');
var del = require('del');
var scsslint = require('gulp-scss-lint');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var gulpWebpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var assign = require('object-assign');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var assign = require('object-assign');
var rsync = require('gulp-rsync');

var webpackConfig = {
  output: {
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?mimetype=image/jpeg'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded'
      },
    ]
  }
};

module.exports = function(opts) {
  var options = opts || {};
  var base = options.base || '';

  gulp.task('copy', function() {
    (options.copyAssets || []).forEach(function(copyAsset) {
      gulp.src(base + copyAsset).pipe(gulp.dest(base + options.dist || 'dist/'));
    });
  });

  gulp.task('clean', function() {
    del.sync([base + options.dist]);
  });

  gulp.task('scsslint', function() {
    (options.scssAssets || []).forEach(function(scssAsset) {
      gulp.src(base + scssAsset).pipe(scsslint({
        'config': base + 'scsslint.yml'
      })).pipe(scsslint.failReporter());
    });
  });

  gulp.task('jslint', function() {
    (options.jsAssets || []).forEach(function(jsAsset) {
      gulp.src(base + jsAsset)
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
          verbose: true
        }))
        .pipe(jshint.reporter('fail'));
    });
  });

  gulp.task('preprocess', function(callback) {
    runSequence('clean', 'copy', 'jslint', 'scsslint', callback);
  });

  gulp.task('dist', ['preprocess'], function() {
    var config = assign({}, webpackConfig, options.webpack);
    gulp.src(base + options.mainJs)
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest(base + options.dist || 'dist/'));
  });

  gulp.task('dev', ['preprocess'], function() {
    var devWebpackConfig = assign({}, webpackConfig, options.webpack, {
      entry: {
        app: ['webpack/hot/dev-server', base + options.mainJs],
        styles: ['webpack/hot/dev-server', base + options.mainScss]
      },

      output: {
        filename: 'index.js',
        path: __dirname + 'dist/'
      },

      devtool: 'inline-source-map',

      plugins: [new webpack.HotModuleReplacementPlugin()]

    });

    new WebpackDevServer(webpack(devWebpackConfig), {
      contentBase: 'dist/',
      hot: true,
      inline: true,
      stats: {
        colors: true
      }
    }).listen(options.devServerPort || 8080, "localhost");

  });

  gulp.task('syncPre', function(callback) {
    runSequence('dist', callback);
  });

  gulp.task('sync', ['syncPre'], function() {
    gulp.src(base + options.dist || 'dist/')
      .pipe(rsync({
        root: base + options.dist || 'dist/',
        hostname: 'ligo.usa.hp.com',
        username: 'ligo',
        destination: options.remoteDestination,
        recursive: true,
        relative: true,
        progress: true,
        incremental: true,
        clean: true,
        emptyDirectories: true,
        exclude: ['.DS_Store'],
      }));
  });

};