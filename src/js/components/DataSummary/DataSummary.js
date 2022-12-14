import React, { useContext } from 'react';
import { Text } from '../Text';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';

import { DataSummaryPropTypes } from './propTypes';

export const DataSummary = ({ messages, ...rest }) => {
  const { format } = useContext(MessageContext);
  const { data, total } = useContext(DataContext);

  let messageId;
  if (total !== data.length) {
    if (data.length === 1) messageId = 'dataSummary.filteredSingle';
    else messageId = 'dataSummary.filtered';
  } else messageId = 'dataSummary.total';

  return (
    <Text margin={{ vertical: 'xsmall' }} {...rest}>
      {format({
        id: messageId,
        messages,
        values: { filtered: data.length, total },
      })}
    </Text>
  );
};

DataSummary.propTypes = DataSummaryPropTypes;
