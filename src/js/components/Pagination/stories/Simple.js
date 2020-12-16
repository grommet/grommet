import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Pagination } from '../Pagination';

const Simple = () => (
  <Grommet theme={grommet}>
    <Box align="start" pad="small" gap="medium">
      <Box>
        <Text>Default</Text>
        <Pagination numItems={237} />
      </Box>
      <Box>
        <Text>Box Props</Text>
        <Pagination
          numItems={237}
          page={2}
          background="brand"
          pad="medium"
          margin="small"
        />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('Simple', () => <Simple />);
