import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, MnetUIBase, Layer } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

const RTLLayer = () => (
  <MnetUIBase theme={mnet} dir="rtl">
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
  </MnetUIBase>
);

storiesOf('Layer', module).add('RTL', () => <RTLLayer />);
