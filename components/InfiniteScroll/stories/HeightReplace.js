"use strict";

exports.__esModule = true;
exports["default"] = exports.HeightReplace = void 0;

var _react = _interopRequireDefault(require("react"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allItems = Array(240).fill().map(function (_, i) {
  return i + 1;
});

var HeightReplace = function HeightReplace() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, {
    items: allItems,
    replace: true
  }, function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: item,
      height: item <= 25 ? 'xsmall' : 'xxsmall',
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "item ", item));
  })));
};

exports.HeightReplace = HeightReplace;
HeightReplace.storyName = 'Variable item height with replace';
HeightReplace.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Utilities/InfiniteScroll/Variable item height with replace'
};
exports["default"] = _default;