function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { Box } from '../Box';
import { withFocus, withForwardRef, withTheme } from '../hocs';
import { removeUndefined } from '../../utils/object';
import { StyledCheckBox, StyledCheckBoxBox, StyledCheckBoxIcon, StyledCheckBoxContainer, StyledCheckBoxInput, StyledCheckBoxToggle, StyledCheckBoxKnob } from './StyledCheckBox';
import { normalizeColor } from '../../utils';

var CheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckBox, _Component);

  function CheckBox(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    var checked = props.checked,
        indeterminate = props.indeterminate,
        toggle = props.toggle;

    if (checked && indeterminate) {
      console.warn('Checkbox cannot be "checked" and "indeterminate" at the same time.');
    }

    if (toggle && indeterminate) {
      console.warn('Checkbox of type toggle does not have "indeterminate" state.');
    }

    return _this;
  }

  var _proto = CheckBox.prototype;

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
        reverse = _this$props.reverse,
        theme = _this$props.theme,
        toggle = _this$props.toggle,
        indeterminate = _this$props.indeterminate,
        rest = _objectWithoutPropertiesLoose(_this$props, ["checked", "disabled", "focus", "forwardRef", "id", "label", "name", "onChange", "reverse", "theme", "toggle", "indeterminate"]);

    var hidden;

    if (disabled && checked) {
      hidden = React.createElement("input", {
        name: name,
        type: "hidden",
        value: "true"
      });
    }

    var _theme$checkBox$icons = theme.checkBox.icons,
        CheckedIcon = _theme$checkBox$icons.checked,
        IndeterminateIcon = _theme$checkBox$icons.indeterminate;
    var borderColor = normalizeColor(theme.checkBox.border.color, theme);

    if (checked) {
      borderColor = normalizeColor(theme.checkBox.color || 'control', theme);
    }

    var visual = toggle ? React.createElement(StyledCheckBoxToggle, {
      focus: focus,
      theme: theme,
      checked: checked
    }, React.createElement(StyledCheckBoxKnob, {
      theme: theme
    })) : React.createElement(StyledCheckBoxBox, {
      as: Box,
      align: "center",
      justify: "center",
      width: theme.checkBox.size,
      height: theme.checkBox.size,
      border: {
        size: theme.checkBox.border.width,
        color: borderColor
      },
      round: theme.checkBox.check.radius,
      focus: focus,
      theme: theme,
      checked: checked
    }, !indeterminate && checked && (CheckedIcon ? React.createElement(CheckedIcon, {
      as: StyledCheckBoxIcon,
      theme: theme
    }) : React.createElement(StyledCheckBoxIcon, {
      viewBox: "0 0 24 24",
      preserveAspectRatio: "xMidYMid meet",
      theme: theme
    }, React.createElement("path", {
      fill: "none",
      d: "M6,11.3 L10.3,16 L18,6.2"
    }))), !checked && indeterminate && (IndeterminateIcon ? React.createElement(IndeterminateIcon, {
      as: StyledCheckBoxIcon,
      theme: theme
    }) : React.createElement(StyledCheckBoxIcon, {
      viewBox: "0 0 24 24",
      preserveAspectRatio: "xMidYMid meet",
      theme: theme
    }, React.createElement("path", {
      fill: "none",
      d: "M6,12 L18,12"
    }))));
    var checkBoxNode = React.createElement(StyledCheckBox, {
      as: Box,
      align: "center",
      justify: "center",
      theme: theme
    }, React.createElement(StyledCheckBoxInput, _extends({}, rest, {
      ref: forwardRef,
      type: "checkbox"
    }, removeUndefined({
      id: id,
      name: name,
      checked: checked,
      disabled: disabled,
      onChange: onChange
    }), {
      theme: theme,
      checked: checked,
      disabled: disabled
    })), visual, hidden);
    var normalizedLabel = typeof label === 'string' ? React.createElement("span", null, label) : label;
    var first = reverse ? normalizedLabel : checkBoxNode;
    var second = reverse ? checkBoxNode : normalizedLabel;
    return React.createElement(StyledCheckBoxContainer, _extends({
      direction: "row",
      align: "center",
      as: function as(props) {
        return React.createElement(Box, _extends({
          as: "label"
        }, props));
      },
      reverse: reverse
    }, removeUndefined({
      htmlFor: id,
      disabled: disabled
    }), {
      theme: theme,
      gap: theme.checkBox.gap || 'small',
      checked: checked,
      onClick: function onClick(event) {
        // prevents clicking on the label trigging the event twice
        // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
        if (event.target.type !== 'checkbox') {
          event.stopPropagation();
        }
      }
    }), first, second);
  };

  return CheckBox;
}(Component);

var CheckBoxDoc;

if (process.env.NODE_ENV !== 'production') {
  CheckBoxDoc = require('./doc').doc(CheckBox); // eslint-disable-line global-require
}

var CheckBoxWrapper = compose(withFocus, withTheme, withForwardRef)(CheckBoxDoc || CheckBox);
export { CheckBoxWrapper as CheckBox };