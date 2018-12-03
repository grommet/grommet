"use strict";

exports.__esModule = true;
exports.ExpanderCell = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _TableCell = require("../TableCell");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ExpanderCell = function ExpanderCell(_ref) {
  var context = _ref.context,
      expanded = _ref.expanded,
      onToggle = _ref.onToggle,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["context", "expanded", "onToggle", "theme"]);

  var ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];

  if (onToggle) {
    return _react.default.createElement(_TableCell.TableCell, {
      size: "xxsmall",
      plain: true,
      verticalAlign: "top"
    }, _react.default.createElement(_Button.Button, {
      fill: true,
      a11yTitle: expanded ? 'collapse' : 'expand',
      hoverIndicator: true,
      disabled: !onToggle,
      onClick: onToggle
    }, _react.default.createElement(_Box.Box, _extends({}, _extends({}, theme.table[context], theme.dataTable[context]), rest, {
      align: "center",
      pad: "xsmall"
    }), _react.default.createElement(ExpandIcon, {
      color: (0, _utils.normalizeColor)('border', theme)
    }))));
  }

  return _react.default.createElement(_TableCell.TableCell, {
    size: "xxsmall",
    verticalAlign: "top"
  });
};

ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, _defaultProps.defaultProps);
var ExpanderCellWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(ExpanderCell);
exports.ExpanderCell = ExpanderCellWrapper;