import React, { useState, useEffect } from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, grommet, Box, Text } from '../src/js';

const CUSTOM_THEMED = 'CUSTOM_THEMED';
const THEMES = {
  hpe,
  grommet,
  base: {},
};

export const decorators = [
  (Story, context) => {
    const [state, setState] = useState('base');
    useEffect(() => {
      setState(context.globals.theme || 'grommet');
    }, [context.globals.theme]);

    /**
     * This demonstrates that custom themed stories are driven off the "base"
     * theme. Custom themed stories will live under a "CustomThemed" directory.
     */
    if (context.kind.split('/')[2] === CUSTOM_THEMED && state !== 'base') {
      return (
        <Grommet>
          <Box align="center" pad="large">
            <Text>
              {`Custom themed stories are only displayed in the
                "base" theme mode. To enable, select "base" from the
                Theme menu above.`}
            </Text>
          </Box>
        </Grommet>
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
    // storySort: (a,b) => {
    //   console.log('a', a);
    //   console.log('b', b);
    // },
    storySort: {
      method: 'alphabetical',
      order: ['Custom Themed'],
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'grommet',
    toolbar: {
      items: ['base', 'grommet', 'hpe'],
      showName: true,
    },
  },
};
