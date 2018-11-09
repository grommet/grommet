"use strict";

exports.__esModule = true;
exports.CheckBox = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _object = require("../../utils/object");

var _StyledCheckBox = require("./StyledCheckBox");

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckBox, _Component);

  function CheckBox() {
    return _Component.apply(this, arguments) || this;
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
        rest = _objectWithoutPropertiesLoose(_this$props, ["checked", "disabled", "focus", "forwardRef", "id", "label", "name", "onChange", "reverse", "theme", "toggle"]);

    var hidden;

    if (disabled && checked) {
      hidden = _react.default.createElement("input", {
        name: name,
        type: "hidden",
        value: "true"
      });
    }

    var Icon = theme.checkBox.icons.checked;
    var borderColor = (0, _utils.normalizeColor)(theme.checkBox.border.color, theme);

    if (checked) {
      borderColor = (0, _utils.normalizeColor)(theme.checkBox.color || 'control', theme);
    }

    var visual = toggle ? _react.default.createElement(_StyledCheckBox.StyledCheckBoxToggle, {
      focus: focus,
      theme: theme,
      checked: checked
    }, _react.default.createElement(_StyledCheckBox.StyledCheckBoxKnob, {
      theme: theme
    })) : _react.default.createElement(_StyledCheckBox.StyledCheckBoxBox, {
      as: _Box.Box,
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
    }, checked && (Icon ? _react.default.createElement(Icon, {
      as: _StyledCheckBox.StyledCheckBoxIcon,
      theme: theme
    }) : _react.default.createElement(_StyledCheckBox.StyledCheckBoxIcon, {
      viewBox: "0 0 24 24",
      preserveAspectRatio: "xMidYMid meet",
      theme: theme
    }, _react.default.createElement("path", {
      fill: "none",
      d: "M6,11.3 L10.3,16 L18,6.2"
    }))));

    var checkBoxNode = _react.default.createElement(_StyledCheckBox.StyledCheckBox, {
      as: _Box.Box,
      align: "center",
      justify: "center",
      theme: theme
    }, _react.default.createElement(_StyledCheckBox.StyledCheckBoxInput, _extends({}, rest, {
      ref: forwardRef,
      type: "checkbox"
    }, (0, _object.removeUndefined)({
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

    var normalizedLabel = typeof label === 'string' ? _react.default.createElement("span", null, label) : label;
    var first = reverse ? normalizedLabel : checkBoxNode;
    var second = reverse ? checkBoxNode : normalizedLabel;
    return _react.default.createElement(_StyledCheckBox.StyledCheckBoxContainer, _extends({
      direction: "row",
      align: "center",
      tag: "label",
      as: _Box.Box,
      reverse: reverse
    }, (0, _object.removeUndefined)({
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
}(_react.Component);

var CheckBoxDoc;

if (process.env.NODE_ENV !== 'production') {
  CheckBoxDoc = require('./doc').doc(CheckBox); // eslint-disable-line global-require
}

var CheckBoxWrapper = (0, _recompose.compose)(_hocs.withFocus, _hocs.withTheme, _hocs.withForwardRef)(CheckBoxDoc || CheckBox);
exports.CheckBox = CheckBoxWrapper;