"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Sizes = function Sizes() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "small",
    src: src
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "medium",
    src: src
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "large",
    src: src
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "xlarge",
    src: src
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    pad: "large",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    background: "dark-2",
    size: "small"
  }, "S"), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    background: "dark-2",
    size: "medium"
  }, "LS"), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    background: "dark-2",
    size: "large"
  }, "JF"), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    background: "dark-2",
    size: "xlarge"
  }, "SY")));
};

(0, _react2.storiesOf)('Avatar', module).add('Sizes', function () {
  return /*#__PURE__*/_react["default"].createElement(Sizes, null);
});