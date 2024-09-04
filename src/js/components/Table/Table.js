import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { StyledTable, StyledTableDataCaption } from './StyledTable';
import { TablePropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const Table = forwardRef(({ caption, children, ...rest }, ref) => {
  const theme = useThemeValue();
  const withinThemeContext = useContext(ThemeContext);
  return (
    <StyledTable
      ref={ref}
      {...(withinThemeContext === undefined ? { theme } : {})}
      {...rest}
    >
      {caption ? (
        <StyledTableDataCaption
          {...(withinThemeContext === undefined ? { theme } : {})}
        >
          {caption}
        </StyledTableDataCaption>
      ) : null}
      {children}
    </StyledTable>
  );
});

Table.propTypes = TablePropTypes;

export { Table };
