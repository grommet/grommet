var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var devGulpTasks = require('../../src/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../examples/medium-app/dist/'),
  copyAssets: [
    'examples/medium-app/src/index.html',
    {
      asset: 'examples/medium-app/src/img/**',
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
  devServerPort: 8001,
  // The 8010 port number needs to align with hostName in index.js
  devServerProxy: {
    "/rest/*": 'http://localhost:8010'
  },
  websocketHost: 'localhost:8010',
  devPreprocess: ['start-backend']
};

gulp.task('start-backend', function() {
  nodemon({
    watch: ["examples/medium-app/server"],
    script: path.resolve(__dirname, 'server/server')
  });
});

devGulpTasks(gulp, opts);
