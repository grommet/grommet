import React from 'react';

import { Box, Text } from 'grommet';

export const BorderBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="small" align="start">
    <Box pad="small" border>
      true
    </Box>
    <Box direction="row-responsive" gap="small">
      {['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(
        (border) => (
          <Box key={border} pad="small" border={border}>
            {border}
          </Box>
        ),
      )}
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      <Box
        pad="small"
        border={[
          { size: 'medium', style: 'dotted', side: 'top' },
          {
            size: 'medium',
            style: 'double',
            side: 'vertical',
          },
        ]}
      >
        custom top & vertical borders
      </Box>
    </Box>
    <Box pad="small" border={{ color: 'brand' }}>
      color
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      {['small', 'medium', 'large'].map((size) => (
        <Box key={size} pad="small" border={{ size }}>
          {size}
        </Box>
      ))}
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      {['small', 'medium', 'large'].map((size) => (
        <Box key={size} pad="small" responsive={false} border={{ size }}>
          {size}
        </Box>
      ))}
    </Box>
    <Box direction="row-responsive" gap="small" align="start">
      {[
        'solid',
        'dashed',
        'dotted',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
      ].map((type) => (
        <Box key={type} pad="small" border={{ size: 'medium', style: type }}>
          {type}
        </Box>
      ))}
    </Box>
    <Box direction="row-responsive" gap="large" align="center">
      {['column', 'row', 'row-responsive'].map((direction) => (
        <Box
          key={direction}
          direction={direction}
          gap="large"
          border={{ side: 'between', size: 'large' }}
        >
          <Text>between</Text>
          <Text>{direction}</Text>
        </Box>
      ))}
    </Box>

    <Box
      direction="row"
      gap="small"
      border={[
        { side: 'between' },
        { side: 'top' },
        { side: 'right' },
        { side: 'bottom' },
        { side: 'left' },
      ]}
    >
      <Text>Multiple Border</Text>
      <Text>With Between</Text>
    </Box>
  </Box>
  // </Grommet>
);

BorderBox.storyName = 'Border';

export default {
  title: 'Layout/Box/Border',
};
