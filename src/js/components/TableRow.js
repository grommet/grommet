// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABLE_ROW;

export default class TableRow extends Component {
  render () {
    const { children, className, onClick, selected } = this.props;

    if (selected) {
      console.warn('Selected option has been deprecated, please use ' +
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
  //Deprecated in 0.6.2
  selected: PropTypes.bool
};
