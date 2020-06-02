import React from 'react';
import { addParameters, configure, addDecorator } from '@storybook/react';
import 'storybook-chromatic';
import { neo } from 'mnet-ui-base-theme-neo';
import { withThemes } from 'storybook-addon-themes/react';
import { mnet as hb, MnetUIBase } from '../src/js';
import grommetLight from './theme';

const req = require.context(
  '../src/js',
  true,
  /\.stories\.js$|\/stories\/.*\.js$/,
);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

function Decorator(props) {
  const { children, theme } = props;
  return <MnetUIBase theme={theme.theme}>{children}</MnetUIBase>;
}

addParameters({
  options: {
    theme: grommetLight,
    showNav: true,
    showPanel: true, // show the code panel by default
  },
});

addParameters({
  themes: {
    Decorator,
    list: [
      { name: 'HB', theme: hb },
      { name: 'Neo', theme: neo, default: true },
    ],
  },
});

addDecorator(withThemes);

configure(loadStories, module);
