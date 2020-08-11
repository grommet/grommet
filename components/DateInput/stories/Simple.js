"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Example = function Example() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    justify: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, value && new Date(value).toLocaleDateString()), /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    value: value,
    onChange: onChange
  })));
};

(0, _react2.storiesOf)('DateInput', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
}, {
  chromatic: {
    disable: true
  }
});