import del from 'del';
import fs from 'fs';
import path from 'path';

const code = '```';

const replaceHoc = content => content.replace(/(With.*\()(.*)(\))/g, '$2');

const toMarkdown = theme => {
  const themeProps = Object.keys(theme).map(
    themeEntry => `
**${themeEntry}**

${theme[themeEntry].description} Expects \`${theme[themeEntry].type}\`.

Defaults to

${code}
${theme[themeEntry].defaultValue}
${code}
`,
  );
  return `## Theme
  ${themeProps.join('')}`;
};

const components = folder =>
  fs
    .readdirSync(folder)
    .filter(
      file =>
        fs.statSync(path.join(folder, file)).isDirectory() &&
        fs.existsSync(path.join(folder, file, 'doc.js')),
    );

const FOLDER = path.resolve('src/js/components');

components(FOLDER).forEach(component => {
  /* eslint-disable */
  try {
    const { doc, themeDoc } = require(path.join(FOLDER, component, 'doc.js'));
    const componentModule = require(path.join(FOLDER, component, 'index.js'));

    // we use the second array element since the first is '__esModule'.
    const Component =
      componentModule[
        Object.keys(componentModule).filter(k => k === component)[0]
      ];
    /* eslint-enable */

    const readmeDestination = path.join(FOLDER, component, 'README.md');

    const DocumentedComponent = doc(Component);

    const readmeContent = themeDoc
      ? `${replaceHoc(DocumentedComponent.toMarkdown())}\n${toMarkdown(
          themeDoc,
        )}`
      : `${replaceHoc(DocumentedComponent.toMarkdown())}`;
    del(readmeDestination).then(() =>
      fs.writeFileSync(readmeDestination, readmeContent),
    );
  } catch (ex) {
    /*
    Catching and ignoring the exception is intentional. This is related to 
    the removal of react-desc. 
    
    As components have react-desc removed and no longer have doc files, the 
    catch block will trigger. In this case nothing went wrong, it was 
    expected that as react-desc is removed components will no longer have 
    doc files in grommet, so we don't want to throw an error ro warning to 
    console. 
    
    This block was added to maintain backwards compatibility for components 
    that still use react-desc. Once react-desc is completely removed it can 
    be removed as well.
    */
  }
});
