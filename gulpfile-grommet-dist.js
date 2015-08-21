var gulpWebpack = require('webpack-stream');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var file = require('gulp-file');
var preprocess = require('gulp-preprocess');
var gulpif = require('gulp-if');
var merge = require('lodash/object/merge');
var webpack = require('webpack');
var path = require('path');
var del = require('del');
var runSequence = require('run-sequence');

var gulpUtils = require('./gulpfile-utils');

var bowerWebpackConfig = {
  output: {
    filename: 'grommet.js',
    libraryTarget: 'var',
    library: 'Grommet'
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/scss'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.json', '.htm', '.html', '.scss']
  },
  externals: {
    'react': 'React'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components|src\/lib)/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?mimetype=image/svg'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?mimetype=image/jpg'
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }
    ]
  },
  plugins: [
    //new webpack.optimize.DedupePlugin()
  ]
};

var bowerMinWebpackConfig = merge({}, bowerWebpackConfig, {
  output: {
    filename: 'grommet.min.js',
    libraryTarget: 'var',
    library: 'Grommet'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  //new webpack.optimize.DedupePlugin()
  ]
});

module.exports = function(gulp, opts) {
  gulp.task('dist-css', function() {
    gulp.src('src/scss/hpinc/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet-hpinc.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));

    gulp.src('src/scss/hpe/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet-hpe.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));

    gulp.src('src/scss/aruba/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet-aruba.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));

    return gulp.src('src/scss/grommet-core/*.scss')
      .pipe(sass({
        includePaths: [path.resolve(__dirname, './node_modules')]
      }))
      .pipe(rename('grommet.min.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/'));
  });

  function distCss(path, name, minify) {
    gulp.src(path)
      .pipe(sass({
        includePaths: ['node_modules']
      }))
      .pipe(rename(name))
      .pipe(gulpif(minify, minifyCss()))
      .pipe(gulp.dest('dist-bower/css'));
  }

  function distBower(config) {
    return gulp.src(opts.mainJs)
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest('dist-bower'));
  }

  gulp.task('dist-bower:exploded', function() {
    distBower(bowerWebpackConfig);
  });

  gulp.task('dist-bower:minified', function() {
    distBower(bowerMinWebpackConfig);
  });

  gulp.task('dist-bower:preprocess', function(done) {
    del.sync(['dist-bower']);
    runSequence(['dist-bower:exploded', 'dist-bower:minified'], done);
  });

  gulp.task('dist-bower', ['dist-bower:preprocess'], function() {

    distCss('src/scss/grommet-core/*.scss', 'grommet.css');
    distCss('src/scss/grommet-core/*.scss', 'grommet.min.css', true);
    distCss('src/scss/hpe/*.scss', 'grommet-hpe.css');
    distCss('src/scss/hpe/*.scss', 'grommet-hpe.min.css', true);
    distCss('src/scss/hpinc/*.scss', 'grommet-hpinc.css');
    distCss('src/scss/hpinc/*.scss', 'grommet-hpinc.min.css', true);
    distCss('src/scss/aruba/*.scss', 'grommet-aruba.css');
    distCss('src/scss/aruba/*.scss', 'grommet-aruba.min.css', true);

    //sample-grommet
    gulp.src('examples/todo-app/index.html')
      .pipe(preprocess({
        context: {
          NODE_ENV: 'production'
        }
      }))
      .pipe(rename('sample-grommet.html'))
      .pipe(gulp.dest('dist-bower'));

    var bowerJSON = gulpUtils.getPackageJSON();
    bowerJSON.dependencies = {
      'react': '^0.13.1',
      'grommet': '^' + bowerJSON.version
    };
    bowerJSON.main = 'grommet.js';
    delete bowerJSON.devDependencies;
    delete bowerJSON.scripts;
    delete bowerJSON.config;

    return gulp.src('.')
      .pipe(file('bower.json', JSON.stringify(bowerJSON, null, 2)))
      .pipe(gulp.dest('dist-bower'));
  });
};
