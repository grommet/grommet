import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { addons } from 'storybook/preview-api';
// eslint-disable-next-line import/no-extraneous-dependencies
import Root from 'react-shadow';
import { StyleSheetManager } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hpe as hpeTheme } from 'grommet-theme-hpe';
// eslint-disable-next-line import/no-extraneous-dependencies
import isChromatic from 'chromatic/isChromatic';
import { Grommet, grommet, hacktoberfest2022, Box, Text } from '../src/js';
import sizeMapper from './sizeMapper';

const CUSTOM_THEMED = 'Custom Themed';
const { createHpeCompatTheme } = sizeMapper;
const SNIPPET_RENDERED_EVENT = 'storybook/docs/snippet-rendered';

const getThemeAwareSourceCode = (source, storyContext) => {
  if (!storyContext) return source;

  const original =
    storyContext.parameters?.sizeMapping?.originalSourceCode || source;
  const mapped = storyContext.parameters?.sizeMapping?.hpeSourceCode;
  const theme = storyContext.globals?.theme;

  if (theme === 'hpe' && mapped) return mapped;
  return original || source;
};

const THEMES = {
  hpe: createHpeCompatTheme(hpeTheme),
  grommet,
  hacktoberfest2022,
  base: {},
};

export const decorators = [
  (Story, context) => {
    const [rootRef, setRootRef] = useState(null);
    const activeTheme = context.globals.theme || 'grommet';
    const root = context.globals.root || 'document';
    const full = context.allArgs?.full || 'min';
    const dir = context.allArgs?.dir;
    const options = context.allArgs?.options;

    useEffect(() => {
      let cleanup = () => {};

      const mappedSource =
        activeTheme === 'hpe'
          ? context.parameters?.sizeMapping?.hpeSourceCode ||
            context.parameters?.sizeMapping?.originalSourceCode
          : context.parameters?.sizeMapping?.originalSourceCode ||
            context.parameters?.sizeMapping?.hpeSourceCode;

      const fallbackSource =
        context.parameters?.docs?.source?.originalSource ||
        context.parameters?.docs?.source?.code ||
        context.parameters?.docs?.source?.source;

      const source = mappedSource || fallbackSource;

      if (!source) return cleanup;

      const channel = addons.getChannel();
      if (!channel) return cleanup;

      const emitSnippet = () => {
        channel.emit(SNIPPET_RENDERED_EVENT, {
          id: context.id,
          source,
        });
      };

      // Re-emit to avoid races with code panel reset on story navigation.
      emitSnippet();
      const immediateRetry = setTimeout(emitSnippet, 0);
      const delayedRetry = setTimeout(emitSnippet, 50);

      cleanup = () => {
        clearTimeout(immediateRetry);
        clearTimeout(delayedRetry);
      };

      return cleanup;
    }, [
      context.id,
      activeTheme,
      context.parameters?.sizeMapping?.originalSourceCode,
      context.parameters?.sizeMapping?.hpeSourceCode,
      context.parameters?.docs?.source?.originalSource,
      context.parameters?.docs?.source?.code,
      context.parameters?.docs?.source?.source,
    ]);

    /**
     * This demonstrates that custom themed stories are driven off the "base"
     * theme. Custom themed stories will live under a "CustomThemed" directory.
     */
    if (
      context.kind.split('/')[2] === CUSTOM_THEMED &&
      activeTheme !== 'base'
    ) {
      // if we are running the story in chromatic we want the chromatic snapshot
      // to be taken in the base theme for custom theme stories
      if (isChromatic()) {
        return (
          <Grommet theme={THEMES.base}>
            <Story />
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
            <Story />
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
                theme={THEMES[activeTheme]}
                full={full}
                dir={dir}
                options={options}
                containerTarget={rootRef.shadowRoot}
              >
                <Story />
              </Grommet>
            </StyleSheetManager>
          )}
        </Root.div>
      );
    }

    return (
      <Grommet
        theme={THEMES[activeTheme]}
        full={full}
        dir={dir}
        options={options}
      >
        <Story />
      </Grommet>
    );
  },
];

export const parameters = {
  layout: 'fullscreen',
  tags: {
    exclude:
      process.env.NODE_ENV === 'production' && !isChromatic()
        ? ['internal']
        : [],
  },
  docs: {
    codePanel: true,
    source: {
      type: 'code',
      transform: getThemeAwareSourceCode,
    },
  },
  sizeMapping: {
    enabled: true,
  },
  options: {
    storySort: (first, second) => {
      const customThemedTitle = 'Custom Themed';
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
       * secondary story, based on the titles.
       */
      const isFirstCustom = first.title.split('/')[2] === customThemedTitle;
      const isSecondCustom = second.title.split('/')[2] === customThemedTitle;
      if (isFirstCustom) return 1;
      if (isSecondCustom) return 0;
      return first.title === second.title
        ? 0
        : first.id.localeCompare(second.id, undefined, { numeric: true });
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
