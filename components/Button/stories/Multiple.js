"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Multiple = function Multiple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    color: "dark-1",
    primary: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, {
      color: "accent-1"
    }),
    label: "Add",
    onClick: function onClick() {}
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    color: "dark-1",
    primary: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {}
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {}
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    color: "light-2",
    primary: true,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {}
  }))));
};

exports.Multiple = Multiple;
var _default = {
  title: 'Controls/Button/Multiple'
};
exports["default"] = _default;