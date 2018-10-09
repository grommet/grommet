import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

const req = require.context('../src/js', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  name: 'Grommet Storybook',
  url: 'https://v2.grommet.io',
});

configure(loadStories, module);
