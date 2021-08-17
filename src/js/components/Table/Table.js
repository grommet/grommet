import React from 'react';

import { StyledTable, StyledTableDataCaption } from './StyledTable';
import { TablePropTypes } from './propTypes';

const Table = ({ caption, children, ...rest }) => (
  <StyledTable {...rest}>
    {caption ? (
      <StyledTableDataCaption>{caption}</StyledTableDataCaption>
    ) : null}
    {children}
  </StyledTable>
);

Table.propTypes = TablePropTypes;

export { Table };
