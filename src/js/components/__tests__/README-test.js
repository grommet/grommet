import fs from 'fs';
import path from 'path';

const components = folder => fs
.readdirSync(folder)
.filter(
  file => fs.statSync(path.join(folder, file)).isDirectory() &&
  fs.existsSync(path.join(folder, file, 'doc.js'))
);

const FOLDER = path.resolve(__dirname, '../');

test('README is update to date', (done) => {
  const componentFolders = components(FOLDER);
  componentFolders.sort().forEach((component, index) => {
    fs.readFile(path.join(FOLDER, component, 'README.md'), 'utf8', (err, data) => {
      expect(data).toMatchSnapshot();

      if (componentFolders.length === index + 1) {
        done();
      }
    });
  });
});
