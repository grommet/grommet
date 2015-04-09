var gulp = require('gulp');
var path = require('path');

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
  remoteDestination: '/var/www/html/doc2',
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

require('../_base.gulpfile.js')(gulp, opts);
