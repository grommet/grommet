"use strict";

exports.__esModule = true;
exports.CheckBox = void 0;
var _react = _interopRequireWildcard(require("react"));
var _object = require("../../utils/object");
var _FormContext = require("../Form/FormContext");
var _propTypes = require("./propTypes");
var _StyledCheckBox = require("./StyledCheckBox");
var _utils = require("../../utils");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "aria-label", "checked", "children", "containerProps", "defaultChecked", "disabled", "fill", "focus", "focusIndicator", "id", "label", "name", "onBlur", "onChange", "onFocus", "onMouseEnter", "onMouseLeave", "onMouseOut", "onMouseOver", "pad", "reverse", "toggle", "indeterminate"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var stopLabelClick = function stopLabelClick(event) {
  // prevents clicking on the label trigging the event twice
  // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
  if (event.target.type !== 'checkbox') {
    event.stopPropagation();
  }
};
var CheckBox = exports.CheckBox = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref2;
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    checkedProp = _ref.checked,
    children = _ref.children,
    containerProps = _ref.containerProps,
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: checkedProp,
      initialValue: defaultChecked
    }),
    checked = _formContext$useFormI[0],
    setChecked = _formContext$useFormI[1];
  var _useState = (0, _react.useState)(focusProp),
    focus = _useState[0],
    setFocus = _useState[1];
  (0, _react.useEffect)(function () {
    // don't allow checkbox to have focus when disabled
    if (disabled && focusProp) setFocus(false);else setFocus(focusProp);
  }, [disabled, focusProp]);
  (0, _react.useEffect)(function () {
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
    hidden = /*#__PURE__*/_react["default"].createElement("input", {
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
  var visual = toggle ? /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxToggle, _extends({}, passThemeFlag, themeableProps), /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxKnob, _extends({}, passThemeFlag, themeableProps))) : /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxBox, _extends({
    align: "center",
    justify: "center",
    width: theme.checkBox.size,
    height: theme.checkBox.size,
    border: {
      size: theme.checkBox.border.width,
      color: borderColor
    },
    round: theme.checkBox.check.radius
  }, passThemeFlag, themeableProps), !indeterminate && checked && (CheckedIcon ? /*#__PURE__*/_react["default"].createElement(CheckedIcon, {
    theme: theme,
    as: _StyledCheckBox.StyledCheckBoxIcon
  }) : /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxIcon, _extends({
    theme: theme,
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, themeableProps), /*#__PURE__*/_react["default"].createElement("path", {
    fill: "none",
    d: "M6,11.3 L10.3,16 L18,6.2"
  }))), !checked && indeterminate && (IndeterminateIcon ? /*#__PURE__*/_react["default"].createElement(IndeterminateIcon, {
    theme: theme,
    as: _StyledCheckBox.StyledCheckBoxIcon
  }) : /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxIcon, _extends({
    theme: theme,
    viewBox: "0 0 24 24",
    preserveAspectRatio: "xMidYMid meet"
  }, themeableProps), /*#__PURE__*/_react["default"].createElement("path", {
    fill: "none",
    d: "M6,12 L18,12"
  }))));
  var side = !reverse !== !theme.dir ? 'left' : 'right';
  var checkBoxNode = /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBox, _extends({
    align: "center",
    justify: "center",
    margin: label && (_ref2 = {}, _ref2[side] = theme.checkBox.gap, _ref2)
  }, themeableProps), /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxInput, _extends({
    "aria-label": ariaLabel || a11yTitle
  }, passThemeFlag, rest, {
    ref: ref,
    type: "checkbox"
  }, (0, _object.removeUndefined)({
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
  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/_react["default"].createElement("span", null, label) : label;
  var first = reverse ? normalizedLabel : checkBoxNode;
  var second = reverse ? checkBoxNode : normalizedLabel;
  return /*#__PURE__*/_react["default"].createElement(_StyledCheckBox.StyledCheckBoxContainer, _extends({
    fillProp: fill,
    reverse: reverse
  }, (0, _object.removeUndefined)({
    htmlFor: id,
    disabled: disabled
  }), {
    checked: checked,
    labelProp: label,
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
  }, passThemeFlag, themeableProps, containerProps), first, second);
});
CheckBox.displayName = 'CheckBox';
CheckBox.propTypes = _propTypes.CheckBoxPropTypes;