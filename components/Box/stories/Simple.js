"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("../../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleBox = function SimpleBox() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "dark-2",
    gap: "medium"
  }, _react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center",
    background: {
      color: 'light-2',
      opacity: 'strong'
    },
    round: true,
    gap: "small"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "large"
  }), _react["default"].createElement(_grommet.Text, null, "Party"), _react["default"].createElement(_grommet.Anchor, {
    href: "",
    label: "Link"
  }), _react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  })), _react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center",
    background: "dark-3",
    round: true,
    gap: "small"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "large",
    color: "light-2"
  }), _react["default"].createElement(_grommet.Text, null, "Travel"), _react["default"].createElement(_grommet.Anchor, {
    href: "",
    label: "Link"
  }), _react["default"].createElement(_grommet.Button, {
    label: "Button",
    onClick: function onClick() {}
  }))));
};

(0, _react2.storiesOf)('Box', module).add('Simple', function () {
  return _react["default"].createElement(SimpleBox, null);
});