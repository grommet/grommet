"use strict";

exports.__esModule = true;
exports.CheckBox = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _object = require("../../utils/object");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _StyledCheckBox = require("./StyledCheckBox");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var stopLabelClick = function stopLabelClick(event) {
  // prevents clicking on the label trigging the event twice
  // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
  if (event.target.type !== 'checkbox') {
    event.stopPropagation();
  }
};

var CheckBox = function CheckBox(_ref) {
  var _ref2;

  var checked = _ref.checked,
      disabled = _ref.disabled,
      focus = _ref.focus,
      forwardRef = _ref.forwardRef,
      id = _ref.id,
      label = _ref.label,
      name = _ref.name,
      onChange = _ref.onChange,
      reverse = _ref.reverse,
      theme = _ref.theme,
      toggle = _ref.toggle,
      indeterminate = _ref.indeterminate,
      rest = _objectWithoutPropertiesLoose(_ref, ["checked", "disabled", "focus", "forwardRef", "id", "label", "name", "onChange", "reverse", "theme", "toggle", "indeterminate"]);

  (0, _react.useEffect)(function () {
    if (checked && indeterminate) {
      console.warn('Checkbox cannot be "checked" and "indeterminate" at the same time.');
    }

    if (toggle && indeterminate) {
      console.warn('Checkbox of type toggle does not have "indeterminate" state.');
    }
  }, [checked, toggle, indeterminate]);
  var themeableProps = {
    checked: checked,
    disabled: disabled,
    focus: focus,
    reverse: reverse,
    toggle: toggle,
    indeterminate: indeterminate
  };
  var hidden;

  if (disabled && checked) {
    hidden = _react["default"].createElement("input", {
      name: name,
      type: "hidden",
      value: "true"
    });
  }

  var _theme$checkBox$icons = theme.checkBox.icons,
      CheckedIcon = _theme$checkBox$icons.checked,
      IndeterminateIcon = _theme$checkBox$icons.indeterminate;
  var borderColor = (0, _utils.normalizeColor)(theme.checkBox.border.color, theme);

  if (checked) {
    borderColor = (0, _utils.normalizeColor)(theme.checkBox.color || 'control', theme);
  }

  var visual = toggle ? _react["default"].createElement(_StyledCheckBox.StyledCheckBoxToggle, themeableProps, _react["default"].createElement(_StyledCheckBox.StyledCheckBoxKnob, themeableProps)) : _react["default"].createElement(_StyledCheckBox.StyledCheckBoxBox, _extends({
    as: _Box.Box,
    align: "center",
    justify: "center",
    width: theme.checkBox.size,
    height: theme.checkBox.size,
    border: {
      size: theme.checkBox.border.width,
      color: borderColor
    },
    round: theme.checkBox.check.radius
  }, themeableProps), !indeterminate && checked && (CheckedIcon ? _react["default"].createElement(CheckedIcon, {
    theme: theme,
    as: _StyledCheckBox.StyledCheckBoxIcon
  }) : _react["default"].createElement(_StyledCheckBox.StyledCheckBoxIcon, _extends({
    theme: theme,
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, themeableProps), _react["default"].createElement("path", {
    fill: "none",
    d: "M6,11.3 L10.3,16 L18,6.2"
  }))), !checked && indeterminate && (IndeterminateIcon ? _react["default"].createElement(IndeterminateIcon, {
    theme: theme,
    as: _StyledCheckBox.StyledCheckBoxIcon
  }) : _react["default"].createElement(_StyledCheckBox.StyledCheckBoxIcon, _extends({
    theme: theme,
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, themeableProps), _react["default"].createElement("path", {
    fill: "none",
    d: "M6,12 L18,12"
  }))));
  var side = reverse ? 'left' : 'right';

  var checkBoxNode = _react["default"].createElement(_StyledCheckBox.StyledCheckBox, _extends({
    as: _Box.Box,
    align: "center",
    justify: "center",
    margin: label && (_ref2 = {}, _ref2[side] = theme.checkBox.gap || 'small', _ref2)
  }, themeableProps), _react["default"].createElement(_StyledCheckBox.StyledCheckBoxInput, _extends({}, rest, {
    ref: forwardRef,
    type: "checkbox"
  }, (0, _object.removeUndefined)({
    id: id,
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }), themeableProps)), visual, hidden);

  var normalizedLabel = typeof label === 'string' ? _react["default"].createElement("span", null, label) : label;
  var first = reverse ? normalizedLabel : checkBoxNode;
  var second = reverse ? checkBoxNode : normalizedLabel;
  return _react["default"].createElement(_StyledCheckBox.StyledCheckBoxContainer, _extends({
    reverse: reverse
  }, (0, _object.removeUndefined)({
    htmlFor: id,
    disabled: disabled
  }), {
    checked: checked,
    onClick: stopLabelClick
  }, themeableProps), first, second);
};

CheckBox.defaultProps = {};
Object.setPrototypeOf(CheckBox.defaultProps, _defaultProps.defaultProps);
var CheckBoxDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CheckBoxDoc = require('./doc').doc(CheckBox);
}

var CheckBoxWrapper = (0, _recompose.compose)((0, _hocs.withFocus)(), _styledComponents.withTheme, _hocs.withForwardRef)(CheckBoxDoc || CheckBox);
exports.CheckBox = CheckBoxWrapper;