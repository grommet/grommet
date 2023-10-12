module.exports = {
  addons: [
    '@storybook/addon-toolbars',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    '@storybook/addon-a11y',
  ],
  stories: [
    '../src/js/all/**/stories/*.@(ts|tsx|js|jsx)',
    '../src/js/all/stories/typescript/*.tsx',
    '../src/js/components/**/stories/typescript/*.tsx',
    '../src/js/components/**/stories/*.@(ts|tsx|js|jsx)',
    '../src/js/components/**/stories/CustomThemed/*.@(ts|tsx|js|jsx)',
    '../src/js/components/**/*stories.js',
    '../src/js/contexts/**/*stories.js',
    '../src/js/contexts/**/stories/typescript/*.tsx',
    '../src/js/contexts/**/stories/*.@(ts|tsx|js|jsx)',
  ],
  features: {
    postcss: false,
    storyStoreV7: false,
  },
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      strictMode: true,
    },
  },
};
