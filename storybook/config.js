import { addDecorator, configure } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

const req = require.context(
  '../src/js',
  true,
  /\.stories\.js$|\/stories\/.*\.js/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(
  withOptions({
    name: 'Grommet Storybook',
    url: 'https://v2.grommet.io',
  }),
);

configure(loadStories, module);
