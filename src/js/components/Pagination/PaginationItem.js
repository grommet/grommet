import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

export const PaginationItem = ({ page, ...rest }) => {
  return page === 'start-ellipsis' || page === 'end-ellipsis' ? (
    <Box pad="small">
      <Text weight="bold">…</Text>
    </Box>
  ) : (
    <Button a11yTitle={`Go to page ${page}`} label={page} {...rest} />
  );
};
