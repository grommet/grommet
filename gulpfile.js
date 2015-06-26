var gulp = require('gulp');
var chug = require('gulp-chug');
var server = require('gulp-express');
var path = require('path');
var fs = require('fs');
var coveralls = require('gulp-coveralls');
var selenium = require('selenium-standalone');

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

require('./gulpfile-grommet-dist')(gulp, opts);
require('./gulpfile-grommet-release')(gulp, opts);

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

gulp.task('selenium', function(done) {
  selenium.install({
    logger: function(message) {}
  }, function(err) {
    if (err) {
      return done(err);
    }

    selenium.start(function(err, child) {
      if (err) {
        return done(err);
      }

      if (process.env.TRAVIS) {
        child.stderr.on('data', function(data) {
          console.log(data.toString());
        });
      }

      //saving the child to kill it later (oops)
      selenium.child = child;
      done();
    });
  });
});

gulp.task('dist:docs', function() {
  return gulp.src('./docs/gulpfile.js', {
    read: false
  }).pipe(chug({
    tasks: ['dist']
  }));
});

gulp.task('start:docs', ['dist:docs'], function() {
  return server.run(['./examples/server/server.js']);
});

gulp.task('integration', ['start:docs', 'selenium'], function(done) {
  var mocha = require('gulp-mocha');
  return gulp.src('./e2e/**/*.js', {
    read: false
  })
  .pipe(mocha()).on('end', function () {
    if (process.env.TRAVIS) {
      if (global.sessionId) {
        var SauceLabs = require('node-saucelabs');

        var account = new SauceLabs({
          username: process.env.SAUCE_USERNAME,
          password: process.env.SAUCE_ACCESS_KEY
        });

        account.updateJob(global.sessionId, { passed: true }, function (err) {
          if (err) {
            done(err);
          }
          console.log('Sucessfully updated job in Sauce Labs.');
          done();
        });
      } else {
        console.log('Session Id is not defined');
      }
    }
  }).on('error', function() {
    selenium.child.kill();
    server.stop();
    process.exit(1);
  });
});

gulp.task('e2e', ['integration'], function() {
  selenium.child.kill();
  server.stop();
});
