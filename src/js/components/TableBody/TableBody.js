import React from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';
import { doc } from './doc';

const TableBody = props => (
  <TableContext.Provider value='body'>
    <StyledTableBody {...props} />
  </TableContext.Provider>
);

let TableBodyWrapper = TableBody;
if (process.env.NODE_ENV !== 'production') {
  TableBodyWrapper = doc(TableBodyWrapper);
}

export { TableBodyWrapper as TableBody };
