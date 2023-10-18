"use strict";

exports.__esModule = true;
exports["default"] = exports.Replace = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var allItems = Array(240).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var Replace = exports.Replace = function Replace() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.InfiniteScroll, {
      items: allItems,
      replace: true
    }, function (item) {
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

Replace.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Utilities/InfiniteScroll/Replace'
};