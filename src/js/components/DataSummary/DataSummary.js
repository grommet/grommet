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
    total,
  } = useContext(DataContext);

  let messageId;
  if (total !== filteredTotal) {
    if (filteredTotal === 1) messageId = 'dataSummary.filteredSingle';
    else messageId = 'dataSummary.filtered';
  } else messageId = 'dataSummary.total';

  return (
    <Text margin={{ vertical: 'xsmall' }} {...rest}>
      {format({
        id: messageId,
        messages: messages || dataMessages?.dataSummary,
        values: { filteredTotal, total },
      })}
    </Text>
  );
};

DataSummary.propTypes = DataSummaryPropTypes;
