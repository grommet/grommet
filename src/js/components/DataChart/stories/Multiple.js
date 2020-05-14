import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 0; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
    percent: Math.abs(v * 100),
  });
}

const MultipleDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={[
          {
            key: 'percent',
            type: 'area',
            thickness: 'xsmall',
            color: { color: 'graph-0', opacity: 'medium' },
          },
          { key: 'percent', type: 'line', thickness: 'xsmall', round: true },
          { key: 'percent', type: 'bar', thickness: 'hair' },
          { key: 'percent', type: 'point', round: true, thickness: 'medium' },
        ]}
        xAxis={{
          guide: true,
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
