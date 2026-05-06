// eslint-disable-next-line import/no-extraneous-dependencies
const { transformSync } = require('@babel/core');

const PLUGIN_NAME = 'grommet-story-source-injector';
const SOURCE_VAR = '__STORYBOOK_SOURCE_CODE__';
const MERGE_VAR = '__withStorySource__';

const getRuntimeExportNames = (declaration, t) => {
  if (!declaration) return [];

  if (
    t.isFunctionDeclaration(declaration) ||
    t.isClassDeclaration(declaration)
  ) {
    return declaration.id && declaration.id.name ? [declaration.id.name] : [];
  }

  if (t.isVariableDeclaration(declaration)) {
    return declaration.declarations
      .map((entry) => (entry.id && entry.id.name ? entry.id.name : null))
      .filter(Boolean);
  }

  return [];
};

const storySourceInjectionPlugin = ({ types: t, template }) => ({
  name: PLUGIN_NAME,
  visitor: {
    Program(programPath, state) {
      const storyExports = [];

      programPath.get('body').forEach((path) => {
        if (!path.isExportNamedDeclaration()) return;

        const { declaration } = path.node;

        if (declaration) {
          storyExports.push(...getRuntimeExportNames(declaration, t));
          return;
        }

        if (path.node.specifiers && path.node.source == null) {
          path.node.specifiers.forEach((specifier) => {
            if (
              t.isExportSpecifier(specifier) &&
              t.isIdentifier(specifier.local)
            ) {
              storyExports.push(specifier.local.name);
            }
          });
        }
      });

      const uniqueStoryExports = [...new Set(storyExports)].filter(Boolean);
      if (!uniqueStoryExports.length) return;

      const sourceDeclaration = t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(SOURCE_VAR),
          t.stringLiteral(state.file.code),
        ),
      ]);

      const mergeDeclaration = template.statement.ast`
        const ${t.identifier(MERGE_VAR)} = (parameters) => ({
          ...parameters,
          docs: {
            ...parameters?.docs,
            source: {
              ...parameters?.docs?.source,
              code:
                parameters?.docs?.source?.code ??
                ${t.identifier(SOURCE_VAR)},
            },
          },
        });
      `;

      programPath.pushContainer('body', sourceDeclaration);
      programPath.pushContainer('body', mergeDeclaration);

      uniqueStoryExports.forEach((exportName) => {
        const injectionStatement = template.statement.ast`
          ${t.identifier(exportName)}.parameters =
            ${t.identifier(MERGE_VAR)}(
              ${t.identifier(exportName)}.parameters || {},
            );
        `;
        programPath.pushContainer('body', injectionStatement);
      });
    },
  },
});

module.exports = function storySourceLoader(source, inputSourceMap) {
  const callback = this.async();
  const isDebug = process.env.STORYBOOK_DEBUG_SOURCE_LOADER === 'true';

  // Skip TypeScript declaration files - they have no runtime code to inject
  if (this.resourcePath.endsWith('.d.ts')) {
    if (isDebug) {
      console.log(
        `[storySourceLoader] Skipping declaration file: ${this.resourcePath}`,
      );
    }
    callback(null, source, inputSourceMap);
    return;
  }

  try {
    if (isDebug) {
      console.log(`[storySourceLoader] Processing: ${this.resourcePath}`);
    }

    const result = transformSync(source, {
      filename: this.resourcePath,
      babelrc: false,
      configFile: false,
      sourceMaps: true,
      inputSourceMap: inputSourceMap || undefined,
      parserOpts: {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        plugins: ['jsx', 'typescript'],
      },
      plugins: [storySourceInjectionPlugin],
    });

    if (isDebug) {
      console.log(`[storySourceLoader] Success: ${this.resourcePath}`);
    }

    callback(null, result.code, result.map || inputSourceMap);
  } catch (error) {
    const prefix = '[storySourceLoader] Failed to transform';
    const errorMsg = `${prefix} ${this.resourcePath}: ${error.message}`;
    console.error(errorMsg);
    if (isDebug) {
      console.error(error);
    }
    callback(new Error(errorMsg));
  }
};
