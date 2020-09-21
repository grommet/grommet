import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Paragraph } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

const customTheme = deepMerge(grommet, {
  paragraph: {
    font: {
      family: 'Comic Sans MS',
    },
  },
});

const All = () => (
  <Grommet theme={customTheme}>
    <Paragraph>
      The font family for this paragraph is being defined by a custom theme.
    </Paragraph>
  </Grommet>
);

storiesOf('Paragraph', module).add('Theme', () => <All />, {
  chromatic: { disable: true },
});
