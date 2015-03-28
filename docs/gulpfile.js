var gulp = require('gulp');
var path = require('path');

var opts = {
  base: '../',
  dist: 'docs/dist/',
  copyAssets: ['docs/src/index.html'],
  scssAssets: ['src/scss/ligo-doc/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'src/scss/ligo-doc/index.scss',
  remoteDestination: '/var/www/html/doc',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, '../src/js/doc'),
        path.resolve(__dirname, '../src/lib'),
        path.resolve(__dirname, '../src/scss/ligo-doc'),
        path.resolve(__dirname, '../node_modules')
      ]
    }  
  },
  devServerPort: 8080
};

React.createClass({
  render: function() {
    return (
      null
    );
  }
});

require('../_base.gulpfile.js')(opts);