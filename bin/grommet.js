#!/usr/bin/env node

var gulp = require('gulp');
var template = require('gulp-template');
var install = require('gulp-install');
var path = require('path');
var mkdirp = require('mkdirp');
var shelljs = require('shelljs');

String.prototype.capitalize = function() {
  var words = this.split(' ');

  words = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return words.join(' ');
};

var task = process.argv[2] || 'init';
var app = process.argv[3] || 'app-name';
var title = app.replace(/-|_/g, ' ').capitalize();
var grommetPath = path.join(__dirname, '..');

function nodeVersionSupported() {
  return Number(process.version.match(/^v(\d+\.\d+)/)[1]) >= 0.10;
}

var npmVersion;
function npmVersionSupported() {
  npmVersion = Number(shelljs.exec('npm --version').output.toString().match(/^(\d+\.\d+)/)[1]);
  return npmVersion  >= 1.4;
}

gulp.task('init', function(done) {

  if (!nodeVersionSupported() || !npmVersionSupported()) {
    console.error('[grommet] Grommet requires Node v0.10+ and NPM 1.4.x+.');
    console.error('[grommet] Currently you have Node ' + process.version + ' and NPM ' + npmVersion);
    process.exit(1);
  }

  mkdirp('./' + app, function(err) {
    if (err) {
      console.log('Error trying to create project: ' + err);
    } else {
      process.chdir('./' + app);

      var templateFolder = path.join(grommetPath, 'templates/init/**');
      var mobileIcon = path.join(grommetPath, 'mobile-app-icon.png');
      var shortcutIcon = path.join(grommetPath, 'shortcut-icon.png');

      var packageJSON = require(path.join(grommetPath, 'package.json'));

      gulp.src(mobileIcon).pipe(gulp.dest('./src/img'));
      gulp.src(shortcutIcon).pipe(gulp.dest('./src/img'));
      gulp.src(templateFolder)
      .pipe(template({
        appName: app,
        appTitle: title,
        grommetVersion: packageJSON.version
      }))
      .pipe(gulp.dest('./'))
      .pipe(install()).on('finish', function() {
        done();
      });
    }
  });

});

gulp.task('export', function() {
  console.log('[REMOVED] All the example apps now live outside Grommet. Checkout Grommet organization in Github to learn more (https://github.com/grommet).');
});

var argv = require('yargs').argv;

if (argv.version) {
  console.log(require(path.join(grommetPath, 'package.json')).version);
  process.exit(0);
} else {
  gulp.start(task);
}
