import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { Pagination } from '../Pagination';

const Simple = () => (
  <Grommet theme={hpe}>
    <Box pad="small" gap="medium">
      <Box>
        <Text>Default</Text>
        <Pagination totalPages={10} />
      </Box>
      <Box>
        <Text>defaultPage = 6</Text>
        <Pagination totalPages={10} defaultPage={6} />
      </Box>
      <Box>
        <Text>edgeCount = 2 (number of pages on start/end)</Text>
        <Pagination totalPages={25} defaultPage={10} edgeCount={2} />
      </Box>
      <Box>
        <Text>
          middleCount = 2 (number of pages to left/right of middle page)
        </Text>
        <Pagination totalPages={25} defaultPage={10} middleCount={2} />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('Simple', () => <Simple />);
