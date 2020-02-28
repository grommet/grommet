import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

const AxesDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart
        data={data}
        chart={{ key: 'percent' }}
        xAxis={{ key: 'date' }}
        yAxis={{ guide: true }}
      />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Axes', () => <AxesDataChart />);
