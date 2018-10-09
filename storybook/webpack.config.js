const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
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
