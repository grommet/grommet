import fs from 'fs';
import path from 'path';

var components = function components(folder) {
  return fs.readdirSync(folder).filter(function (file) {
    return fs.statSync(path.join(folder, file)).isDirectory() && fs.existsSync(path.join(folder, file, 'doc.js'));
  });
};

var FOLDER = path.resolve(__dirname, '..');
test('Typescript definition is updated', function (done) {
  var componentFolders = components(FOLDER);
  var typescriptDefinitionContent = {};
  componentFolders.sort().forEach(function (component) {
    typescriptDefinitionContent[component] = fs.readFileSync(path.join(FOLDER, component, 'index.d.ts'), 'utf8');
  });
  expect(typescriptDefinitionContent).toMatchSnapshot();
  done();
});