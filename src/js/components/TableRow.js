// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABLE_ROW;
const SELECTED_CLASS = CLASS_ROOT + '--selected';
const ACTIVE_CLASS = CLASS_ROOT + '--active';
const DISABLED_CLASS = CLASS_ROOT + '--disabled';

export default class TableRow extends Component {
  constructor () {
    super();
    this._onSelect = this._onSelect.bind(this);
    this.state = {
      hover: false,
      selected: {},
      rowIndex: null
    };
  }

  // added this function explicitly as not passing selectable attribute in table
  // component which applies hover class to all rows (we want to remove it for 
  // disabled rows).
  _onHover (hovered, e) {
    if (hovered) {
      const rows = e.target.parentNode.parentElement.rows;
      var selected = this.state.selected;
      for (var i = 0; i < rows.length; i++) {
        var rowId='row'+i;
        if (rows[i].classList.contains(SELECTED_CLASS)) {
          selected[rowId] = true;
        } else {
          selected[rowId] = false;
        }
      }
      const rowIndex = 'row' + e.currentTarget.sectionRowIndex;
      this.setState({ selected, rowIndex, hover: true });
    } else {
      this.setState({ hover: false });
    }
  }

  // added this function explicitly as not passing selectable attribute in table
  // component which applies selectable class to all rows (we want to remove it
  // for disabled rows).
  _onSelect (e) {
    var rows = e.target.parentNode.parentElement.rows;
    var selected = this.state.selected;
    const rowIndex = 'row' + e.currentTarget.sectionRowIndex;
    for (var i = 0; i < rows.length; i++) {
      var rowId='row'+i;
      selected[rowId] = false;
      if (rows[i].classList.contains(SELECTED_CLASS)) {
        rows[i].classList.remove(SELECTED_CLASS);
      }
    }
    selected[rowIndex]= true;
    this.setState({ selected, rowIndex });
    this.props.onClick(e.currentTarget.sectionRowIndex);
  }

  render () {
    var { children, className, onClick, custom, ...props } = this.props;

    var classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--selectable`]: onClick
      },
      className
    );
    var mouseEnter, mouseLeave;

    //attribute custom(type boolean) should be sent 'true' if row is to be
    // disabled
    if (custom) {
      // apply disabled css and remove onClick if row is to be disabled
      if (this.props.disabled) {
        onClick = null;
        classes = classes.concat(' ' + DISABLED_CLASS);
      } else {
        onClick = this._onSelect;
      }
      // if hover and if row item is not disabled, apply hover css
      if (this.state.hover && !this.props.disabled) {
        classes = classes.concat(' ' + ACTIVE_CLASS);
      }
      // if row selected, apply row selected css
      if (this.state.selected[this.state.rowIndex]) {
        classes = classes.concat(' ' + SELECTED_CLASS);
      }
      mouseEnter = this._onHover.bind(this, true);
      mouseLeave = this._onHover.bind(this, false);
    }
    return (
      <tr {...props} className={classes} onClick={onClick}
      onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        {children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  onClick: PropTypes.func,
  custom: PropTypes.bool
};
