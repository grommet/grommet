var _excluded = ["a11yTitle", "checked", "children", "disabled", "focus", "focusIndicator", "id", "label", "name", "onChange"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useState } from 'react';
import { normalizeColor, removeUndefined, useKeyboard } from '../../utils';
import { StyledRadioButton, StyledRadioButtonContainer, StyledRadioButtonIcon, StyledRadioButtonInput, StyledRadioButtonLabel, StyledRadioButtonBox } from './StyledRadioButton';
import { RadioButtonPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var RadioButton = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _theme$radioButton$ba;
  var a11yTitle = _ref.a11yTitle,
    checked = _ref.checked,
    children = _ref.children,
    disabled = _ref.disabled,
    focusProp = _ref.focus,
    _ref$focusIndicator = _ref.focusIndicator,
    focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
    id = _ref.id,
    label = _ref.label,
    name = _ref.name,
    onChange = _ref.onChange,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = useState(),
    hover = _useState[0],
    setHover = _useState[1];
  var _useState2 = useState(focusProp),
    focus = _useState2[0],
    setFocus = _useState2[1];
  var usingKeyboard = useKeyboard();
  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/React.createElement(StyledRadioButtonLabel, passThemeFlag, label) : label;
  var Icon = theme.radioButton.icons.circle;
  var borderColor = normalizeColor(theme.radioButton.border.color, theme);
  var backgroundColor = normalizeColor((_theme$radioButton$ba = theme.radioButton.background) == null ? void 0 : _theme$radioButton$ba.color, theme);
  if (checked) {
    var _theme$radioButton$ch;
    borderColor = normalizeColor(theme.radioButton.color || 'control', theme);
    if ((_theme$radioButton$ch = theme.radioButton.check) != null && (_theme$radioButton$ch = _theme$radioButton$ch.background) != null && _theme$radioButton$ch.color) {
      backgroundColor = normalizeColor(theme.radioButton.check.background.color, theme);
    }
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
    focus: focus,
    focusIndicator: focusIndicator,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    },
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledRadioButton, _extends({
    flex: false,
    margin: label ? {
      right: theme.radioButton.gap || 'small'
    } : undefined
  }, passThemeFlag), /*#__PURE__*/React.createElement(StyledRadioButtonInput, _extends({
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
    focus: focus && focusIndicator,
    hover: hover
  }) : /*#__PURE__*/React.createElement(StyledRadioButtonBox, _extends({
    focus: focus && focusIndicator && usingKeyboard,
    align: "center",
    justify: "center",
    width: theme.radioButton.size,
    height: theme.radioButton.size,
    border: {
      size: theme.radioButton.border.width,
      color: borderColor
    },
    backgroundColor: backgroundColor,
    round: theme.radioButton.check.radius
  }, passThemeFlag), checked && (Icon ? /*#__PURE__*/React.createElement(Icon, {
    theme: theme,
    as: StyledRadioButtonIcon
  }) : /*#__PURE__*/React.createElement(StyledRadioButtonIcon, _extends({
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, passThemeFlag), /*#__PURE__*/React.createElement("circle", {
    cx: 12,
    cy: 12,
    r: 6
  }))))), normalizedLabel);
});
RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = RadioButtonPropTypes;
export { RadioButton };