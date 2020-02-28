import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

const MultipleDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={[
          {
            key: 'percent',
            type: 'area',
            color: { color: 'graph-0', opacity: 'medium' },
          },
          { key: 'percent', type: 'line', round: true },
          { key: 'percent', type: 'bar', thickness: 'hair' },
          { key: 'percent', type: 'point', round: true, thickness: 'medium' },
        ]}
        xAxis={{
          guide: true,
          background: 'brand',
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
        thickness="xsmall"
        gap="medium"
        pad="small"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Multiple', () => <MultipleDataChart />);
