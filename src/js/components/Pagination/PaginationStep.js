import React, { useContext } from 'react';
import { Box } from '../Box';
import { Select } from '../Select';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';

export const PaginationStep = ({
  messages,
  onChange,
  options = [0, 10, 25, 50, 100], // TO DO revisit reasonable defaults
  step,
  ...rest
}) => {
  const { format: formatMessage } = useContext(MessageContext);
  return (
    <Box direction="row" align="center" gap="xsmall" {...rest}>
      <Text> {formatMessage({ id: 'pagination.stepOptions', messages })}</Text>
      <Box width="xsmall">
        <Select options={options} value={step} onChange={onChange} />
      </Box>
    </Box>
  );
};
