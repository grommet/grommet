"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _Basics = require("./Basics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GridInfiniteScroll = function GridInfiniteScroll() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "xsmall",
    rows: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, {
    items: _Basics.allItems,
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

(0, _react2.storiesOf)('InfiniteScroll', module).add('Grid', function () {
  return /*#__PURE__*/_react["default"].createElement(GridInfiniteScroll, null);
});