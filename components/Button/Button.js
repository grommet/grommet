"use strict";

exports.__esModule = true;
exports.Button = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _StyledButton = require("./StyledButton");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Button = function Button(_ref) {
  var a11yTitle = _ref.a11yTitle,
      color = _ref.color,
      forwardRef = _ref.forwardRef,
      children = _ref.children,
      disabled = _ref.disabled,
      icon = _ref.icon,
      gap = _ref.gap,
      fill = _ref.fill,
      focus = _ref.focus,
      href = _ref.href,
      label = _ref.label,
      onClick = _ref.onClick,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      plain = _ref.plain,
      primary = _ref.primary,
      reverse = _ref.reverse,
      theme = _ref.theme,
      type = _ref.type,
      as = _ref.as,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "color", "forwardRef", "children", "disabled", "icon", "gap", "fill", "focus", "href", "label", "onClick", "onMouseOut", "onMouseOver", "plain", "primary", "reverse", "theme", "type", "as"]);

  if ((icon || label) && children) {
    console.warn('Button should not have children if icon or label is provided');
  }

  var isDarkBackground = function isDarkBackground() {
    var backgroundColor = (0, _utils.normalizeBackground)((0, _utils.normalizeColor)(color || theme.button.primary.color || theme.global.colors.control || 'brand', theme), theme);
    return (0, _utils.colorIsDark)(backgroundColor, theme);
  };

  var _useState = (0, _react.useState)(false),
      hover = _useState[0],
      setHover = _useState[1];

  var onMouseOverButton = function onMouseOverButton(event) {
    setHover(true);

    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  var onMouseOutButton = function onMouseOutButton(event) {
    setHover(false);

    if (onMouseOut) {
      onMouseOut(event);
    }
  };

  var buttonIcon = icon; // only change color if user did not specify the color themselves...

  if (primary && icon && !icon.props.color) {
    buttonIcon = (0, _react.cloneElement)(icon, {
      color: theme.global.colors.text[isDarkBackground() ? 'dark' : 'light']
    });
  }

  var domTag = !as && href ? 'a' : as;
  var first = reverse ? label : buttonIcon;
  var second = reverse ? buttonIcon : label;
  var contents;

  if (first && second) {
    contents = _react["default"].createElement(_Box.Box, {
      direction: "row",
      align: "center",
      justify: "center",
      gap: gap
    }, first, second);
  } else if (typeof children === 'function') {
    contents = children({
      hover: hover,
      focus: focus
    });
  } else {
    contents = first || second || children;
  } // the key events are covered by withFocus()

  /* eslint-disable jsx-a11y/mouse-events-have-key-events */


  return _react["default"].createElement(_StyledButton.StyledButton, _extends({}, rest, {
    as: domTag,
    ref: forwardRef,
    "aria-label": a11yTitle,
    colorValue: color,
    disabled: disabled,
    hasIcon: !!icon,
    gap: gap,
    hasLabel: !!label,
    fillContainer: fill,
    focus: focus,
    href: href,
    onClick: onClick,
    onMouseOver: onMouseOverButton,
    onMouseOut: onMouseOutButton,
    pad: !plain,
    plain: typeof plain !== 'undefined' ? plain : _react.Children.count(children) > 0 || icon && !label,
    primary: primary,
    type: !href ? type : undefined
  }), contents);
};

Button.defaultProps = {
  type: 'button',
  focusIndicator: true,
  gap: 'small'
};
Object.setPrototypeOf(Button.defaultProps, _defaultProps.defaultProps);
var ButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ButtonDoc = require('./doc').doc(Button);
}

var ButtonWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _styledComponents.withTheme, _hocs.withForwardRef)(ButtonDoc || Button);
exports.Button = ButtonWrapper;