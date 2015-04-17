var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('grommet/utils/gulp-tasks');

var opts = {
  base: '../../',
  dist: 'examples/tour/dist/',
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
  mainJs: './examples/tour/src/js/index.js',
  mainScss: './examples/tour/src/scss/index.scss',
  remoteDestination: '/var/www/html/tour2',
  webpack: {
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
    "/rest/*": 'http://localhost:8000'
  },
  nodeServerPath: 'examples/server/server.js'
};

devGulpTasks(gulp, opts);
