import React from 'react';

import TableContext from './TableContext';
import { StyledTableBody } from './StyledTable';
import { docTableBody } from './doc';

const TableBody = props => (
  <TableContext.Provider value='body'>
    <StyledTableBody {...props} />
  </TableContext.Provider>
);

if (process.env.NODE_ENV !== 'production') {
  docTableBody(TableBody);
}

export default TableBody;
