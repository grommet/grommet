"use strict";

exports.__esModule = true;
exports.IconLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IconLabel = function IconLabel() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    round: "full",
    overflow: "hidden",
    background: "neutral-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    hoverIndicator: true,
    onClick: function onClick() {}
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    gap: "xlarge",
    onClick: function onClick() {}
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "500px gap",
    gap: "500px",
    onClick: function onClick() {}
  }))));
};

exports.IconLabel = IconLabel;
IconLabel.story = {
  name: 'Icon label'
};