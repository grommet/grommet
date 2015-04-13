var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('ligo/utils/gulp-tasks');

var opts = {
  base: '../../',
  dist: 'examples/demo/dist/',
  copyAssets: [
    'examples/demo/src/index.html', 
    {
      asset: 'examples/demo/server/**',
      dist: 'examples/demo/dist/server/'
    },
    {
      asset: 'examples/demo/src/img/**',
      dist: 'examples/demo/dist/img/'
    }
  ],
  scssAssets: ['examples/demo/src/scss/**/*.scss'],
  jsAssets: ['examples/demo/src/js/**/*.js'],
  mainJs: './examples/demo/src/js/index.js',
  mainScss: './examples/demo/src/scss/index.scss',
  remoteDestination: '/var/www/html/demo',
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
  devServerPort: 8003,
  devServerProxy: {
    "/rest/*": 'http://localhost:8000'
  },
  nodeServerPath: 'examples/server/server.js'
};

devGulpTasks(gulp, opts);
