import React from 'react';

import { StyledTableBody } from './StyledTable';
import { docTableBody } from './doc';

const TableBody = props => <StyledTableBody {...props} />;

if (process.env.NODE_ENV !== 'production') {
  docTableBody(TableBody);
}

export default TableBody;
