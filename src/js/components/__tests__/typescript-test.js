import fs from 'fs';
import path from 'path';

const components = folder =>
  fs
    .readdirSync(folder)
    .filter(
      file =>
        fs.statSync(path.join(folder, file)).isDirectory() &&
        fs.existsSync(path.join(folder, file, 'doc.js'))
    );

const FOLDER = path.resolve(__dirname, '..');

test('Typescript definition is updated', done => {
  const componentFolders = components(FOLDER);
  const typescriptDefinitionContent = {};
  componentFolders.sort().forEach(component => {
    typescriptDefinitionContent[component] = fs.readFileSync(
      path.join(FOLDER, component, 'index.d.ts'),
      'utf8'
    );
  });
  expect(typescriptDefinitionContent).toMatchSnapshot();
  done();
});
