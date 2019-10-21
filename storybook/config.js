import { addParameters, configure } from '@storybook/react';
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

addParameters({
  options: {
    theme: grommetLight,
    showNav: true,
    showPanel: true, // show the code panel by default
    storySort: (a, b) => {
      console.log('a', a);
      console.log('b', b);
      if (a[1].kind === 'All') return -1;
      console.log(
        'accordion--dark-no-animation'.localeCompare('accordion--rich', {
          numeric: true,
        }),
      );
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id , { numeric: true });
    },
  },
});

configure(loadStories, module);
