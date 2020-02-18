"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleRangeInput = function SimpleRangeInput() {
  var _React$useState = _react["default"].useState(5),
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
  }, _react["default"].createElement(_grommet.RangeInput, {
    value: value,
    onChange: onChange
  })));
};

(0, _react2.storiesOf)('RangeInput', module).add('Simple', function () {
  return _react["default"].createElement(SimpleRangeInput, null);
});