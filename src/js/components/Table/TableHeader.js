import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledTableHeader } from './StyledTable';
import { docTableHeader } from './doc';

class TableHeader extends Component {
  static childContextTypes = {
    grommet: PropTypes.object,
  }

  getChildContext() {
    const { grommet } = this.context;
    return { grommet: { ...grommet, tableContext: 'header' } };
  }

  render() {
    return <StyledTableHeader {...this.props} />;
  }
}

if (process.env.NODE_ENV !== 'production') {
  docTableHeader(TableHeader);
}

export default TableHeader;
