import React from 'react';
import { addParameters, configure, addDecorator } from '@storybook/react';
import 'storybook-chromatic';
// import { neo } from 'mnet-ui-base-theme-neo';
// import { hb } from 'mnet-ui-base-theme-hb';
// import { cdp } from 'mnet-ui-base-theme-cdp';
import { withThemes } from 'storybook-addon-themes/react';
import { MnetUIBase } from '../src/js';
import { base } from '../src/js/themes/base';
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
      { name: 'Base', theme: base, default: true },
      // { name: 'HB', theme: hb, default: true },
      // { name: 'Neo', theme: neo },
      // { name: 'CDP', theme: cdp },
    ],
  },
});

addDecorator(withThemes);

configure(loadStories, module);
