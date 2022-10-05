import React from 'react';

import { Box, Text } from 'grommet';

const sizes = [
  '6xl',
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xxlarge',
  'xlarge',
  'large',
  'medium',
  'small',
  'xsmall',
  '77px',
];

export const All = () => (
  <>
    {sizes.map((size) => (
      <Box key={size} margin="small">
        <Text size={size}>{`Text ${size}`}</Text>
      </Box>
    ))}
    <Box background="light-3" align="end" width="small" pad="small">
      <Text truncate>
        This is a long truncated string of text that is aligned to the end.
      </Text>
    </Box>
    <Box pad="small">
      <Text color="brand">Colored Text</Text>
    </Box>
  </>
);

export default {
  title: 'Type/Text/All',
};
