var del = require('del');
var file = require('gulp-file');
var runSequence = require('run-sequence');
var path = require('path');

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

module.exports = function(gulp, opts) {

  runSequence = runSequence.use(gulp);

  var options = opts || {};

  options.scsslint = options.scsslint === undefined ? true : options.scsslint;

  var dist = options.dist || path.resolve(process.cwd(), 'dist');

  var webpackConfig = {
    output: {
      filename: 'index.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /(node_modules\/intl|node_modules\/moment|bower_components|src\/lib)/
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
            (encodeURIComponent(path.resolve(options.base || process.cwd(), './node_modules')))
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    }
  };

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

  gulp.task('node-clean', function(done) {
    require('rimraf')(path.resolve(process.cwd(), 'node_modules'), function (err) {
      if (err) {
        throw err;
      }

      done();
    });
  });

  require('./gulp-tasks-linters')(gulp, options);
  require('./gulp-tasks-test')(gulp, options);
  require('./gulp-tasks-dist')(gulp, options, webpackConfig, dist);
  require('./gulp-tasks-dev')(gulp, options, webpackConfig, dist);
  require('./gulp-tasks-sync')(gulp, options, dist);

};
