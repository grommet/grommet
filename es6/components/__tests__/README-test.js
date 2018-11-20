import fs from 'fs';
import path from 'path';

var components = function components(folder) {
  return fs.readdirSync(folder).filter(function (file) {
    return fs.statSync(path.join(folder, file)).isDirectory() && fs.existsSync(path.join(folder, file, 'doc.js'));
  });
};

var FOLDER = path.resolve(__dirname, '..');
test('README is updated', function (done) {
  var componentFolders = components(FOLDER);
  var readmeContent = {};
  componentFolders.sort().forEach(function (component) {
    readmeContent[component] = fs.readFileSync(path.join(FOLDER, component, 'README.md'), 'utf8');
  });
  expect(readmeContent).toMatchSnapshot();
  done();
});