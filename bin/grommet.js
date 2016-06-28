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

function nodeVersionSupported() {
  return Number(process.version.match(/^v(\d+\.\d+)/)[1]) >= 0.10;
}

function npmVersionSupported(npmVersion) {
  return npmVersion >= 1.4;
}

var tasks = {
  'init': function(done) {
    if (!nodeVersionSupported() || !npmVersionSupported(npmVersion)) {
      console.error('[grommet] Grommet requires Node v0.10+ and NPM 1.4.x+.');
      console.error(
        '[grommet] Currently you have Node ' + process.version +
        ' and NPM ' + npmVersion
      );
      process.exit(1);
    }

    mkdirp('./' + app, function(err) {
      if (err) {
        console.log('Error trying to create project: ' + err);
      } else {
        process.chdir('./' + app);

        var templateFolder = path.join(grommetPath, 'templates/init/**');
        var mobileIcon = path.join(grommetPath, 'img/mobile-app-icon.png');
        var shortcutIcon = path.join(grommetPath, 'img/shortcut-icon.png');

        gulp.src(mobileIcon).pipe(gulp.dest('./src/img'));
        gulp.src(shortcutIcon).pipe(gulp.dest('./src/img'));
        gulp.src(templateFolder, { dot: true })
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
  }
};

var grommetPath = path.join(__dirname, '..');
var packageJSON = require(path.join(grommetPath, 'package.json'));
var npmVersion = Number(shelljs.exec('npm --version', {silent:true})
  .stdout.toString().match(/^(\d+\.\d+)/)[1]);
var argv = require('yargs').boolean('version').argv;

if (argv.version) {
  console.log(packageJSON.version);
  process.exit(0);
}

var options = argv._;
var command = options[0] || 'init';
if (command === 'init') {
  var app = options[1] || 'app-name';
  var title = app.replace(/-|_/g, ' ').capitalize();
}

if (command in tasks) {
  gulp.task(command, tasks[command]);
  gulp.start(command);
} else {
  var allTaskNames = Object.keys(tasks).join('|');
  console.log('[grommet] Command "' + command + '" not supported.');
  console.log('[grommet] Usage: grommet <' + allTaskNames + '>');
  process.exit(1);
}
