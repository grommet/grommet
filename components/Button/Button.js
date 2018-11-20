"use strict";

exports.__esModule = true;
exports.Button = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _utils = require("../../utils");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _StyledButton = require("./StyledButton");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isDarkBackground = function isDarkBackground(props) {
  var backgroundColor = (0, _utils.normalizeBackground)((0, _utils.normalizeColor)(props.color || props.theme.button.primary.color || props.theme.global.colors.control || 'brand', props.theme), props.theme);
  return (0, _utils.colorIsDark)(backgroundColor, props.theme);
};

var Button =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Button, _Component);

  function Button(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var children = props.children,
        icon = props.icon,
        label = props.label;

    if ((icon || label) && children) {
      console.warn('Button should not have children if icon or label is provided');
    }

    return _this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        a11yTitle = _this$props.a11yTitle,
        color = _this$props.color,
        forwardRef = _this$props.forwardRef,
        children = _this$props.children,
        disabled = _this$props.disabled,
        icon = _this$props.icon,
        fill = _this$props.fill,
        focus = _this$props.focus,
        href = _this$props.href,
        label = _this$props.label,
        onClick = _this$props.onClick,
        plain = _this$props.plain,
        primary = _this$props.primary,
        reverse = _this$props.reverse,
        theme = _this$props.theme,
        type = _this$props.type,
        rest = _objectWithoutPropertiesLoose(_this$props, ["a11yTitle", "color", "forwardRef", "children", "disabled", "icon", "fill", "focus", "href", "label", "onClick", "plain", "primary", "reverse", "theme", "type"]);

    var buttonIcon = icon; // only change color if user did not specify the color themselves...

    if (primary && icon && !icon.props.color) {
      buttonIcon = (0, _react.cloneElement)(icon, {
        color: theme.global.colors.text[isDarkBackground(this.props) ? 'dark' : 'light']
      });
    }

    var first = reverse ? label : buttonIcon;
    var second = reverse ? buttonIcon : label;
    return _react.default.createElement(_StyledButton.StyledButton, _extends({}, rest, {
      as: href ? 'a' : undefined,
      ref: forwardRef,
      "aria-label": a11yTitle,
      colorValue: color,
      disabled: disabled,
      hasIcon: !!icon,
      hasLabel: !!label,
      fillContainer: fill,
      focus: focus,
      href: href,
      onClick: onClick,
      plain: typeof plain !== 'undefined' ? plain : _react.Children.count(children) > 0 || icon && !label,
      primary: primary,
      theme: theme,
      type: !href ? type : undefined
    }), first || second ? _react.default.createElement(_Box.Box, {
      direction: "row",
      align: "center",
      justify: "center",
      gap: "small"
    }, first, second) : children);
  };

  return Button;
}(_react.Component);

_defineProperty(Button, "defaultProps", {
  type: 'button',
  focusIndicator: true
});

var ButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  ButtonDoc = require('./doc').doc(Button); // eslint-disable-line global-require
}

var ButtonWrapper = (0, _recompose.compose)(_hocs.withFocus, _hocs.withTheme, _hocs.withForwardRef)(ButtonDoc || Button);
exports.Button = ButtonWrapper;