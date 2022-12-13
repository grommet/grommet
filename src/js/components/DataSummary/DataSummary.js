import React, { useContext } from 'react';
import { Text } from '../Text';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';

import { DataSummaryPropTypes } from './propTypes';

export const DataSummary = ({ messages, ...rest }) => {
  const { format } = useContext(MessageContext);
  const { data, total } = useContext(DataContext);
  return (
    <Text margin={{ vertical: 'xsmall' }} {...rest}>
      {total !== data.length
        ? format({
            id: 'dataSummary.filtered',
            messages,
            values: { filtered: data.length, total },
          })
        : format({
            id: 'dataSummary.total',
            messages,
            values: { total },
          })}
    </Text>
  );
};

DataSummary.propTypes = DataSummaryPropTypes;
