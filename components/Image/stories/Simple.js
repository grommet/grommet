"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
    src: "//v2.grommet.io/assets/IMG_4245.jpg"
  }));
};

(0, _react2.storiesOf)('Image', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(Simple, null);
});