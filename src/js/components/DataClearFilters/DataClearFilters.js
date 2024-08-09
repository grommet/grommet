import React, { forwardRef, useContext } from 'react';
import { DataClearFiltersPropTypes } from './propTypes';
import { Button } from '../Button';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';

const DataClearFilters = forwardRef(({ onClick, ...rest }, ref) => {
  const theme = useThemeValue();
  const { format } = useContext(MessageContext);
  const { clearFilters, messages } = useContext(DataContext);

  return (
    <Button
      ref={ref}
      kind={theme.data.button?.kind}
      label={format({
        id: 'dataFilters.clear',
        messages: messages?.dataFilters,
      })}
      onClick={(event) => {
        clearFilters();
        if (onClick) onClick(event);
      }}
      {...rest}
    />
  );
});

DataClearFilters.displayName = 'DataClearFilters';
DataClearFilters.propTypes = DataClearFiltersPropTypes;

export { DataClearFilters };
