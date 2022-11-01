"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var disabledLocations = ['Fort Collins', 'Palo Alto'];
var Disabled = function Disabled() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    a11yTitle: "Locations",
    data: locations,
    disabled: disabledLocations,
    onClickItem: function onClickItem(e) {
      console.log(e);
    }
  }));
};
exports.Disabled = Disabled;
var _default = {
  title: 'Visualizations/List/Disabled'
};
exports["default"] = _default;