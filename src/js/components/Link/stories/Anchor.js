import React from 'react';
import { storiesOf } from '@storybook/react';

import { Anchor, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../../utils';
import { Paragraph } from '../../Paragraph';

const theme = deepMerge(grommet, {
  anchor: {
    textDecoration: 'underline',
    fontWeight: 900,
    color: {
      dark: 'tomato',
      light: 'brand',
    },
  },
});

const DeprecatedAnchor = () => {
  return (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <Paragraph>
          This component is deprecated. Please switch to the Link component.
          Only the name changed!
        </Paragraph>
        <Anchor href="#accessible">Link</Anchor>
      </Box>
    </Grommet>
  );
};

storiesOf('Anchor', module).add('Deprecated Anchor', () => (
  <DeprecatedAnchor />
));
