#!/usr/bin/env node

var gulp = require('gulp');
var template = require('gulp-template');
var install = require('gulp-install');
var rename = require('gulp-rename');
var path = require('path');
var mkdirp = require('mkdirp');
var shelljs = require('shelljs');
var fs = require('fs');

Array.prototype.unique = function() {
  var that = this;
  return this.filter(function(elem, pos) {
    return that.indexOf(elem) == pos;
  });
};

Array.prototype.remove = function(values) {
  return this.filter(function(value) {
    return values.indexOf(value) == -1;
  });
}

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
  },
  'new': function(command) {
    return function() {
      if (!dependenciesSupported(command.env.nodeVersion, command.env.npmVersion)) {
        process.exit(1);
      }

      var newAppPath = path.join(process.cwd(), command.options.app);

      if (fileExists(newAppPath)) {
        console.error('[grommet] Error while creating new app. Directory "'+command.options.app+'" already exists.');
        process.exit(1);
      }

      mkdirp(newAppPath, function(err) {
        if (err) {
          console.error('[grommet] Error trying to create project: ' + err);
          process.exit(1);
        }

        try {
          var templateFolder = path.join(command.env.templatePath, 'new/**');
          copyAssetsAndInstall(templateFolder, newAppPath, command);
        } catch(err) {
          shelljs.rm('-rf', newAppPath);
          console.error('[grommet] Error while creating new app '+command.options.app+'.');
          throw err;
        }
      })
    }
  },
  'create-component': function(command) {
    return function() {
      var methodBlacklist = [ 'constructor', 'render' ];
      var componentTemplate = 'component_template.js';
      var from = path.join(command.env.templatePath, componentTemplate);
      var to = path.join(process.cwd(), 'src/js/components');

      var grommetFiles = [
        'grommet-toolbox.config.js',
        'src/js',
        'src/js/components'
      ]

      var isAGrommetProject = function() {
        var cwd = process.cwd();
        return grommetFiles.every(function(filePath) {
          var filePath = path.join(cwd, filePath);
          return fileExists(filePath)
        });
      }();

      if (!isAGrommetProject) {
        console.error(
          '[grommet] Error while creating component. '+
          'It seems the current directory is not a Grommet project.');
        process.exit(1);
      }

      var componentTemplateExists = fileExists(from);
      if (!componentTemplateExists) {
        console.error('[grommet] Error while creating component. Could not find template file ['+from+'].');
        process.exit(1);
      }

      var methodsTemplate = "";
      if (command.options.methodList) {
        methodsTemplate = command.options.methodList
          .split(',')
          .map(function(methodName) {
            return methodName.trim();
          })
          .unique()
          .remove(methodBlacklist)
          .map(function(methodName) {
            return '\n  '+methodName+'() {\n    return();\n  }\n';
        }).join('');
      }

      gulp.src(from)
        .pipe(template({
          componentName: command.options.component,
          methods: methodsTemplate
        }))
        .pipe(rename(command.options.component+'.js'))
        .pipe(gulp.dest(to));

      console.log('[grommet] Component '+command.options.component+' has been successfully created.');
    }
  }
};

var parseOpts = {
  'init': function(command, options) {
    command.options['app'] = options[1] || 'app-name';
    command.options['title'] = command.options.app.replace(/-|_/g, ' ').capitalize();
    return command;
  },
  'new': function(command, options) {
    command.options['app'] = options[1];
    if (!command.options.app) {
      console.error('[grommet] Usage: grommet new <app-name> [description]');
      process.exit(1);
    }
    command.options['title'] = command.options.app.replace(/-|_/g, ' ').capitalize();
    command.options['description'] = options[2] || "";
    return command;
  },
  'create': function(command, options) {
    var usage = '[grommet] Usage: grommet create component <component-name> [method1,method2,...,methodN]'
    var entity = options[1];
    if (!entity) {
      console.error(usage);
      process.exit(1);
    }
    switch(entity) {
      case 'component':
        var component = options[2];
        if (!component) {
            console.error(usage);
            process.exit(1);
        }
        console.log('[grommet] Creating component '+component+'...');
        command.task = command.task+'-'+entity;
        command.options.component = component;
        command.options.methodList = options[3] || '';
        break;
      default:
        console.error('[grommet] Do not know how to create '+entity+'.');
        console.error(usage);
        process.exit(1);
        break;
    }
    return command;
  }
}

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

if (!command.task in tasks) {
  var allTaskNames = Object.keys(tasks).join('|');
  console.error('[grommet] Command "' + command.task + '" not supported.');
  console.error('[grommet] Usage: grommet <' + allTaskNames + '>');
  process.exit(1);
}

if (command.task in parseOpts) {
  command = parseOpts[command.task](command, options);
}

gulp.task(command.task, tasks[command.task](command));
gulp.start(command.task);
