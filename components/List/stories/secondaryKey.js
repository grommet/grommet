"use strict";

exports.__esModule = true;
exports["default"] = exports.SecondaryKey = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];
for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}
var SecondaryKey = exports.SecondaryKey = function SecondaryKey() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data.slice(0, 10),
    primaryKey: "entry",
    secondaryKey: "location"
  }));
};
SecondaryKey.storyName = 'Secondary key';
var _default = exports["default"] = {
  title: 'Visualizations/List/Secondary key'
};