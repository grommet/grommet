"use strict";

exports.__esModule = true;
exports["default"] = exports.Justify = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Justify = exports.Justify = function Justify() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    alignSelf: "start",
    label: "Actions",
    items: [{
      label: 'User',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
      justify: 'center'
    }, {
      label: 'Users',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
      justify: 'end'
    }, {
      label: 'Home',
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Home, null)
    }]
  }));
};
Justify.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Menu/Justify'
};