import React, { Component } from 'react';

import TableContext from './TableContext';
import { StyledTableHeader } from './StyledTable';
import { docTableHeader } from './doc';

class TableHeader extends Component {
  render() {
    return (
      <TableContext.Provider value='header'>
        <StyledTableHeader {...this.props} />
      </TableContext.Provider>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  docTableHeader(TableHeader);
}

export default TableHeader;
