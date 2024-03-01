import React, { useContext } from 'react';
import { Text } from '../Text';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';

import { DataSummaryPropTypes } from './propTypes';

export const DataSummary = ({ messages, ...rest }) => {
  const { format } = useContext(MessageContext);
  const {
    filteredTotal,
    messages: dataMessages,
    selected,
    total,
  } = useContext(DataContext);

  let messageId;
  if (total !== filteredTotal) {
    if (filteredTotal === 1) messageId = 'dataSummary.filteredSingle';
    else messageId = 'dataSummary.filtered';
  } else if (total === 1) messageId = 'dataSummary.totalSingle';
  else messageId = 'dataSummary.total';

  // helps account for cases like 0 results of 1 item
  const items = format({
    id: total === 1 ? 'dataSummary.itemsSingle' : 'dataSummary.items',
    messages: messages || dataMessages?.dataSummary,
  });

  return (
    <Text margin={{ vertical: 'xsmall' }} {...rest}>
      {format({
        id: messageId,
        messages: messages || dataMessages?.dataSummary,
        values: {
          filteredTotal,
          total,
          items,
        },
      })}
      {selected > 0 ? (
        <>
          {/* separator with margin to ensure | is not confused 
          as a 1 in the selected count */}
          <Text margin={{ horizontal: 'small' }}>|</Text>
          <Text>
            {format({
              id: 'dataSummary.selected',
              messages: messages || dataMessages?.dataSummary,
              values: {
                selected,
              },
            })}
          </Text>
        </>
      ) : undefined}
    </Text>
  );
};

DataSummary.propTypes = DataSummaryPropTypes;
