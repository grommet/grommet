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
		    .on('end', function () {
		      done();
		    })
		    .resume();
		}
	});

});

gulp.task('export', function (done) {
	mkdirp('./' + dest, function (err) {
		if (err) {
			console.log('Error trying to create project: '+ err);
		} else {
			process.chdir('./' + dest);

			var grommetPath = getGrommetPath();
			var templateFolder = path.join(grommetPath, 'templates/'+app+'/**');
			var exampleFolder = path.join(grommetPath, 'examples/'+app+'/src/**');
			var serverFolder = path.join(grommetPath, 'examples/server/**');
			var grommetFolder = path.join(grommetPath, 'src/**');

			gulp.src(exampleFolder).pipe(gulp.dest('./src'));
			gulp.src(templateFolder).pipe(gulp.dest('./'));
			gulp.src(serverFolder).pipe(gulp.dest('./server'));
			gulp.src(grommetFolder).pipe(gulp.dest('./node_modules/grommet'));
		}
	});

});

gulp.start(task);