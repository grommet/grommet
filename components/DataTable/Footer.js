"use strict";

exports.__esModule = true;
exports.Footer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _defaultProps = require("../../default-props");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

var _excluded = ["cellProps", "columns", "fill", "footerValues", "groups", "onSelect", "pin", "pinnedOffset", "primaryProperty", "selected"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Footer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableFooter, _extends({
    ref: ref,
    fillProp: fill,
    pin: pinProp
  }, rest), /*#__PURE__*/_react["default"].createElement(_TableRow.TableRow, null, groups && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    plain: true,
    size: "xxsmall",
    pad: "none",
    verticalAlign: "top",
    background: cellProps.background,
    border: cellProps.border
  }), (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableCell, {
    background: cellProps.background,
    context: "footer",
    pin: pin
  }), columns.map(function (column) {
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
      primaryProperty: primaryProperty
    });
  })));
});
exports.Footer = Footer;
Footer.displayName = 'Footer';
Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, _defaultProps.defaultProps);