var gulp = require('gulp');
var path = require('path');
var nodemon = require('gulp-nodemon');
var devGulpTasks = require('../../src/utils/gulp/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../examples/people-finder/dist/'),
  copyAssets: [
    'examples/people-finder/src/index.html',
    {
      asset: 'examples/people-finder/src/img/**',
      dist: 'examples/people-finder/dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/img/mobile-app-icon.png'),
      dist: 'examples/people-finder/dist/img/'
    },
    {
      asset: path.resolve(__dirname, '../../src/img/shortcut-icon.png'),
      dist: 'examples/people-finder/dist/img/'
    }
  ],
  scssAssets: ['examples/people-finder/src/scss/**/*.scss'],
  jsAssets: ['examples/people-finder/src/js/**/*.js'],
  mainJs: 'examples/people-finder/src/js/index.js',
  mainScss: 'examples/people-finder/src/scss/index.scss',
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/examples/people-finder/dist'
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
  devServerPort: 9020,
  devServerProxy: {
    "/ldap/*": 'http://localhost:8020'
  },
  devPreprocess: ['start-backend']
};

gulp.task('start-backend', function() {
  nodemon({
    watch: ["examples/people-finder/server"],
    script: path.resolve(__dirname, 'server/server')
  });
});

devGulpTasks(gulp, opts);
