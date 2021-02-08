"use strict";

exports.__esModule = true;
exports["default"] = exports.Social = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Media = function Media() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "xxsmall",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    a11yTitle: "Share feedback on Github",
    href: "https://www.instagram.com/",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Instagram, {
      color: "brand"
    })
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    a11yTitle: "Chat with us on Slack",
    href: "https://www.facebook.com/",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FacebookOption, {
      color: "brand"
    })
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    a11yTitle: "Follow us on Twitter",
    href: "https://twitter.com/",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Twitter, {
      color: "brand"
    })
  }));
};

var Social = function Social() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Main, {
    background: "light-2",
    elevation: "large",
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small",
    size: "xsmall"
  }, "Main Content"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
    background: "light-4",
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    direction: "row",
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
    color: "brand",
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    alignSelf: "center",
    color: "brand",
    size: "small"
  }, "Grommet")), /*#__PURE__*/_react["default"].createElement(Media, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    textAlign: "center",
    size: "xsmall"
  }, "\xA9Copyright")));
};

exports.Social = Social;
var _default = {
  title: 'Layout/Footer/Social'
};
exports["default"] = _default;