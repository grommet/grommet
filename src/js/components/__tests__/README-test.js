import fs from 'fs';
import path from 'path';

const components = folder =>
  fs.readdirSync(folder).filter(file => fs.statSync(path.join(folder, file)).isDirectory() && fs.existsSync(path.join(folder, file, 'doc.js')));

const FOLDER = path.resolve(__dirname, '..');

test('README is updated', done => {
  const componentFolders = components(FOLDER);
  const readmeContent = {};
  componentFolders.sort().forEach(component => {
    readmeContent[component] = fs.readFileSync(path.join(FOLDER, component, 'README.md'), 'utf8');
  });
  expect(readmeContent).toMatchSnapshot();
  done();
});
