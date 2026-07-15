"use strict";

exports.__esModule = true;
exports["default"] = exports.Marker = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var Example = function Example(props) {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.InfiniteScroll, _extends({
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
    }))
    // </Grommet>
  );
};
var Marker = exports.Marker = function Marker() {
  return /*#__PURE__*/_react["default"].createElement(Example, {
    renderMarker: function renderMarker(marker) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "medium",
        background: "accent-1"
      }, marker);
    }
  });
};
var _default = exports["default"] = {
  title: 'Utilities/InfiniteScroll/Marker'
};