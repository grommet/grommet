"use strict";

exports.__esModule = true;
exports["default"] = exports.ComposedToolbar = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ComposedToolbar = exports.ComposedToolbar = function ComposedToolbar() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_Data.Data, {
      data: _data.DATA,
      properties: {
        date: {
          filter: false
        },
        location: {
          label: 'Location'
        },
        name: {
          filter: false
        },
        percent: {
          filter: false
        },
        paid: {
          filter: false
        }
      },
      views: [{
        name: 'My location',
        properties: {
          location: ['San Francisco']
        }
      }]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, {
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataSort, {
      drop: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      drop: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
      property: "location"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.DataView, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTableColumns, {
      options: _data.columns.map(function (column) {
        return {
          property: column.property,
          label: column.header
        };
      }),
      drop: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      overflow: "auto"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      alignSelf: "start",
      columns: _data.columns,
      sortable: true,
      primaryKey: "name"
    }))))
    // </Grommet>
  );
};
ComposedToolbar.storyName = 'Composed Toolbar';
ComposedToolbar.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/Composed Toolbar'
};