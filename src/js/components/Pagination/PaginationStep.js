import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Select } from '../Select';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';

export const PaginationStep = ({
  messages,
  onChange,
  options = [10, 25, 50, 100],
  step,
  ...rest
}) => {
  const { format: formatMessage } = useContext(MessageContext);
  const theme = useContext(ThemeContext);
  return (
    <Box direction="row" align="center" gap="xsmall" {...rest}>
      <Text>{formatMessage({ id: 'pagination.stepLabel', messages })}</Text>
      <Select
        options={options}
        value={step}
        valueLabel={
          <Box {...theme.global.input} pad={theme.global.input.padding}>
            <Text {...theme.global.input.font}>{step}</Text>
          </Box>
        }
        onChange={onChange}
      />
    </Box>
  );
};
