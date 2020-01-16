"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StyledPlaceholder = function StyledPlaceholder() {
  return _react["default"].createElement(_grommet.Box, null, _react["default"].createElement(_grommet.Form, null, _react["default"].createElement(_grommet.TextInput, {
    name: "name",
    placeholder: _react["default"].createElement(_grommet.Text, null, "footer")
  })));
};

(0, _react2.storiesOf)('TextInput', module).add('StyledPlaceholder', function () {
  return _react["default"].createElement(StyledPlaceholder, null);
});