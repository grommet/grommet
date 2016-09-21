// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABLE_ROW;

export default class TableRow extends Component {
  render () {
    const { children, className, onClick, selected } = this.props;

    if (selected) {
      console.warn('TableRow: selected prop has been deprecated. Use ' +
        'selected option at the Table level.');
    }

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--selected`]: selected,
        [`${CLASS_ROOT}--selectable`]: onClick
      }
    );

    return (
      <tr className={classes} onClick={onClick}>
        {children}
      </tr>
    );
  }
};

TableRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool // remove in 1.0
};
