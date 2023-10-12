import React, { forwardRef } from 'react';

import { StyledTable, StyledTableDataCaption } from './StyledTable';
import { TablePropTypes } from './propTypes';

const Table = forwardRef(({ caption, children, ...rest }, ref) => (
  <StyledTable ref={ref} {...rest}>
    {caption ? (
      <StyledTableDataCaption>{caption}</StyledTableDataCaption>
    ) : null}
    {children}
  </StyledTable>
));

Table.propTypes = TablePropTypes;

export { Table };
