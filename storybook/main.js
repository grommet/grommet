const path = require('path');
const { mergeConfig } = require('vite');

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
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
    '../src/js/components/**/*stories.jsx',
    '../src/js/contexts/**/*stories.jsx',
    '../src/js/contexts/**/stories/*.stories.@(ts|tsx|js|jsx)',
  ],

  staticDirs: ['./public'],

  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },

  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      resolve: {
        alias: {
          grommet: path.resolve(__dirname, '../src/js'),
        },
      },
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

module.exports = config;
