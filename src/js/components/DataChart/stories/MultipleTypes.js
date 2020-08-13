import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 0; i < 13; i += 1) {
  const v = -Math.sin(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    amount: Math.floor(v * 100),
  });
}

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        series={[
          {
            property: 'date',
            render: date => (
              <Box pad="xsmall" align="start">
                <Text>
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </Box>
            ),
          },
          'amount',
        ]}
        chart={[
          {
            property: 'amount',
            type: 'area',
            thickness: 'xsmall',
            color: 'graph-0',
            opacity: 'medium',
          },
          {
            property: 'amount',
            type: 'line',
            thickness: 'xsmall',
            round: true,
          },
          { property: 'amount', type: 'bar', thickness: 'hair' },
          {
            property: 'amount',
            type: 'point',
            round: true,
            thickness: 'medium',
          },
        ]}
        axis={{ x: 'date', y: { property: 'amount', granularity: 'medium' } }}
        guide={{ y: true }}
        gap="medium"
        pad="small"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Multiple types', () => <Example />);
