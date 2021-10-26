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
    const [state, setState] = useState('grommet');
    useEffect(() => {
      setState(context.globals.theme);
    }, [context.globals.theme]);
    const full = context.parameters?.args?.full;

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
      <Grommet theme={THEMES[state]} full={full}>
        <Story state={THEMES[state]} />
      </Grommet>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: (a, b) => {
      const isCustom = a[1].kind.split('/')[2] === CUSTOM_THEMED;
      if (isCustom) return 1;
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
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
