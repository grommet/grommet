"use strict";

exports.__esModule = true;
exports.RadioButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _utils = require("../../utils");
var _StyledRadioButton = require("./StyledRadioButton");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "checked", "children", "disabled", "focus", "focusIndicator", "id", "label", "name", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var RadioButton = exports.RadioButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$radioButton$ba;
  var a11yTitle = _ref.a11yTitle,
    checked = _ref.checked,
    children = _ref.children,
    disabled = _ref.disabled,
    focus = _ref.focus,
    focusIndicator = _ref.focusIndicator,
    id = _ref.id,
    label = _ref.label,
    name = _ref.name,
    onChange = _ref.onChange,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var _useState = (0, _react.useState)(),
    hover = _useState[0],
    setHover = _useState[1];
  var normalizedLabel = typeof label === 'string' ? /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonLabel, null, label) : label;
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
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  }), /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButton, {
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
    focus: focus && focusIndicator,
    hover: hover
  }) : /*#__PURE__*/_react["default"].createElement(_StyledRadioButton.StyledRadioButtonBox, {
    focus: focus && focusIndicator,
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
  }, checked && (Icon ? /*#__PURE__*/_react["default"].createElement(Icon, {
    theme: theme,
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
RadioButton.propTypes = _propTypes.RadioButtonPropTypes;