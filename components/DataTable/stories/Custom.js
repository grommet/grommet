"use strict";

exports.__esModule = true;
exports["default"] = exports.Custom = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var SortableIcon = function SortableIcon() {
  return /*#__PURE__*/_react["default"].createElement(_grommetIcons.Blank, {
    color: "text-xweak",
    opacity: "0.3"
  }, /*#__PURE__*/_react["default"].createElement("g", {
    fill: "none",
    stroke: "#000",
    strokeWidth: "2"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 6 10 L 12 6 L 18 10"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 6 14 L 12 18 L 18 14"
  })));
};

var customTheme = {
  global: {
    font: {
      family: 'Helvetica'
    }
  },
  dataTable: {
    header: {
      color: 'text-strong',
      extend: function extend(_ref) {
        var column = _ref.column,
            sort = _ref.sort,
            sortable = _ref.sortable;
        return "\n          " + (sortable && sort && sort.property !== column && "\n              :hover {\n                svg {\n                  opacity: 100%;\n                }\n              }\n            ") + "\n         ";
      }
    },
    icons: {
      sortable: SortableIcon
    }
  }
};

var Custom = function Custom() {
  var _React$useState = _react["default"].useState({
    property: 'name',
    direction: 'desc'
  }),
      sort = _React$useState[0],
      setSort = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    columns: _data.columns,
    data: _data.DATA,
    step: 10,
    sort: sort,
    onSort: setSort
  })));
};

exports.Custom = Custom;
var _default = {
  title: 'Visualizations/DataTable/Custom'
};
exports["default"] = _default;