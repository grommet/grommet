module.exports = {
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  stories: [
    '../src/js/components/**/stories/typescript/*.tsx',
    '../src/js/components/**/stories/*.@(ts|tsx|js|jsx)',
    '../src/js/components/**/*stories.js',
    '../src/js/contexts/**/*stories.js',
    '../src/js/contexts/**/stories/typescript/*.tsx',
    '../src/js/contexts/**/stories/*.@(ts|tsx|js|jsx)',
    '../src/js/all/**/stories/*.@(ts|tsx|js|jsx)',
    '../src/js/all/stories/typescript/*.tsx',
  ],
};
