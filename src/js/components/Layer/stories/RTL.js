import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';

const RTLLayer = () => (
  <Grommet theme={grommet} dir="rtl">
    <Layer
      position="start"
      margin={{ vertical: 'small', start: 'xlarge', end: 'medium' }}
    >
      <Box height="small" overflow="auto">
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
      </Box>
    </Layer>
  </Grommet>
);

storiesOf('Layer', module).add('RTL', () => <RTLLayer />);
