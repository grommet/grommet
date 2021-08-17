"use strict";

exports.__esModule = true;
exports.AccordionPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Box = require("../Box");

var _Button = require("../Button");

var _Collapsible = require("../Collapsible");

var _Heading = require("../Heading");

var _AccordionContext = require("../Accordion/AccordionContext");

var _propTypes = require("./propTypes");

var _excluded = ["children", "header", "label", "onClick", "onMouseOut", "onMouseOver", "onFocus", "onBlur"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AccordionPanel = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      header = _ref.header,
      label = _ref.label,
      onClick = _ref.onClick,
      _onMouseOut = _ref.onMouseOut,
      _onMouseOver = _ref.onMouseOver,
      _onFocus = _ref.onFocus,
      _onBlur = _ref.onBlur,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useContext = (0, _react.useContext)(_AccordionContext.AccordionContext),
      active = _useContext.active,
      animate = _useContext.animate,
      onPanelChange = _useContext.onPanelChange;

  var _useState = (0, _react.useState)(undefined),
      hover = _useState[0],
      setHover = _useState[1];

  var _useState2 = (0, _react.useState)(),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var iconColor = (0, _react.useMemo)(function () {
    return (0, _utils.normalizeColor)(theme.accordion.icons.color || 'control', theme);
  }, [theme]);
  var AccordionIcon = (0, _react.useMemo)(function () {
    return active ? theme.accordion.icons.collapse : theme.accordion.icons.expand;
  }, [active, theme.accordion.icons]);
  var defaultHoverColor = JSON.stringify({
    dark: 'light-4',
    light: 'dark-3'
  }); // accordion.hover.color will be deprecated in v3.

  if (JSON.stringify(theme.accordion.hover.color) !== defaultHoverColor) console.warn("The theme style for accordion.hover.color is deprecated, \n        use accordion.hover.heading.color instead."); // accordion.hover.heading.color will trump accordion.hover.color in case
  // the user sets its value to be any other value than the
  // default value (defaultHoverColor).
  // accordion.hover.color will be deprecated in v3.

  var headingColor = theme.accordion.hover && JSON.stringify(theme.accordion.hover.heading.color) !== defaultHoverColor ? theme.accordion.hover.heading.color : theme.accordion.hover.color;
  var contentBorder = theme.accordion.border;
  var panelBorder = theme.accordion.panel.border;
  var abutMargin;
  if (panelBorder) // abutMargin 'bottom' is set to overlap adjacent border panels
    abutMargin = {
      bottom: "-" + (0, _utils.parseMetricToNum)( // in case border.size defined as a t-shirt size
      // or in case border size is a custom size i.e. '5px'
      theme.global.borderSize[panelBorder.size] || panelBorder.size || theme.global.borderSize.xsmall // '-1px'
      ) + "px"
    };
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    flex: false,
    onClick: onClick,
    border: panelBorder,
    margin: abutMargin
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    role: "tab",
    "aria-selected": active,
    "aria-expanded": active,
    plain: theme.button["default"] ? true : undefined,
    onClick: onPanelChange,
    onMouseOver: function onMouseOver(event) {
      setHover(headingColor);
      if (_onMouseOver) _onMouseOver(event);
    },
    onMouseOut: function onMouseOut(event) {
      setHover(undefined);
      if (_onMouseOut) _onMouseOut(event);
    },
    onFocus: function onFocus(event) {
      setHover(headingColor);
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setHover(undefined);
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    style: focus ? {
      zIndex: 1
    } : undefined
  }, header || /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    align: "center",
    direction: "row",
    justify: "between"
  }, rest), typeof label === 'string' ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      horizontal: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    level: theme.accordion.heading && theme.accordion.heading.level || 4,
    margin: theme.accordion.heading && theme.accordion.heading.margin || undefined,
    color: hover
  }, label)) : label, AccordionIcon && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      horizontal: 'small'
    },
    width: {
      min: 'fit-content'
    }
  }, /*#__PURE__*/_react["default"].createElement(AccordionIcon, {
    color: iconColor
  })))), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    border: contentBorder
  }, animate ? /*#__PURE__*/_react["default"].createElement(_Collapsible.Collapsible, {
    open: active
  }, children) : active && children));
});
exports.AccordionPanel = AccordionPanel;
AccordionPanel.displayName = 'AccordionPanel';
AccordionPanel.propTypes = _propTypes.AccordionPanelPropTypes;