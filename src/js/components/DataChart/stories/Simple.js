import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, DataChart, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { data } from './data';

const SimpleDataChart = () => (
  <Grommet theme={grommet}>
    <Box align="center" justify="start" pad="large">
      <DataChart data={data} chart={{ key: 'percent' }} />
    </Box>
  </Grommet>
);

storiesOf('DataChart', module).add('Simple', () => <SimpleDataChart />);
