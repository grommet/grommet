import React, { useContext } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';

export const PaginationSummary = ({
  messages,
  numberItems,
  page,
  step,
  ...rest
}) => {
  const { format: formatMessage } = useContext(MessageContext);
  return (
    <Box {...rest}>
      <Text>
        {numberItems > 0
          ? formatMessage({
              id: 'pagination.summary',
              messages,
              values: {
                start: `${(page - 1) * step + 1}`,
                end: `${Math.min(page * step, numberItems)}`,
                total: numberItems,
              },
            })
          : formatMessage({
              id: 'pagination.summaryNoItems',
              messages,
            })}
      </Text>
    </Box>
  );
};
