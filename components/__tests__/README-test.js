"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = function components(folder) {
  return _fs.default.readdirSync(folder).filter(function (file) {
    return _fs.default.statSync(_path.default.join(folder, file)).isDirectory() && _fs.default.existsSync(_path.default.join(folder, file, 'doc.js'));
  });
};

var FOLDER = _path.default.resolve(__dirname, '..');

test('README is updated', function (done) {
  var componentFolders = components(FOLDER);
  var readmeContent = {};
  componentFolders.sort().forEach(function (component) {
    readmeContent[component] = _fs.default.readFileSync(_path.default.join(FOLDER, component, 'README.md'), 'utf8');
  });
  expect(readmeContent).toMatchSnapshot();
  done();
});