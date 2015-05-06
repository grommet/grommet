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
var title = app.replace(/-|_/g, ' ').capitalize();

function getPossibleNodePaths() {
	var splitter = (process.platform === 'win32') ? ';' : ':';
  var paths = [];

  if (process.env.NODE_PATH) {
    paths = paths.concat(process.env.NODE_PATH.split(splitter));
  }

  paths.push(path.join(process.env.APPDATA, 'npm', 'node_modules'));
  paths.push('/usr/lib/node_modules');
  paths.push('/usr/local/lib/node_modules');

  return paths;
}

function getGrommetPath() {

	var grommetPath;
	getPossibleNodePaths().some(function (nodePath) {
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

gulp.task('init', function (done) {
	mkdirp('./' + app, function (err) {
		if (err) {
			console.log('Error trying to create project: '+ err);
		} else {
			process.chdir('./' + app);

			var templateFolder = path.join(getGrommetPath(), 'templates/**');
			var mobileIcon = path.join(getGrommetPath(), 'mobile-app-icon.png');
			var shortcutIcon = path.join(getGrommetPath(), 'shortcut-icon.png');

			gulp.src(mobileIcon).pipe(gulp.dest('./src/img'));
			gulp.src(shortcutIcon).pipe(gulp.dest('./src/img'));

		  gulp.src(templateFolder)
		  	.pipe(template({
		        appName: app,
		        appTitle: title
		    }))
		    .pipe(gulp.dest('./'))
		    .pipe(install())
		    .on('end', function () {
		      done();
		    })
		    .resume();
		}
	});

});

gulp.start(task);