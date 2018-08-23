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

if (process.env.NODE_ENV !== 'production') {
  doc(TableFooter);
}

export { TableFooter };
