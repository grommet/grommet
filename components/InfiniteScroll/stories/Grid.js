"use strict";

exports.__esModule = true;
exports["default"] = exports.GridInfiniteScroll = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var GridInfiniteScroll = exports.GridInfiniteScroll = function GridInfiniteScroll() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
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
        src: "https://via.placeholder.com/350x150",
        alt: "Placeholder Image"
      }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, item));
    }))
    // </Grommet>
  );
};

GridInfiniteScroll.storyName = 'Grid';
var _default = exports["default"] = {
  title: 'Utilities/InfiniteScroll/Grid'
};