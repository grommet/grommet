var gulp = require('gulp');
var rsync = require('gulp-rsync');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');

gulp.task('sync', ['generate-routes'], function() {
  gulp.src('.')
    .pipe(rsync({
      root: '.',
      hostname: 'grommet.io',
      username: 'grommet',
      destination: '/var/www/html/server',
      recursive: true,
      relative: true,
      progress: true,
      incremental: true,
      clean: true,
      silent: false,
      emptyDirectories: true,
      exclude: ['.DS_Store', 'node_modules']
    }));
});

gulp.task('dev', ['generate-routes'], function() {
  nodemon({
    script: 'server.js'
  }).on('start', function() {
    console.log('[node-server] started: opening the app in your default browser...');
    //give sometime for the server to start
    setTimeout(function() {
      gulp.src('../dist/index.html')
      .pipe(open({
        uri: 'http://localhost:8020/'
      }));
    }, 500);
  });
});

var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync(path.join(__dirname, '../node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

gulp.task('generate-routes', function() {
  return gulp.src(path.join(__dirname, '../docs/src/routes.js'))
  .pipe(gulpWebpack({
    target: 'node',
    output: {
      path: path.join(__dirname),
      filename: 'backend-routes.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /(node_modules\/intl|node_modules\/moment|node_modules\/react|node_modules\/node-sass)/
        },
        {
          test: /develop(\/|\\).*\.htm$|design(\/|\\)[^\/]*\.htm$|design(\/|\\).*\/.*\.htm$/,
          loader: 'babel!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader',
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.json', '.htm', '.html', '.scss', '.md']
    },
    externals: nodeModules,
    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: "\"production\""
      })
    ]
  }))
  .pipe(gulp.dest('./'));
});
