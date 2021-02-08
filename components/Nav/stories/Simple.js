"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var items = [{
  label: 'Item A',
  href: '#'
}, {
  label: 'Item B',
  href: '#'
}, {
  label: 'Item C',
  href: '#'
}, {
  label: 'Item D',
  href: '#'
}];

var SimpleNav = function SimpleNav() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    pad: "large"
  }, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  })));
};

var Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(SimpleNav, null);
};

exports.Simple = Simple;
var _default = {
  title: 'Controls/Nav/Simple'
};
exports["default"] = _default;