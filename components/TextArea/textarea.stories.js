"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SimpleTextArea = function SimpleTextArea(props) {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.TextArea, _extends({
    value: value,
    onChange: onChange
  }, props))));
};

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  textArea: {
    extend: function extend() {
      return "\n      font-size: 40px;\n      color: red;\n    ";
    }
  }
});

var ThemedTextArea = function ThemedTextArea() {
  var _React$useState2 = _react["default"].useState(''),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react["default"].createElement(_grommet.Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, _react["default"].createElement(_grommet.TextArea, {
    value: value,
    onChange: onChange,
    fill: true
  })));
};

var FillTextArea = function FillTextArea() {
  var _React$useState3 = _react["default"].useState(''),
      value = _React$useState3[0],
      setValue = _React$useState3[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    width: "large",
    height: "medium",
    border: {
      color: 'brand',
      size: 'medium'
    }
  }, _react["default"].createElement(_grommet.TextArea, {
    value: value,
    onChange: onChange,
    fill: true
  })));
};

(0, _react2.storiesOf)('TextArea', module).add('Simple', function () {
  return _react["default"].createElement(SimpleTextArea, {
    resize: true
  });
}).add('Fill', function () {
  return _react["default"].createElement(FillTextArea, null);
}).add('Themed', function () {
  return _react["default"].createElement(ThemedTextArea, null);
}).add('Non resizable', function () {
  return _react["default"].createElement(SimpleTextArea, {
    resize: false
  });
});