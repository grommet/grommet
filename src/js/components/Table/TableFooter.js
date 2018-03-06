import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledTableFooter } from './StyledTable';
import { docTableFooter } from './doc';

class TableFooter extends Component {
  static childContextTypes = {
    grommet: PropTypes.object,
  }

  getChildContext() {
    const { grommet } = this.context;
    return { grommet: { ...grommet, tableContext: 'footer' } };
  }

  render() {
    return <StyledTableFooter {...this.props} />;
  }
}

if (process.env.NODE_ENV !== 'production') {
  docTableFooter(TableFooter);
}

export default TableFooter;
