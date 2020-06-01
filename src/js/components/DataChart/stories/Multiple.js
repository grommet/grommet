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

const MultipleDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={[
          {
            key: 'amount',
            type: 'area',
            thickness: 'xsmall',
            color: { color: 'graph-0', opacity: 'medium' },
          },
          { key: 'amount', type: 'line', thickness: 'xsmall', round: true },
          { key: 'amount', type: 'bar', thickness: 'hair' },
          { key: 'amount', type: 'point', round: true, thickness: 'medium' },
        ]}
        xAxis={{
          labels: 2,
          render: i => (
            <Box pad="xsmall" align="start">
              <Text>
                {new Date(data[i].date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </Box>
          ),
        }}
        yAxis={{ guide: true, labels: 3 }}
        gap="medium"
        pad="small"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Multiple', () => <MultipleDataChart />);
