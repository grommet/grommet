import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';

export const EmptySearchOption = ({
  emptySearchMessage,
  selectOptionsStyle,
  theme,
}) => (
  <Box
    {...(theme?.select?.emptySearchMessage?.container || selectOptionsStyle)}
  >
    <Text
      aria-live="polite"
      role="alert"
      {...(theme?.select?.emptySearchMessage?.text ||
        theme.select?.options?.text)}
    >
      {emptySearchMessage}
    </Text>
  </Box>
);
