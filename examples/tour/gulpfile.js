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

require('../../_base.gulpfile.js')(gulp, opts);