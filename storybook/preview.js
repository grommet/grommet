import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Root from 'react-shadow';
import { StyleSheetManager } from 'styled-components';
import { hpe } from 'grommet-theme-hpe';
import isChromatic from 'chromatic/isChromatic';
import { Grommet, grommet, hacktoberfest2022, Box, Text } from '../src/js';

const CUSTOM_THEMED = 'Custom Themed';
const THEMES = {
  hpe,
  grommet,
  hacktoberfest2022,
  base: {},
};

export const decorators = [
  (Story, context) => {
    const { theme: selectedTheme, root: rootType } = context.globals;
    const { full = 'min', dir, options } = context.allArgs || {};

    const [rootRef, setRootRef] = useState(null);
    const rootCallback = useCallback(setRootRef, []);

    const theme = useMemo(() => THEMES[selectedTheme] || THEMES.grommet, [selectedTheme]);

    // ensure base theme is used in Chromatic snapshots for custom themed stories
    if (context.kind.split('/')[2] === CUSTOM_THEMED && selectedTheme !== 'base') {
      return isChromatic() ? (
        <Grommet theme={THEMES.base}>
          <Story />
        </Grommet>
      ) : (
        <Box align="center" pad="large">
          <Text size="large">
            {`Custom themed stories are only displayed in the "base" theme mode. To enable, select "base" from the Theme menu above.`}
          </Text>
        </Box>
      );
    }

    if (rootType === 'shadow') {
      return (
        <Root.div ref={rootCallback}>
          {rootRef && (
            <StyleSheetManager target={rootRef.shadowRoot}>
              <Grommet theme={theme} full={full} dir={dir} options={options} containerTarget={rootRef.shadowRoot}>
                <Story />
              </Grommet>
            </StyleSheetManager>
          )}
        </Root.div>
      );
    }

    return (
      <Grommet theme={theme} full={full} dir={dir} options={options}>
        <Story />
      </Grommet>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: ([, firstMeta], [, secondMeta]) => {
      const isFirstCustom = firstMeta.kind.split('/')[2] === CUSTOM_THEMED;
      const isSecondCustom = secondMeta.kind.split('/')[2] === CUSTOM_THEMED;

      if (isFirstCustom) return 1;
      if (isSecondCustom) return -1;
      return firstMeta.id.localeCompare(secondMeta.id, undefined, { numeric: true });
    },
  },
};

export const globalTypes = {
  theme: {
    defaultValue: 'grommet',
    toolbar: {
      title: 'Theme',
      items: Object.keys(THEMES).map((key) => ({ title: key, value: key })),
    },
  },
  root: {
    defaultValue: 'document',
    toolbar: {
      title: 'Root',
      items: ['document', 'shadow'],
    },
  },
};
