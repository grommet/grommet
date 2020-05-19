"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var objectOptions = [];

for (var i = 1; i <= 5; i += 1) {
  objectOptions.push({
    label: "option " + i,
    val: i
  });
}

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    labelKey: "label",
    valueKey: "val",
    options: objectOptions
  })));
};

(0, _react2.storiesOf)('CheckBoxGroup', module).add('Object options', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});