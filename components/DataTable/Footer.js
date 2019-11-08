"use strict";

exports.__esModule = true;
exports.Footer = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Footer = function Footer(_ref) {
  var background = _ref.background,
      border = _ref.border,
      columns = _ref.columns,
      footerValues = _ref.footerValues,
      groups = _ref.groups,
      pad = _ref.pad,
      primaryProperty = _ref.primaryProperty,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["background", "border", "columns", "footerValues", "groups", "pad", "primaryProperty", "theme"]);

  return _react["default"].createElement(_StyledDataTable.StyledDataTableFooter, rest, _react["default"].createElement(_TableRow.TableRow, null, groups && _react["default"].createElement(_TableCell.TableCell, {
    plain: true,
    size: "xxsmall",
    pad: "none",
    verticalAlign: "top"
  }), columns.map(function (column) {
    return _react["default"].createElement(_Cell.Cell, {
      key: column.property,
      background: background,
      border: border,
      context: "footer",
      column: column,
      datum: footerValues,
      pad: pad,
      primaryProperty: primaryProperty
    });
  })));
};

Footer.defaultProps = {};
Object.setPrototypeOf(Footer.defaultProps, _defaultProps.defaultProps);
var FooterWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Footer);
exports.Footer = FooterWrapper;