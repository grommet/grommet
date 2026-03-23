import React, { forwardRef } from 'react';

import { StyledTable, StyledTableDataCaption } from './StyledTable';
import { TablePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const Table = forwardRef(({ caption, children, ...rest }, ref) => {
  const { passThemeFlag } = useThemeValue();
  return (
    <StyledTable ref={ref} {...passThemeFlag} {...rest}>
      {caption ? (
        <StyledTableDataCaption {...passThemeFlag}>
          {caption}
        </StyledTableDataCaption>
      ) : null}
      {children}
    </StyledTable>
  );
});

Table.propTypes = TablePropTypes;

export { Table };
