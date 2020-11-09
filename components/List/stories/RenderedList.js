"use strict";

exports.__esModule = true;
exports.RenderedList = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}

var RenderedList = function RenderedList() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data.slice(0, 10),
    primaryKey: function primaryKey(item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "large",
        weight: "bold"
      }, item.entry);
    },
    secondaryKey: function secondaryKey(item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "small",
        color: "dark-4"
      }, item.location);
    }
  })));
};

exports.RenderedList = RenderedList;
RenderedList.story = {
  name: 'Key render'
};