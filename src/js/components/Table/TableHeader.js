import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyledTableHeader } from './StyledTable';

export default class TableHeader extends Component {
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
