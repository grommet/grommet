// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'table-row';

export default class TableRow extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--selected`]: this.props.selected,
        [`${CLASS_ROOT}--selectable`]: this.props.onClick
      }
    );

    return (
      <tr className={classes} onClick={this.props.onClick}>
        {this.props.children}
      </tr>
    );
  }
};

TableRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool
};
