var _excluded = ["cellProps", "columns", "fill", "footerValues", "groups", "onSelect", "pin", "pinnedOffset", "primaryProperty", "selected", "verticalAlign"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
import React, { forwardRef } from 'react';
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
    verticalAlign = _ref.verticalAlign,
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
    pin: pin,
    verticalAlign: verticalAlign
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
      primaryProperty: primaryProperty,
      verticalAlign: verticalAlign
    });
  })));
});
Footer.displayName = 'Footer';
export { Footer };