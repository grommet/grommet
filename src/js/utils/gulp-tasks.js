var del = require('del');
var scsslint = require('gulp-scss-lint');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var gulpWebpack = require('gulp-webpack');
var runSequence = require('run-sequence');
var assign = require('object-assign');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var rsync = require('gulp-rsync');
var file = require('gulp-file');
var path = require('path');

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
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?outputStyle=expanded'
      }
    ]
  }
};

module.exports = function(gulp, opts) {

  runSequence = runSequence.use(gulp);

  var options = opts || {};

  var dist = options.dist;

  var scssLintPath = path.resolve(__dirname, 'scss-lint.yml');

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
        gulp.src(asset).pipe(gulp.dest(copyAsset.dist ? copyAsset.dist : dist));
      }

    });
  });

  gulp.task('clean', function() {
    del.sync([options.dist]);
  });

  gulp.task('scsslint', function() {
    (options.scssAssets || []).forEach(function(scssAsset) {
      gulp.src(scssAsset).pipe(scsslint({
        'config': scssLintPath
      })).pipe(scsslint.failReporter());
    });
  });

  gulp.task('jslint', function() {
    (options.jsAssets || []).forEach(function(jsAsset) {
      gulp.src(jsAsset)
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

   gulp.task('dist-preprocess', function(callback) {
    if (options.distPreprocess) {
      runSequence(options.distPreprocess, callback);
    } else {
      callback();
    }
  });

  gulp.task('dist', ['preprocess', 'dist-preprocess'], function() {
  	var env = assign({}, options.env, {
    	__DEV_MODE__: false
    });

    var config = assign({}, webpackConfig, options.webpack || {}, {
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin(env)
      ]
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

  gulp.task('dev', ['preprocess'], function() {

    var env = assign({}, options.env, {
    	__DEV_MODE__: true
    });

    var devWebpackConfig = assign({}, webpackConfig, options.webpack || {}, {
      entry: {
        app: ['webpack/hot/dev-server', './' + options.mainJs],
        styles: ['webpack/hot/dev-server', './' + options.mainScss]
      },

      output: {
        filename: 'index.js',
        path: dist,
        publicPath: '/'
      },

      devtool: 'inline-source-map',

      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(env)
      ]

    });

    if (options.webpack.devAlias) {
    	devWebpackConfig.resolve.alias = options.webpack.devAlias;
    }

    if (!devWebpackConfig.resolve) {
      devWebpackConfig.resolve = {};
    }

    if (options.webpack.module && options.webpack.module.loaders) {
    	webpackConfig.module.loaders.forEach(function(loader) {
    		devWebpackConfig.module.loaders.push(loader);
    	});
    }

    devWebpackConfig.resolve.extensions = ['', '.js', '.json', '.htm', '.html', '.scss'];

    var devServerConfig = {
      contentBase: dist,
      hot: true,
      inline: true,
      stats: {
        colors: true
      },
      publicPath: devWebpackConfig.output.publicPath,
      historyApiFallback: true
    };

    if (options.devServerProxy) {
      devServerConfig.proxy = options.devServerProxy;
    }

    var server = new WebpackDevServer(webpack(devWebpackConfig), devServerConfig);
    server.use('/', function(req, res, next) {

      if (req.url.match(/.+index.js$/)) {
		    res.redirect(301, '/index.js');
		  } else if (req.url.match(/.+\/img\//)) { // img
		    res.redirect(301, req.url.replace(/.*\/(img\/.*)$/, "/$1"));
		  } else if (req.url.match(/\/img\//)) { // img
		    next();
		  } else if (req.url.match(/.+\/font\//)) { // font
		    res.redirect(301, req.url.replace(/.*\/(font\/.*)$/, "/$1"));
		  } else if (req.url.match(/\/font\//)) { // font
		    next();
		  } else if (req.url.match(/.+\/.*\.[^\/]*$/)) { // file
		    res.redirect(301, req.url.replace(/.*\/([^\/]*)$/, "/$1"));
		  } else {
		    next();
		  }
    });
    server.listen(options.devServerPort || 8080, "localhost");

  });

  gulp.task('syncPre', function(callback) {
    return runSequence('dist', callback);
  });

  gulp.task('sync', ['syncPre'], function() {
    gulp.src(dist)
      .pipe(rsync({
        root: dist,
        hostname: options.sync.hostname,
        username: options.sync.username,
        destination: options.sync.remoteDestination,
        recursive: true,
        relative: true,
        incremental: true,
        silent: true,
        clean: true,
        emptyDirectories: true,
        exclude: ['.DS_Store'],
      }));
  });

};