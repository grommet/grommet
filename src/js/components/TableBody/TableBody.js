import React from 'react';
import { compose } from 'recompose';

import { withForwardRef } from '../hocs';
import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';

const TableBody = ({ forwardRef, ...rest }) => (
  <TableContext.Provider value="body">
    <StyledTableBody ref={forwardRef} {...rest} />
  </TableContext.Provider>
);

let TableBodyDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableBodyDoc = require('./doc').doc(TableBody);
}
const TableBodyWrapper = compose(withForwardRef)(TableBodyDoc || TableBody);

export { TableBodyWrapper as TableBody };
