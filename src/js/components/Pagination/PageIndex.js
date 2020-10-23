import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

export const PageIndex = ({ page, ...rest }) => {
  return (
    <Box as="li">
      {page === 'more-prev' || page === 'more-next' ? (
        <Box pad="small">
          <Text weight="bold">…</Text>
        </Box>
      ) : (
        <Button a11yTitle={`Go to page ${page}`} label={page} {...rest} />
      )}
    </Box>
  );
};
