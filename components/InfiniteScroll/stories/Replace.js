"use strict";

exports.__esModule = true;
exports["default"] = exports.Replace = void 0;

var _react = _interopRequireDefault(require("react"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var Replace = function Replace() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, {
    items: allItems,
    replace: true
  }, function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, item));
  }));
};

exports.Replace = Replace;
Replace.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Utilities/InfiniteScroll/Replace'
};
exports["default"] = _default;