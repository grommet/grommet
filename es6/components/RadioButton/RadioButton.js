function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor, removeUndefined } from '../../utils';
import { Box } from '../Box';
import { withForwardRef } from '../hocs';
import { StyledRadioButton, StyledRadioButtonContainer, StyledRadioButtonIcon, StyledRadioButtonInput, StyledRadioButtonBox } from './StyledRadioButton';

var RadioButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RadioButton, _Component);

  function RadioButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RadioButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        checked = _this$props.checked,
        disabled = _this$props.disabled,
        focus = _this$props.focus,
        forwardRef = _this$props.forwardRef,
        id = _this$props.id,
        label = _this$props.label,
        name = _this$props.name,
        onChange = _this$props.onChange,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["checked", "disabled", "focus", "forwardRef", "id", "label", "name", "onChange", "theme"]);

    var normalizedLabel = typeof label === 'string' ? React.createElement("span", null, label) : label;
    var Icon = theme.radioButton.icons.circle;
    var borderColor = normalizeColor(theme.radioButton.border.color, theme);

    if (checked) {
      borderColor = normalizeColor(theme.radioButton.color || 'control', theme);
    }

    return React.createElement(StyledRadioButtonContainer, _extends({
      as: function as(props) {
        return React.createElement(Box, _extends({
          as: "label"
        }, props));
      },
      direction: "row",
      align: "center"
    }, removeUndefined({
      htmlFor: id,
      disabled: disabled
    }), {
      onClick: function onClick(event) {
        // prevents clicking on the label trigging the event twice
        // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
        if (event.target.type !== 'radio') {
          event.stopPropagation();
        }
      }
    }), React.createElement(StyledRadioButton, {
      as: Box,
      margin: {
        right: theme.radioButton.gap || 'small'
      }
    }, React.createElement(StyledRadioButtonInput, _extends({}, rest, {
      ref: forwardRef,
      type: "radio"
    }, removeUndefined({
      id: id,
      name: name,
      checked: checked,
      disabled: disabled,
      onChange: onChange
    }))), React.createElement(StyledRadioButtonBox, {
      focus: focus,
      as: Box,
      align: "center",
      justify: "center",
      width: theme.radioButton.size,
      height: theme.radioButton.size,
      border: {
        size: theme.radioButton.border.width,
        color: borderColor
      },
      round: theme.radioButton.check.radius
    }, checked && (Icon ? React.createElement(Icon, {
      as: StyledRadioButtonIcon
    }) : React.createElement(StyledRadioButtonIcon, {
      viewBox: "0 0 24 24",
      preserveAspectRatio: "xMidYMid meet"
    }, React.createElement("circle", {
      cx: 12,
      cy: 12,
      r: 6
    }))))), normalizedLabel);
  };

  return RadioButton;
}(Component);

RadioButton.defaultProps = {};
Object.setPrototypeOf(RadioButton.defaultProps, defaultProps);
var RadioButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  RadioButtonDoc = require('./doc').doc(RadioButton); // eslint-disable-line global-require
}

var RadioButtonWrapper = compose(withTheme, withForwardRef)(RadioButtonDoc || RadioButton);
export { RadioButtonWrapper as RadioButton };