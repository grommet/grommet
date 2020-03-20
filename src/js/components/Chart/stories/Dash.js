import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large" gap="large">
      <Chart type="line" dash values={[20, 30, 15]} />
      <Chart type="line" dash round values={[20, 30, 15]} />
      <Chart type="line" dash thickness="xsmall" values={[20, 30, 15]} />
      <Chart type="line" dash round thickness="xsmall" values={[20, 30, 15]} />

      <Chart
        type="bar"
        dash
        values={[
          [10, 20],
          [20, 30],
          [30, 15],
        ]}
      />
    </Box>
  </Grommet>
);

storiesOf('Chart', module).add('Dash', () => <Example />);
