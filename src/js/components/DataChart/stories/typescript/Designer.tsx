import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

const DesignerDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={[
          // {
          //   key: 'percent',
          //   type: 'area',
          //   color: { color: 'graph-1', opacity: 'medium' },
          // },
          // { key: 'percent', type: 'bar', round: true },
          // { key: 'percent', type: 'bar', thickness: 'hair' },
          {
            key: 'percent',
            type: 'bar',
            thickness: 'medium',
            color: { color: 'graph-2' },
          },
        ]}
        xAxis={{
          guide: false,
          render: i => (
            <Box pad="xsmall" align="start">
              <Text>
                {new Date(data[i].date).toLocaleDateString('en-US', {
                  month: 'short',
                })}
              </Text>
            </Box>
          ),
        }}
        yAxis={{ guide: true }}
        steps={[7, 4]} // 7 is providing 8 labels (months), and 6 is providing 6.
        // not sure what is thickness compare to bar chart thickness above
        thickness="small"
        gap="small"
        pad="small"
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Designer', () => (
  <DesignerDataChart />
));
