import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Layer } from 'mnet-ui-base';

const RTLLayer = () => (
  <div dir="rtl">
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
  </div>
);

storiesOf('Layer', module).add('RTL', () => <RTLLayer />);
