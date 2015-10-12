var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('../../src/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  copyAssets: [
    'examples/cto-app-tuner/src/index.html',
    {
      asset: path.resolve(__dirname, '../../src/img/mobile-app-icon.png'),
      dist: 'dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/img/shortcut-icon.png'),
      dist: 'dist/img/'
    }
  ],
  jsAssets: ['examples/cto-app-tuner/src/js/**/*.js'],
  mainJs: 'examples/cto-app-tuner/src/js/index.js',
  mainScss: 'examples/cto-app-tuner/src/scss/index.scss',
  icons: {
    source: path.resolve(__dirname, '../../src/img/icons'),
    destination: path.resolve(__dirname, '../../src/js/components/icons/base')
  },
  sync: {
    hostname: 'grommet.io',
    username: 'grommet',
    remoteDestination: '/var/www/html/examples/cto-app-tuner/dist'
  },
  devServerPort: 9000,
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
  }
};

devGulpTasks(gulp, opts);
