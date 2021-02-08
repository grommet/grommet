"use strict";

exports.__esModule = true;
exports["default"] = exports.ClassChildrenInfiniteScroll = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
/* eslint-disable react/prefer-stateless-function */

var MyItem = function MyItem(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    border: {
      side: 'bottom'
    },
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, item));
};

var ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return /*#__PURE__*/_react["default"].createElement(MyItem, {
      key: item,
      item: item
    });
  })));
};

exports.ClassChildrenInfiniteScroll = ClassChildrenInfiniteScroll;
ClassChildrenInfiniteScroll.storyName = 'Class children';
var _default = {
  title: 'Utilities/InfiniteScroll/Class children'
};
exports["default"] = _default;