import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';

const MarginLayer = ({ margin, ...rest }) => (
  <Grommet theme={grommet}>
    <Layer
      margin={
        margin || { left: '40px', top: '50px', right: '30px', bottom: '10px' }
      }
      {...rest}
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

storiesOf('Layer', module)
  .add('Margin', () => <MarginLayer full />)
  .add('Margin (Center)', () => <MarginLayer margin="large" />)
  .add('Margin Top (Center)', () => (
    <MarginLayer margin={{ top: 'large' }} position="top" />
  ));
