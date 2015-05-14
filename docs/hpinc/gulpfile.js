var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('../../src/js/utils/gulp-tasks');

var grommetVersion = require('../../package.json').version;

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../docs/dist/hpinc'),
  copyAssets: [
    'docs/src/index.html',
    {
      asset: 'docs/src/style_guide/img/**',
      dist: 'docs/dist/hpinc/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'docs/dist/hpinc/img/'
    },
    {
      asset: 'docs/src/img/**',
      dist: 'docs/dist/hpinc/img/'
    },
    {
      asset: 'docs/src/documentation/img/**',
      dist: 'docs/dist/hpinc/img/'
    }
  ],
  scssAssets: ['src/scss/grommet-core/**/*.scss', 'docs/src/scss/**/*.scss', 'src/scss/hpinc/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'docs/src/scss/index-hpinc.scss',
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/doc/hpinc'
  },
  webpack: {
    resolve: {
    	alias: {
	      'grommet/scss': path.resolve(__dirname, '../../src/scss'),
	      'grommet': path.resolve(__dirname, '../../src/js')
	    },
      root: [
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, '../../src/lib'),
        path.resolve(__dirname, '../../src/scss'),
        path.resolve(__dirname, '../src/scss')
      ]
    },
    module: {
      loaders: [
        {
          test: /style_guide(\/|\\)[^\/]*\.htm$/,
          loader: 'jsx-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader?group=true&__GROMMET_VERSION__=' + grommetVersion
        },
        {
          test: /documentation(\/|\\).*\.htm$|downloads(\/|\\).*\.htm$|style_guide(\/|\\).*\/.*\.htm$/,
          loader: 'jsx-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader?__GROMMET_VERSION__=' + grommetVersion
        }
      ]
    }
  },
  devServerPort: 8004,
  devServerProxy: {
    "/rest/*": 'http://localhost:8000'
  },
  env: {
    __THEME__: {
      hpinc: true
    }
  },
  scsslint: true
};

devGulpTasks(gulp, opts);
