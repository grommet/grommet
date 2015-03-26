var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var del = require('del');
var runSequence = require('run-sequence');
var rsync = require('gulp-rsync');
var assign = require('object-assign');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var scsslint = require('gulp-scss-lint');

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  del.sync(['dist']);
});

gulp.task('scsslint', function() {
  return gulp.src('../src/scss/ligo-doc/**/*.scss')
    .pipe(scsslint({
      'config': '../scsslint.yml'
    }))
    .pipe(scsslint.failReporter());
});

gulp.task('jslint', function() {
  return gulp.src('src/**/*.js')
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default', {
      verbose: true
    }))
    .pipe(jshint.reporter('fail'));
});

gulp.task('preprocess', function(callback) {
  runSequence('clean', 'copy', 'jslint', 'scsslint', callback);
});

var webpackConfig = {
  output: {
    filename: 'index.js'
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../src/js/doc'),
      path.resolve(__dirname, '../src/lib'),
      path.resolve(__dirname, '../src/scss/ligo-doc'),
      path.resolve(__dirname, '../node_modules')
    ]
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

gulp.task('dist', ['preprocess'], function() {
  return gulp.src('src/index.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev', ['preprocess'], function() {
  var devWebpackConfig = assign({}, webpackConfig, {
    entry: {
      app: ['webpack/hot/dev-server', './src/index.js'],
      styles: ['webpack/hot/dev-server', '../src/scss/ligo-doc/index.scss']
    },

    output: {
      filename: 'index.js',
      path: __dirname + 'dist/'
    },

    devtool: 'inline-source-map',

    plugins: [new webpack.HotModuleReplacementPlugin()]

  });

  new WebpackDevServer(webpack(devWebpackConfig), {
    contentBase: "dist/",
    hot: true,
    inline: true,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost");

});

gulp.task('syncPre', function(callback) {
  runSequence('dist', callback);
});

gulp.task('sync', ['syncPre'], function() {
  gulp.src('./dist')
    .pipe(rsync({
      root: './dist',
      hostname: 'ligo.usa.hp.com',
      username: 'ligo',
      destination: '/var/www/html/doc',
      recursive: true,
      relative: true,
      progress: true,
      incremental: true,
      clean: true,
      emptyDirectories: true,
      exclude: ['.DS_Store'],
    }));
});