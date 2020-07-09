function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { defaultProps } from '../../default-props';
import { normalizeColor, removeUndefined } from '../../utils';
import { StyledRadioButton, StyledRadioButtonContainer, StyledRadioButtonIcon, StyledRadioButtonInput, StyledRadioButtonLabel, StyledRadioButtonBox } from './StyledRadioButton';
var RadioButton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      checked = _ref.checked,
      children = _ref.children,
      disabled = _ref.disabled,
      focus = _ref.focus,
      id = _ref.id,
      label = _ref.label,
      name = _ref.name,
      onChange = _ref.onChange,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "checked", "children", "disabled", "focus", "id", "label", "name", "onChange"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;

  var _useState = useState(),
      hover = _useState[0],
      setHover = _useState[1];

  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/React.createElement(StyledRadioButtonLabel, null, label) : label;
  var Icon = theme.radioButton.icons.circle;
  var borderColor = normalizeColor(theme.radioButton.border.color, theme);

  if (checked) {
    borderColor = normalizeColor(theme.radioButton.color || 'control', theme);
  }

  return /*#__PURE__*/React.createElement(StyledRadioButtonContainer, _extends({}, removeUndefined({
    htmlFor: id,
    disabled: disabled
  }), {
    onClick: function onClick(event) {
      // prevents clicking on the label trigging the event twice
      // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
      if (event.target.type !== 'radio') {
        event.stopPropagation();
      }
    },
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  }), /*#__PURE__*/React.createElement(StyledRadioButton, {
    as: Box,
    flex: false,
    margin: label ? {
      right: theme.radioButton.gap || 'small'
    } : undefined
  }, /*#__PURE__*/React.createElement(StyledRadioButtonInput, _extends({
    "aria-label": a11yTitle
  }, rest, {
    ref: ref,
    type: "radio"
  }, removeUndefined({
    id: id,
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }))), children ? children({
    checked: checked,
    hover: hover
  }) : /*#__PURE__*/React.createElement(StyledRadioButtonBox, {
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
  }, checked && (Icon ? /*#__PURE__*/React.createElement(Icon, {
    as: StyledRadioButtonIcon
  }) : /*#__PURE__*/React.createElement(StyledRadioButtonIcon, {
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 6
  }))))), normalizedLabel);
});
RadioButton.displayName = 'RadioButton';
var RadioButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RadioButtonDoc = require('./doc').doc(RadioButton);
}

var RadioButtonWrapper = RadioButtonDoc || RadioButton;
export { RadioButtonWrapper as RadioButton };