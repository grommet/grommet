import React, { forwardRef } from 'react';

import { StyledTable, StyledTableDataCaption } from './StyledTable';
import { TablePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const Table = forwardRef(
  ({ caption, children, theme: themeProp, ...rest }, ref) => {
    const theme = useThemeValue(themeProp);

    return (
      <StyledTable ref={ref} theme={theme} {...rest}>
        {caption ? (
          <StyledTableDataCaption theme={theme}>
            {caption}
          </StyledTableDataCaption>
        ) : null}
        {children}
      </StyledTable>
    );
  },
);

Table.propTypes = TablePropTypes;

export { Table };
