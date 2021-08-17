var _excluded = ["a11yTitle", "aria-label", "checked", "children", "defaultChecked", "disabled", "fill", "focus", "focusIndicator", "id", "label", "name", "onBlur", "onChange", "onFocus", "onMouseEnter", "onMouseLeave", "onMouseOut", "onMouseOver", "pad", "reverse", "toggle", "indeterminate"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { removeUndefined } from '../../utils/object';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { FormContext } from '../Form/FormContext';
import { CheckBoxPropTypes } from './propTypes';
import { StyledCheckBox, StyledCheckBoxBox, StyledCheckBoxIcon, StyledCheckBoxContainer, StyledCheckBoxInput, StyledCheckBoxToggle, StyledCheckBoxKnob } from './StyledCheckBox';
import { normalizeColor } from '../../utils';

var stopLabelClick = function stopLabelClick(event) {
  // prevents clicking on the label trigging the event twice
  // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
  if (event.target.type !== 'checkbox') {
    event.stopPropagation();
  }
};

var CheckBox = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref2;

  var a11yTitle = _ref.a11yTitle,
      ariaLabel = _ref['aria-label'],
      checkedProp = _ref.checked,
      children = _ref.children,
      _ref$defaultChecked = _ref.defaultChecked,
      defaultChecked = _ref$defaultChecked === void 0 ? false : _ref$defaultChecked,
      disabled = _ref.disabled,
      fill = _ref.fill,
      focusProp = _ref.focus,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      id = _ref.id,
      label = _ref.label,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      _onMouseEnter = _ref.onMouseEnter,
      _onMouseLeave = _ref.onMouseLeave,
      _onMouseOut = _ref.onMouseOut,
      _onMouseOver = _ref.onMouseOver,
      pad = _ref.pad,
      reverse = _ref.reverse,
      toggle = _ref.toggle,
      indeterminate = _ref.indeterminate,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var formContext = useContext(FormContext);

  var _formContext$useFormI = formContext.useFormInput(name, checkedProp, defaultChecked),
      checked = _formContext$useFormI[0],
      setChecked = _formContext$useFormI[1];

  var _useState = useState(focusProp),
      focus = _useState[0],
      setFocus = _useState[1];

  useEffect(function () {
    return setFocus(focusProp);
  }, [focusProp]);
  useEffect(function () {
    if (checkedProp && indeterminate) {
      console.warn('Checkbox cannot be "checked" and "indeterminate" at the same time.');
    }

    if (toggle && indeterminate) {
      console.warn('Checkbox of type toggle does not have "indeterminate" state.');
    }
  }, [checkedProp, toggle, indeterminate]);
  var themeableProps = {
    checked: checked,
    disabled: disabled,
    focus: focus,
    // when contained in a FormField, focusIndicator = false,
    // so that the FormField has focus style. However, we still
    // need to visually indicate when a CheckBox is active.
    // If focus = true but focusIndicator = false,
    // we will apply the hover treament.
    focusIndicator: focusIndicator,
    reverse: reverse,
    toggle: toggle,
    indeterminate: indeterminate
  };
  var hidden;

  if (disabled && checked) {
    hidden = /*#__PURE__*/React.createElement("input", {
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

  var visual = toggle ? /*#__PURE__*/React.createElement(StyledCheckBoxToggle, themeableProps, /*#__PURE__*/React.createElement(StyledCheckBoxKnob, themeableProps)) : /*#__PURE__*/React.createElement(StyledCheckBoxBox, _extends({
    as: Box,
    align: "center",
    justify: "center",
    width: theme.checkBox.size,
    height: theme.checkBox.size,
    border: {
      size: theme.checkBox.border.width,
      color: borderColor
    },
    round: theme.checkBox.check.radius
  }, themeableProps), !indeterminate && checked && (CheckedIcon ? /*#__PURE__*/React.createElement(CheckedIcon, {
    theme: theme,
    as: StyledCheckBoxIcon
  }) : /*#__PURE__*/React.createElement(StyledCheckBoxIcon, _extends({
    theme: theme,
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, themeableProps), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M6,11.3 L10.3,16 L18,6.2"
  }))), !checked && indeterminate && (IndeterminateIcon ? /*#__PURE__*/React.createElement(IndeterminateIcon, {
    theme: theme,
    as: StyledCheckBoxIcon
  }) : /*#__PURE__*/React.createElement(StyledCheckBoxIcon, _extends({
    theme: theme,
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, themeableProps), /*#__PURE__*/React.createElement("path", {
    fill: "none",
    d: "M6,12 L18,12"
  }))));
  var side = reverse ? 'left' : 'right';
  var checkBoxNode = /*#__PURE__*/React.createElement(StyledCheckBox, _extends({
    as: Box,
    align: "center",
    justify: "center",
    margin: label && (_ref2 = {}, _ref2[side] = theme.checkBox.gap || 'small', _ref2)
  }, themeableProps), /*#__PURE__*/React.createElement(StyledCheckBoxInput, _extends({}, rest, {
    ref: ref,
    type: "checkbox"
  }, removeUndefined({
    id: id,
    name: name,
    checked: checked,
    disabled: disabled
  }), themeableProps, {
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    onChange: function onChange(event) {
      setChecked(event.target.checked);
      if (_onChange) _onChange(event);
    }
  })), children ? children({
    checked: checked,
    indeterminate: indeterminate
  }) : visual, hidden);
  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/React.createElement("span", null, label) : label;
  var first = reverse ? normalizedLabel : checkBoxNode;
  var second = reverse ? checkBoxNode : normalizedLabel;
  return /*#__PURE__*/React.createElement(StyledCheckBoxContainer, _extends({
    "aria-label": ariaLabel || a11yTitle,
    fillProp: fill,
    reverse: reverse
  }, removeUndefined({
    htmlFor: id,
    disabled: disabled
  }), {
    checked: checked,
    onClick: stopLabelClick,
    pad: pad,
    onMouseEnter: function onMouseEnter(event) {
      return _onMouseEnter == null ? void 0 : _onMouseEnter(event);
    },
    onMouseOver: function onMouseOver(event) {
      return _onMouseOver == null ? void 0 : _onMouseOver(event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return _onMouseLeave == null ? void 0 : _onMouseLeave(event);
    },
    onMouseOut: function onMouseOut(event) {
      return _onMouseOut == null ? void 0 : _onMouseOut(event);
    }
  }, themeableProps), first, second);
});
CheckBox.displayName = 'CheckBox';
CheckBox.propTypes = CheckBoxPropTypes;
export { CheckBox };