import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Paragraph } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';
import isChromatic from 'chromatic/isChromatic';

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

if (isChromatic && document.fonts) {
  storiesOf('Paragraph', module).add('Themed', () => <All />);
}
