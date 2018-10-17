import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Anchor, Box } from 'grommet';
import { Add } from 'grommet-icons';

const customTheme = {
  global: {
    colors: {
      custom: '#cc6633',
    },
  },
};


const Themed = () => (
  <Grommet theme={customTheme}>
    <Box pad='medium'>
      <Anchor icon={<Add />} label='Add' color='custom' />
    </Box>
  </Grommet>
);

storiesOf('Grommet', module)
  .add('Theme', () => <Themed />);
