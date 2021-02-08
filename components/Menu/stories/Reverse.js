"use strict";

exports.__esModule = true;
exports["default"] = exports.Reverse = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ReverseMenu = function ReverseMenu() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    dropProps: {
      align: {
        top: 'bottom',
        left: 'left'
      }
    },
    label: "actions",
    items: [{
      label: 'Home'
    }, {
      label: 'Profile',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
      gap: 'small'
    }, {
      label: 'Logout',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Power, null),
      reverse: true,
      gap: 'small'
    }]
  })));
};

var Reverse = function Reverse() {
  return /*#__PURE__*/_react["default"].createElement(ReverseMenu, null);
};

exports.Reverse = Reverse;
Reverse.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Menu/Reverse'
};
exports["default"] = _default;