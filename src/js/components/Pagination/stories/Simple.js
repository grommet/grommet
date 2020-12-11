import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from 'grommet';
// import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { Pagination } from '../Pagination';

const Simple = () => {
  const [page, setPage] = useState(1);

  const handleChange = event => {
    setPage(event.page);
  };

  return (
    <Grommet theme={hpe}>
      <Box pad="small" gap="medium">
        <Box>
          <Text>Default</Text>
          <Pagination numItems={237} />
        </Box>
        <Box>
          <Text>show = 10</Text>
          <Pagination numItems={237} page={10} />
        </Box>
        <Box>
          <Text>numEdgePages = 2 (number of pages on start/end)</Text>
          <Pagination numItems={237} page={10} numEdgePages={2} />
        </Box>
        <Box>
          <Text>numMiddlePages = 4 (number of pages in the middle)</Text>
          <Pagination numItems={237} page={10} numMiddlePages={4} />
        </Box>
        <Box>
          <Text>numMiddlePages = 5 (number of pages in the middle)</Text>
          <Pagination numItems={237} page={10} numMiddlePages={5} />
        </Box>
        <Box>
          <Text>numEdgePages = 0</Text>
          <Pagination numItems={237} page={10} numEdgePages={0} />
        </Box>
        <Box>
          <Text>Box Props</Text>
          <Pagination
            numItems={237}
            page={2}
            background="background-contrast"
            align="center"
            pad="medium"
            margin="small"
          />
        </Box>
        <Box>
          <Text>Controlled</Text>
          <Pagination numItems={237} page={page} onChange={handleChange} />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Pagination', module).add('Simple', () => <Simple />);
