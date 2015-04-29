var gulp = require('gulp');
var path = require('path');
var devGulpTasks = require('grommet/utils/gulp-tasks');

var opts = {
  base: '../../',
  dist: path.resolve(__dirname, '../../docs/dist/hpe'),
  copyAssets: [
    'docs/src/index.html',
    {
      asset: 'docs/src/style_guide/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'src/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'docs/src/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'docs/src/documentation/img/**',
      dist: 'docs/dist/hpe/img/'
    },
    {
      asset: 'src/scss/hpe/font/**',
      dist: 'docs/dist/hpe/font/'
    }
  ],
  scssAssets: ['src/scss/grommet-core/**/*.scss', 'docs/src/scss/**/*.scss', 'src/scss/hpe/**/*.scss'],
  jsAssets: ['docs/src/**/*.js'],
  mainJs: 'docs/src/index.js',
  mainScss: 'docs/src/scss/index-hpe.scss',
  sync: {
    hostname: 'grommet.usa.hp.com',
    username: 'ligo',
    remoteDestination: '/var/www/html/doc/hpe'
  },
  webpack: {
  	devAlias: {
  		'grommet/hpe/font': path.resolve(__dirname, '../../src/scss/hpe/font'),
  		'grommet': path.resolve(__dirname, '../../src/js')
  	},
    resolve: {
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
	        test: /style_guide\/[^\/]*\.htm$/,
	        loader: 'jsx-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader?group=true'
	      },
	      {
	        test: /documentation\/.*\.htm$|downloads\/.*\.htm$|style_guide\/.*\/.*\.htm$/,
	        loader: 'jsx-loader!imports?React=react,Router=react-router,Link=>Router.Link!html-jsx-loader'
	      }
    	]
    }	
  },
  devServerPort: 8003,
  devServerProxy: {
    "/rest/*": 'http://localhost:8000'
  },
  env: {
    __THEME__: {
      hpe: true
    }
  }
};

devGulpTasks(gulp, opts);
