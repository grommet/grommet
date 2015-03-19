var gulp = require('gulp');
var markdownDocs = require('gulp-markdown-docs');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var del = require('del');
var runSequence = require('run-sequence');
var rsync = require('gulp-rsync');

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

gulp.task('doc-preprocess', function(callback) {
  runSequence('doc-clean', 'doc-copy', callback);
});

gulp.task('doc-dist', ['doc-preprocess'], function() {
    return gulp.src('docs/index.js')
        .pipe(gulpWebpack({
          output: {
            filename: 'index.js'
          },
          resolve: {
            root: [
              path.resolve(__dirname, 'src/js/doc'),
              path.resolve(__dirname, 'src/js/lib'),
              path.resolve(__dirname, 'src/scss/ligo-doc'),
              path.resolve(__dirname, 'bower_components')
            ]
          },
          module: {
            loaders: [
              { test: /\.js$/, loader: 'jsx-loader' },
              { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
              {
                test: /\.scss$/,
                loader: "style!css!sass?outputStyle=expanded&includePaths[]="+path.resolve(__dirname, "bower_components")
              },
            ]
          }
      }))
      .pipe(gulp.dest('dist/doc'));
});

gulp.task('doc-dev', ['doc-preprocess'], function() {
    var compiler = webpack({
      entry: {
        app: ['webpack/hot/dev-server', './docs/index.js'],
        styles: ['webpack/hot/dev-server',  './src/scss/ligo-doc/index.scss']
      },
      output: {
        filename: 'index.js',
        path: __dirname + 'dist/doc/'
      },
      resolve: {
        root: [
          path.resolve(__dirname, 'src/js/doc'),
          path.resolve(__dirname, 'src/js/lib'),
          path.resolve(__dirname, 'src/scss/ligo-doc'),
          path.resolve(__dirname, 'bower_components')
        ]
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'jsx-loader' },
          { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
          {
            test: /\.scss$/,
            loader: "style!css!sass?outputStyle=expanded&includePaths[]="+path.resolve(__dirname, "bower_components")
          },
        ]
      },
      devtool: 'inline-source-map',
      plugins: [ new webpack.HotModuleReplacementPlugin() ]
  });

  var server = new WebpackDevServer(compiler, {
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

