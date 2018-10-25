import React from 'react';
import { compose } from 'recompose';

import { withTheme } from '../hocs';

import { StyledTable, StyledTableDataCaption } from './StyledTable';

const Table = ({ caption, children, ...rest }) => (
  <StyledTable {...rest}>
    {caption ? <StyledTableDataCaption>{caption}</StyledTableDataCaption> : null}
    {children}
  </StyledTable>
);

let TableDoc;
if (process.env.NODE_ENV !== 'production') {
  TableDoc = require('./doc').doc(Table); // eslint-disable-line global-require
}
const TableWrapper = compose(withTheme)(TableDoc || Table);

export { TableWrapper as Table };
