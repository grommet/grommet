import React from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';

const TableBody = props => (
  <TableContext.Provider value="body">
    <StyledTableBody {...props} />
  </TableContext.Provider>
);

let TableBodyDoc;
if (process.env.NODE_ENV !== 'production') {
  TableBodyDoc = require('./doc').doc(TableBody); // eslint-disable-line global-require
}
const TableBodyWrapper = TableBodyDoc || TableBody;

export { TableBodyWrapper as TableBody };
