"use strict";

exports.__esModule = true;
exports.Footer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _TableRow = require("../TableRow");
var _TableCell = require("../TableCell");
var _Cell = require("./Cell");
var _StyledDataTable = require("./StyledDataTable");
var _useThemeValue3 = require("../../utils/useThemeValue");
var _excluded = ["cellProps", "columns", "fill", "footerValues", "groups", "onSelect", "pin", "pinnedOffset", "primaryProperty", "selected", "verticalAlign"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Footer = exports.Footer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$dataTable$expa;
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
  var _useThemeValue = (0, _useThemeValue3.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useThemeValue2 = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue2.theme;
  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableFooter, _extends({
    ref: ref,
    fillProp: fill,
    pin: pinProp
  }, rest), /*#__PURE__*/_react["default"].createElement(_TableRow.TableRow, null, groups && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    plain: true,
    size: (_theme$dataTable$expa = theme.dataTable.expand) == null ? void 0 : _theme$dataTable$expa.size,
    pad: "none",
    verticalAlign: "top",
    background: cellProps.background,
    border: cellProps.border
  }), (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableCell, _extends({
    background: cellProps.background,
    context: "footer",
    pin: pin,
    verticalAlign: verticalAlign
  }, passThemeFlag)), columns.map(function (column) {
    var cellPin = [].concat(pin);
    if (column.pin) cellPin.push('left');
    return /*#__PURE__*/_react["default"].createElement(_Cell.Cell, {
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