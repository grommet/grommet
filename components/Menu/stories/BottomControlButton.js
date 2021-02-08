"use strict";

exports.__esModule = true;
exports["default"] = exports.BottomControlButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ControlBottomMenu = function ControlBottomMenu() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "medium",
    justify: "center",
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    dropProps: {
      align: {
        bottom: 'bottom',
        left: 'left'
      }
    },
    label: "actions",
    items: [{
      label: 'Profile',
      onClick: function onClick() {}
    }, {
      label: 'Settings',
      onClick: function onClick() {}
    }, {
      label: 'FAQ',
      onClick: function onClick() {}
    }]
  })));
};

var BottomControlButton = function BottomControlButton() {
  return /*#__PURE__*/_react["default"].createElement(ControlBottomMenu, null);
};

exports.BottomControlButton = BottomControlButton;
BottomControlButton.storyName = 'Bottom control button';
BottomControlButton.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Menu/Bottom control button'
};
exports["default"] = _default;