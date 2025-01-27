"use strict";

exports.__esModule = true;
exports.AccordionPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _Button = require("../Button");
var _Collapsible = require("../Collapsible");
var _Heading = require("../Heading");
var _AccordionContext = require("../Accordion/AccordionContext");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["children", "header", "id", "label", "onClick", "onMouseOut", "onMouseOver", "onFocus", "onBlur"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AccordionPanel = exports.AccordionPanel = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    header = _ref.header,
    id = _ref.id,
    label = _ref.label,
    onClick = _ref.onClick,
    _onMouseOut = _ref.onMouseOut,
    _onMouseOver = _ref.onMouseOver,
    _onFocus = _ref.onFocus,
    _onBlur = _ref.onBlur,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var panelButtonId = (0, _utils.useId)();
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useContext = (0, _react.useContext)(_AccordionContext.AccordionContext),
    active = _useContext.active,
    animate = _useContext.animate,
    level = _useContext.level,
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
  });

  // accordion.hover.color will be deprecated in v3.
  if (JSON.stringify(theme.accordion.hover.color) !== defaultHoverColor) console.warn("The theme style for accordion.hover.color is deprecated,\n        use accordion.hover.heading.color instead.");

  // accordion.hover.heading.color will trump accordion.hover.color in case
  // the user sets its value to be any other value than the
  // default value (defaultHoverColor).
  // accordion.hover.color will be deprecated in v3.
  var headingColor = theme.accordion.hover && JSON.stringify(theme.accordion.hover.heading.color) !== defaultHoverColor ? theme.accordion.hover.heading.color : theme.accordion.hover.color;
  var contentBorder = theme.accordion.border;
  var panelBorder = theme.accordion.panel.border;
  var abutMargin;
  if (panelBorder)
    // abutMargin 'bottom' is set to overlap adjacent border panels
    abutMargin = {
      bottom: "-" + (0, _utils.parseMetricToNum)(
      // in case border.size defined as a t-shirt size
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
    id: panelButtonId,
    "aria-expanded": active,
    plain: theme.button["default"] ? true : undefined,
    onClick: onPanelChange,
    hoverIndicator: theme.accordion.hover.background,
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
    justify: "between",
    id: id
  }, rest), typeof label === 'string' ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      horizontal: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Heading.Heading, {
    level: level || theme.accordion.heading && theme.accordion.heading.level || 4,
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
    role: "region",
    border: contentBorder,
    "aria-labelledby": panelButtonId
  }, animate ? /*#__PURE__*/_react["default"].createElement(_Collapsible.Collapsible, {
    open: active
  }, children) : active && children));
});
AccordionPanel.displayName = 'AccordionPanel';
AccordionPanel.propTypes = _propTypes.AccordionPanelPropTypes;