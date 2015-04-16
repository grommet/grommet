var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('ligo/utils/gulp-tasks');
var chug = require('gulp-chug');

var opts = {
  base: '../',
  dist: 'docs/dist/',
  copyAssets: [
    'docs/src/index.html',
    {
      asset: 'docs/src/style_guide/img/**',
      dist: 'docs/dist/img/'
    },
    {
      asset: 'docs/src/documentation/img/**',
      dist: 'docs/dist/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'docs/dist/img/'
    },
    {
      asset: 'docs/src/img/**',
      dist: 'docs/dist/img/'
    }
  ],
  scssAssets: ['src/scss/ligo-core/**/*.scss', 'docs/src/scss/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'docs/src/scss/index.scss',
  sync: {
    hostname: 'ligo.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/doc'
  },
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, '../src/js'),
        path.resolve(__dirname, '../src/lib'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, '../src/scss'),
        path.resolve(__dirname, '../node_modules')
      ]
    }
  },
  devServerPort: 8002,
  distPreprocess: ['dist-hpe'],
  env: {
    __THEME__: {
      general: true
    }
  }
};

gulp.task('dist-hpe', function() {
  return gulp.src('docs/hpe/gulpfile.js').pipe(chug({
     tasks: ['dist']
  }));
});

devGulpTasks(gulp, opts);
