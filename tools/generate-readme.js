import del from 'del';
import fs from 'fs';
import path from 'path';

const components = folder => fs
  .readdirSync(folder)
  .filter(
    file => fs.statSync(path.join(folder, file)).isDirectory() &&
    fs.existsSync(path.join(folder, file, 'doc.js'))
  );

const FOLDER = path.resolve('src/js/components');

components(FOLDER).forEach((component) => {
  /* eslint-disable */
  const doc = require(path.join(FOLDER, component, 'doc.js')).default;
  const Component = require(path.join(FOLDER, component, 'index.js')).default;
  /* eslint-enable */

  const destination = path.join(FOLDER, component, 'README.md');

  del(destination).then(() => fs.writeFile(destination, doc(Component).toMarkdown()));
});
