"use strict";

exports.__esModule = true;
exports["default"] = exports.GridInfiniteScroll = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var GridInfiniteScroll = function GridInfiniteScroll() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "xsmall",
    rows: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, {
    items: allItems,
    step: 12
  }, function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: item,
      as: "article",
      pad: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
      src: "https://via.placeholder.com/350x150"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, item));
  })));
};

exports.GridInfiniteScroll = GridInfiniteScroll;
GridInfiniteScroll.storyName = 'Grid';
var _default = {
  title: 'Utilities/InfiniteScroll/Grid'
};
exports["default"] = _default;