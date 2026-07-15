"use strict";

exports.__esModule = true;
exports["default"] = exports.Steps = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Steps = exports.Steps = function Steps() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "start",
      pad: "small",
      gap: "xlarge"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: "horizontal"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Pagination with stepOptions"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      "aria-label": "Pagination with step options to change items per page",
      numberItems: 237,
      stepOptions: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: "horizontal"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Pagination with stepOptions and summary"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      "aria-label": "Pagination with step options and summary of items per page",
      numberItems: 237,
      stepOptions: true,
      summary: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: "horizontal"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Pagination with custom step sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      "aria-label": "Pagination with custom step sizes and summary",
      numberItems: 237,
      stepOptions: [10, 20, 30, 1000],
      summary: true
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Controls/Pagination/Steps'
};