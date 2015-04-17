var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('grommet/utils/gulp-tasks');

var opts = {
  base: '../../',
  dist: 'docs/dist/hpe/',
  copyAssets: [
    'docs/src/index.html',
    {
      asset: 'docs/src/style_guide/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'docs/src/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'src/scss/hpe/font/**',
      dist: 'docs/dist/hpe/font/'
    }
  ],
  scssAssets: ['src/scss/grommet-core/**/*.scss', 'docs/src/scss/**/*.scss', 'src/scss/hpe/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'docs/src/scss/index-hpe.scss',
  sync: {
    hostname: 'ligo.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/doc/hpe'
  },
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, '../../src/js'),
        path.resolve(__dirname, '../../src/lib'),
        path.resolve(__dirname, '../src/scss'),
        path.resolve(__dirname, '../../src/scss'),
        path.resolve(__dirname, '../../node_modules')
      ]
    }
  },
  devServerPort: 8002,
  env: {
    __THEME__: {
      hpe: true
    }
  }
};

devGulpTasks(gulp, opts);
