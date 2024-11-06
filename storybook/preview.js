import React, { useState, useEffect } from 'react';
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
    const [rootRef, setRootRef] = useState(null);
    const [state, setState] = useState('grommet');
    const [root, setRoot] = useState('document');
    const full = context.allArgs?.full || 'min';
    const dir = context.allArgs?.dir;
    const options = context.allArgs?.options;

    useEffect(() => {
      setState(context.globals.theme);
    }, [context.globals.theme]);
    useEffect(() => {
      setRoot(context.globals.root);
    }, [context.globals.root]);

    /**
     * This demonstrates that custom themed stories are driven off the "base"
     * theme. Custom themed stories will live under a "CustomThemed" directory.
     */
    if (context.kind.split('/')[2] === CUSTOM_THEMED && state !== 'base') {
      // if we are running the story in chromatic we want the chromatic snapshot
      // to be taken in the base theme for custom theme stories
      if (isChromatic()) {
        return (
          <Grommet theme={THEMES.base}>
            <Story state={THEMES.base} />
          </Grommet>
        );
      }
      return (
        <Box align="center" pad="large">
          <Text size="large">
            {`Custom themed stories are only displayed in the
                "base" theme mode. To enable, select "base" from the
                Theme menu above.`}
          </Text>
          <div hidden>
            <Story state={THEMES[state]} />
          </div>
        </Box>
      );
    }

    if (root === 'shadow') {
      return (
        // eslint-disable-next-line react/jsx-pascal-case
        <Root.div ref={setRootRef}>
          {rootRef && (
            <StyleSheetManager target={rootRef.shadowRoot}>
              <Grommet
                theme={THEMES[state]}
                full={full}
                dir={dir}
                options={options}
                containerTarget={rootRef.shadowRoot}
              >
                <Story state={THEMES[state]} />
              </Grommet>
            </StyleSheetManager>
          )}
        </Root.div>
      );
    }

    return (
      <Grommet theme={THEMES[state]} full={full} dir={dir} options={options}>
        <Story state={THEMES[state]} />
      </Grommet>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: (first, second) => {
      /**
       * The story sort algorithm will only ever compare two stories
       * a single time. This means that every story will only ever be either
       * the "first" parameter OR the "second" parameter, but not both.
       * So, the checks for custom themed stories need to happen on both inputs
       * of this function.
       *
       * A return value of 1 results in sorting the "first" story AFTER the
       * "second" story.
       *
       * A return value of 0 results in sorting the "first" story BEFORE the
       * secondary story.
       */
      const isFirstCustom = first[1].kind.split('/')[2] === CUSTOM_THEMED;
      const isSecondCustom = second[1].kind.split('/')[2] === CUSTOM_THEMED;
      if (isFirstCustom) return 1;
      if (isSecondCustom) return 0;
      return first[1].kind === second[1].kind
        ? 0
        : first[1].id.localeCompare(second[1].id, undefined, { numeric: true });
    },
  },
};

export const globalTypes = {
  theme: {
    defaultValue: 'grommet',
    toolbar: {
      title: 'Theme',
      items: [
        { title: 'base', value: 'base' },
        { title: 'grommet', value: 'grommet' },
        { title: 'hpe', value: 'hpe' },
        { title: 'hacktoberfest2022', value: 'hacktoberfest2022' },
      ],
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
