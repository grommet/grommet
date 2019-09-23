import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

import { locations } from './data';

const SimpleList = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <List data={locations} />
    </Box>
  </Grommet>
);

storiesOf('List', module).add('Simple', () => <SimpleList />);
