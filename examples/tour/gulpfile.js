var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('grommet/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../examples/tour/dist/'),
  copyAssets: [
    'examples/tour/src/index.html',
    {
      asset: 'examples/tour/src/img/**',
      dist: 'examples/tour/dist/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'examples/tour/dist/img/'
    }
  ],
  scssAssets: ['examples/tour/src/scss/**/*.scss'],
  jsAssets: ['examples/tour/src/js/**/*.js'],
  mainJs: 'examples/tour/src/js/index.js',
  mainScss: 'examples/tour/src/scss/index.scss',
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/examples/tour/dist'
  },
  webpack: {
  	devAlias: { // TODO: remove, just for local dev
  		'grommet': path.resolve(__dirname, '../../src/js')
  	},
    resolve: {
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, '../../src/scss'),
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
  devServerPort: 8001,
  devServerProxy: {
    "/rest/ws": 'ws://localhost:8000',
    "/rest/*": 'http://localhost:8000'
  }
};

devGulpTasks(gulp, opts);
