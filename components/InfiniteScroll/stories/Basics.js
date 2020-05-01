"use strict";

exports.__esModule = true;
exports.allItems = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
exports.allItems = allItems;

var SimpleInfiniteScroll = function SimpleInfiniteScroll(props) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
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
  })));
};

(0, _react2.storiesOf)('InfiniteScroll', module).add('Simple', function () {
  return /*#__PURE__*/_react["default"].createElement(SimpleInfiniteScroll, null);
}).add('Show 118th item', function () {
  return /*#__PURE__*/_react["default"].createElement(SimpleInfiniteScroll, {
    show: 117
  });
}).add('Marker', function () {
  return /*#__PURE__*/_react["default"].createElement(SimpleInfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "medium",
        background: "accent-1"
      }, marker);
    }
  });
});