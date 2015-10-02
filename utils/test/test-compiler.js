//based on https://github.com/danvk/mocha-react
var fs = require('fs');
var babel = require('babel-core');
var loader = require('grommet-icon-loader');
var origJs = require.extensions['.js', '.svg'];

// A module that exports a single, stubbed-out React Component.
var reactStub = 'module.exports = require("react").createClass({render:function(){return null;}});';

// Should this file be stubbed out for testing?
function shouldStub(filename) {
  if (!global.reactModulesToStub) {
    return false;
  }

  // Check if the file name ends with any stub path.
  var stubs = global.reactModulesToStub;
  for (var i = 0; i < stubs.length; i++) {
    if (filename.substr(-stubs[i].length) == stubs[i]) {
      return true;
    }
  }
  return false;
}

// Transform a file via JSX/Harmony or stubbing.
function transform(filename, done) {
  if (shouldStub(filename)) {
    return reactStub;
  } else {
    var content = fs.readFileSync(filename, 'utf8');

    if (/\.svg$/.test(filename)) {

      var loaderContext = {
        resourcePath: filename,
        addDependency: function () {},
        async: function() {
          return function(err, result) {
            done(babel.transform(result).code);
          };
        }
      };
      loader.apply(loaderContext, [content]);
    } else {
      done(babel.transform(content).code);
    }
  }
}

// Install the compiler.
require.extensions['.js', '.svg'] = function(module, filename) {
  // optimization: code in a distribution should never go through JSX compiler.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }

  return transform(filename, function(data) {
    return module._compile(data, filename);
  });
};

module.exports = {
  transform: transform,
  shouldStub: shouldStub
};
