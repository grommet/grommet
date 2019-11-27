"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Reverse = function Reverse() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Menu, {
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
      icon: _react["default"].createElement(_grommetIcons.User, null),
      gap: 'small'
    }, {
      label: 'Logout',
      icon: _react["default"].createElement(_grommetIcons.Power, null),
      reverse: true,
      gap: 'small'
    }]
  })));
};

(0, _react2.storiesOf)('Menu', module).add('Reverse', function () {
  return _react["default"].createElement(Reverse, null);
});