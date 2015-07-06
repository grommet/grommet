var del = require('del');
var file = require('gulp-file');
var runSequence = require('run-sequence');
var path = require('path');

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var webpackConfig = {
  output: {
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.resolve(process.cwd(), "src"),
          path.resolve(process.cwd(), "test"),
          path.resolve(process.cwd(), "node_modules/grommet")
        ]
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
        test: /\.png$/,
        loader: 'file-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?mimetype=image/jpg'
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?mimetype=application/font-woff'
      },
      {
        test: /\.otf$/,
        loader: 'file-loader?mimetype=application/font/opentype'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' +
          (path.resolve(process.cwd(), 'node_modules'))
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};

module.exports = function(gulp, opts) {

  runSequence = runSequence.use(gulp);

  var options = opts || {};

  var dist = options.dist || path.resolve(process.cwd(), 'dist');
  options.webpack = options.webpack || {};

  if (options.base) {
    process.chdir(options.base);
  }

  gulp.task('copy', function() {
    (options.copyAssets || []).forEach(function(copyAsset) {
      if (copyAsset.filename) {
        gulp.src('./')
          .pipe(file(copyAsset.filename, copyAsset.asset))
          .pipe(gulp.dest(copyAsset.dist ? copyAsset.dist : dist));
      } else {
        var asset = copyAsset.asset ? copyAsset.asset : copyAsset;
        var assets = [asset];
        if (copyAsset.ignores) {
          copyAsset.ignores.forEach(function(ignore) {
            assets.push('!' + asset + ignore);
            assets.push('!' + asset + '**/' + ignore);
            assets.push('!' + asset + '**/' + ignore + '/**');
          });
        }
        gulp.src(assets, {
          dot: true
        }).pipe(gulp.dest(copyAsset.dist ? copyAsset.dist : dist));
      }

    });
  });

  gulp.task('preprocess', function(callback) {
    runSequence('clean', 'copy', 'jslint', 'scsslint', callback);
  });

  gulp.task('clean', function() {
    del.sync([dist]);
  });

  require('./gulp-tasks-linters')(gulp, options);
  require('./gulp-tasks-test')(gulp, options);
  require('./gulp-tasks-dist')(gulp, options, webpackConfig, dist);
  require('./gulp-tasks-dev')(gulp, options, webpackConfig, dist);
  require('./gulp-tasks-sync')(gulp, options, dist);

};
