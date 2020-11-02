"use strict";

exports.__esModule = true;
exports.OnHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var items = [{
  label: 'HTML',
  href: '#'
}, {
  label: 'JS',
  href: '#'
}, {
  label: 'CSS',
  href: '#'
}, {
  label: 'REACT',
  href: '#'
}];
var gravatarSrc = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

var OnHeaderNav = function OnHeaderNav() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Header, {
    background: "dark-1",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    src: gravatarSrc
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    color: "white",
    href: "https://github.com/ShimiSun"
  }, "ShimiSun")), /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    direction: "row"
  }, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  }))));
};

var OnHeader = function OnHeader() {
  return /*#__PURE__*/_react["default"].createElement(OnHeaderNav, null);
};

exports.OnHeader = OnHeader;
OnHeader.story = {
  name: 'On header'
};