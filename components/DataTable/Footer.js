"use strict";

exports.__esModule = true;
exports.Footer = void 0;

var _react = _interopRequireDefault(require("react"));

var _defaultProps = require("../../default-props");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Footer = function Footer(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      fill = _ref.fill,
      footerValues = _ref.footerValues,
      groups = _ref.groups,
      onSelect = _ref.onSelect,
      pad = _ref.pad,
      tablePin = _ref.pin,
      primaryProperty = _ref.primaryProperty,
      selected = _ref.selected,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "fill", "footerValues", "groups", "onSelect", "pad", "pin", "primaryProperty", "selected"]);

  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableFooter, _extends({
    fillProp: fill,
    pin: tablePin
  }, rest), /*#__PURE__*/_react["default"].createElement(_TableRow.TableRow, null, groups && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    plain: true,
    size: "xxsmall",
    pad: "none",
    verticalAlign: "top"
  }), (selected || onSelect) && /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, null), columns.map(function (column) {
    var pin = [];
    if (tablePin) pin.push('bottom');
    if (column.pin) pin.push('left');
    return /*#__PURE__*/_react["default"].createElement(_Cell.Cell, {
      key: column.property,
      background: background,
      border: border,
      context: "footer",
      column: column,
      datum: footerValues,
      pad: pad,
      pin: pin,
      primaryProperty: primaryProperty
    });
  })));
};

exports.Footer = Footer;
Footer.displayName = 'Footer';
Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, _defaultProps.defaultProps);