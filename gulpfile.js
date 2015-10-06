var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var coveralls = require('gulp-coveralls');

var gulpUtils = require('./gulpfile-utils');

var opts = {
  dist: path.resolve(__dirname, 'dist'),
  copyAssets: [
    'README.md',
    'src/js/**',
    {
      asset: 'src/scss/**',
      dist: 'dist/scss/'
    },
    {
      asset: 'src/utils/**',
      dist: 'dist/utils/'
    },
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    },
    {
      asset: 'bin/**',
      dist: 'dist/bin/'
    },
    {
      asset: 'templates/**',
      dist: 'dist/templates/'
    },
    {
      asset: 'examples/**',
      dist: 'dist/examples/',
      ignores: [
        'node_modules/',
        'dist/'
      ]
    },
    {
      filename: 'package.json',
      asset: JSON.stringify(gulpUtils.getPackageJSON(), null, 2)
    },
    {
      asset: 'src/utils/gulp/.eslintrc',
      dist: 'dist/utils/gulp/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: [
    'src/js/**/*.js',
    'src/utils/**/*.js',
    'test/**/*.js',
    'examples/cto-app-tuner/src/**/*.js',
    'examples/server/*.js'
  ],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/grommet-core/index.scss',
  icons: {
    source: 'src/img/icons',
    destination: 'src/js/components/icons/base'
  },
  sync: {
    hostname: 'grommet.io',
    username: 'grommet',
    remoteDestination: '/var/www/html/assets/' + gulpUtils.getPackageJSON().version
  },
  webpack: {
    output: {
      filename: 'grommet.min.js',
      libraryTarget: 'var',
      library: 'Grommet'
    },
    resolve: {
      alias: {
        'grommet': path.resolve(__dirname, 'src/js')
      },
      modulesDirectories: ['node_modules', 'src/js', 'src/scss']
    },
    externals: {
      'react': 'React'
    }
  },
  distPreprocess: ['dist-css'],
  scsslint: true,
  testPaths: [
    'test/**/*.js'
  ],
  e2ePaths: [
    '/e2e/**/*.js'
  ]
};

require('./src/utils/gulp/gulp-tasks')(gulp, opts);

require('./gulpfile-grommet-dist')(gulp, opts);
require('./gulpfile-grommet-release')(gulp, opts);
require('./gulpfile-grommet-e2e')(gulp, opts);

gulp.task('coveralls', function() {
  var lcovPath = './coverage/lcov.info';
  fs.exists(lcovPath, function(exists) {
    if (exists) {
      gulp.src(lcovPath).pipe(coveralls());
    } else {
      console.error('Could not find lcov report file.');
      process.exit(1);
    }
  });
});

gulp.task('dev', function() {
  console.error('Running "gulp dev" at Grommet root folder is not supported. If you want to start the website, run "gulp dev" at docs folder');
});
