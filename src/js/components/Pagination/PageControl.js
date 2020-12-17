import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

export const PageControl = ({ control, separator, ...rest }) => {
  return (
    <Box as="li">
      {separator ? (
        <Text margin="small" weight="bold">
          &#8230;
        </Text>
      ) : (
        <Button a11yTitle={`Go to page ${control}`} label={control} {...rest} />
      )}
    </Box>
  );
};
