import React, { useContext } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';

export const PaginationSummary = ({ messages, numberItems, page, step }) => {
  const { format: formatMessage } = useContext(MessageContext);
  return (
    <Box flex="grow">
      <Text>
        {formatMessage({
          id: 'pagination.summary',
          messages,
          values: {
            firstValue: `${(page - 1) * step + 1}`,
            secondValue: `${Math.min(page * step, numberItems)}`,
            total: numberItems,
          },
        })}
      </Text>
    </Box>
  );
};
