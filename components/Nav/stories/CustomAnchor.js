"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomAnchor = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var navItems = [{
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
var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  anchor: {
    textDecoration: 'none',
    fontWeight: 500,
    color: {
      dark: 'white',
      light: 'neutral-2'
    },
    hover: {
      textDecoration: 'none',
      fontWeight: 700
    }
  }
});

var CustomAnchorNav = function CustomAnchorNav() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "dark-1",
    pad: "large",
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
    width: "small",
    margin: {
      right: 'large'
    }
  }, navItems.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      href: item.href,
      label: item.label,
      key: item.label
    });
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Main, null, "Place main content here"))));
};

var CustomAnchor = function CustomAnchor() {
  return /*#__PURE__*/_react["default"].createElement(CustomAnchorNav, null);
};

exports.CustomAnchor = CustomAnchor;
CustomAnchor.storyName = 'Custom anchor';
var _default = {
  title: 'Controls/Nav/Custom anchor'
};
exports["default"] = _default;