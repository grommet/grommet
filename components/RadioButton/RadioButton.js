"use strict";

exports.__esModule = true;
exports.RadioButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _StyledRadioButton = require("./StyledRadioButton");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "checked", "children", "disabled", "focus", "focusIndicator", "id", "label", "name", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RadioButton = exports.RadioButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = (0, _react.useState)(),
    hover = _useState[0],
    setHover = _useState[1];
  var _useState2 = (0, _react.useState)(focusProp),
    focus = _useState2[0],
    setFocus = _useState2[1];
  var usingKeyboard = (0, _utils.useKeyboard)();
  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonLabel, passThemeFlag, label) : label;
  var Icon = theme.radioButton.icons.circle;
  var borderColor = (0, _utils.normalizeColor)(theme.radioButton.border.color, theme);
  var backgroundColor = (0, _utils.normalizeColor)((_theme$radioButton$ba = theme.radioButton.background) == null ? void 0 : _theme$radioButton$ba.color, theme);
  if (checked) {
    var _theme$radioButton$ch;
    borderColor = (0, _utils.normalizeColor)(theme.radioButton.color || 'control', theme);
    if ((_theme$radioButton$ch = theme.radioButton.check) != null && (_theme$radioButton$ch = _theme$radioButton$ch.background) != null && _theme$radioButton$ch.color) {
      backgroundColor = (0, _utils.normalizeColor)(theme.radioButton.check.background.color, theme);
    }
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
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButton, _extends({
    flex: false,
    margin: label ? {
      right: theme.radioButton.gap || 'small'
    } : undefined
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonInput, _extends({
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
    focus: focus && focusIndicator,
    hover: hover
  }) : /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonBox, _extends({
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
  }, passThemeFlag), checked && (Icon ? /*#__PURE__*/_react["default"].createElement(Icon, {
    theme: theme,
    as: _StyledRadioButton.StyledRadioButtonIcon
  }) : /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonIcon, _extends({
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: 12,
    cy: 12,
    r: 6
  }))))), normalizedLabel);
});
RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = _propTypes.RadioButtonPropTypes;