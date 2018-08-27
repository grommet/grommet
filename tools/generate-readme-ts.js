import del from 'del';
import fs from 'fs';
import path from 'path';

const getTypescriptDefinitionFile = (component, { properties }) => `import * as React from "react";

export interface ${component}Props {
  ${(properties || []).map(
    ({ name, format, required }) => `${name}${required ? '' : '?'}: ${format};`
  ).join('\n  ')}
}

declare const ${component}: React.ComponentType<${component}Props>;

export { ${component} };
`;

const components = folder => fs
  .readdirSync(folder)
  .filter(
    file => fs.statSync(path.join(folder, file)).isDirectory() &&
    fs.existsSync(path.join(folder, file, 'doc.js'))
  );

const FOLDER = path.resolve('src/js/components');

components(FOLDER).forEach((component) => {
  /* eslint-disable */
  const doc = require(path.join(FOLDER, component, 'doc.js')).doc;
  const componentModule = require(path.join(FOLDER, component, 'index.js'));
  // we use the second array element since the first is '__esModule'.
  const Component = componentModule[Object.keys(componentModule)[1]];
  /* eslint-enable */

  const readmeDestination = path.join(FOLDER, component, 'README.md');
  const typescriptDefinitionDestination = path.join(FOLDER, component, 'index.d.ts');

  const DocumentedComponent = doc(Component);

  del(typescriptDefinitionDestination).then(
    () => fs.writeFileSync(
      typescriptDefinitionDestination,
      getTypescriptDefinitionFile(component, DocumentedComponent.toTypescript())
    )
  );
  del(readmeDestination)
    .then(() => fs.writeFileSync(readmeDestination, DocumentedComponent.toMarkdown()));
});
