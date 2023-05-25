import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';

export const EmptySearchOption = ({
  emptySearchMessage,
  selectOptionsStyle,
  theme,
}) => (
  <Box
    {...{
      ...selectOptionsStyle,
      pad: selectOptionsStyle?.pad || theme.button?.option?.pad,
    }}
  >
    <Text aria-live="polite" role="alert" {...theme.select?.options?.text}>
      {emptySearchMessage}
    </Text>
  </Box>
);
