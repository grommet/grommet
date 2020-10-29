"use strict";

exports.__esModule = true;
exports.Icon = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Icon = function Icon() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small"
  }, " plain=true (no padding, no border) "), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Close, null),
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Send, null),
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
    onClick: function onClick() {}
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small"
  }, " plain=false (includes padding and border)"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Close, null),
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Send, null),
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
    onClick: function onClick() {}
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    margin: "small"
  }, " plain=undefined (with padding, no border) "), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Close, null),
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Send, null),
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
    onClick: function onClick() {}
  }))));
};

exports.Icon = Icon;
Icon.story = {
  name: 'Icon plain'
};