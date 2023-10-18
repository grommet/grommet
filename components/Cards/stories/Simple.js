"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Cards = require("../Cards");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var Simple = exports.Simple = function Simple() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    status: "info",
    message: "Cards is in 'beta'. The API surface is subject to change."
  }), /*#__PURE__*/_react["default"].createElement(_Cards.Cards, {
    a11yTitle: "Locations",
    data: locations
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/Cards/Simple'
};