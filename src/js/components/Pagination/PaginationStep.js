import React from 'react';
import { Box } from '../Box';
import { Select } from '../Select';
import { Text } from '../Text';

export const PaginationStep = ({
  step,
  onChange,
  options = [10, 25, 50, 100], // TO DO revisit reasonable defaults
  ...rest
}) => (
  <Box direction="row" align="center" gap="xsmall" {...rest}>
    <Text>Items per page</Text>
    <Box width="xsmall">
      <Select options={options} value={step} onChange={onChange} />
    </Box>
  </Box>
);
