var gulp = require('gulp');
var chug = require('gulp-chug');
var gulpWebpack = require('gulp-webpack');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var file = require('gulp-file');
var preprocess = require('gulp-preprocess');
var gulpif = require('gulp-if');
var prompt = require('gulp-prompt');
var bump = require('gulp-bump');
var git = require('gulp-git');
var assign = require('object-assign');
var webpack = require('webpack');
var del = require('del');
var path = require('path');
var fs = require('fs');
var coveralls = require('gulp-coveralls');
var blanket = require('gulp-blanket-mocha');
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;
var mkdirp = require('mkdirp');

function getPackageJSON() {
  delete require.cache[require.resolve('./package.json')];
  var packageJSON = require('./package.json');
  delete packageJSON.devDependencies;
  delete packageJSON.config;
  packageJSON.main = 'index.js';
  packageJSON.dependencies = {
    'react': '^0.13.1',
    'react-intl': '^1.2.0',
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
    'gulp-install': '^0.4.0',
    "lodash": "^3.8.0",
    "reflux": "^0.2.7",
    "superagent": "^1.1.0"
  };
  return packageJSON;
}

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
      asset: 'examples/**',
      dist: 'dist/examples/'
    },
    {
      filename: 'package.json',
      asset: JSON.stringify(getPackageJSON(), null, 2)
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/grommet-core/index.scss',
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/assets/' + getPackageJSON().version
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

require('./src/utils/gulp/gulp-tasks')(gulp, opts);

gulp.task('dist-css', function () {
  gulp.src('src/scss/hpinc/*.scss')
    .pipe(sass({includePaths: [path.resolve(__dirname, './node_modules')]}))
    .pipe(rename('grommet-hpinc.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));

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
   //new webpack.optimize.DedupePlugin()
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
    })
    //new webpack.optimize.DedupePlugin()
  ]
});

function distCss(path, name, minify) {
  gulp.src(path)
    .pipe(sass({includePaths: [ 'node_modules' ]}))
    .pipe(rename(name))
    .pipe(gulpif(minify, minifyCss()))
    .pipe(gulp.dest('dist-bower/css'));
}

gulp.task('dist-bower:exploded', function() {
  return gulp.src(opts.mainJs)
    .pipe(gulpWebpack(bowerWebpackConfig))
    .pipe(gulp.dest('dist-bower'));
});

gulp.task('dist-bower:minified', function() {
  return gulp.src(opts.mainJs)
    .pipe(gulpWebpack(bowerMinWebpackConfig))
    .pipe(gulp.dest('dist-bower'));
});

gulp.task('dist-bower:preprocess', function(done) {
  del.sync(['dist-bower']);
  runSequence(['dist-bower:exploded', 'dist-bower:minified'], done);
});

gulp.task('dist-bower', ['dist-bower:preprocess'], function() {

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

  var bowerJSON = getPackageJSON();
  bowerJSON.dependencies = { 'react': '^0.13.1', 'grommet': 'HewlettPackard/grommet-bower' };
  bowerJSON.main = 'grommet.js';
  delete bowerJSON.devDependencies;
  delete bowerJSON.scripts;
  delete bowerJSON.config;

  return gulp.src('./dist-bower')
          .pipe(file('bower.json', JSON.stringify(bowerJSON, null, 2)))
          .pipe(gulp.dest('dist-bower'));
});

gulp.task('blanket-lcov-reporter', function(done) {
  require('./src/utils/test/test-compiler');
  require('./src/utils/test/mocked-dom')('<html><body></body></html>');

  gulp.src('./test/**/*.js', { read: false }).pipe(blanket({
    instrument: [path.join(__dirname, 'src/js')],
    captureFile: 'test/lcov.info',
    reporter: 'mocha-lcov-reporter'
  }));

  done();
});

gulp.task('coveralls', function() {
  var lcovPath = './test/lcov.info';
  fs.exists(lcovPath, function (exists) {
    if (exists) {
      gulp.src(lcovPath).pipe(coveralls());
    } else {
      console.error('Could not find lcov report file.');
      process.exit(1);
    }
  });
});

gulp.task('release:bump', function(done) {
  gulp.src('./')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'bump',
        message: 'What type of bump would you like to do (patch, minor, major)?',
        validate: function(pass){
          if(pass !== 'patch' && pass !== 'minor' && pass !== 'major'){
              return false;
          }
          return true;
        }
    }, function(res){
        gulp.src('./package.json')
          .pipe(bump({ type: res.bump }))
          .pipe(gulp.dest('./')).on('end', function() {
            opts.copyAssets.push({
              filename: 'package.json',
              asset: JSON.stringify(getPackageJSON(), null, 2)
            });
            done();
          });
    }));
});

gulp.task('release:npm', function(done) {
  process.chdir('dist');
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', function() {
    process.chdir(__dirname);
    var version = 'v'+getPackageJSON().version;
    gulp.src('./')
      .pipe(git.add({args: '--all'}))
      .pipe(git.commit(version)).on('end', function() {
        git.push('origin', 'master', function (err) {
          if (err) {
            throw err;
          }

          git.tag(version, version, function (err) {
            if (err) {
              throw err;
            }

            git.push('origin', version, function (err) {
              if (err) {
                throw err;
              }
              process.chdir(__dirname);
              done();
            });
          });
        });
      });
  });
});

gulp.task('release:createTmp', function(done) {
  del.sync(['./tmp']);
  mkdirp('./tmp', function (err) {
    if (err) {
      throw err;
    }
    done();
  });
});

gulp.task('release:bower', ['release:createTmp'], function(done) {
  git.clone('https://github.com/HewlettPackard/grommet-bower.git',
    { cwd: './tmp/' },
    function (err) {
      if (err) {
        throw err;
      }
      gulp.src('./dist-bower/**').pipe(gulp.dest('./tmp/grommet-bower'));

      var version = 'v'+getPackageJSON().version;
      process.chdir('./tmp/grommet-bower');
      gulp.src('./')
        .pipe(git.add({args: '--all'}))
        .pipe(git.commit(version)).on('end', function() {
          git.push('origin', 'master', function (err) {
            if (err) {
              throw err;
            }

            git.tag(version, version, function (err) {
              if (err) {
                throw err;
              }

              git.push('origin', version, function (err) {
                if (err) {
                  throw err;
                }
                process.chdir(__dirname);
                done();
              });
            });
          });
        });
    }
  );
});

gulp.task('release:stable', ['dist', 'release:createTmp'], function(done) {
  if (process.env.CI) {
    git.clone('https://'+ process.env.GH_TOKEN +'@github.com/HewlettPackard/grommet.git',
      { cwd: './tmp/' },
      function (err) {
        if (err) {
          throw err;
        }

        process.chdir('./tmp/grommet');
        git.checkout('stable', function (err) {
          if (err) {
            throw err;
          }

          gulp.src('../../dist/**').pipe(gulp.dest('./'));

          git.status({args: '--porcelain'}, function (err, stdout) {
            if (err) {
              throw err;
            }

            if (stdout && stdout !== '') {
              gulp.src('./')
              .pipe(git.add({args: '--all'}))
              .pipe(git.commit('Stable dev version update.')).on('end', function() {
                git.push('origin', 'stable', function (err) {
                  if (err) {
                    throw err;
                  }

                  process.chdir(__dirname);
                  done();
                });
              });
            } else {
              console.log('No difference since last commit, skipping stable release.');

              process.chdir(__dirname);
              done();
            }
          });
        });
      }
    );
  } else {
    console.warn('Skipping release. Release:stable task should be executed by CI only.');
  }
});

gulp.task('release:clean', function() {
  del.sync(['./tmp']);
});

gulp.task('release:sync', function() {
  gulp.src('./docs/gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));

  gulp.src('./gulpfile.js').pipe(chug({
    tasks: ['sync']
  }));
});

gulp.task('release', function(done) {
  runSequence('release:bump', ['dist-bower', 'dist'], 'release:npm', 'release:bower', 'release:clean', 'release:sync', done);
});
