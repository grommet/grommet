"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _isChromatic = _interopRequireDefault(require("chromatic/isChromatic"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var InfiniteScrollReplace = function InfiniteScrollReplace(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
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

if (!(0, _isChromatic["default"])()) {
  (0, _react2.storiesOf)('InfiniteScroll', module).add('Replace', function () {
    return /*#__PURE__*/_react["default"].createElement(InfiniteScrollReplace, {
      replace: true
    });
  }).add('Replace with Show 28th item', function () {
    return /*#__PURE__*/_react["default"].createElement(InfiniteScrollReplace, {
      replace: true,
      show: 27
    });
  }).add('Replace with Show 88th item', function () {
    return /*#__PURE__*/_react["default"].createElement(InfiniteScrollReplace, {
      replace: true,
      show: 87
    });
  });
}