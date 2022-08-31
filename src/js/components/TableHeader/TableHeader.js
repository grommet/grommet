import React, { forwardRef } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';

const TableHeader = forwardRef((props, ref) => (
  <TableContext.Provider value="header">
    <StyledTableHeader ref={ref} {...props} />
  </TableContext.Provider>
));

TableHeader.displayName = 'TableHeader';

export { TableHeader };
