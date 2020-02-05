const path = require('path');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.js$|(\/|\\)stories(\/|\\).*\.js$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig: {
            parser: 'babel',
          },
        },
      },
    ],
    enforce: 'pre',
  });

  config.module.rules.push({
    test: /stories(\\|\/).*\.(ts|tsx)$/,
    loaders: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: './tsconfig.json',
        },
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
      },
    ],
  });

  // eslint-disable-next-line no-param-reassign
  config.resolve.alias.grommet = path.resolve(__dirname, '../src/js');

  return config;
};
