var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('ligo/utils/gulp-tasks');

var opts = {
  base: '../../../',
  dist: 'docs/dist/hpe/',
  copyAssets: [
    'docs/src/index.html',
    {
      asset: 'docs/src/style_guide/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'docs/src/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'docs/src/hpe/font/**',
      dist: 'docs/dist/hpe/font/'
    }
  ],
  scssAssets: ['src/scss/ligo-core/**/*.scss', 'docs/src/hpe/scss/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/hpe/index-hpe.js',
  mainScss: 'docs/src/hpe/scss/index-hpe.scss',
  sync: {
    hostname: 'ligo.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/doc/hpe'
  },
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, '../../../src/js'),
        path.resolve(__dirname, '../../../src/lib'),
        path.resolve(__dirname, '../scss'),
        path.resolve(__dirname, 'scss'),
        path.resolve(__dirname, '../../../src/scss'),
        path.resolve(__dirname, '../../../node_modules')
      ]
    }
  },
  devServerPort: 8002
};

devGulpTasks(gulp, opts);
