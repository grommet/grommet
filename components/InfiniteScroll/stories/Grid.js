"use strict";

exports.__esModule = true;
exports.GridWithShow = exports.GridInfiniteScroll = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var GridInfiniteScroll = function GridInfiniteScroll(_ref) {
  var rest = _extends({}, _ref);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    columns: "xsmall",
    rows: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
    items: allItems,
    step: 12
  }, rest), function (item) {
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

var GridWithShow = function GridWithShow() {
  return /*#__PURE__*/_react["default"].createElement(GridInfiniteScroll, {
    show: 78
  });
};

exports.GridWithShow = GridWithShow;
GridInfiniteScroll.story = {
  name: 'Grid'
};
GridWithShow.story = {
  name: 'Grid with show item 77'
};