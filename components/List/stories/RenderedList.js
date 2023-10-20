"use strict";

exports.__esModule = true;
exports["default"] = exports.RenderedList = void 0;
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
var RenderedList = exports.RenderedList = function RenderedList() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data.slice(0, 10),
    primaryKey: function primaryKey(item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        key: item.entry,
        size: "large",
        weight: "bold"
      }, item.entry);
    },
    secondaryKey: function secondaryKey(item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        key: item.location,
        size: "small",
        color: "dark-4"
      }, item.location);
    },
    itemKey: function itemKey(item) {
      return item.entry;
    }
  }));
};
RenderedList.storyName = 'Key render';
var _default = exports["default"] = {
  title: 'Visualizations/List/Key render'
};