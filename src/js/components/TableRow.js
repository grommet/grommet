// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "table-row";

export default class TableRow extends Component {
  render () {
    let classes = [CLASS_ROOT];
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "--selected");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <tr className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool
};
