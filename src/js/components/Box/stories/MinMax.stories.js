import React from 'react';

import { Box, Text } from 'grommet';

export const MinMaxSizesBox = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="small" gap="small">
    <Box pad="small" gap="small" direction="row" align="start">
      <Box
        width="small"
        height={{ max: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>max-height=small</Text>
      </Box>
      <Box
        width="small"
        height={{ max: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>max-height=small</Text>
        <Text>max-height=small</Text>
        <Text>max-height=small</Text>
      </Box>
      <Box
        width="small"
        height={{ max: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
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
        width="small"
        height={{ max: '100px' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
        tabIndex={0}
      >
        {Array(20)
          .fill()
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={i}>{`Small (${i})`}</Text>
          ))}
      </Box>
    </Box>
    <Box pad="small" gap="small" direction="row" align="start">
      <Box
        width="small"
        height={{ min: '100px' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>min-height=100px</Text>
      </Box>
      <Box
        width="small"
        height={{ min: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>min-height=small</Text>
      </Box>
      <Box
        width="small"
        height={{ min: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>min-height=small</Text>
        <Text>min-height=small</Text>
        <Text>min-height=small</Text>
      </Box>
      <Box
        width="small"
        height={{ min: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        {Array(20)
          .fill()
          .map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={i}>{`Small (${i})`}</Text>
          ))}
      </Box>
    </Box>
    <Box pad="small" gap="small" direction="row" align="start">
      <Box
        width={{ max: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>max</Text>
      </Box>
      <Box
        width={{ max: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>max-width=small</Text>
      </Box>
      <Box
        width={{ max: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>max-width=small, max-width=small</Text>
      </Box>
      <Box
        width={{ max: '100px' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>max-width=100px, max-width=100px</Text>
      </Box>
    </Box>
    <Box pad="small" gap="small" direction="row" align="start">
      <Box
        width={{ min: '100px' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>100px</Text>
      </Box>
      <Box
        width={{ min: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>small</Text>
      </Box>
      <Box
        width={{ min: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>min-width=small</Text>
      </Box>
      <Box
        width={{ min: 'small' }}
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow="auto"
      >
        <Text>min-width=small, min-width=small</Text>
      </Box>
    </Box>
  </Box>
  // </Grommet>
);

MinMaxSizesBox.storyName = 'Min and max sizes';

export default {
  title: 'Layout/Box/Min and max sizes',
};
