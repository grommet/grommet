var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('../src/utils/gulp/gulp-tasks');
var chug = require('gulp-chug');

var opts = {
  base: '../',
  dist: path.resolve(__dirname, '../docs/dist'),
  copyAssets: [
    'docs/src/index.html',
    'docs/src/robots.txt',
    {
      asset: 'docs/src/design/img/**',
      dist: 'docs/dist/img/'
    },
    {
      asset: 'docs/src/develop/img/**',
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
      dist: 'docs/dist/assets/design'
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
  icons: {
    source: path.resolve(__dirname, '../src/img/icons'),
    destination: path.resolve(__dirname, '../src/js/components/icons/base')
  },
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
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, '../src/lib'),
        path.resolve(__dirname, '../src/scss'),
        path.resolve(__dirname, 'src/scss')
      ]
    },
    module: {
      loaders: [
        {
          test: /develop(\/|\\).*\.htm$|design(\/|\\)[^\/]*\.htm$|design(\/|\\).*\/.*\.htm$/,
          loader: 'babel!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader',
          exclude: /(node_modules|bower_components)/
        }
      ]
    }
  },
  devServerPort: 8002,
  devServerProxy: {
    "/rest/*": 'http://localhost:8000'
  },
  distPreprocess: [
    'generate-server-routes', 'generate-server-styles',
    'dist-hpe', 'dist-hpinc', 'dist-bower', 'dist-aruba'
  ],
  env: {
    __THEME__: '"vanilla"'
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

gulp.task('dist-aruba', function() {
  return gulp.src('docs/aruba/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dist']
  }));
});

gulp.task('dev-aruba', function() {
  return gulp.src('docs/aruba/gulpfile.js', { read: false }).pipe(chug({
     tasks: ['dev']
  }));
});

devGulpTasks(gulp, opts);

var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync(path.join(__dirname, '../node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

gulp.task('generate-server-routes', function() {
  return gulp.src(path.join(__dirname, 'src/routes.js'))
    .pipe(gulpWebpack({
      target: 'node',
      output: {
        path: path.join(__dirname, '../server'),
        filename: 'server-routes.js',
        libraryTarget: 'commonjs2'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules\/intl|node_modules\/moment|node_modules\/react|node_modules\/node-sass)/
          },
          {
            test: /develop(\/|\\).*\.htm$|design(\/|\\)[^\/]*\.htm$|design(\/|\\).*\/.*\.htm$/,
            loader: 'babel!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader',
            exclude: /(node_modules|bower_components)/
          }
        ]
      },
      resolve: {
        alias: {
          'grommet/img': path.resolve(__dirname, '../src/img'),
          'grommet/scss': path.resolve(__dirname, '../src/scss'),
          'grommet': path.resolve(__dirname, '../src/js')
        },
        extensions: ['', '.js', '.json', '.htm', '.html', '.scss', '.md', '.svg']
      },
      externals: nodeModules,
      plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: "\"production\""
        })
      ]
    }))
    .pipe(gulp.dest(path.join(__dirname, '../server')));
});

var sass = require('node-sass');

function generateStyle(theme) {
  var compiledSass = sass.renderSync({
    file: path.resolve(__dirname, 'src/scss/index-' + theme + '.scss'),
    includePaths: [path.resolve(__dirname, '../node_modules')],
    outputStyle: 'compressed'
  });

  var mkdirp = require('mkdirp');
  mkdirp.sync(path.resolve(__dirname, '../server/css'));
  fs.writeFileSync(path.resolve(__dirname, '../server/css/docs-' + theme + '.min.css'), compiledSass.css);
}

gulp.task('generate-server-styles', function() {
  generateStyle('grommet');
  generateStyle('aruba');
  generateStyle('hpe');
  generateStyle('hpinc');
  generateStyle('vanilla');
});
