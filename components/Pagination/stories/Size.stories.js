"use strict";

exports.__esModule = true;
exports["default"] = exports.Size = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Size = exports.Size = function Size() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "start",
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Small"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      "aria-label": "Pagination with small size",
      numberItems: 237,
      size: "small"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Medium (Default)"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      "aria-label": "Pagination with medium size",
      numberItems: 237,
      size: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Large"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      "aria-label": "Pagination with large size",
      numberItems: 237,
      size: "large"
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Controls/Pagination/Size'
};