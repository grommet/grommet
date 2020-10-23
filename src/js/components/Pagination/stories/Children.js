import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text } from 'grommet';
// import { grommet } from 'grommet/themes';
import { hpe } from 'grommet-theme-hpe';
import { Pagination } from '../Pagination';

const data = [];

for (let i = 0; i < 95; i += 1) {
  data.push({
    entry: `entry-${i + 1}`,
  });
}

const Example = () => (
  <Grommet theme={hpe}>
    <Box
      background="background-back"
      margin="medium"
      pad="medium"
      round="small"
    >
      <Pagination align="center" items={data}>
        {item => <Text key={item.entry}>{item.entry}</Text>}
      </Pagination>
    </Box>
  </Grommet>
);

storiesOf('Pagination', module).add('Children', () => <Example />);
