import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';

export const PaginationSummary = ({ page, step, numberItems, ...rest }) => (
  <Box flex="grow">
    <Text {...rest}>
      {`Showing ${(page - 1) * step + 1} - ${Math.min(
        page * step,
        numberItems,
      )} of ${numberItems} items`}
    </Text>
  </Box>
);
