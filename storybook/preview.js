import { configure } from '@storybook/react';
import 'chromatic';

const req = require.context(
  '../src/js',
  true,
  /\.stories\.js$|\/stories\/.*\.js$|\/stories\/.*\.ts$|\/stories\/.*\.tsx$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
