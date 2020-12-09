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
    selected: i % 7 === 0,
  });
}

const Example = () => {
  return (
    <Grommet theme={hpe}>
      <Box
        background="background-back"
        margin="medium"
        pad="medium"
        round="small"
      >
        <Pagination align="center" items={data} show={{ index: 64 }}>
          {item => <Text key={item.entry}>{item.entry}</Text>}
        </Pagination>
      </Box>
      <Box
        background="background-back"
        margin="medium"
        pad="medium"
        round="small"
      >
        <Pagination align="center" items={data}>
          {(item, index, { active = item.selected }) => {
            return (
              <Text key={index} weight={active ? 'bold' : null}>
                {item.entry}
              </Text>
            );
          }}
        </Pagination>
      </Box>
    </Grommet>
  );
};

storiesOf('Pagination', module).add('Children', () => <Example />);
