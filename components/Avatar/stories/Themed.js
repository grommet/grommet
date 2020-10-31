"use strict";

exports.__esModule = true;
exports.Themed = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var theme = {
  avatar: {
    size: {
      myLarge: '70px'
    },
    text: {
      size: {
        myLarge: '32px'
      },
      fontWeight: 700,
      extend: "font-family: Comic Sans MS;"
    },
    extend: "border: 2px solid white;\n            box-shadow: 2px 2px 15px 1px white;"
  }
};

var Themed = function Themed() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "center",
    direction: "row",
    gap: "small",
    pad: "large",
    background: "dark-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    src: src,
    size: "myLarge"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "myLarge",
    background: "accent-4"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Favorite, {
    color: "accent-2",
    size: "36px"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "myLarge",
    background: "dark-2"
  }, "R"), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "myLarge",
    background: "brand"
  }, "SY")));
};

exports.Themed = Themed;