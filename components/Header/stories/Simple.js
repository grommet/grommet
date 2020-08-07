"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gravatarLink = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Header, {
    background: "light-4",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    src: gravatarLink
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "Home",
    href: "#"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "Profile",
    href: "#"
  }))));
};

(0, _react2.storiesOf)('Header', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(Simple, null);
});