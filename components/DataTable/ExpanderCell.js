"use strict";

exports.__esModule = true;
exports.ExpanderCell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Blank = require("grommet-icons/icons/Blank");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _TableCell = require("../TableCell");

var _utils = require("../../utils");

var _excluded = ["context", "expanded", "onToggle", "pad"],
    _excluded2 = ["background", "border", "context"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// ExpanderControl is separated from ExpanderCell to give TableCell a chance
// to set the ThemeContext dark context.
var ExpanderControl = function ExpanderControl(_ref) {
  var context = _ref.context,
      expanded = _ref.expanded,
      onToggle = _ref.onToggle,
      pad = _ref.pad,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var content;

  if (onToggle) {
    var ExpandIcon = theme.dataTable.icons[expanded ? 'contract' : 'expand'];
    content = /*#__PURE__*/_react["default"].createElement(ExpandIcon, {
      color: (0, _utils.normalizeColor)('border', theme)
    });
  } else {
    content = /*#__PURE__*/_react["default"].createElement(_Blank.Blank, null);
  }

  var normalizedThemeProps = _extends({}, theme.table[context], theme.dataTable[context]);

  delete normalizedThemeProps.background;
  delete normalizedThemeProps.border;
  delete normalizedThemeProps.pad;
  content = /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({}, normalizedThemeProps, rest, {
    align: "center",
    fill: true,
    pad: pad
  }), content);

  if (onToggle) {
    content = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      fill: true,
      a11yTitle: expanded ? 'collapse' : 'expand',
      hoverIndicator: true,
      onClick: onToggle,
      plain: true
    }, content);
  }

  return content;
};

var ExpanderCell = function ExpanderCell(_ref2) {
  var background = _ref2.background,
      border = _ref2.border,
      context = _ref2.context,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  return /*#__PURE__*/_react["default"].createElement(_TableCell.TableCell, {
    background: background,
    border: border,
    size: "xxsmall",
    plain: "noPad",
    verticalAlign: context === 'groupEnd' ? 'bottom' : 'top'
  }, /*#__PURE__*/_react["default"].createElement(ExpanderControl, _extends({
    context: context
  }, rest)));
};

exports.ExpanderCell = ExpanderCell;
ExpanderCell.displayName = 'ExpanderCell';
ExpanderCell.defaultProps = {};
Object.setPrototypeOf(ExpanderCell.defaultProps, _defaultProps.defaultProps);