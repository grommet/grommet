"use strict";

exports.__esModule = true;
exports["default"] = exports.Example = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Example = exports.Example = function Example() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'medium']],
      justifyContent: "center",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/_react["default"].createElement(_Data.Data, {
      data: _data.DATA
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      drop: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
      property: "location"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.List, {
      primaryKey: "name",
      secondaryKey: "location"
    })))
    // </Grommet>
  );
};

Example.storyName = 'List';
Example.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/List'
};