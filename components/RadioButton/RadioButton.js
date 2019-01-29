"use strict";

exports.__esModule = true;
exports.RadioButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _Box = require("../Box");

var _hocs = require("../hocs");

var _StyledRadioButton = require("./StyledRadioButton");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var RadioButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RadioButton, _Component);

  function RadioButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RadioButton.prototype;

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
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["checked", "disabled", "focus", "forwardRef", "id", "label", "name", "onChange", "theme"]);

    var normalizedLabel = typeof label === 'string' ? _react.default.createElement("span", null, label) : label;
    var Icon = theme.radioButton.icons.circle;
    var borderColor = (0, _utils.normalizeColor)(theme.radioButton.border.color, theme);

    if (checked) {
      borderColor = (0, _utils.normalizeColor)(theme.radioButton.color || 'control', theme);
    }

    return _react.default.createElement(_StyledRadioButton.StyledRadioButtonContainer, _extends({
      as: function as(props) {
        return _react.default.createElement(_Box.Box, _extends({
          as: "label"
        }, props));
      },
      direction: "row",
      align: "center"
    }, (0, _utils.removeUndefined)({
      htmlFor: id,
      disabled: disabled
    }), {
      onClick: function onClick(event) {
        // prevents clicking on the label trigging the event twice
        // https://stackoverflow.com/questions/24501497/why-the-onclick-element-will-trigger-twice-for-label-element
        if (event.target.type !== 'radio') {
          event.stopPropagation();
        }
      }
    }), _react.default.createElement(_StyledRadioButton.StyledRadioButton, {
      as: _Box.Box,
      margin: {
        right: theme.radioButton.gap || 'small'
      }
    }, _react.default.createElement(_StyledRadioButton.StyledRadioButtonInput, _extends({}, rest, {
      ref: forwardRef,
      type: "radio"
    }, (0, _utils.removeUndefined)({
      id: id,
      name: name,
      checked: checked,
      disabled: disabled,
      onChange: onChange
    }))), _react.default.createElement(_StyledRadioButton.StyledRadioButtonBox, {
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
    }, checked && (Icon ? _react.default.createElement(Icon, {
      as: _StyledRadioButton.StyledRadioButtonIcon
    }) : _react.default.createElement(_StyledRadioButton.StyledRadioButtonIcon, {
      viewBox: "0 0 24 24",
      preserveAspectRatio: "xMidYMid meet"
    }, _react.default.createElement("circle", {
      cx: 12,
      cy: 12,
      r: 6
    }))))), normalizedLabel);
  };

  return RadioButton;
}(_react.Component);

RadioButton.defaultProps = {};
Object.setPrototypeOf(RadioButton.defaultProps, _defaultProps.defaultProps);
var RadioButtonDoc;

if (process.env.NODE_ENV !== 'production') {
  RadioButtonDoc = require('./doc').doc(RadioButton); // eslint-disable-line global-require
}

var RadioButtonWrapper = (0, _recompose.compose)(_styledComponents.withTheme, _hocs.withForwardRef)(RadioButtonDoc || RadioButton);
exports.RadioButton = RadioButtonWrapper;