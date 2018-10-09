const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [
          {
            loader: require.resolve("@storybook/addon-storysource/loader"),
            options: {
              prettierConfig: {
                parser: 'babylon',
              },
            },
          },
        ],
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    alias: {
      'grommet': path.resolve(__dirname, '../src/js'),
    }
  },
};
