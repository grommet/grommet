import React from 'react';

import { Gremlin } from 'grommet-icons';

import { Box, List, Text, Tip } from 'grommet';

const data = [
  { city: 'Boise', state: 'Idaho' },
  { city: 'Fort Collins', state: 'Colorado' },
  { city: 'Bay Area', state: 'California' },
  { city: 'San Diego', state: 'California' },
];

export const Children = () => (
  <Box pad="large" height="100%" align="center">
    <List data={data} pad="medium" border={false}>
      {(datum) => (
        <Tip content={datum.state} dropProps={{ align: { left: 'right' } }}>
          <Box direction="row-responsive" gap="medium" align="center">
            <Gremlin size="large" />
            <Text weight="bold">{datum.city}</Text>
          </Box>
        </Tip>
      )}
    </List>
  </Box>
);

export default {
  title: 'Visualizations/List/Children',
};
