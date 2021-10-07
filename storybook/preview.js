import React from 'react';
import { Grommet, grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const THEMES = {
  hpe: hpe,
  grommet: grommet,
};

const getTheme = () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('theme');
  return THEMES[key] || grommet;
};

export const decorators = [
  (Story) => {
    const theme = getTheme();
    return (
      <Grommet theme={theme}>
        <Story />
      </Grommet>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  themes: {
    clearable: false,
    list: [
      { name: 'grommet', class: 'grommet', color: '#7d4cdb' },
      { name: 'hpe', class: 'hpe', color: '#17eba0' },
    ],
    onChange: (theme) => {
      const params = new URLSearchParams(window.location.search);
      const currentTheme = params.get('theme');
      if (currentTheme !== theme.class) {
        params.set('theme', theme.class);
        window.location.search = params.toString();
      }
    },
  },
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
    description: 'Global theme for components',
    defaultValue: 'light',
  },
};
