import React, { Component } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';
import { doc } from './doc';

class TableFooter extends Component {
  render() {
    return (
      <TableContext.Provider value='footer'>
        <StyledTableFooter {...this.props} />
      </TableContext.Provider>
    );
  }
}

let TableFooterWrapper = TableFooter;
if (process.env.NODE_ENV !== 'production') {
  TableFooterWrapper = doc(TableFooterWrapper);
}

export { TableFooterWrapper as TableFooter };
