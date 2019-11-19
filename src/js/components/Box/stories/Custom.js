import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Text } from 'grommet';
import { grommet } from '../../../themes';

const GradientColorBox = () => (
  <Grommet theme={grommet}>
    <Box
      justify="center"
      align="center"
      pad="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round="large"
    >
      <Text color="white">I have a linear gradient background</Text>
    </Box>
  </Grommet>
);

storiesOf('Box', module).add('Gradient', () => <GradientColorBox />);
