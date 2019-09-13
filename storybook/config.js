import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import 'storybook-chromatic';
import grommetLight from './theme';

const req = require.context(
  '../src/js',
  true,
  /\.stories\.js$|\/stories\/.*\.js$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withOptions({
    theme: grommetLight,
  }),
);

configure(loadStories, module);
