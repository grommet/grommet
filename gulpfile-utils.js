module.exports = {
  getPackageJSON: function () {
    delete require.cache[require.resolve('./package.json')];
    var packageJSON = require('./package.json');
    delete packageJSON.devDependencies;
    delete packageJSON.config;
    packageJSON.main = 'index.js';
    packageJSON.dependencies = {
      'react': '^0.13.1',
      'react-intl': '^1.2.0',
      'inuit-box-sizing': '~0.2.0',
      'inuit-clearfix': '^0.2.1',
      'inuit-defaults': '~0.2.1',
      'inuit-functions': '~0.2.0',
      'inuit-headings': '~0.3.0',
      'inuit-images': '~0.3.3',
      'inuit-list-bare': '~0.3.0',
      'inuit-lists': '~0.1.0',
      'inuit-mixins': '~0.2.3',
      'inuit-normalize': '~3.0.2',
      'inuit-page': '~0.2.1',
      'inuit-reset': '~0.1.1',
      'inuit-responsive-settings': '~0.1.2',
      'inuit-responsive-tools': '~0.1.1',
      'inuit-shared': '~0.1.5',
      'mkdirp': '^0.5.0',
      'gulp': '^3.8.11',
      'gulp-template': '^3.0.0',
      'gulp-install': '^0.4.0',
      "lodash": "^3.8.0",
      "reflux": "^0.2.7",
      "superagent": "^1.1.0",
      "yargs": "^3.8.0"
    };
    return packageJSON;
  }
};
