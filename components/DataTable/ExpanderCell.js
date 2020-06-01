"use strict";

exports.__esModule = true;
exports.ExpanderCell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _TableCell = require("../TableCell");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ExpanderCell = function ExpanderCell(_ref) {
  var context = _ref.context,
      expanded = _ref.expanded,
      onToggle = _ref.onToggle,
      rest = _objectWithoutPropertiesLoose(_ref, ["context", "expanded", "onToggle"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var content;

  if (onToggle) {
    var ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = /*#__PURE__*/_react["default"].createElement(ExpandIcon, {
      color: (0, _utils.normalizeColor)('border', theme)
    });
  }

  var normalizedThemeProps = _extends({}, theme.table[context], theme.dataTable[context]);

  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, normalizedThemeProps, rest, {
    align: "center",
    pad: "xsmall"
  }), content);

  if (onToggle) {
    content = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      fill: true,
      a11yTitle: expanded ? 'collapse' : 'expand',
      hoverIndicator: true,
      disabled: !onToggle,
      onClick: onToggle,
      plain: true
    }, content);
  }

  return /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    size: "xxsmall",
    plain: true,
    verticalAlign: context === 'groupEnd' ? 'bottom' : 'top',
    pad: "none"
  }, content);
};

exports.ExpanderCell = ExpanderCell;
ExpanderCell.displayName = 'ExpanderCell';
ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, _defaultProps.defaultProps);