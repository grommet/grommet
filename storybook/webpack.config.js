const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /stories(\\|\/).*\.(ts|tsx)$/,
    use: ['ts-loader'],
  });

  // eslint-disable-next-line no-param-reassign
  config.resolve.alias.grommet = path.resolve(__dirname, '../src/js');

  return config;
};
