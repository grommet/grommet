var gulp = require('gulp');
var chug = require('gulp-chug');
var gulpWebpack = require('gulp-webpack');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var file = require('gulp-file');
var preprocess = require('gulp-preprocess');
var gulpif = require('gulp-if');
var assign = require('object-assign');
var webpack = require('webpack');
var del = require('del');
var path = require('path');

var packageJSON = require('./package.json');
delete packageJSON.devDependencies;
delete packageJSON.config;
packageJSON.main = 'index.js';
packageJSON.dependencies = {
  'react': '^0.13.1',
  'inuit-box-sizing': '~0.2.0',
  'inuit-clearfix': '^0.2.1',
  'inuit-defaults': '~0.2.1',
  'inuit-functions': '~0.2.0',
  'inuit-headings': '~0.3.0',
  'inuit-images': '~0.3.3',
  'inuit-list-bare': '~0.3.0',
  'inuit-lists': '~0.1.0',
  'inuit-mixins': '~0.2.3',
  'inuit-normalize': '~3.0.2',
  'inuit-page': '~0.2.1',
  'inuit-reset': '~0.1.1',
  'inuit-responsive-settings': '~0.1.2',
  'inuit-responsive-tools': '~0.1.1',
  'inuit-shared': '~0.1.5',
  'mkdirp': '^0.5.0',
  'gulp': '^3.8.11',
  'gulp-template': '^3.0.0',
  'gulp-install': '^0.4.0'
};

var opts = {
  dist: path.resolve(__dirname, 'dist'),
  copyAssets: [
    'README.md',
    'src/js/**',
    {
      asset: 'src/scss/**',
      dist: 'dist/scss/'
    },
    'design/**',
    'src/img/**',
    {
      asset: 'bin/**',
      dist: 'dist/bin/'
    },
    {
      asset: 'templates/**',
      dist: 'dist/templates/'
    },
    {
      filename: 'package.json',
      asset: JSON.stringify(packageJSON, null, 2)
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/grommet-core/index.scss',
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/assets/' + packageJSON.version
  },
  webpack: {
    output: {
      filename: 'grommet.min.js',
      libraryTarget: 'var',
      library: 'Grommet'
    },
    resolve: {
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
  ]
};

require('./src/js/utils/gulp-tasks')(gulp, opts);

gulp.task('dist-css', function () {
  gulp.src('src/scss/hpe/*.scss')
    .pipe(sass({includePaths: [path.resolve(__dirname, './node_modules')]}))
    .pipe(rename('grommet-hpe.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));

  return gulp.src('src/scss/grommet-core/*.scss')
        .pipe(sass({includePaths: [path.resolve(__dirname, './node_modules')]}))
        .pipe(rename('grommet.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/'));
});

gulp.task('sync-all', function() {

  gulp.src('./examples/demo/gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));

  gulp.src('./examples/tour/gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));

  gulp.src('./examples/server/gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));

  gulp.src('./docs/gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));

  gulp.src('./gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));
});

var bowerWebpackConfig = {
  output: {
    filename: 'grommet.js',
    libraryTarget: 'var',
    library: 'Grommet'
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/scss'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.json', '.htm', '.html', '.scss']
  },
  externals: {
    'react': 'React'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?mimetype=image/svg'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?mimetype=image/jpg'
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ]
};

var bowerMinWebpackConfig = assign({}, bowerWebpackConfig, {
  output: {
    filename: 'grommet.min.js',
    libraryTarget: 'var',
    library: 'Grommet'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin()
  ]
});

function distCss(path, name, minify) {
  gulp.src(path)
    .pipe(sass({includePaths: [ 'node_modules' ]}))
    .pipe(rename(name))
    .pipe(gulpif(minify, minifyCss()))
    .pipe(gulp.dest('dist-bower/css'));
}
gulp.task('dist-bower', function() {
  del.sync(['dist-bower']);

  //grommet exploded
  gulp.src(opts.mainJs)
    .pipe(gulpWebpack(bowerWebpackConfig))
    .pipe(gulp.dest('dist-bower'));

  //grommet minified
  gulp.src(opts.mainJs)
    .pipe(gulpWebpack(bowerMinWebpackConfig))
    .pipe(gulp.dest('dist-bower'));

  distCss('src/scss/grommet-core/*.scss', 'grommet.css');
  distCss('src/scss/grommet-core/*.scss', 'grommet.min.css', true);
  distCss('src/scss/hpe/*.scss', 'grommet-hpe.css');
  distCss('src/scss/hpe/*.scss', 'grommet-hpe.min.css', true);
  distCss('src/scss/hpinc/*.scss', 'grommet-hpinc.css');
  distCss('src/scss/hpinc/*.scss', 'grommet-hpinc.min.css', true);

  //sample-grommet
  gulp.src('examples/todo-app/index.html')
        .pipe(preprocess({context: { NODE_ENV: 'production'}}))
        .pipe(rename('sample-grommet.html'))
        .pipe(gulp.dest('dist-bower'));

  var bowerJSON = require('./package.json');
  bowerJSON.dependencies = { 'react': '^0.13.1', 'grommet': 'HewlettPackard/grommet-bower' };
  bowerJSON.main = 'grommet.js';
  delete bowerJSON.devDependencies;
  delete bowerJSON.scripts;
  delete bowerJSON.config;

  gulp.src('./dist-bower')
          .pipe(file('bower.json', JSON.stringify(bowerJSON, null, 2)))
          .pipe(gulp.dest('dist-bower'));
});