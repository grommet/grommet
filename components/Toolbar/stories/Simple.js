"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Toolbar = require("../Toolbar");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_Toolbar.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      layer: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Create",
      primary: true
    })))))
    // </Grommet>
  );
};
Simple.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Toolbar/Simple'
};