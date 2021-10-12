import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, grommet } from '../src/js';

const THEMES = {
  hpe,
  grommet,
  base: {},
};

export const decorators = [
  (Story, context) => {
    const [state, setState] = React.useState('base');
    React.useEffect(() => {
      setState(context.globals.theme || 'base');
    }, [context.globals.theme]);
    return (
      <Grommet theme={THEMES[state]}>
        <Story state={THEMES[state]} />
      </Grommet>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['All'],
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'base',
    toolbar: {
      items: ['base', 'grommet', 'hpe'],
      showName: true,
    },
  },
};
