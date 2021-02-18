"use strict";

exports.__esModule = true;
exports["default"] = exports.NumberEdgePages = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NumberEdgePages = function NumberEdgePages() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "numberEdgePages = 2 (number of pages on start/end)"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
    numberItems: 237,
    page: 10,
    numberEdgePages: 2
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "numberEdgePages = 0"), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
    numberItems: 237,
    page: 10,
    numberEdgePages: 0
  }))));
};

exports.NumberEdgePages = NumberEdgePages;
NumberEdgePages.storyName = 'Number edge pages';
var _default = {
  title: 'Controls/Pagination/Number edge pages'
};
exports["default"] = _default;