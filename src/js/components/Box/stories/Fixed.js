import React from 'react';

import { Box, Text } from 'grommet';

export const FixedSizesBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="small">
    <Box
      width="small"
      height="small"
      round="small"
      align="center"
      justify="center"
      background="brand"
      overflow={{ horizontal: 'hidden', vertical: 'scroll' }}
      tabIndex={0}
    >
      {Array(20)
        .fill()
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={i}>{`Small (${i})`}</Text>
        ))}
    </Box>
    <Box
      width="medium"
      height="medium"
      round="small"
      align="center"
      justify="center"
      background="brand"
    >
      Medium
    </Box>
    <Box
      width="large"
      height="large"
      round="small"
      align="center"
      justify="center"
      background="brand"
    >
      Large
    </Box>
  </Box>
  // </Grommet>
);

FixedSizesBox.storyName = 'Fixed sizes';

export default {
  title: `Layout/Box/Fixed sizes`,
};
