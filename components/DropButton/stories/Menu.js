"use strict";

exports.__esModule = true;
exports["default"] = exports.Menu = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderItems = function renderItems() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "hi"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "hi"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "hi"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "hi"));
};

var MenuItem = function MenuItem() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "36px",
    width: "36px",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Gremlin, null));
};

var GremlinDropButton = function GremlinDropButton() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
    alignSelf: "center",
    margin: {
      vertical: 'small'
    },
    dropContent: renderItems(),
    dropProps: {
      align: {
        top: 'bottom'
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(MenuItem, null));
};

var MenuDropButton = function MenuDropButton() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "vertical",
    width: "xxsmall",
    background: "dark-2"
  }, /*#__PURE__*/_react["default"].createElement(GremlinDropButton, null), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: true
  }), /*#__PURE__*/_react["default"].createElement(GremlinDropButton, null))));
};

var Menu = function Menu() {
  return /*#__PURE__*/_react["default"].createElement(MenuDropButton, null);
};

exports.Menu = Menu;
Menu.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/DropButton/Menu'
};
exports["default"] = _default;