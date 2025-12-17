const isDev = process.env.NODE_ENV === 'development';

// Detect Chromatic environment with comprehensive checks
const isChromatic = !!(
  process.env.CHROMATIC ||
  process.env.CHROMATIC_BUILD ||
  process.env.STORYBOOK_BUILD_CHROMATIC ||
  process.env.CHROMATIC_PROJECT_TOKEN ||
  process.env.CHROMATIC_BRANCH ||
  // Chromatic in CI environments
  (process.env.CI && process.env.CHROMATIC_PROJECT_TOKEN)
);

// Include internal stories in development OR Chromatic, exclude in production
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
  stories: includeInternal
    ? [
        // Development: Include ALL stories including internal
        '../src/js/components/**/*.stories.@(ts|tsx|js|jsx)',
        '../src/js/components/**/*stories.js',
        '../src/js/contexts/**/*stories.js',
        '../src/js/contexts/**/stories/typescript/*.stories.tsx',
        '../src/js/contexts/**/stories/*.stories.@(ts|tsx|js|jsx)',
      ]
    : [
        // Production: Include all stories except internal folder
        '../src/js/components/**/!(internal)/*.stories.@(ts|tsx|js|jsx)',
        '../src/js/components/**/stories/!(internal)/*.stories.@(ts|tsx|js|jsx)',
        '../src/js/components/**/stories/CustomThemed/*.stories.@(ts|tsx|js|jsx)',
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
};
