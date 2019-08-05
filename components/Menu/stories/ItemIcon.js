"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// This story offers a suggested workaround for issue #3209.
var IconItemsMenu = function IconItemsMenu() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Menu, {
    plain: true,
    open: true,
    items: [{
      label: _react["default"].createElement(_grommet.Box, {
        alignSelf: "center"
      }, "Github"),
      onClick: function onClick() {},
      icon: _react["default"].createElement(_grommet.Box, {
        pad: "medium"
      }, _react["default"].createElement(_grommetIcons.Github, {
        size: "large"
      }))
    }, {
      label: _react["default"].createElement(_grommet.Box, {
        alignSelf: "center"
      }, "Slack"),
      onClick: function onClick() {},
      icon: _react["default"].createElement(_grommet.Box, {
        pad: "medium"
      }, _react["default"].createElement(_grommetIcons.Slack, {
        size: "large"
      }))
    }]
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small",
    pad: "large"
  }, _react["default"].createElement(_grommetIcons.FormDown, null), _react["default"].createElement(_grommet.Text, null, "Menu with Icon on the left")))));
};

(0, _react2.storiesOf)('Menu', module).add('Item with Icon', function () {
  return _react["default"].createElement(IconItemsMenu, null);
});