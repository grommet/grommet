"use strict";

exports.__esModule = true;
exports["default"] = exports.Basic = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var Basic = exports.Basic = function Basic() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    a11yTitle: "Locations",
    data: locations
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/List/Basic'
};