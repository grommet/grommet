import React from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';
import { doc } from './doc';

const TableBody = props => (
  <TableContext.Provider value='body'>
    <StyledTableBody {...props} />
  </TableContext.Provider>
);

const TableBodyWrapper = process.env.NODE_ENV !== 'production' ? doc(TableBody) : TableBody;

export { TableBodyWrapper as TableBody };
