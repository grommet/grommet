"use strict";

exports.__esModule = true;
exports["default"] = exports.Responsive = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Responsive = function Responsive() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Header, {
    background: "light-4",
    pad: "medium",
    height: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "https://tools.grommet.io/",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
      color: "brand"
    }),
    label: "Grommet Tools"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.ResponsiveContext.Consumer, null, function (size) {
    return size === 'small' ? /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      justify: "end"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
      a11yTitle: "Navigation Menu",
      dropProps: {
        align: {
          top: 'bottom',
          right: 'right'
        }
      },
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Menu, {
        color: "brand"
      }),
      items: [{
        label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          pad: "small"
        }, "Grommet.io"),
        href: 'https://v2.grommet.io/'
      }, {
        label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          pad: "small"
        }, "Feedback"),
        href: 'https://github.com/grommet/grommet/issues'
      }]
    })) : /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      justify: "end",
      direction: "row",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      href: "https://v2.grommet.io/",
      label: "Grommet.io"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
      href: "https://github.com/grommet/grommet/issues",
      label: "Feedback"
    }));
  })));
};

exports.Responsive = Responsive;
var _default = {
  title: 'Layout/Header/Responsive'
};
exports["default"] = _default;