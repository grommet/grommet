// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import path from 'path';

export function getPackageJSON () {
  delete require.cache[require.resolve('./package.json')];
  var packageJSON = require('./package.json');
  delete packageJSON.config;
  delete packageJSON.scripts;
  packageJSON.main = 'index.js';
  return packageJSON;
}

export default {
  dist: path.resolve(__dirname, 'dist'),
  copyAssets: [
    'README.md',
    {
      asset: 'src/js/**',
      babel: true
    },
    {
      asset: 'src/scss/**',
      dist: 'dist/scss/'
    },
    {
      asset: 'src/utils/**',
      dist: 'dist/utils/'
    },
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    },
    {
      asset: 'bin/**',
      dist: 'dist/bin/'
    },
    {
      asset: 'templates/**',
      dist: 'dist/templates/'
    },
    {
      asset: 'examples/**',
      dist: 'dist/examples/',
      ignores: [
        'node_modules/',
        'dist/'
      ]
    },
    {
      filename: 'package.json',
      asset: JSON.stringify(getPackageJSON(), null, 2)
    },
    {
      asset: 'src/utils/gulp/.eslintrc',
      dist: 'dist/utils/gulp/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: [
    'src/js/**/*.js',
    '!src/js/components/icons/base/**',
    '!src/js/index.js',
    '!src/js/index-icons.js',
    '!src/js/messages/**',
    '!src/js/mixins/**'
  ],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/grommet-core/index.scss',
  icons: {
    source: 'src/img/icons',
    destination: 'src/js/components/icons/base',
    context: '../../../'
  },
  sync: {
    hostname: 'grommet.io',
    username: 'grommet',
    remoteDestination: '/var/www/html/assets/' + getPackageJSON().version
  },
  webpack: {
    output: {
      filename: 'grommet.min.js',
      libraryTarget: 'var',
      library: 'Grommet'
    },
    resolve: {
      alias: {
        'grommet': path.resolve(__dirname, 'src/js')
      },
      modulesDirectories: ['node_modules', 'src/js', 'src/scss']
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  },
  distPreprocess: ['generate-index-icons', 'dist-css'],
  scsslint: true,
  testPaths: [
    'test/**/*.js'
  ]
};
