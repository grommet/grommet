const isDev = process.env.NODE_ENV === 'development';

// Detect Chromatic environment
let isChromatic = false;
try {
  const chromaticCheck = require('chromatic/isChromatic');
  isChromatic = (chromaticCheck.default || chromaticCheck)();
} catch (error) {
  isChromatic = !!(
    process.env.CHROMATIC_PROJECT_TOKEN ||
    process.env.CHROMATIC_BUILD ||
    process.env.CHROMATIC
  );
}

// Include internal stories in development or Chromatic, exclude in production builds
const includeInternal = isDev || isChromatic;

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
    // Component stories (conditional internal inclusion)
    ...(includeInternal
      ? ['../src/js/components/**/*.stories.@(ts|tsx|js|jsx)']
      : [
          '../src/js/components/**/!(internal)/*.stories.@(ts|tsx|js|jsx)',
          '../src/js/components/**/stories/!(internal)/*.stories.@(ts|tsx|js|jsx)',
        ]),

    '../src/js/components/**/stories/typescript/*.stories.tsx',
    '../src/js/contexts/**/*stories.js',
    '../src/js/contexts/**/stories/typescript/*.stories.tsx',
    '../src/js/contexts/**/stories/*.stories.@(ts|tsx|js|jsx)',
    '../src/js/all/**/stories/*.stories.@(ts|tsx|js|jsx)',
    '../src/js/all/stories/typescript/*.stories.tsx',
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
};
