import React, { forwardRef } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableBody } from '../Table/StyledTable';

const TableBody = forwardRef((props, ref) => (
  <TableContext.Provider value="body">
    <StyledTableBody ref={ref} {...props} />
  </TableContext.Provider>
));

TableBody.displayName = 'TableBody';

export { TableBody };
