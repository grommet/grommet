// eslint-disable-next-line import/no-extraneous-dependencies
const { transformSync } = require('@babel/core');
const { mapSizeToken, SPACING_PROPS } = require('./sizeMapper');

const PLUGIN_NAME = 'grommet-story-source-injector';
const SOURCE_VAR = '__STORYBOOK_SOURCE_CODE__';
const SOURCE_HPE_VAR = '__STORYBOOK_SOURCE_CODE_HPE__';
const MERGE_VAR = '__withStorySource__';

const STYLE_PROPS = new Set([
  'gap',
  'margin',
  'pad',
  'thickness',
  'border',
  'height',
  'width',
  'columns',
  'rows',
  'size',
  'round',
  'nameProps',
  'valueProps',
  'dropProps',
  'defaultItemProps',
  'boxProp',
  'buttonProps',
  'paginate',
  'contentProps',
  'chart',
]);

const getComponentName = (openingElement) => {
  if (!openingElement || !openingElement.name) return undefined;
  if (openingElement.name.type === 'JSXIdentifier') {
    return openingElement.name.name;
  }
  return undefined;
};

const getPropName = (propertyNode) => {
  if (!propertyNode || !propertyNode.key) return undefined;
  if (propertyNode.key.type === 'Identifier') return propertyNode.key.name;
  if (propertyNode.key.type === 'StringLiteral') return propertyNode.key.value;
  return undefined;
};

const mapNodeByProp = (node, prop, componentName, t, parentProp) => {
  if (!node) return;

  if (t.isStringLiteral(node)) {
    // eslint-disable-next-line no-param-reassign
    node.value = mapSizeToken(prop, node.value, { componentName, parentProp });
    return;
  }

  if (t.isTemplateLiteral(node)) return;

  if (t.isArrayExpression(node)) {
    node.elements.forEach((element) => {
      mapNodeByProp(element, prop, componentName, t, parentProp);
    });
    return;
  }

  if (t.isConditionalExpression(node) || t.isLogicalExpression(node)) {
    mapNodeByProp(node.left, prop, componentName, t, parentProp);
    mapNodeByProp(node.right, prop, componentName, t, parentProp);
    mapNodeByProp(node.consequent, prop, componentName, t, parentProp);
    mapNodeByProp(node.alternate, prop, componentName, t, parentProp);
    return;
  }

  if (t.isCallExpression(node)) {
    if (
      t.isMemberExpression(node.callee) &&
      t.isIdentifier(node.callee.property, { name: 'includes' })
    ) {
      return;
    }

    node.arguments.forEach((arg) => {
      mapNodeByProp(arg, prop, componentName, t, parentProp);
    });
    return;
  }

  if (t.isObjectExpression(node)) {
    node.properties.forEach((propertyNode) => {
      if (!t.isObjectProperty(propertyNode)) return;

      const keyName = getPropName(propertyNode);
      if (!keyName) return;

      let nextProp = prop;
      let nextParentProp = prop;

      if (keyName === 'size' && prop === 'border') {
        nextProp = 'size';
        nextParentProp = 'border';
      } else if (
        STYLE_PROPS.has(keyName) ||
        ['top', 'bottom', 'left', 'right', 'horizontal', 'vertical'].includes(
          keyName,
        )
      ) {
        if (
          ['top', 'bottom', 'left', 'right', 'horizontal', 'vertical'].includes(
            keyName,
          )
        ) {
          nextProp = SPACING_PROPS.has(prop) ? prop : 'pad';
        } else {
          nextProp = keyName;
        }
      }

      mapNodeByProp(
        propertyNode.value,
        nextProp,
        componentName,
        t,
        nextParentProp,
      );
    });
  }
};

const hpeSourceTransformPlugin = ({ types: t }) => ({
  name: 'grommet-story-size-hpe-transform',
  visitor: {
    JSXAttribute(path) {
      if (!t.isJSXIdentifier(path.node.name)) return;

      const propName = path.node.name.name;
      if (!STYLE_PROPS.has(propName)) return;

      const componentName = getComponentName(path.parentPath.node);
      const { value } = path.node;

      if (t.isStringLiteral(value)) {
        value.value = mapSizeToken(propName, value.value, { componentName });
        return;
      }

      if (t.isJSXExpressionContainer(value)) {
        mapNodeByProp(value.expression, propName, componentName, t);
      }
    },
    VariableDeclarator(path) {
      if (!t.isIdentifier(path.node.id)) return;
      const propName = path.node.id.name;
      if (!STYLE_PROPS.has(propName)) return;

      mapNodeByProp(path.node.init, propName, undefined, t);
    },
  },
});

const transformSourceForHpe = (source, resourcePath) => {
  const result = transformSync(source, {
    filename: resourcePath,
    babelrc: false,
    configFile: false,
    retainLines: true,
    generatorOpts: {
      compact: false,
      comments: true,
      retainLines: true,
    },
    parserOpts: {
      sourceType: 'module',
      allowReturnOutsideFunction: true,
      plugins: ['jsx', 'typescript'],
    },
    plugins: [hpeSourceTransformPlugin],
  });

  return result && result.code ? result.code : source;
};

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

      const hpeSourceDeclaration = t.variableDeclaration('const', [
        t.variableDeclarator(
          t.identifier(SOURCE_HPE_VAR),
          t.stringLiteral(state.opts.hpeSourceCode || state.file.code),
        ),
      ]);

      const mergeDeclaration = template.statement.ast`
        const ${t.identifier(MERGE_VAR)} = (parameters) => ({
          ...parameters,
          sizeMapping: {
            ...parameters?.sizeMapping,
            originalSourceCode:
              parameters?.sizeMapping?.originalSourceCode ??
              ${t.identifier(SOURCE_VAR)},
            hpeSourceCode:
              parameters?.sizeMapping?.hpeSourceCode ??
              ${t.identifier(SOURCE_HPE_VAR)},
          },
          docs: {
            ...parameters?.docs,
            source: {
              ...parameters?.docs?.source,
              originalSource:
                parameters?.docs?.source?.originalSource ??
                ${t.identifier(SOURCE_VAR)},
            },
          },
        });
      `;

      programPath.pushContainer('body', sourceDeclaration);
      programPath.pushContainer('body', hpeSourceDeclaration);
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
      plugins: [
        [
          storySourceInjectionPlugin,
          {
            hpeSourceCode: transformSourceForHpe(source, this.resourcePath),
          },
        ],
      ],
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
