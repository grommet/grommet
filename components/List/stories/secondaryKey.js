"use strict";

exports.__esModule = true;
exports.data = exports.locations = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
exports.locations = locations;
var data = [];
exports.data = data;

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1),
    location: locations[i % locations.length]
  });
}

var SecondaryKeyList = function SecondaryKeyList() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data.slice(0, 10),
    primaryKey: "entry",
    secondaryKey: "location"
  })));
};

(0, _react2.storiesOf)('List', module).add('secondaryKey', function () {
  return /*#__PURE__*/_react["default"].createElement(SecondaryKeyList, null);
});