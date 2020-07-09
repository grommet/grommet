"use strict";

exports.__esModule = true;
exports.RadioButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Box = require("../Box");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _StyledRadioButton = require("./StyledRadioButton");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var RadioButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(),
      hover = _useState[0],
      setHover = _useState[1];

  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonLabel, null, label) : label;
  var Icon = theme.radioButton.icons.circle;
  var borderColor = (0, _utils.normalizeColor)(theme.radioButton.border.color, theme);

  if (checked) {
    borderColor = (0, _utils.normalizeColor)(theme.radioButton.color || 'control', theme);
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonContainer, _extends({}, (0, _utils.removeUndefined)({
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
  }), /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButton, {
    as: _Box.Box,
    flex: false,
    margin: label ? {
      right: theme.radioButton.gap || 'small'
    } : undefined
  }, /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonInput, _extends({
    "aria-label": a11yTitle
  }, rest, {
    ref: ref,
    type: "radio"
  }, (0, _utils.removeUndefined)({
    id: id,
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }))), children ? children({
    checked: checked,
    hover: hover
  }) : /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonBox, {
    focus: focus,
    as: _Box.Box,
    align: "center",
    justify: "center",
    width: theme.radioButton.size,
    height: theme.radioButton.size,
    border: {
      size: theme.radioButton.border.width,
      color: borderColor
    },
    round: theme.radioButton.check.radius
  }, checked && (Icon ? /*#__PURE__*/_react["default"].createElement(Icon, {
    as: _StyledRadioButton.StyledRadioButtonIcon
  }) : /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonIcon, {
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
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
exports.RadioButton = RadioButtonWrapper;