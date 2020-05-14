import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const data = [];
for (let i = 0; i < 8; i += 1) {
  data.push({
    date: `2020-07-${((i % 30) + 1).toString().padStart(2, 0)}`,
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
          guide: true,
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
        yAxis={{ guide: true }}
        steps={[1, 2]}
        gap="medium"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Stacked bars', () => <Example />);
