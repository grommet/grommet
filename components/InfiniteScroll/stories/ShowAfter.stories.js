"use strict";

exports.__esModule = true;
exports["default"] = exports.ShowAfter = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var Example = function Example(props) {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.InfiniteScroll, _extends({
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
    })
    // </Grommet>
  );
};
var ShowAfter = exports.ShowAfter = function ShowAfter() {
  return /*#__PURE__*/_react["default"].createElement(Example, {
    replace: true,
    show: 87
  });
};
ShowAfter.storyName = 'Replace, show after step';
ShowAfter.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Utilities/InfiniteScroll/Replace, show after step'
};