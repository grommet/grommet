"use strict";

exports.__esModule = true;
exports["default"] = exports.ClassChildrenInfiniteScroll = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
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
var ClassChildrenInfiniteScroll = exports.ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
      items: allItems
    }, props), function (item) {
      return /*#__PURE__*/_react["default"].createElement(MyItem, {
        key: item,
        item: item
      });
    }))
    // </Grommet>
  );
};
ClassChildrenInfiniteScroll.storyName = 'Class children';
var _default = exports["default"] = {
  title: 'Utilities/InfiniteScroll/Class children'
};