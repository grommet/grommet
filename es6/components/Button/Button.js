function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { cloneElement, Children, Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { colorIsDark, normalizeBackground, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { withFocus, withForwardRef } from '../hocs';
import { StyledButton } from './StyledButton';

var isDarkBackground = function isDarkBackground(props) {
  var backgroundColor = normalizeBackground(normalizeColor(props.color || props.theme.button.primary.color || props.theme.global.colors.control || 'brand', props.theme), props.theme);
  return colorIsDark(backgroundColor, props.theme);
};

var Button =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Button, _Component);

  function Button(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function (event) {
      var onMouseOver = _this.props.onMouseOver;

      _this.setState({
        hover: true
      });

      if (onMouseOver) {
        onMouseOver(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function (event) {
      var onMouseOut = _this.props.onMouseOut;

      _this.setState({
        hover: false
      });

      if (onMouseOut) {
        onMouseOut(event);
      }
    });

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
        gap = _this$props.gap,
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
        as = _this$props.as,
        rest = _objectWithoutPropertiesLoose(_this$props, ["a11yTitle", "color", "forwardRef", "children", "disabled", "icon", "gap", "fill", "focus", "href", "label", "onClick", "plain", "primary", "reverse", "theme", "type", "as"]);

    var hover = this.state.hover;
    var buttonIcon = icon; // only change color if user did not specify the color themselves...

    if (primary && icon && !icon.props.color) {
      buttonIcon = cloneElement(icon, {
        color: theme.global.colors.text[isDarkBackground(this.props) ? 'dark' : 'light']
      });
    }

    var domTag = !as && href ? 'a' : as;
    var first = reverse ? label : buttonIcon;
    var second = reverse ? buttonIcon : label;
    var contents;

    if (first && second) {
      contents = React.createElement(Box, {
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


    return React.createElement(StyledButton, _extends({}, rest, {
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
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      pad: !plain,
      plain: typeof plain !== 'undefined' ? plain : Children.count(children) > 0 || icon && !label,
      primary: primary,
      type: !href ? type : undefined
    }), contents);
  };

  return Button;
}(Component);

_defineProperty(Button, "defaultProps", {
  type: 'button',
  focusIndicator: true,
  gap: 'small'
});

Object.setPrototypeOf(Button.defaultProps, defaultProps);
var ButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  ButtonDoc = require('./doc').doc(Button); // eslint-disable-line global-require
}

var ButtonWrapper = compose(withFocus(), withTheme, withForwardRef)(ButtonDoc || Button);
export { ButtonWrapper as Button };