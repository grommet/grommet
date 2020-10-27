module.exports = {
  addons: ['@storybook/addon-storysource'],
  stories: [
    '../src/js/components/**/stories/*.(ts|tsx|js|jsx)',
    '../src/js/components/**/*stories.js',
    '../src/js/contexts/**/*stories.js',
    '../src/js/contexts/**/stories/*.(ts|tsx|js|jsx)',
    '../src/js/all/**/stories/*.(ts|tsx|js|jsx)',
  ],
};
