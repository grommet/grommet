import React, { Component } from 'react';

import TableContext from './TableContext';
import { StyledTableFooter } from './StyledTable';
import { docTableFooter } from './doc';

class TableFooter extends Component {
  render() {
    return (
      <TableContext.Provider value='footer'>
        <StyledTableFooter {...this.props} />
      </TableContext.Provider>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  docTableFooter(TableFooter);
}

export default TableFooter;
