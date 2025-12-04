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
  features: {
    postcss: false,
  },

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

  // Exclude internal stories only in production builds
  tags: {
    exclude: process.env.NODE_ENV === 'production' ? ['internal'] : [],
  },
};
