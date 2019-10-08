"use strict";

exports.__esModule = true;
exports.Anchor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _StyledAnchor = require("./StyledAnchor");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Anchor = function Anchor(_ref) {
  var a11yTitle = _ref.a11yTitle,
      children = _ref.children,
      color = _ref.color,
      disabled = _ref.disabled,
      forwardRef = _ref.forwardRef,
      href = _ref.href,
      icon = _ref.icon,
      focus = _ref.focus,
      label = _ref.label,
      onClick = _ref.onClick,
      reverse = _ref.reverse,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "children", "color", "disabled", "forwardRef", "href", "icon", "focus", "label", "onClick", "reverse", "theme"]);

  (0, _react.useEffect)(function () {
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }, [children, icon, label]);
  var coloredIcon = icon;

  if (icon && !icon.props.color) {
    coloredIcon = (0, _react.cloneElement)(icon, {
      color: (0, _utils.normalizeColor)(color || theme.anchor.color, theme)
    });
  }

  var first = reverse ? label : coloredIcon;
  var second = reverse ? coloredIcon : label;
  return _react["default"].createElement(_StyledAnchor.StyledAnchor, _extends({}, rest, {
    ref: forwardRef,
    "aria-label": a11yTitle,
    colorProp: color,
    disabled: disabled,
    hasIcon: !!icon,
    focus: focus,
    hasLabel: label,
    reverse: reverse,
    href: !disabled ? href : undefined,
    onClick: !disabled ? onClick : undefined
  }), first && second ? _react["default"].createElement(_Box.Box, {
    as: "span",
    direction: "row",
    align: "center",
    gap: "small",
    style: {
      display: 'inline-flex'
    }
  }, first, second) : first || second || children);
};

Anchor.defaultProps = {};
Object.setPrototypeOf(Anchor.defaultProps, _defaultProps.defaultProps);
var AnchorDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AnchorDoc = require('./doc').doc(Anchor);
}

var AnchorWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _styledComponents.withTheme, _hocs.withForwardRef)(AnchorDoc || Anchor);
exports.Anchor = AnchorWrapper;