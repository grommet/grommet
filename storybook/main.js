const path = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  addons: [
    '@storybook/addon-toolbars',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],
  stories: [
    '../src/js/all/**/stories/*.stories.@(ts|tsx|js|jsx)',
    '../src/js/all/stories/typescript/*.stories.tsx',
    '../src/js/components/**/stories/typescript/*.stories.tsx',
    '../src/js/components/**/stories/*.stories.@(ts|tsx|js|jsx)',
    '../src/js/components/**/stories/CustomThemed/*.stories.@(ts|tsx|js|jsx)',
    '../src/js/components/**/*stories.js',
    '../src/js/contexts/**/*stories.js',
    '../src/js/contexts/**/stories/typescript/*.stories.tsx',
    '../src/js/contexts/**/stories/*.stories.@(ts|tsx|js|jsx)',
  ],
  features: {
    postcss: false,
  },

  staticDirs: ['./public'],

  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },

  async viteFinal(config) {
    const { transformWithEsbuild } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          grommet: path.resolve(__dirname, '../src/js'),
        },
      },
      plugins: [
        // Explicit pre-transform plugin to guarantee all story-related files reach
        // inject-export-order-plugin as valid ES module JS (not TSX/JSX source).
        //
        // .tsx / .jsx  → esbuild tsx/jsx loader (strips TypeScript types + JSX)
        // .js in src/js or storybook → esbuild jsx loader (these contain JSX)
        //
        // Doing this in enforce:'pre' ensures inject-export-order-plugin (post)
        // always receives plain JS that es-module-lexer can successfully parse.
        {
          name: 'storybook:transform-sources',
          enforce: 'pre',
          async transform(code, id) {
            if (id.includes('node_modules')) return;
            if (id.endsWith('.tsx')) {
              return transformWithEsbuild(code, id, { loader: 'tsx' });
            }
            if (id.endsWith('.jsx')) {
              return transformWithEsbuild(code, id, { loader: 'jsx' });
            }
            if (/(src\/js|storybook)\/.*\.js$/.test(id)) {
              return transformWithEsbuild(code, id.replace(/\.js$/, '.jsx'), {
                loader: 'jsx',
              });
            }
          },
        },
      ],
      optimizeDeps: {
        esbuildOptions: {
          loader: { '.js': 'jsx' },
        },
      },
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
