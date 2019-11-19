"use strict";

exports.__esModule = true;
exports.AccordionPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Collapsible = require("../Collapsible");

var _Heading = require("../Heading");

var _hocs = require("../hocs");

var _AccordionContext = require("../Accordion/AccordionContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AccordionPanel = function AccordionPanel(_ref) {
  var children = _ref.children,
      header = _ref.header,
      label = _ref.label,
      theme = _ref.theme,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "header", "label", "theme", "onMouseOut", "onMouseOver", "onFocus", "onBlur"]);

  var _useState = (0, _react.useState)(undefined),
      hover = _useState[0],
      setHover = _useState[1];

  var iconColor = (0, _utils.normalizeColor)(theme.accordion.icons.color || 'control', theme);

  var onHandleMouseOver = function onHandleMouseOver() {
    var dark = theme.dark;
    setHover(dark ? 'light-4' : 'dark-3');

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (onMouseOver) onMouseOver(args);
  };

  var onHandleMouseOut = function onHandleMouseOut() {
    setHover(undefined);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (onMouseOut) onMouseOut(args);
  };

  var onHandleFocus = function onHandleFocus() {
    var dark = theme.dark;
    setHover(dark ? 'light-4' : 'dark-3');

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (onFocus) onFocus(args);
  };

  var onHandleBlur = function onHandleBlur() {
    setHover(undefined);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (onBlur) onBlur(args);
  };

  return _react["default"].createElement(_AccordionContext.AccordionContext.Consumer, null, function (panelContext) {
    var active = panelContext.active,
        animate = panelContext.animate,
        onPanelChange = panelContext.onPanelChange;
    var AccordionIcon = active ? theme.accordion.icons.collapse : theme.accordion.icons.expand;
    return _react["default"].createElement(_Box.Box, {
      flex: false
    }, _react["default"].createElement(_Button.Button, {
      role: "tab",
      "aria-selected": active,
      "aria-expanded": active,
      onClick: onPanelChange,
      onMouseOver: onHandleMouseOver,
      onMouseOut: onHandleMouseOut,
      onFocus: onHandleFocus,
      onBlur: onHandleBlur
    }, header || _react["default"].createElement(_Box.Box, _extends({
      align: "center",
      direction: "row",
      justify: "between"
    }, rest), typeof label === 'string' ? _react["default"].createElement(_Box.Box, {
      pad: {
        horizontal: 'xsmall'
      }
    }, _react["default"].createElement(_Heading.Heading, {
      level: theme.accordion.heading && theme.accordion.heading.level || 4,
      color: hover
    }, label)) : label, AccordionIcon && _react["default"].createElement(_Box.Box, {
      pad: {
        horizontal: 'small'
      }
    }, _react["default"].createElement(AccordionIcon, {
      color: iconColor
    })))), _react["default"].createElement(_Box.Box, {
      border: theme.accordion.border
    }, animate ? _react["default"].createElement(_Collapsible.Collapsible, {
      open: active
    }, children) : active && children));
  });
};

AccordionPanel.defaultProps = {};
Object.setPrototypeOf(AccordionPanel.defaultProps, _defaultProps.defaultProps);
var AccordionPanelDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionPanelDoc = require('./doc').doc(AccordionPanel);
}

var AccordionPanelWrapper = (0, _recompose.compose)(_styledComponents.withTheme, _hocs.withForwardRef)(AccordionPanelDoc || AccordionPanel);
exports.AccordionPanel = AccordionPanelWrapper;