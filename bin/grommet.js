#!/usr/bin/env node

var gulp = require('gulp');
var template = require('gulp-template');
var install = require('gulp-install');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

String.prototype.capitalize = function() {
  var words = this.split(' ');

  words = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return words.join(' ');
};

var task = process.argv[2] || 'init';
var app = process.argv[3] || 'app-name';
var dest = process.argv[4] || app;
var title = app.replace(/-|_/g, ' ').capitalize();

function getPossibleNodePaths() {
  var splitter = (process.platform === 'win32') ? ';' : ':';
  var paths = [];

  if (process.env.NODE_PATH) {
    paths = paths.concat(process.env.NODE_PATH.split(splitter));
  }

  if (process.platform === 'win32') {
    paths.push(path.join(process.env.APPDATA, 'npm', 'node_modules'));
  }

  paths.push('/usr/lib/node_modules');
  paths.push('/usr/local/lib/node_modules');

  return paths;
}

function getGrommetPath() {

  var grommetPath;
  getPossibleNodePaths().some(function(nodePath) {
    var possiblePath = path.join(nodePath, 'grommet');
    if (fs.existsSync(possiblePath)) {
      grommetPath = possiblePath;
      return true;
    }
    return false;
  });

  if (!grommetPath) {
    console.log('Could not find Grommet!');
    process.exit(1);
  }
  return grommetPath;
}

gulp.task('init', function(done) {
  mkdirp('./' + app, function(err) {
    if (err) {
      console.log('Error trying to create project: ' + err);
    } else {
      process.chdir('./' + app);

      var grommetPath = getGrommetPath();
      var templateFolder = path.join(grommetPath, 'templates/init/**');
      var mobileIcon = path.join(grommetPath, 'mobile-app-icon.png');
      var shortcutIcon = path.join(grommetPath, 'shortcut-icon.png');
      var grommetVersion = require(path.join(grommetPath, 'package.json')).version;

      gulp.src(mobileIcon).pipe(gulp.dest('./src/img'));
      gulp.src(shortcutIcon).pipe(gulp.dest('./src/img'));

      gulp.src(templateFolder)
        .pipe(template({
          appName: app,
          appTitle: title,
          grommetVersion: grommetVersion
        }))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('finish', function() {
          done();
        });
    }
  });

});

gulp.task('export', function(done) {
  mkdirp('./' + dest, function(err) {
    if (err) {
      console.log('Error trying to create project: ' + err);
    } else {
      process.chdir('./' + dest);

      var grommetPath = getGrommetPath();
      var exampleFolder = path.join(grommetPath, 'examples/' + app);
      var templateFolder = path.join(grommetPath, 'templates/' + app + '/**');

      var backendData = path.join(grommetPath, 'examples/server/data.js');
      var filter = path.join(grommetPath, 'examples/server/filter.js');
      var generator = path.join(grommetPath, 'examples/server/generator.js');
      var map = path.join(grommetPath, 'examples/server/map.js');
      var serverDependencies = path.join(grommetPath, 'examples/server/package.json');
      var rest = path.join(grommetPath, 'examples/server/rest.js');
      var serverFiles = [backendData, filter, generator, map, serverDependencies, rest];

      fs.exists(exampleFolder, function(exists) {
        if (!exists) {
          throw new Error('Could not find ' + exampleFolder);
        }

        gulp.src([
          exampleFolder + '/**',
          '!' + exampleFolder + '/node_modules/',
          '!' + exampleFolder + '/node_modules/**',
          '!' + exampleFolder + '/dist/',
          '!' + exampleFolder + '/dist/**',
          '!' + exampleFolder + '/gulpfile.js',
          '!' + exampleFolder + '/package.json',
          '!' + exampleFolder + '/README.md'
        ]).pipe(gulp.dest('./')).on('end', function() {
          gulp.src(templateFolder).pipe(template({
            appName: dest
          })).pipe(gulp.dest('./')).pipe(install()).on('finish', function() {
            if (app === 'medium-app') {
              gulp.src(serverFiles).pipe(gulp.dest('./server')).pipe(install());
            }
          });
        });

        process.on('exit', function () {
          console.log('Successfully exported ' + app + ' to ' + dest + '.');
          done();
        });
      });
    }
  });

});

var argv = require('yargs').argv;

if (argv.version) {
  console.log(require(path.join(getGrommetPath(), 'package.json')).version);
  process.exit(0);
} else {
  gulp.start(task);
}
