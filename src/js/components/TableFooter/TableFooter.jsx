import React, { forwardRef } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';

const TableFooter = forwardRef((props, ref) => (
  <TableContext.Provider value="footer">
    <StyledTableFooter ref={ref} {...props} />
  </TableContext.Provider>
));

TableFooter.displayName = 'TableFooter';

export { TableFooter };
