"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ControlBottom = function ControlBottom() {
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

(0, _react2.storiesOf)('Menu', module).add('Bottom Control Button', function () {
  return /*#__PURE__*/_react["default"].createElement(ControlBottom, null);
}, {
  chromatic: {
    disable: true
  }
});