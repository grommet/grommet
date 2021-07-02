var _excluded = ["cellProps", "columns", "fill", "footerValues", "groups", "onSelect", "pin", "pinnedOffset", "primaryProperty", "selected"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { defaultProps } from '../../default-props';
import { TableRow } from '../TableRow';
import { TableCell } from '../TableCell';
import { Cell } from './Cell';
import { StyledDataTableCell, StyledDataTableFooter } from './StyledDataTable';
var Footer = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var cellProps = _ref.cellProps,
      columns = _ref.columns,
      fill = _ref.fill,
      footerValues = _ref.footerValues,
      groups = _ref.groups,
      onSelect = _ref.onSelect,
      pinProp = _ref.pin,
      pinnedOffset = _ref.pinnedOffset,
      primaryProperty = _ref.primaryProperty,
      selected = _ref.selected,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var pin = pinProp ? ['bottom'] : [];
  return /*#__PURE__*/React.createElement(StyledDataTableFooter, _extends({
    ref: ref,
    fillProp: fill,
    pin: pinProp
  }, rest), /*#__PURE__*/React.createElement(TableRow, null, groups && /*#__PURE__*/React.createElement(TableCell, {
    plain: true,
    size: "xxsmall",
    pad: "none",
    verticalAlign: "top",
    background: cellProps.background,
    border: cellProps.border
  }), (selected || onSelect) && /*#__PURE__*/React.createElement(StyledDataTableCell, {
    background: cellProps.background,
    context: "footer",
    pin: pin
  }), columns.map(function (column) {
    var cellPin = [].concat(pin);
    if (column.pin) cellPin.push('left');
    return /*#__PURE__*/React.createElement(Cell, {
      key: column.property,
      background: column.pin && cellProps.pinned.background || cellProps.background,
      border: column.pin && cellProps.pinned.border || cellProps.border,
      context: "footer",
      column: column,
      datum: footerValues,
      pad: column.pin && cellProps.pinned.pad || cellProps.pad,
      pin: pin.length ? pin : undefined,
      pinnedOffset: pinnedOffset && pinnedOffset[column.property],
      primaryProperty: primaryProperty
    });
  })));
});
Footer.displayName = 'Footer';
Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, defaultProps);
export { Footer };