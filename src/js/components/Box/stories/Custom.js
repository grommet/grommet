import React from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, Text } from 'mnet-ui-base';
import { mnet } from '../../../themes';

const GradientColorBox = () => (
  <MnetUIBase theme={mnet}>
    <Box
      justify="center"
      align="center"
      pad="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round="large"
    >
      <Text color="white">I have a linear gradient background</Text>
    </Box>
  </MnetUIBase>
);

storiesOf('Box', module).add('Gradient', () => <GradientColorBox />);
