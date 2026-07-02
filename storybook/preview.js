import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { addons } from 'storybook/internal/preview-api';
import Root from 'react-shadow';
import { StyleSheetManager } from 'styled-components';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
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
      const sizeMapping = context.parameters?.sizeMapping;
      const docsSource = context.parameters?.docs?.source;

      const mappedSource =
        activeTheme === 'hpe'
          ? sizeMapping?.hpeSourceCode || sizeMapping?.originalSourceCode
          : sizeMapping?.originalSourceCode || sizeMapping?.hpeSourceCode;

      const fallbackSource =
        docsSource?.originalSource || docsSource?.code || docsSource?.source;

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
      context.parameters?.sizeMapping,
      context.parameters?.docs?.source,
      activeTheme,
    ]);

    const renderStory = (themeName = activeTheme) => (
      <Story state={THEMES[themeName]} />
    );

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
        return <Grommet theme={THEMES.base}>{renderStory('base')}</Grommet>;
      }
      return (
        <Box align="center" pad="large">
          <Text size="large">
            {`Custom themed stories are only displayed in the
                "base" theme mode. To enable, select "base" from the
                Theme menu above.`}
          </Text>
          <div hidden>{renderStory()}</div>
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
                {renderStory()}
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
        {renderStory()}
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
      const isFirstCustom = first.title.split('/')[2] === CUSTOM_THEMED;
      const isSecondCustom = second.title.split('/')[2] === CUSTOM_THEMED;
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
