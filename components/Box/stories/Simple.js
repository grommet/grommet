"use strict";

exports.__esModule = true;
exports["default"] = exports.SimpleBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleBox = function SimpleBox() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "dark-2",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center",
    background: {
      color: 'light-2',
      opacity: 'strong'
    },
    round: true,
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "large"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Party"), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "",
    label: "Link"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center",
    background: "dark-3",
    round: true,
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "large",
    color: "light-2"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Travel"), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "",
    label: "Link"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  }))));
};

exports.SimpleBox = SimpleBox;
SimpleBox.storyName = 'Simple';
var _default = {
  title: 'Layout/Box/Simple'
};
exports["default"] = _default;