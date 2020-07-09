import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 0; i < 13; i += 1) {
  const v = -Math.sin(i / 2.0);
  const v2 = Math.cos(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    amount: Math.floor(v * 100),
    need: Math.floor(v2 * 10),
  });
}

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        property={[
          'date',
          { property: 'amount', color: 'graph-2', point: 'circle' },
          { property: 'need', color: 'graph-1', point: 'star' },
        ]}
        chart={[
          {
            property: 'amount',
            type: 'area',
            thickness: 'xsmall',
            color: { color: 'graph-2', opacity: 'medium' },
          },
          {
            property: 'amount',
            type: 'line',
            thickness: 'xxsmall',
            round: true,
          },
          { property: 'amount', type: 'bar', thickness: 'hair' },
          {
            property: 'amount',
            type: 'point',
            thickness: 'small',
          },
          {
            property: 'need',
            type: 'line',
            thickness: 'xxsmall',
            dash: true,
            round: true,
          },
          {
            property: 'need',
            type: 'point',
            thickness: 'small',
          },
        ]}
        axis={{ x: 'date', y: { property: 'amount', granularity: 'medium' } }}
        guide={{ y: { granularity: 'medium' }, x: { granularity: 'fine' } }}
        gap="medium"
        pad="small"
        legend
        detail
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Everything', () => <Example />);
