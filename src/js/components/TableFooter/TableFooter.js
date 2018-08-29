import React, { Component } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';

class TableFooter extends Component {
  render() {
    return (
      <TableContext.Provider value='footer'>
        <StyledTableFooter {...this.props} />
      </TableContext.Provider>
    );
  }
}

let TableFooterDoc;
if (process.env.NODE_ENV !== 'production') {
  TableFooterDoc = require('./doc').doc(TableFooter); // eslint-disable-line global-require
}
const TableFooterWrapper = TableFooterDoc || TableFooter;

export { TableFooterWrapper as TableFooter };

