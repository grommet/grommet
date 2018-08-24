import React, { Component } from 'react';

import { TableContext } from '../Table/TableContext';
import { StyledTableHeader } from '../Table/StyledTable';
import { doc } from './doc';

class TableHeader extends Component {
  render() {
    return (
      <TableContext.Provider value='header'>
        <StyledTableHeader {...this.props} />
      </TableContext.Provider>
    );
  }
}

let TableHeaderWrapper = TableHeader;
if (process.env.NODE_ENV !== 'production') {
  TableHeaderWrapper = doc(TableHeaderWrapper);
}

export { TableHeaderWrapper as TableHeader };
