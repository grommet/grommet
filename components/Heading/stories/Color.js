"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Color = function Color() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    color: "accent-1"
  }, "Colored Heading"));
};

(0, _react2.storiesOf)('Heading', module).add('Color', function () {
  return /*#__PURE__*/_react["default"].createElement(Color, null);
});