"use strict";

exports.__esModule = true;
exports["default"] = exports.NumberMiddlePages = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var NumberMiddlePages = exports.NumberMiddlePages = function NumberMiddlePages() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "numberMiddlePages = 4 (number of pages in the middle)"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      numberItems: 237,
      page: 10,
      numberMiddlePages: 4
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "numberMiddlePages = 5 (number of pages in the middle)"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      numberItems: 237,
      page: 10,
      numberMiddlePages: 5
    })))
    // </Grommet>
  );
};

NumberMiddlePages.storyName = 'Number middle pages';
var _default = exports["default"] = {
  title: 'Controls/Pagination/Number middle pages'
};