const isDev = process.env.NODE_ENV === 'development';

// Detect Chromatic environment with comprehensive checks
const isChromatic = !!(
  process.env.CHROMATIC ||
  process.env.CHROMATIC_BUILD ||
  process.env.STORYBOOK_BUILD_CHROMATIC ||
  process.env.CHROMATIC_PROJECT_TOKEN ||
  process.env.CHROMATIC_BRANCH ||
  process.env.CHROMATIC_SHA ||
  process.env.CHROMATIC_SLUG ||
  // Chromatic in CI environments
  (process.env.CI && process.env.CHROMATIC_PROJECT_TOKEN) ||
  // Check if running via Chromatic CLI
  (typeof process !== 'undefined' &&
    process.argv &&
    process.argv.some((arg) => arg.includes('chromatic'))) ||
  // Fallback: Check if any environment variable contains 'chromatic'
  Object.keys(process.env).some(
    (key) => key.toLowerCase().includes('chromatic') && process.env[key],
  )
);

// Include internal stories in development OR Chromatic, exclude only for explicit production builds
const includeInternal = isDev || isChromatic;

// Comprehensive logging for debugging
console.log('Storybook Configuration Debug:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   isDev: ${isDev}`);
console.log(`   isChromatic: ${isChromatic}`);
console.log(`   includeInternal: ${includeInternal}`);
console.log('   Environment variables:');
Object.keys(process.env)
  .filter(
    (key) =>
      key.includes('CHROMATIC') || key.includes('CI') || key.includes('BUILD'),
  )
  .forEach((key) => {
    console.log(`     ${key}: ${process.env[key]}`);
  });
console.log(`   Command args: ${process.argv.join(' ')}`);
console.log(
  `   Internal stories will be: ${includeInternal ? 'INCLUDED' : 'EXCLUDED'}`,
);
console.log(''); // Empty line for readability

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
