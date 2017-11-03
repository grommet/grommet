// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
      babel: true,
      ignores: ['.DS_Store']
    },
    {
      asset: 'src/scss/**',
      dist: 'dist/scss/'
    },
    {
      asset: 'src/img/**',
      dist: 'dist/img/'
    },
    {
      filename: 'package.json',
      asset: JSON.stringify(getPackageJSON(), null, 2)
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: ['src/js/**/*.js'],
  mainJs: 'src/js/index-commonjs.js',
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
      'react-dom': 'ReactDOM',
      'react-addons-transition-group': 'React.addons.TransitionGroup'
    }
  },
  distPreprocess: ['generate-index-icons', 'dist-css'],
  testPaths: [
    '__tests__',
    '!__tests__/utils/',
    '!__tests__/mocks/'
  ],
  preCommitTasks: ['generate-index-icons', 'jslint', 'scsslint', 'test']
};
