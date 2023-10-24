"use strict";

exports.__esModule = true;
exports["default"] = exports.Show = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [];
for (var i = 0; i < 95; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}
var Show = exports.Show = function Show() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "large",
    height: "small",
    overflow: "scroll"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data,
    action: function action(item, index) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
        key: index,
        icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.More, null),
        hoverIndicator: true,
        items: [{
          label: 'one'
        }]
      });
    },
    show: 30
  })));
};
var _default = exports["default"] = {
  title: 'Visualizations/List/Show'
};