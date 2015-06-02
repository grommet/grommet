var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('grommet/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../examples/medium-app/dist/'),
  copyAssets: [
    'examples/medium-app/src/index.html',
    {
      asset: 'examples/medium-app/src/img/**',
      dist: 'examples/medium-app/dist/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'examples/medium-app/dist/img/'
    }
  ],
  scssAssets: ['examples/medium-app/src/scss/**/*.scss'],
  jsAssets: ['examples/medium-app/src/js/**/*.js'],
  mainJs: 'examples/medium-app/src/js/index.js',
  mainScss: 'examples/medium-app/src/scss/index.scss',
  sync: {
    hostname: 'grommet.io',
    username: 'grommet',
    remoteDestination: '/var/www/html/examples/medium-app/dist'
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
