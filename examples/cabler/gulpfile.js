var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('../../src/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../examples/cabler/dist/'),
  copyAssets: [
    'examples/cabler/src/index.html',
    {
      asset: 'examples/cabler/src/img/**',
      dist: 'examples/cabler/dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/img/mobile-app-icon.png'),
      dist: 'examples/cabler/dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/img/shortcut-icon.png'),
      dist: 'examples/cabler/dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/scss/hpe/font') + '/**',
      dist: 'examples/cabler/dist/font/'
    },
  ],
  scssAssets: ['examples/cabler/src/scss/**/*.scss'],
  jsAssets: ['examples/cabler/src/js/**/*.js'],
  mainJs: 'examples/cabler/src/js/index.js',
  mainScss: 'examples/cabler/src/scss/index.scss',
  icons: {
    source: path.resolve(__dirname, '../../src/img/icons'),
    destination: path.resolve(__dirname, '../../src/js/components/icons/base')
  },
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/examples/cabler/dist'
  },
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
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
  devServerPort: 9021
};

devGulpTasks(gulp, opts);
