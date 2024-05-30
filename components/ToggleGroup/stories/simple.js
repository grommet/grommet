"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var options = [{
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.List, {
    a11yTitle: "List view"
  }),
  value: 'list'
}, {
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Table, {
    a11yTitle: "Map view"
  }),
  value: 'table'
}, {
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.MapLocation, {
    a11yTitle: "Map view"
  }),
  value: 'map'
}];
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "large",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.ToggleGroup, {
    a11yTitle: "Choose view",
    options: options,
    defaultValue: "list"
  }));
};
var _default = exports["default"] = {
  title: 'Controls/ToggleGroup/Simple'
};