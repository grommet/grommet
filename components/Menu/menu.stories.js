"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleMenu = function SimpleMenu() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    direction: "row",
    gap: "large"
  }, _react.default.createElement(_grommet.Menu, {
    label: "Actions",
    items: [{
      label: 'Launch',
      onClick: function onClick() {}
    }, {
      label: 'Abort',
      onClick: function onClick() {}
    }]
  })));
};

(0, _react2.storiesOf)('Menu', module).add('Simple Menu', function () {
  return _react.default.createElement(SimpleMenu, null);
});