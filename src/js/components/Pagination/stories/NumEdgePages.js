import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { Pagination } from '../Pagination';

const NumEdgePages = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="medium">
      <Box>
        <Text>numEdgePages = 2 (number of pages on start/end)</Text>
        <Pagination numItems={237} page={10} numEdgePages={2} />
      </Box>
      <Box>
        <Text>numEdgePages = 0</Text>
        <Pagination numItems={237} page={10} numEdgePages={0} />
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('NumEdgePages', () => <NumEdgePages />);
