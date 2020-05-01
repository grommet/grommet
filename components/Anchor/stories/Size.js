"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Size = function Size() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: size,
      margin: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      size: size,
      label: size,
      href: "#"
    }));
  })));
};

(0, _react2.storiesOf)('Anchor', module).add('Size', function () {
  return /*#__PURE__*/_react["default"].createElement(Size, null);
});