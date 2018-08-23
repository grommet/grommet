import React from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';
import { doc } from './doc';

export const TableBody = props => (
  <TableContext.Provider value='body'>
    <StyledTableBody {...props} />
  </TableContext.Provider>
);

if (process.env.NODE_ENV !== 'production') {
  doc(TableBody);
}
