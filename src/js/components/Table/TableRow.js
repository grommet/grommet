import React from 'react';

import { StyledTableRow } from './StyledTable';
import { docTableRow } from './doc';

const TableRow = props => <StyledTableRow {...props} />;

if (process.env.NODE_ENV !== 'production') {
  docTableRow(TableRow);
}

export default TableRow;
