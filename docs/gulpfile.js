var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('ligo/utils/gulp-tasks');

var opts = {
  base: '../',
  dist: 'docs/dist/',
  copyAssets: [
    'docs/src/index.html',
    {
      asset: 'docs/src/style_guide/img/**',
      dist: 'docs/dist/img/'
    },
    {
      asset: 'docs/src/img/**',
      dist: 'docs/dist/img/'
    },
    {
      asset: 'hpe/font/**',
      dist: 'docs/dist/font/'
    }
  ],
  scssAssets: ['src/scss/ligo-core/**/*.scss', 'docs/src/scss/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'docs/src/scss/index.scss',
  sync: {
    hostname: 'ligo.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/doc'
  },
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, '../src/js'),
        path.resolve(__dirname, '../src/lib'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, '../src/scss'),
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../hpe/scss'),
        path.resolve(__dirname, '../hpe')
      ]
    }
  },
  devServerPort: 8002
};

devGulpTasks(gulp, opts);
