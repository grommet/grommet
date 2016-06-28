#!/usr/bin/env node

var gulp = require('gulp');
var template = require('gulp-template');
var install = require('gulp-install');
var path = require('path');
var mkdirp = require('mkdirp');
var shelljs = require('shelljs');
var fs = require('fs');

String.prototype.capitalize = function() {
  var words = this.split(' ');

  words = words.map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return words.join(' ');
};

function fileExists(filePath) {
  try {
    result = fs.statSync(filePath);
    return true;
  } catch(error) {
  }

  return false;
}

function nodeVersionSupported(nodeVersion) {
  return nodeVersion >= Number(supportedNodeVersion);
}

function npmVersionSupported(npmVersion) {
  return npmVersion >= Number(supportedNpmVersion);
}

function dependenciesSupported(nodeVersion, npmVersion) {
  if (!nodeVersionSupported(nodeVersion) || !npmVersionSupported(npmVersion)) {
    console.error(
      '[grommet] Grommet requires Node v'+supportedNodeVersion+
      '+ and NPM '+supportedNpmVersion+'+.');
    console.error(
      '[grommet] Currently you have Node ' + process.version +
      ' and NPM ' + npmVersion
    );
    return false;
  }

  return true;
}

function copyAssetsAndInstall(from, to, command) {
  var installDependencies = function() {
    console.log("[grommet] Installing Grommet dependencies...");
    return install();
  }

  var templateVars = {
    appName: command.options.app,
    appTitle: command.options.title,
    appDescription: command.options.description,
    grommetVersion: command.env.grommetVersion
  };

  gulp.src(from, { dot: true })
    .pipe(template(templateVars))
    .pipe(gulp.dest(to))
    .pipe(installDependencies());
}

var tasks = {
  'init': function(command) {
    return function() {
      if (!dependenciesSupported(command.env.nodeVersion, command.env.npmVersion)) {
        process.exit(1);
      }

      var newAppPath = path.join(process.cwd(), command.options.app);

      mkdirp(newAppPath, function(err) {
        if (err) {
          console.log('Error trying to create project: ' + err);
        } else {
          var templateFolder = path.join(command.env.templatePath, 'init/**');
          var mobileIcon = path.join(command.env.grommetPath, 'img/mobile-app-icon.png');
          var shortcutIcon = path.join(command.env.grommetPath, 'img/shortcut-icon.png');

          gulp.src(mobileIcon).pipe(gulp.dest('./src/img'));
          gulp.src(shortcutIcon).pipe(gulp.dest('./src/img'));
          copyAssetsAndInstall(templateFolder, newAppPath, command);
        }
      })
    }
  }
};

var supportedNodeVersion = '0.10';
var supportedNpmVersion = '1.4';
var grommetPath = path.join(__dirname, '..');
var argv = require('yargs').boolean('version').argv;
var options = argv._;
var command = {
  task: options[0] || 'init',
  env: {
    grommetPath: grommetPath,
    grommetVersion: require(path.join(grommetPath, 'package.json')).version,
    templatePath: path.join(grommetPath, 'templates'),
    npmVersion: Number(shelljs.exec('npm --version', {silent:true}).stdout.toString().match(/^(\d+\.\d+)/)[1]),
    nodeVersion: Number(process.version.match(/^v(\d+\.\d+)/)[1]),
    processVersion: process.version
  },
  options: {}
}

if (argv.version) {
  console.log(command.env.grommetVersion);
  process.exit(0);
}

switch(command.task) {
  case 'init':
    command.options['app'] = options[1] || 'app-name';
    command.options['title'] = command.options.app.replace(/-|_/g, ' ').capitalize();
    break;
}

if (command.task in tasks) {
  gulp.task(command.task, tasks[command.task](command));
  gulp.start(command.task);
} else {
  var allTaskNames = Object.keys(tasks).join('|');
  console.log('[grommet] Command "' + command.task + '" not supported.');
  console.log('[grommet] Usage: grommet <' + allTaskNames + '>');
  process.exit(1);
}
