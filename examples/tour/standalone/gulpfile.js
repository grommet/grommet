var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('grommet/utils/gulp/gulp-tasks');

var opts = {
  base: '.',
  dist: path.resolve(__dirname, 'dist/'),
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/index.scss',
  webpack: {
  	devAlias: { // TODO: remove, just for local dev
  		'grommet': path.resolve(__dirname, 'node_modules/grommet/js')
  	},
    resolve: {
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
  devServerPort: 8001,
  devServerProxy: {
    "/rest/*": 'http://localhost:8000'
  }
};

devGulpTasks(gulp, opts);
