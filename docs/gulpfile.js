var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('../src/utils/gulp/gulp-tasks');
var chug = require('gulp-chug');

var opts = {
  base: '../',
  dist: path.resolve(__dirname, '../docs/dist'),
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
    },
    {
      asset: 'design/**',
      dist: 'docs/dist/assets/latest'
    },
    {
      asset: 'dist-bower/**',
      dist: 'docs/dist/assets/latest',
      ignores: [
        'bower.json',
        'sample-grommet.html'
      ]
    }
  ],
  scssAssets: ['src/scss/grommet-core/**/*.scss', 'docs/src/scss/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'docs/src/scss/index.scss',
  sync: {
    hostname: 'grommet.io',
    username: 'grommet',
    remoteDestination: '/var/www/html/docs/dist'
  },
  webpack: {
    resolve: {
      alias: {
        'grommet/scss': path.resolve(__dirname, '../src/scss'),
        'grommet': path.resolve(__dirname, '../src/js')
      },
      root: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../src/lib'),
        path.resolve(__dirname, '../src/scss'),
        path.resolve(__dirname, 'src/scss')
      ]
    },
    module: {
      loaders: [
        {
          test: /style_guide(\/|\\)[^\/]*\.htm$/,
          loader: 'jsx-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader?group=true'
        },
        {
          test: /documentation(\/|\\).*\.htm$|downloads(\/|\\).*\.htm$|style_guide(\/|\\).*\/.*\.htm$/,
          loader: 'jsx-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader'
        }
      ]
    }
  },
  devServerPort: 8002,
  devServerProxy: {
    "/rest/*": 'http://localhost:8000'
  },
  distPreprocess: ['dist-hpe', 'dist-hpinc', 'dist-bower'],
  env: {
    __THEME__: {
      generic: true
    }
  },
  scsslint: true
};

gulp.task('dist-bower', function() {
  return gulp.src('gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dist-bower']
  }));
});

gulp.task('dist-hpe', function() {
  return gulp.src('docs/hpe/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dist']
  }));
});

gulp.task('dev-hpe', function() {
  return gulp.src('docs/hpe/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dev']
  }));
});

gulp.task('dist-hpinc', function() {
  return gulp.src('docs/hpinc/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dist']
  }));
});

gulp.task('dev-hpinc', function() {
  return gulp.src('docs/hpinc/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dev']
  }));
});

devGulpTasks(gulp, opts);
