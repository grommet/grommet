import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    percent: Math.abs(v * 100),
    amount: i,
  });
}

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        series={[
          { property: 'date', label: 'Date' },
          {
            property: 'percent',
            label: 'Percent',
            render: value => `${Math.round(value)}%`,
          },
          {
            property: 'amount',
            label: 'Amount',
          },
        ]}
        chart={['percent', { property: 'amount', thickness: 'small' }]}
        legend
        axis={{ x: { property: 'date', granularity: 'medium' } }}
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Legend', () => <Example />);
