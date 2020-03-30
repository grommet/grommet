"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = {
  avatar: {
    size: {
      myLarge: '70px'
    },
    text: {
      fontWeight: 700,
      extend: "font-family: Comic Sans MS; font-size: 30px"
    },
    extend: "border: 2px solid white; \n            box-shadow: 2px 2px 15px 1px white;"
  }
};

var Themed = function Themed() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return _react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "center",
    direction: "row",
    gap: "small",
    pad: "large",
    background: "dark-2"
  }, _react["default"].createElement(_grommet.Avatar, {
    src: src,
    size: "myLarge"
  }), _react["default"].createElement(_grommet.Avatar, {
    size: "myLarge",
    background: "accent-4"
  }, _react["default"].createElement(_grommetIcons.Favorite, {
    color: "accent-2",
    size: "36px"
  })), _react["default"].createElement(_grommet.Avatar, {
    size: "myLarge",
    background: "dark-2"
  }, "R"), _react["default"].createElement(_grommet.Avatar, {
    size: "myLarge",
    background: "brand"
  }, "SY")));
};

(0, _react2.storiesOf)('Avatar', module).add('Themed', function () {
  return _react["default"].createElement(Themed, null);
});