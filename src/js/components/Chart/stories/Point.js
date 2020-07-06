import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Chart, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

const values = [{ value: [10, 20] }, { value: [20, 30] }, { value: [30, 15] }];

const Example = () => (
  <Grommet theme={grommet}>
    <Box direction="row-responsive" wrap pad="large">
      {['circle', 'square', 'diamond', 'star', 'triangle', 'triangleDown'].map(
        point => (
          <Box key={point} margin="medium">
            <Heading size="small" textAlign="center">
              {point}
            </Heading>
            <Chart type="point" values={values} point={point} />
          </Box>
        ),
      )}
    </Box>
  </Grommet>
);

storiesOf('Chart', module).add('Point', () => <Example />);
