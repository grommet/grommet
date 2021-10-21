import React, { useState, useEffect } from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, grommet, Box, Text } from '../src/js';

const CUSTOM_THEMED = 'Custom Themed';
const THEMES = {
  hpe,
  grommet,
  base: {},
};

export const decorators = [
  (Story, context) => {
    const [state, setState] = useState('base');
    useEffect(() => {
      setState(context.globals.theme);
    }, [context.globals.theme]);

    /**
     * This demonstrates that custom themed stories are driven off the "base"
     * theme. Custom themed stories will live under a "CustomThemed" directory.
     */
    if (context.kind.split('/')[2] === CUSTOM_THEMED && state !== 'base') {
      return (
        <Box align="center" pad="large">
          <Text size="large">
            {`Custom themed stories are only displayed in the
                "base" theme mode. To enable, select "base" from the
                Theme menu above.`}
          </Text>
        </Box>
      );
    }

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
