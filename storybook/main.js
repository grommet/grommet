module.exports = {
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
    '@storybook/addon-webpack5-compiler-babel',
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

  staticDirs: ['./public'],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      strictMode: true,
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
