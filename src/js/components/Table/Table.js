import React from 'react';

import { StyledTable, StyledTableDataCaption } from './StyledTable';

const Table = ({ caption, children, ...rest }) => (
  <StyledTable {...rest}>
    {caption ? (
      <StyledTableDataCaption>{caption}</StyledTableDataCaption>
    ) : null}
    {children}
  </StyledTable>
);

let TableDoc;
if (process.env.NODE_ENV !== 'production') {
  TableDoc = require('./doc').doc(Table); // eslint-disable-line global-require
}
const TableWrapper = TableDoc || Table;

export { TableWrapper as Table };
