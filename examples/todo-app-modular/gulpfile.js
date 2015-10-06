var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('../../src/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  copyAssets: [
    'examples/todo-app-modular/src/index.html',
    {
      asset: path.resolve(__dirname, '../../src/img/mobile-app-icon.png'),
      dist: 'examples/todo-app-modular/dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/img/shortcut-icon.png'),
      dist: 'examples/todo-app-modular/dist/img/'
    }
  ],
  jsAssets: ['examples/todo-app-modular/src/js/**/*.js'],
  mainJs: 'examples/todo-app-modular/src/js/index.js',
  mainScss: 'examples/todo-app-modular/src/scss/index.scss',
  icons: {
    source: path.resolve(__dirname, '../../src/img/icons'),
    destination: path.resolve(__dirname, '../../src/js/components/icons/base')
  },
  devServerPort: 9010,
  webpack: {
    resolve: {
      alias: { // TODO: remove, just for local dev
        'grommet/scss': path.resolve(__dirname, '../../src/scss'),
        'grommet': path.resolve(__dirname, '../../src/js')
      },
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, '../../src/scss'),
        path.resolve(__dirname, '../../node_modules')
      ]
    }
  },
  sync: {
    hostname: 'grommet.io',
    username: 'grommet',
    remoteDestination: '/var/www/html/examples/todo-app-modular/dist'
  }
};

devGulpTasks(gulp, opts);
