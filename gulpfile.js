var gulp = require('gulp');
var markdownDocs = require('gulp-markdown-docs');
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
  gulp.src('./src/scss/*.scss')
    .pipe(gulp.dest('./dist/scss'));
  gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('document', function() {
  gulp.src('./docs/docs.css')
    .pipe(gulp.dest('./dist/docs'));
  gulp.src('./docs/**/*.md')
    .pipe(markdownDocs('index.html', {
      yamlMeta: true,
      categorySort: 'rank',
      highlightTheme: 'github',
      templatePath: './docs/template.html',
      stylesheetUrl: 'docs.css',
      layoutStylesheetUrl: false
    }))
    .pipe(gulp.dest('./dist/docs/'));
});

gulp.task('build', ['copy', 'document']);

gulp.task('dev', function () {
  gulp.watch(['./src/scss/*.scss', './src/lib/*.js', './src/img/*'], ['copy']);
  gulp.watch(['./docs/**/*.md', './docs/docs.css', './docs/template.html'], ['document']);
});

/**
* CONFIGURATION FOR DOC MODULE
**/
gulp.task('doc-copy', function() {
  gulp.src('docs/index.html')
      .pipe(gulp.dest('dist/doc/'));
  gulp.src('src/lib/*')
      .pipe(gulp.dest('dist/doc/'));
});

gulp.task('doc-clean', function() {
  del.sync(['dist/doc']);
});

gulp.task('doc-scsslint', function() {
  return gulp.src('src/scss/ligo-doc/**/*.scss')
      .pipe(scsslint({
        'config': 'scsslint.yml'
      }))
      .pipe(scsslint.failReporter());
});

gulp.task('doc-jslint', function() {
  return gulp.src('docs/**/*.js')
          .pipe(react())
          .pipe(jshint())
          .pipe(jshint.reporter('default', {verbose: true}))
          .pipe(jshint.reporter('fail'));
});

gulp.task('doc-preprocess', function(callback) {
  runSequence('doc-clean', 'doc-copy', 'doc-jslint', 'doc-scsslint', callback);
});

var docWebpackConfig = {
  output: {
    filename: 'index.js'
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src/js/doc'),
      path.resolve(__dirname, 'src/js/lib'),
      path.resolve(__dirname, 'src/scss/ligo-doc'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpeg' },
      { test: /\.scss$/,loader: 'style!css!sass?outputStyle=expanded'},
    ]
  }
};

gulp.task('doc-dist', ['doc-preprocess'], function() {
    return gulp.src('docs/index.js')
           .pipe(gulpWebpack(docWebpackConfig))
           .pipe(gulp.dest('dist/doc'));
});

gulp.task('doc-dev', ['doc-preprocess'], function() {
    var devWebpackConfig = assign({}, docWebpackConfig, {
      entry: {
        app: ['webpack/hot/dev-server', './docs/index.js'],
        styles: ['webpack/hot/dev-server',  './src/scss/ligo-doc/index.scss']
      },

      output: {
        filename: 'index.js',
        path: __dirname + 'dist/doc/'
      },

      devtool: 'inline-source-map',

      plugins: [ new webpack.HotModuleReplacementPlugin() ]

    });

    new WebpackDevServer(webpack(devWebpackConfig), {
      contentBase: "dist/doc",
      hot: true,
      inline: true,
      stats: { colors: true }
    }).listen(8080, "localhost");

});

gulp.task('doc-syncPre', function(callback) {
  runSequence('doc-dist', callback);
});

gulp.task('doc-sync', ['doc-syncPre'], function() {
  gulp.src('./dist/doc')
    .pipe(rsync({
      root: './dist/doc',
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

