"use strict";

exports.__esModule = true;
exports["default"] = exports.ItemWithIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// This story offers a suggested workaround for issue #3209.
var IconItemsMenu = function IconItemsMenu() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    plain: true,
    open: true,
    items: [{
      label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        alignSelf: "center"
      }, "Github"),
      onClick: function onClick() {},
      icon: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "medium"
      }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Github, {
        size: "large"
      }))
    }, {
      label: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        alignSelf: "center"
      }, "Slack"),
      onClick: function onClick() {},
      icon: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "medium"
      }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Slack, {
        size: "large"
      }))
    }]
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormDown, null), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Menu with Icon on the left")))));
};

var ItemWithIcon = function ItemWithIcon() {
  return /*#__PURE__*/_react["default"].createElement(IconItemsMenu, null);
};

exports.ItemWithIcon = ItemWithIcon;
ItemWithIcon.storyName = 'Item with icon';
var _default = {
  title: 'Controls/Menu/Item with icon'
};
exports["default"] = _default;