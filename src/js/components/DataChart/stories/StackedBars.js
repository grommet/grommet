import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 0; i < 7; i += 1) {
  data.push({
    date: `2020-07-${((i % 31) + 1).toString().padStart(2, 0)}`,
    usage: Math.floor(Math.abs(Math.sin(i / 2.0) * 100)),
    bonus: Math.floor(Math.abs(Math.cos(i / 2.0) * 100)),
  });
}

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={[
          {
            keys: [
              { key: 'usage', color: 'graph-1' },
              { key: 'bonus', color: 'graph-2' },
            ],
            type: 'bar',
          },
        ]}
        xAxis={{
          labels: 3,
          render: i => (
            <Text margin={{ horizontal: 'xsmall' }}>
              {new Date(data[Math.floor(i)].date).toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
              })}
            </Text>
          ),
        }}
        yAxis={{ guide: true }}
        gap="medium"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Stacked bars', () => <Example />);
