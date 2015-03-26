var gulp = require('gulp');
var path = require('path');

var opts = {
  base: '../../',
  dist: 'examples/tour/dist/',
  copyAssets: ['examples/tour/src/index.html'],
  scssAssets: ['examples/tour/src/scss/**/*.scss'],
  jsAssets: ['examples/tour/src/js/**/*.js'],
  mainJs: 'examples/tour/src/js/index.js',
  mainScss: 'examples/tour/src/scss/index.scss',
  remoteDestination: '/var/www/html/tour',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, '../../src/js'),
        path.resolve(__dirname, '../../src/lib'),
        path.resolve(__dirname, '../../src/scss'),
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
  devServerPort: 8081
};

<<<<<<< HEAD
require('../../_base.gulpfile.js')(gulp, opts);
=======
gulp.task('dist', ['preprocess'], function() {
    return gulp.src('src/js/index.js')
           .pipe(gulpWebpack(webpackConfig))
           .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['preprocess'], function() {
    var devWebpackConfig = assign({}, webpackConfig, {
      entry: {
        app: ['webpack/hot/dev-server', './src/js/index.js'],
        styles: ['webpack/hot/dev-server',  './src/scss/index.scss']
      },

      output: {
        filename: 'index.js',
        path: __dirname + 'dist/'
      },

      devtool: 'inline-source-map',

      plugins: [ new webpack.HotModuleReplacementPlugin() ]

    });

    new WebpackDevServer(webpack(devWebpackConfig), {
      contentBase: "dist",
      hot: true,
      inline: true,
      stats: { colors: true }
    }).listen(8001, "localhost");

});
>>>>>>> fixing Tour
