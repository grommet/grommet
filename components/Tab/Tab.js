"use strict";

exports.__esModule = true;
exports.Tab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Text = require("../Text");

var _utils = require("../../utils");

var _StyledTab = require("./StyledTab");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Tab = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var active = _ref.active,
      icon = _ref.icon,
      plain = _ref.plain,
      title = _ref.title,
      onActivate = _ref.onActivate,
      onMouseOver = _ref.onMouseOver,
      onMouseOut = _ref.onMouseOut,
      reverse = _ref.reverse,
      rest = _objectWithoutPropertiesLoose(_ref, ["active", "icon", "plain", "title", "onActivate", "onMouseOver", "onMouseOut", "reverse"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(undefined),
      over = _useState[0],
      setOver = _useState[1];

  var _useState2 = (0, _react.useState)(undefined),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var normalizedTitle = title;
  var tabStyles = {};

  var onMouseOverTab = function onMouseOverTab(event) {
    setOver(true);

    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  var onMouseOutTab = function onMouseOutTab(event) {
    setOver(undefined);

    if (onMouseOut) {
      onMouseOut(event);
    }
  };

  var onClickTab = function onClickTab(event) {
    if (event) {
      event.preventDefault();
    }

    onActivate();
  };

  if (!plain) {
    if (typeof title !== 'string') {
      normalizedTitle = title;
    } else if (active) {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.tab.active, title);
    } else {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        color: over ? theme.tab.hover.color : theme.tab.color
      }, title);
    }

    if (theme.tab.border) {
      var borderColor = theme.tab.border.color || theme.global.control.border.color;

      if (active) {
        borderColor = theme.tab.border.active.color || borderColor;
      } else if (over) {
        borderColor = theme.tab.border.hover.color || borderColor;
      }

      borderColor = (0, _utils.normalizeColor)(borderColor, theme);
      tabStyles.border = {
        side: theme.tab.border.side,
        size: theme.tab.border.size,
        color: borderColor
      };
    }

    tabStyles.background = active ? theme.tab.active.background || theme.tab.background : theme.tab.background;
    tabStyles.pad = theme.tab.pad;
    tabStyles.margin = theme.tab.margin;
  } // needed to apply hover/active styles to the icon


  var renderIcon = function renderIcon(iconProp) {
    if (active) {
      return /*#__PURE__*/_react["default"].cloneElement(iconProp, _extends({}, theme.tab.active));
    }

    return /*#__PURE__*/_react["default"].cloneElement(iconProp, {
      color: over ? theme.tab.hover.color : theme.tab.color
    });
  };

  var normalizedIcon;

  if (icon) {
    normalizedIcon = renderIcon(icon);
  }

  var first = reverse ? normalizedTitle : normalizedIcon;
  var second = reverse ? normalizedIcon : normalizedTitle;
  var withIconStyles;

  if (first && second) {
    withIconStyles = {
      direction: 'row',
      align: 'center',
      justify: 'center',
      gap: 'small'
    };
  }

  return /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
    ref: ref,
    plain: true,
    role: "tab",
    "aria-selected": active,
    "aria-expanded": active
  }, rest, {
    onClick: onClickTab,
    onMouseOver: onMouseOverTab,
    onMouseOut: onMouseOutTab,
    onFocus: function onFocus() {
      setFocus(true);
      if (onMouseOver) onMouseOver();
    },
    onBlur: function onBlur() {
      setFocus(undefined);
      if (onMouseOut) onMouseOut();
    } // ensure focus outline is not covered by hover styling
    // of adjacent tabs
    ,
    style: focus && {
      zIndex: 1
    }
  }), /*#__PURE__*/_react["default"].createElement(_StyledTab.StyledTab, _extends({
    as: _Box.Box,
    plain: plain
  }, withIconStyles, tabStyles), first, second));
});
Tab.displayName = 'Tab';
Tab.defaultProps = {};
Object.setPrototypeOf(Tab.defaultProps, _defaultProps.defaultProps);
var TabDoc;

if (process.env.NODE_ENV !== 'production') {
  TabDoc = require('./doc').doc(Tab); // eslint-disable-line global-require
}

var TabWrapper = TabDoc || Tab;
exports.Tab = TabWrapper;