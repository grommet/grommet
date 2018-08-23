import React from 'react';

import { StyledTableRow } from '../Table/StyledTable';
import { doc } from './doc';

export const TableRow = props => <StyledTableRow {...props} />;

if (process.env.NODE_ENV !== 'production') {
  doc(TableRow);
}
